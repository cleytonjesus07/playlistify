import { decodeURL } from "@/functions/serverUtils/utils";
import { getCategories } from "../functions";


export async function generateMetadata({ params }) {
    const artistsByCategories = await getCategories();
    const category = artistsByCategories.filter(({ Category }) => Category.title === decodeURL(params.slug))[0];
    const { title } = category.Category;
    return {
        title
    }
}

export default function RootLayout({ children }) {
    return children
}