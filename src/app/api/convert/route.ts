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
    // Depending on the OS, the command is soffice. On windows, it's often soffice.exe
    const loCommand = process.platform === "win32" ? "soffice" : "soffice";

    const convertFile = () =>
      new Promise<string>((resolve, reject) => {
        // e.g. "soffice --headless --convert-to pdf --outdir /tmp /tmp/input.docx"
        const command = `"${loCommand}" --headless --convert-to ${targetFormat} --outdir "${outdir}" "${inputPath}"`;
        exec(command, (error, stdout, stderr) => {
          if (error) {
             console.error(`LibreOffice error: ${error}`);
             reject(new Error("LibreOffice conversion failed. Ensure it is installed and in PATH."));
          } else {
             // soffice changes the extension
             const parsedInput = path.parse(inputPath);
             const outputPath = path.join(outdir, `${parsedInput.name}.${targetFormat}`);
             resolve(outputPath);
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
