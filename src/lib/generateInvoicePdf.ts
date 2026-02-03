import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { InvoiceDetail } from "@/components/billing/InvoiceDetailDialog";

export function generateInvoicePdf(invoice: InvoiceDetail): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Colors
  const primaryColor: [number, number, number] = [59, 130, 246]; // Blue
  const textColor: [number, number, number] = [31, 41, 55]; // Dark gray
  const mutedColor: [number, number, number] = [107, 114, 128]; // Gray
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 20, 25);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.id, pageWidth - 20, 20, { align: "right" });
  doc.setFontSize(10);
  doc.text(`Date: ${formatDate(invoice.createdAt)}`, pageWidth - 20, 30, { align: "right" });
  
  // Company Info (left side)
  doc.setTextColor(...textColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("NetPulse ISP", 20, 55);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...mutedColor);
  doc.text("Internet Service Provider", 20, 62);
  doc.text("Dhaka, Bangladesh", 20, 68);
  
  // Bill To (right side)
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", pageWidth - 80, 55);
  
  doc.setFont("helvetica", "normal");
  doc.text(invoice.customerName, pageWidth - 80, 62);
  doc.setTextColor(...mutedColor);
  doc.text(invoice.customerPhone, pageWidth - 80, 68);
  if (invoice.customerEmail) {
    doc.text(invoice.customerEmail, pageWidth - 80, 74);
  }
  if (invoice.customerAddress) {
    const addressLines = doc.splitTextToSize(invoice.customerAddress, 60);
    doc.text(addressLines, pageWidth - 80, invoice.customerEmail ? 80 : 74);
  }
  
  // Invoice Details
  const detailsY = 95;
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  
  // Details box
  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(20, detailsY, pageWidth - 40, 25, 3, 3, "FD");
  
  const col1 = 30;
  const col2 = 70;
  const col3 = 110;
  const col4 = 150;
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...mutedColor);
  doc.setFontSize(8);
  doc.text("BILLING PERIOD", col1, detailsY + 8);
  doc.text("DUE DATE", col2, detailsY + 8);
  doc.text("PACKAGE", col3, detailsY + 8);
  doc.text("STATUS", col4, detailsY + 8);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textColor);
  doc.setFontSize(9);
  doc.text(
    `${formatDate(invoice.billingPeriod.start)} - ${formatDate(invoice.billingPeriod.end)}`,
    col1,
    detailsY + 17
  );
  doc.text(formatDate(invoice.dueDate), col2, detailsY + 17);
  doc.text(invoice.packageName, col3, detailsY + 17);
  
  // Status badge
  const statusColors: Record<string, [number, number, number]> = {
    paid: [34, 197, 94],
    due: [156, 163, 175],
    partial: [234, 179, 8],
    overdue: [239, 68, 68],
  };
  const statusColor = statusColors[invoice.status] || mutedColor;
  doc.setTextColor(...statusColor);
  doc.setFont("helvetica", "bold");
  doc.text(invoice.status.toUpperCase(), col4, detailsY + 17);
  
  // Line Items Table
  const tableStartY = detailsY + 35;
  
  autoTable(doc, {
    startY: tableStartY,
    head: [["Description", "Qty", "Unit Price", "Total"]],
    body: invoice.lineItems.map((item) => [
      item.description,
      item.quantity.toString(),
      formatCurrency(item.unitPrice),
      formatCurrency(item.total),
    ]),
    theme: "striped",
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
    },
    bodyStyles: {
      textColor: textColor,
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 20, halign: "center" },
      2: { cellWidth: 35, halign: "right" },
      3: { cellWidth: 35, halign: "right" },
    },
    margin: { left: 20, right: 20 },
  });
  
  // Get the final Y position after the table
  const finalY = (doc as any).lastAutoTable.finalY || tableStartY + 50;
  
  // Totals section
  const totalsX = pageWidth - 80;
  let totalsY = finalY + 15;
  
  doc.setTextColor(...mutedColor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Subtotal:", totalsX, totalsY);
  doc.setTextColor(...textColor);
  doc.text(formatCurrency(invoice.amount), pageWidth - 20, totalsY, { align: "right" });
  
  if (invoice.paidAmount > 0) {
    totalsY += 8;
    doc.setTextColor(34, 197, 94);
    doc.text("Paid:", totalsX, totalsY);
    doc.text(`-${formatCurrency(invoice.paidAmount)}`, pageWidth - 20, totalsY, { align: "right" });
  }
  
  totalsY += 12;
  doc.setDrawColor(229, 231, 235);
  doc.line(totalsX, totalsY - 5, pageWidth - 20, totalsY - 5);
  
  const remaining = invoice.amount - invoice.paidAmount;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...textColor);
  doc.text(remaining === 0 ? "Total:" : "Balance Due:", totalsX, totalsY);
  doc.setTextColor(remaining > 0 ? 239 : 34, remaining > 0 ? 68 : 197, remaining > 0 ? 68 : 94);
  doc.text(formatCurrency(remaining), pageWidth - 20, totalsY, { align: "right" });
  
  // Payment History
  if (invoice.payments.length > 0) {
    let paymentY = totalsY + 25;
    
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Payment History", 20, paymentY);
    
    paymentY += 5;
    
    autoTable(doc, {
      startY: paymentY,
      head: [["Date", "Method", "Reference", "Amount"]],
      body: invoice.payments.map((p) => [
        formatDate(p.date),
        p.method.replace("_", " ").toUpperCase(),
        p.reference || "-",
        formatCurrency(p.amount),
      ]),
      theme: "plain",
      headStyles: {
        fillColor: [249, 250, 251],
        textColor: mutedColor,
        fontStyle: "bold",
        fontSize: 8,
      },
      bodyStyles: {
        textColor: textColor,
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 40 },
        2: { cellWidth: 50 },
        3: { cellWidth: 35, halign: "right" },
      },
      margin: { left: 20, right: 20 },
    });
  }
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setTextColor(...mutedColor);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for your business!", pageWidth / 2, footerY, { align: "center" });
  doc.text(
    "For questions about this invoice, please contact support.",
    pageWidth / 2,
    footerY + 5,
    { align: "center" }
  );
  
  return doc;
}

export function downloadInvoicePdf(invoice: InvoiceDetail): void {
  const doc = generateInvoicePdf(invoice);
  doc.save(`Invoice-${invoice.id}.pdf`);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString()}`;
}
