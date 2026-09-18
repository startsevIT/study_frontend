import React from "react";
import {maxSize} from "../../style/spacings";

export const Background: React.FC<{
    color: string
    onMouseEnterColor?: string
    children?: React.ReactNode,
}> = (p) => {
    const onMouseEnter = (e: React.MouseEvent<HTMLElement>) =>
        e.currentTarget.style.background = p.onMouseEnterColor ?? p.color;

    const onMouseLeave = (e: React.MouseEvent<HTMLElement>) =>
        e.currentTarget.style.background = p.color;

    const style = {background: p.color, ...maxSize};

    return <div style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {p.children}
    </div>;
}

