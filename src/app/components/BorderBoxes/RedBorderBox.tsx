import React from "react";
import {BorderBox} from "./BorderBox";
import {Colors} from "../../style/colors";

export const RedBorderBox: React.FC<{ children: React.ReactNode, inline? : boolean }> = (p) =>
    <BorderBox
        backgroundColor={Colors.dangerBackground}
        borderColor={Colors.dangerBorder}
        children={p.children}
        inline={p.inline}
    />