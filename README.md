# PDFly - Premium PDF Utilities

A modern, production-ready SaaS application for merging, editing, compressing, and converting PDF documents.

## Features

- 📄 **Merge PDF**: Client-side (in-browser) merging with smooth drag-and-drop file reordering.
- 🖋 **Edit PDF**: Add text annotations and hand-drawn signatures to your PDFs.
- 🗜 **Compress PDF**: Server-side compression leveraging Ghostscript for high-quality, reduced-size outputs.
- 🔄 **Format Conversion**: Convert PDFs to Word documents (`.docx`) and vice-versa, powered by LibreOffice.
- 🌓 **Dark Mode**: Beautiful, modern UI available in light and dark themes.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS 4, Framer Motion
- **Core Processing**:
  - `pdf-lib` (Client-side merging and editing overlay)
  - `ghostscript` (Backend Compression)
  - `libreoffice` (Backend Conversion)
  - `dnd-kit` (Drag and Drop Sorting)
  - `react-pdf` (PDF Rendering in Editor)

## Getting Started Locally

### Prerequisites

For the backend features (Compression and Conversion) to work locally, you need the following system binaries installed and available in your `PATH`:

- **Ghostscript** (`gs` or `gswin64c` on Windows)
- **LibreOffice** (`soffice`)

### Installation

1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

## Deployment Strategy

Because standard Serverless architectures (like Vercel or Netlify) impose strict limits on function size (often 50MB) and execution duration (10s-60s), **Ghostscript** and **LibreOffice** cannot reliably run inside them.

### Recommended: Docker Deployment

We have included a production-ready `Dockerfile` that packages Next.js alongside Debian's `ghostscript` and `libreoffice` binaries.

**Deploy to Render, Railway, or Fly.io:**

1. Connect your GitHub repository to your host.
2. Select **Docker** as the deployment environment.
3. Keep the start command empty (the Dockerfile implicitly runs `node server.js`).
4. Ensure your hosting tier has sufficient memory (at least 1GB is recommended for LibreOffice conversions).

### Configuration changes for standalone

Ensure your `next.config.ts` includes `output: 'standalone'` for the Docker build to work effectively.

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // ...other config
};

export default nextConfig;
```
