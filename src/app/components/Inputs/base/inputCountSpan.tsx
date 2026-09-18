import React, {FC} from "react";
import {FontSizes, Radiuses, Spacings} from "../../../style/spacings";
import {Colors} from "../../../style/colors";

export const InputCountSpan: FC<{ count: number }> = (p) =>
    <span
        style={{
            width: 25,
            border: "1px solid gray",
            borderRadius: Radiuses.XS,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: FontSizes.S,
            backgroundColor: Colors.secondary,
            padding: `0px ${Spacings.S}px`,
        }}>
            <span style={{color: Colors.successHover}}>
                ✓
            </span>
        {p.count}
    </span>