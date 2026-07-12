"use client";

import dynamic from "next/dynamic";

const PDFView = dynamic(() => import("./PDFRenderer"), {
  ssr: false,
});

export { PDFView };
