import React, {CSSProperties} from "react";
import {maxSize} from "../../style/spacings";
import {Colors} from "../../style/colors";

export const Border: React.FC<{
    color?: string
    radius?: number
    children?: React.ReactNode,
}> = (p) => {
    const style: CSSProperties = {
        border: `1px solid ${p.color ?? Colors.border}`,
        borderRadius: `${p.radius ?? 0}px`,
        overflow: "hidden",
        ...maxSize
    }

    return <div style={style}>
        {p.children}
    </div>
}
