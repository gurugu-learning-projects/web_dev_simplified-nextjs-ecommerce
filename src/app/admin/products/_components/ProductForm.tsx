"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProductForm() {
  return (
    <form>
      <div className="">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" className="w-full" required />
      </div>
    </form>
  );
}
