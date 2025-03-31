"use client";

import Atropos from 'atropos/react';
import { AtroposOptions } from "atropos";

interface Props extends AtroposOptions {
    className?: string
    children?: React.ReactNode;
}
export const ImageParallax = (props: Props) => 
    <Atropos
        {...props}
    />
