'use client'

import React from "react";
import images from "@/constants/images";
import Image from "next/image";
import { addBadge } from "./badge";

const Banquise = () => {
    return (<Image
        src={images.Banquise}
        alt="Animation de la banquise" 
        className="w-full h-auto shadow-lg"
        onLoad={() => addBadge('Retro')}
    />);
}

export default Banquise;