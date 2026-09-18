import React from "react";

export const ColumnElement: React.FC<{
    sizePercent: number;
    children: React.ReactNode;
}> = (p) =>
    <div style={{height: `${p.sizePercent}%`}}>
        {p.children}
    </div>;