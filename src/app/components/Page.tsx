import React from "react";
import {Column} from "./Primitives/Column/Column";
import {Spacings} from "../style/spacings";
import {Colors} from "../style/colors";

export const Page: React.FC<{ children?: React.ReactNode; }> = (p) =>
    <div style={{background: Colors.mainBackground, padding: Spacings.XL, height: '100vh', width: "100vw"}}>
        <Column gap={Spacings.XL}>
            {p.children}
        </Column>
    </div>

