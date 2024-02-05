import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const files = Array.from(formData.values());

  for (const file of files) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(`public/uploads/${file.name}`, buffer);
    }
  }

  console.log(formData.getAll("files"));
  return NextResponse.json({ success: true });
}
