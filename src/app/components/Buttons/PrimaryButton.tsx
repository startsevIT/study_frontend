import React from "react";
import {MainButtonProps} from "./MainButtonProps";
import {Border} from "../Primitives/Border";
import {Background} from "../Primitives/Background";
import {Padding} from "../Primitives/Padding";
import {XText} from "../Primitives/Text";
import {Clickable} from "../Primitives/Clickable";
import {Colors} from "../../style/colors";
import {FontSizes, maxSize, Spacings} from "../../style/spacings";

export const PrimaryButton: React.FC<MainButtonProps> = (p) =>
    <div style={p.full ? maxSize : undefined}>
        <Border color={"transparent"} radius={6}>
            <Background color={Colors.primary} onMouseEnterColor={Colors.primaryHover}>
                <Clickable onClick={p.onClick}>
                    <Padding size={Spacings.M}>
                        <XText size={FontSizes.S} fontWeight={500} align={"center"}>
                            {p.children}
                        </XText>
                    </Padding>
                </Clickable>
            </Background>
        </Border>
    </div>
