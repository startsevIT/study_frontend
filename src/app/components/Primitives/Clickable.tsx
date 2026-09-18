import React, {MouseEventHandler} from "react";
import {maxSize} from "../../style/spacings";

export const Clickable: React.FC<{
    onClick?: MouseEventHandler,
    onMouseDown?: MouseEventHandler,
    children?: React.ReactNode
    cursor?: "pointer" | "text"
}> = (p) =>
    <div onClick={p.onClick} onMouseDown={p.onMouseDown} style={{cursor: p.cursor ?? 'pointer', ...maxSize}}>
        {p.children}
    </div>
