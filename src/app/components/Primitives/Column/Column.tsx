import React, {CSSProperties} from "react";
import {maxSize} from "../../../style/spacings";

export const Column: React.FC<{
    gap?: number;
    children?: React.ReactNode;
}> = (p) => {
    const style: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: p.gap ?? 0,
        justifyContent: p.gap || p.gap === 0 ? "left" : "space-between",
        ...maxSize
    };

    return <div style={style}>
        {p.children}
    </div>;
};