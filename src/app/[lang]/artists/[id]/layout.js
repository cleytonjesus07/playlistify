import { decodeURL } from "@/functions/serverUtils/utils";
import { getAllArtists } from "../functions";


export async function generateMetadata({ params }) {
    const artists = await getAllArtists();
    const artistSelected = artists.filter(({ id }) => id === decodeURL(params.id.split("-")[0]))[0];
    const { name } = artistSelected;
    return {
        title: name
    }
}

export default function RootLayout({ children }) {
    return children
}