import React from "react";
import {BorderBox} from "./BorderBox";
import {Colors} from "../../style/colors";

export const GrayBorderBox: React.FC<{ children: React.ReactNode, inline? : boolean }> = (p) =>
    <BorderBox
        backgroundColor={Colors.secondary}
        borderColor={Colors.secondaryBackground}
        children={p.children}
        inline={p.inline}
    />

