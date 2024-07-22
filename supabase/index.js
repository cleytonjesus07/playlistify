import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.supabase_url, process.env.supabase_key);

export async function getComposer(id) {
    let { data } = await supabase.from("Composers").select("name_composer").eq("id_composer", id).single();
    return data;
}
export async function getAllComposers() {
    let { data: allComposers } = await supabase.from("get_all_composers").select("*");
    return allComposers;
}
export async function getRandomComposers() {
    let { data: randomComposers } = await supabase.from("random_composers").select("*");
    return randomComposers;
}
export async function getCategory(id) {
    let { data: { title_category } } = await supabase.from("Categories").select("title_category").eq("id_category", id).single();
    return title_category;
}
export async function getAllCategories() {
    let { data: allCategories } = await supabase.from("get_all_categories").select("*");
    return allCategories;
}
export async function getRandomCategories() {
    let { data: randomCategories } = await supabase.from("five_categories_and_songs").select("*");

    // Objeto para armazenar os resultados agrupados
    const groupedData = randomCategories.reduce((acc, obj) => {
        const key = obj.title_category;

        // Verifica se já existe um array para essa categoria, se não, cria um novo
        if (!acc[key]) {
            acc[key] = [];
        }

        // Adiciona o objeto atual ao array correspondente à categoria
        acc[key].push(obj);

        return acc;
    }, {});

    return groupedData;
}
export async function getSongsByCategory(categoryId) {
    let { data: allSongsByCategory } = await supabase.from("Songs").select("id_song,title_song,Composers(id_composer,image_composer)").eq("id_category", categoryId);
    let { data: categoryName } = await supabase.from("Categories").select("title_category").eq("id_category", categoryId);
    return { categoryName: categoryName[0].title_category, allSongsByCategory };
}
export async function getSongsByComposer(composerId) {
    let { data } = await supabase.from("Composers").select("id_composer,name_composer,image_composer,Songs(id_song,title_song,url_song)").eq("id_composer", composerId).single();
    return data;
}
export async function getSixSongsOfTheWeek() {
    let { data: sixSongsOfTheWeek } = await supabase.from("random_six_songs").select("*,Composers(name_composer,image_composer)");
    return sixSongsOfTheWeek;

}




