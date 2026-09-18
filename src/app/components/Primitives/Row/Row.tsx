import React, {CSSProperties} from "react";

export const Row: React.FC<{
    gap?: number;
    full?: boolean;
    children?: React.ReactNode,
}> = (p) => {
    const style: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        gap: p.gap ?? 0,
        justifyContent: p.gap ? "left" : "space-between",
        width: (p.full ?? true) ? "100%" : "auto",
        height: "100%",
    };

    return <div style={style}>
        {p.children}
    </div>;
}