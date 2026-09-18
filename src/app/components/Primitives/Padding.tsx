import React from "react";
import {maxSize} from "../../style/spacings";

export const Padding: React.FC<{
    size: string | number,
    children?: React.ReactNode
}> = (p) =>
    <div style={{padding: p.size, ...maxSize}}>
        {p.children}
    </div>

