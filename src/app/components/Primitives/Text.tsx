import React, {CSSProperties} from "react";
import {FontSizes} from "../../style/spacings";
import {Colors} from "../../style/colors";

export const XText: React.FC<{
    color?: string
    size?: number
    fontWeight?: number
    align?: "left" | "center" | "right"
    children?: React.ReactNode,
}> = (p) => {
    const style: CSSProperties = {
        fontSize: p.size ?? FontSizes.M,
        color: p.color ?? Colors.text,
        fontWeight: p.fontWeight ?? 'normal',
        display: "flex",
        gap: 4,
        justifyContent: p.align ?? "left",
        alignItems: p.align ?? "left",
        alignContent: p.align ?? "left",
        textAlign: p.align ?? "left",
    };

    return <span style={style}>
        {p.children}
    </span>;
}