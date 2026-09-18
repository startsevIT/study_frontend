import React from "react";
import {MainButtonProps} from "./MainButtonProps";
import {Border} from "../Primitives/Border";
import {Background} from "../Primitives/Background";
import {Padding} from "../Primitives/Padding";
import {XText} from "../Primitives/Text";
import {Clickable} from "../Primitives/Clickable";
import {Colors} from "../../style/colors";
import {maxSize} from "../../style/spacings";

export const SecondaryButton: React.FC<MainButtonProps> = (p) =>
    <div style={p.full ? maxSize : undefined}>
        <Border radius={6}>
            <Background color={Colors.secondary} onMouseEnterColor={Colors.secondaryHover}>
                <Clickable onClick={p.onClick}>
                    <Padding size={12}>
                        <XText size={12} fontWeight={500} align={"center"}>
                            {p.children}
                        </XText>
                    </Padding>
                </Clickable>
            </Background>
        </Border>
    </div>