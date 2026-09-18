import React from "react";
import {BorderBox} from "./BorderBox";
import {Colors} from "../../style/colors";

export const BlueBorderBox: React.FC<
    { children: React.ReactNode, inline?: boolean }> = (p) =>
    <BorderBox
        backgroundColor={Colors.primaryBackground}
        borderColor={Colors.primaryBorder}
        children={p.children}
        inline={p.inline}
    />
