import { sbDB } from "@/supabase/supabase";

export const getSongs = async function getSongs() {
    /* Listando as músicas */
    /* ok */
    let { data, error } = await sbDB.from("Songs").select("id_song,title_song,url_song,times_played,Composers(id_composer,name_composer,image_composer),Categories(id_category,title_category)");
    if (error) return console.error(error.message);
    return data;
};

export async function getRecents() {
    /* Listando as músicas */
    /* ok */
    let { data, error } = await sbDB.from("Songs").select("id_song,title_song,Composers(id_composer,name_composer)").order("created_at", { ascending: false }).limit(4);
    if (error) return console.error(error.message);
    return data;
};

export async function getTimesPlayedBySongId(id) {
    const { data, error } = await sbDB
        .from('Songs').select("times_played").eq("id_song", id);
    if (error) return console.error(error.message);
    return data[0].times_played;
}
export async function getTimesPlayedByCategoryId(id) {
    const { data, error } = await sbDB
        .from('Categories').select("most_listening").eq("id_category", id);
    if (error) return console.error(error.message);
    return data[0].most_listening;
}
export async function getArtists() {
    /* ok */
    let { data, error } = await sbDB.from("Composers").select("id_composer,name_composer,image_composer,Songs(*)");
    if (error) return console.error(error.message);
    return data;
}
export async function getArtistsByCategory() {
    /* ok */
    let { data, error } = await sbDB.from("Categories").select("id_category,title_category,Composers(id_composer,name_composer,image_composer)").order("most_listening", { ascending: false });
    if (error) return console.error(error.message);
    return data;
}
export async function updateTimesPlayed(data) {
    /* ok */
    const { Song: { currentSongId, countSong } } = data;
    const { Category: { currentCategoryId, countCategory } } = data;
    const song = await sbDB
        .from('Songs').update({ times_played: countSong }).eq("id_song", currentSongId);
    const category = await sbDB.from("Categories").update({ most_listening: countCategory }).eq("id_category", currentCategoryId);

    if (song.error || category.error) {
        console.error({ Song: song.error.message, Category: category.error.message })
        return false;
    };

    return true;
}

export async function getAllCategories() {
    let { data, error } = await sbDB.from("Categories").select("id_category,title_category,Composers(id_composer,name_composer,image_composer)");
    if (error) return console.error(error.message);
    return data;
}




