import React from "react";
import {Padding} from "../Primitives/Padding";
import {XText} from "../Primitives/Text";
import {Background} from "../Primitives/Background";
import {Border} from "../Primitives/Border";
import {Colors} from "../../style/colors";
import {maxSize} from "../../style/spacings";

export const SubmitButton: React.FC<{ buttonText: string }> = (p) =>
    <Border color={"transparent"} radius={6}>
        <Background color={Colors.primary} onMouseEnterColor={Colors.primaryHover}>
            <button style={maxSize} type="submit">
                <Padding size={12}>
                    <XText size={12} fontWeight={500} color={Colors.text} align={"center"}>
                        {p.buttonText}
                    </XText>
                </Padding>
            </button>
        </Background>
    </Border>