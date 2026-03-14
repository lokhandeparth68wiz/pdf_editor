import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";

export const maxDuration = 60; 

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const targetFormat = formData.get("targetFormat") as string; // 'pdf' or 'docx'
    
    if (!file || !targetFormat) {
      return NextResponse.json({ error: "Missing file or targetFormat" }, { status: 400 });
    }

    const ext = path.extname(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempDir = os.tmpdir();
    
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const inputPath = path.join(tempDir, `input-${uniqueId}${ext}`);
    const outdir = tempDir; // Libreoffice outputs to outdir

    // Write input file to disk
    await fs.writeFile(inputPath, buffer);

    // Call LibreOffice headless to convert
    const loCommand = process.platform === "win32" ? "soffice" : "libreoffice";

    const convertFile = () =>
      new Promise<string>((resolve, reject) => {
        let command = `"${loCommand}" --headless --convert-to ${targetFormat} --outdir "${outdir}" "${inputPath}"`;
        
        // Force PDF files to open in Writer instead of Draw so they can be exported to DOCX
        if (ext.toLowerCase() === ".pdf" && targetFormat === "docx") {
          command = `"${loCommand}" --headless --infilter="writer_pdf_import" --convert-to docx --outdir "${outdir}" "${inputPath}"`;
        }

        exec(command, { env: { ...process.env, HOME: os.tmpdir() } }, async (error, stdout, stderr) => {
          if (error) {
             console.error(`LibreOffice error:`, error);
             console.error(`LibreOffice stderr:`, stderr);
             reject(new Error("LibreOffice conversion failed. Ensure it is installed and in PATH."));
          } else {
             const parsedInput = path.parse(inputPath);
             const outputPath = path.join(outdir, `${parsedInput.name}.${targetFormat}`);
             
             try {
                // Verify LibreOffice actually created the output file
                await fs.access(outputPath);
                resolve(outputPath);
             } catch (e) {
                console.error("LibreOffice succeeded but output file is missing.");
                console.error("stdout:", stdout);
                console.error("stderr:", stderr);
                reject(new Error(`LibreOffice failed to generate ${targetFormat}. Log: ${stdout} ${stderr}`));
             }
          }
        });
      });

    try {
      const outputPath = await convertFile();
      const convertedBuffer = await fs.readFile(outputPath);
      
      // Cleanup
      await fs.unlink(inputPath).catch(console.error);
      await fs.unlink(outputPath).catch(console.error);

      return new NextResponse(convertedBuffer, {
        headers: {
          "Content-Type": targetFormat === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="converted-${file.name.replace(ext, `.${targetFormat}`)}"`,
        },
      });
      
    } catch (loError: any) {
      await fs.unlink(inputPath).catch(console.error);
      return NextResponse.json({ error: loError.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Conversion route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
