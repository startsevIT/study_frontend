import React from "react";

export const RowElement: React.FC<{
    sizePercent: number;
    children?: React.ReactNode,
}> = (p) =>
    <div style={{width: `${p.sizePercent}%`}}>
        {p.children}
    </div>

