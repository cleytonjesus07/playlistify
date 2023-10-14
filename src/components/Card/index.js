import Container from "../Container";
import Image from "next/image";
export default function Card({ container_className, title_className, name, avatar }) {

    return (
        <Container className={container_className}>
            <div className="relative bg-senary-color w-36 h-28 my-2">
                <Image priority={true} alt={name} src={avatar} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover object-center" />
            </div>
            <div className={title_className}>
                {name}
            </div>
        </Container>
    )
}