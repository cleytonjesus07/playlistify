"use client"
import { useState } from "react";
import AsideMenu from "../AsideMenu";
import { ImMenu } from "react-icons/im";
export default function ContainerMenu() {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(true)} className="md:hidden bg-senary-color p-5 fixed z-50 m-2 rounded-full">
                <ImMenu className=" text-white" />
            </button>
            <div className={`max-w-xs w-52 p-5 ${!show && "max-md:hidden"}`}>
                <AsideMenu setShow={setShow} />
            </div>
        </>
    )
}