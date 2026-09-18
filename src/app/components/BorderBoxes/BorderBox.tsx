import React from "react";
import {Border} from "../Primitives/Border";
import {Background} from "../Primitives/Background";
import {Padding} from "../Primitives/Padding";
import {XText} from "../Primitives/Text";
import {Center} from "../Primitives/Center";
import {Colors} from "../../style/colors";
import {FontSizes, Radiuses, Spacings} from "../../style/spacings";

export const BorderBox: React.FC<{
    backgroundColor: string,
    borderColor: string,
    children?: React.ReactNode,
    inline?: boolean,
}> = (p) =>
    <Border color={p.borderColor} radius={p.inline ? 0 : Radiuses.S}>
        <Background color={p.backgroundColor}>
            <Padding size={(p.inline ?? false) ? Spacings.Zero : Spacings.L}>
                <Center>
                    <XText size={FontSizes.S} color={Colors.text}>
                        {p.children}
                    </XText>
                </Center>
            </Padding>
        </Background>
    </Border>;

