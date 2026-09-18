import React, {FC} from "react";
import {Colors} from "../../../style/colors";
import {Radiuses, Spacings} from "../../../style/spacings";

export const InputFieldWrapper: FC<{
    isError: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}> = (p) => {
    const containerStyle = {
        display: "flex",
        justifyContent: "space-between",
        gap: 10,
        border: `1px solid ${p.isError ? Colors.danger : Colors.border}`,
        borderRadius: Radiuses.S,
        padding: `${Spacings.XS}px ${Spacings.S}px`,
        cursor: "text",
        backgroundColor: p.isError ? Colors.dangerBackground : "white",
    }

    return <div style={containerStyle} onClick={p.onClick}>
        {p.children}
    </div>;
}