import React, {CSSProperties, FC} from "react";
import {FontSizes} from "../../../style/spacings";
import {Colors} from "../../../style/colors";

export const InputWrapper: FC<{
    label: string;
    isRequired?: boolean;
    error?: string;
    children: React.ReactNode;
}> = (p) => {

    const containerStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column"
    }

    const labelStyle: CSSProperties = {
        fontSize: FontSizes.S,
        fontWeight: 500,
        gap: 4,
        display: "flex",
    }

    const spanStyle: CSSProperties = {
        color: Colors.danger
    }

    return <div style={containerStyle}>
        <label style={labelStyle}>
            {p.label}
            {p.isRequired && <span style={spanStyle}>*</span>}
            {p.error && <span style={spanStyle}>{p.error}</span>}
        </label>
        {p.children}
    </div>
}