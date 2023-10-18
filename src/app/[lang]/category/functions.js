import { getAllCategories } from "@/functions/api";


export async function getCategories() {
    const res1 = await getAllCategories();

    const categories = res1.map(({ id_category, title_category, Composers }) => ({
        Category: {
            id: id_category,
            title: title_category,
            Artist: Composers.map(({ id_composer, name_composer, image_composer }) => (
                {
                    id: id_composer,
                    avatar: image_composer,
                    name: name_composer
                }
            ))
        }
    })) || null;

    return categories;
}
