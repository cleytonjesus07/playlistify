import { sbDB } from "@/supabase/supabase";

export const getSongs = async function getSongs() {
    /* Listando as músicas */
    /* ok */
    let { data, error } = await sbDB.from("Songs").select("id_song,title_song,url_song,times_played,Composers(id_composer,name_composer,image_composer),Categories(title_category)");
    if (error) return console.error(error.message);
    return data;
};

export async function getTimesPlayedBySongId(id) {
    const { data, error } = await sbDB
        .from('Songs').select("times_played").eq("id_song", id);
    if (error) return console.error(error.message);
    return data[0].times_played;
}
export async function getArtists() {
    /* ok */
    let { data, error } = await sbDB.from("Composers").select("id_composer,name_composer,image_composer,Songs(*)");
    if (error) return console.error(error.message);
    return data;
}
export async function getArtistsByCategory() {
    /* ok */
    let { data, error } = await sbDB.from("Categories").select("id_category,title_category,Composers(id_composer,name_composer,image_composer)");
    if (error) return console.error(error.message);
    return data;
}
export async function updateTimesPlayed(data) {
    /* ok */
    const { id, count } = data;
    const { error } = await sbDB
        .from('Songs').update({ times_played: count }).eq("id_song", id);
    if (error) {
        console.error(error.message)
        return false;
    };
    return true;
}





