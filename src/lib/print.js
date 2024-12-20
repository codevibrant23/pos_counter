"use server";

import escpos from "escpos";
import escposUSB from "escpos-usb";

export default function print() {
  // Find the printer connected via USB
  const printers = escposUSB.USB.findPrinter();
  if (printers.length === 0) {
    return res.status(500).json({ error: "No printers found" });
  }

  // Select the first printer (or select the appropriate printer if necessary)
  const printer = new escpos.Printer(printers[0]);

  try {
    // Open the printer connection and print test message
    printers[0].open(() => {
      printer
        .text("Test Print") // Print basic text
        .text("\x1b\x45\x01Bold Text\x1b\x45\x00") // Bold text
        .text("Regular Text After Bold")
        .feed(3) // Feed a few lines
        .cut() // Cut the paper
        .close(); // Close the printer connection
    });
  } catch (err) {
    console.error("Error printing test:", err);
  }
}
