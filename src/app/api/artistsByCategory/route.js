import { getArtistsByCategory } from "@/functions/api";
import { NextResponse } from "next/server";

export async function GET() {
    let data = await getArtistsByCategory();

    return NextResponse.json({ data });
}