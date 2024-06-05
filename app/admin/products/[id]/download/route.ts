import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export const GET = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    const product = await db.product.findUnique({
        where: { id },
        select: { name: true, filePath: true }
    })

    if (product == null) return notFound()

    const { size } = await fs.stat(product.filePath)
    const file = await fs.readFile(product.filePath)
    const extension = product.filePath.split(".").pop()

    return new NextResponse(file, {
        headers: {
            "Content-Type": `application/${extension}`,
            "Content-Disposition": `attachment; filename=${product.name}.${extension}`,
            "Content-Length": size.toString()
        }
    })
}