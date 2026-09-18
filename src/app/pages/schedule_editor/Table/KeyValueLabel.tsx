import React from "react";
import {XText} from "../../../components/Primitives/Text";
import {Colors} from "../../../style/colors";

export const KeyValueLabel: React.FC<{ key: string, value: string | number }> = (p) => <XText color={Colors.secondaryText}>
    {p.key} <strong>{p.value}</strong>
</XText>