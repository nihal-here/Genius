"use client";

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("07b0f186-4fd4-43c3-b91e-72df90da62b7")
    },[]);

    return null;
}