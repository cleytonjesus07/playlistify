import { tv } from "tailwind-variants";

export const card = tv({
    slots: {
        container: 'from-[#1e1e1e] relative flex flex-col to-transparent hover:bg-gradient-to-t transition-colors ease-in-out cursor-pointer p-2 rounded-md ',
        containerImage: 'p-2',
        image: 'w-52 h-52 rounded-full relative overflow-hidden',
        containerDesc: 'py-4 flex flex-col',
        artistName: 'font-extrabold text-[#fff] tracking-wide'
    },
    variants: {
        square_rounded: {
            true: {
                image: 'rounded-md'
            }
        }
    }
})