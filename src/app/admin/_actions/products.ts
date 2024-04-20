"use server";

import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import db from "@/db/db";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, { message: "Required" }),
  image: imageSchema.refine((file) => file.size > 0, { message: "Required" }),
});

export async function addProduct(formData: FormData) {
  const parsed = addSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    console.log("parsed.error.issues:", parsed.error.issues);
    console.log(
      "parsed.error.formErrors.fieldErrors:",
      parsed.error.formErrors.fieldErrors
    );
    return parsed.error.issues;
  }
  console.log(parsed);

  const data = parsed.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public/${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  db.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/products");
}
