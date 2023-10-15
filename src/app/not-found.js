import Link from "next/link";

export default function NotFound() {
    return (
        <div className="fixed bg-tertiary-color top-0 right-0 left-0 bottom-0 z-50 flex flex-col gap-2 justify-center items-center">
            <h1 className="text-senary-color">Página não encontrada!</h1>
            <Link href="/" className="text-tertiary-color bg-senary-color py-2 px-4 rounded-md opacity-60 hover:opacity-100 transition-all ease-in-out">Voltar para o ínicio</Link>
        </div>
    )
}