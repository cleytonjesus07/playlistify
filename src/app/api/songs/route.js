import { NextResponse } from "next/server";
import { sbDB } from "@/supabase/supabase";
import { getSongs } from "@/functions/api";

export async function GET() {
    const data = await getSongs();
    return NextResponse.json(data);
}