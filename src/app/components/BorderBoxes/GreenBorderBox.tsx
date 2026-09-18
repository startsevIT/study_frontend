import React from "react";
import {BorderBox} from "./BorderBox";
import {Colors} from "../../style/colors";

export const GreenBorderBox: React.FC<{ children: React.ReactNode, inline? : boolean }> = (p) =>
    <BorderBox
        backgroundColor={Colors.successBackground}
        borderColor={Colors.successBorder}
        children={p.children}
        inline={p.inline}
    />