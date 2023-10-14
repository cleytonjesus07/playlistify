import { sbDB } from "@/supabase/supabase";
import { NextResponse } from "next/server";


export async function GET(req) {
    const id_composer = req.nextUrl.searchParams.get("id_composer");
    let { data } = await sbDB.from("Composers").select("Songs(id_song,title_song,url_song,times_played)").eq("id_composer", id_composer);
    return NextResponse.json(data)
}

export async function POST(req) {
    const { id, count } = await req.json();
    const { data, error } = await sbDB
        .from('Songs').update({ times_played: count }).eq("id_song", id).select()
    if (error) {
        return NextResponse.json(error)
    }

    return new Response(data)
}