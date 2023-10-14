import { NextResponse } from "next/server";
import { sbDB } from "@/supabase/supabase";

export async function GET() {
    let { data, error } = await sbDB.from("Composers").select("id_composer,name_composer,image_composer,Songs(*)");
    return NextResponse.json({ data });
}