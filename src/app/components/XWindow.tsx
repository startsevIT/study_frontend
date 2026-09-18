import React from "react";
import {Column} from "./Primitives/Column/Column";
import {XText} from "./Primitives/Text";
import {Colors} from "../style/colors";
import {FontSizes, Radiuses, Spacings} from "../style/spacings";

export const XWindow: React.FC<{
    title?: string
    children?: React.ReactNode,
}> = ({children, title}) => {
    const style = {
        background: Colors.secondaryBackground,
        padding: Spacings.XL,
        borderRadius: Radiuses.S,
    };

    return <div style={style}>
        <Column gap={Spacings.L}>
            {title && <XText size={FontSizes.L} fontWeight={500}>{title}</XText>}
            {children}
        </Column>
    </div>
}