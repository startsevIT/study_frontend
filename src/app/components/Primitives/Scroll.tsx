import React, {CSSProperties} from "react";
import {maxSize} from "../../style/spacings";
import {Colors} from "../../style/colors";

export const Scroll: React.FC<{
    children: React.ReactNode
}> = (p) => {
    const style: CSSProperties = {
        overflow: "auto",
        position: "relative",
        // Для Firefox
        scrollbarWidth: "thin",
        scrollbarColor: `${Colors.scroll} transparent`,
        ...maxSize
    };

    return <div style={style}>
        {p.children}
    </div>
}