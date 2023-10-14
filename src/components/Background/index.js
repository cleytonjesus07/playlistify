"use client"
import "@/components/Background/style.css"
import { useCurrentSong } from "@/store/currentSong";
import { useEffect, useState } from "react";
import SiriWave from "siriwave"
export default function Cloud() {
    useEffect(() => {
        new SiriWave({
            container: document.getElementById("bg"),
            color: "#61567d",
            autostart: true,
            speed: 0.01
        });
    }, [])

    return <div id="bg"></div>
}