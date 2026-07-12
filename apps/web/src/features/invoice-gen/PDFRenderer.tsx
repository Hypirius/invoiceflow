"use client";

import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDFGen from "./InvoiceGen";

function PDFRenderer() {
  return (
    <PDFViewer className="size-full">
      <InvoicePDFGen />
    </PDFViewer>
  );
}

export default PDFRenderer;
