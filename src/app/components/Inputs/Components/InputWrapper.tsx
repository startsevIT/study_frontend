import React from "react";
import {XText} from "../../Primitives/Text";
import {Border} from "../../Primitives/Border";
import {Background} from "../../Primitives/Background";
import {Padding} from "../../Primitives/Padding";
import {FontSizes, Radiuses, Spacings} from "../../../style/spacings";
import {Colors} from "../../../style/colors";

export const InputLabel: React.FC<{
    children?: string;
    isRequired?: boolean;
    error?: string;
}> = (p) =>
    <XText size={FontSizes.S} fontWeight={500} color={Colors.text}>
        {p.children}
        {p.isRequired && <XText size={FontSizes.S} color={Colors.danger}>*</XText>}
        {p.error && <XText size={FontSizes.S} color={Colors.danger}>{p.error}</XText>}
    </XText>

export const InputWrapper: React.FC<{
    isError?: boolean;
    children?: React.ReactNode;
}> = (p) =>
    <Border radius={Radiuses.S} color={p.isError ? Colors.danger : Colors.border}>
        <Background color={p.isError ? Colors.dangerBackground : "white"}>
            <Padding size={`${Spacings.S}px ${Spacings.S}px`}>
                {p.children}
            </Padding>
        </Background>
    </Border>