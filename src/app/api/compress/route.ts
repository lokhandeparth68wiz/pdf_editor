import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";

export const maxDuration = 60; // Allow more time for processing

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const level = formData.get("level") as string || "screen";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempDir = os.tmpdir();
    const inputPath = path.join(tempDir, `input-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`);
    const outputPath = path.join(tempDir, `output-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`);

    await fs.writeFile(inputPath, buffer);

    // Run Ghostscript
    // Determine the gs command based on the OS. On Windows it's usually gswin64c if installed.
    const gsCommand = process.platform === "win32" ? "gswin64c" : "gs";
    
    // Create a promise wrapper for exec
    const compressPdf = () =>
      new Promise<void>((resolve, reject) => {
        const command = `${gsCommand} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${level} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Ghostscript error: ${error}`);
            reject(new Error("Ghostscript is not installed or failed to compress. Ensure Ghostscript is installed and in your PATH."));
          } else {
            resolve();
          }
        });
      });

    try {
      await compressPdf();
      
      const compressedBuffer = await fs.readFile(outputPath);
      
      // Clean up files
      await fs.unlink(inputPath).catch(console.error);
      await fs.unlink(outputPath).catch(console.error);

      return new NextResponse(compressedBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="compressed-${file.name}"`,
        },
      });
    } catch (gsError: any) {
      await fs.unlink(inputPath).catch(console.error);
      return NextResponse.json({ error: gsError.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Compression route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
