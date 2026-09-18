import React, {CSSProperties} from "react";
import {maxSize} from "../../style/spacings";

export const Center: React.FC<{
    children?: React.ReactNode
}> = (p) => {
    const style: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...maxSize
    }

    return <div style={style}>
        {p.children}
    </div>
}