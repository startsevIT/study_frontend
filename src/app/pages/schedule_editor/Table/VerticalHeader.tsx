import React from "react";
import {Border} from "../../../components/Primitives/Border";
import {Radiuses} from "../../../style/spacings";
import {Background} from "../../../components/Primitives/Background";
import {Colors} from "../../../style/colors";
import {Center} from "../../../components/Primitives/Center";

export const VerticalHeader: React.FC<{ height: string, children: React.ReactNode }> = (p) =>
    <Border radius={Radiuses.XS}>
        <Background color={Colors.mainBackground2} onMouseEnterColor={Colors.primaryHover}>
            <div style={{
                width: "100%",
                height: p.height,
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)'
            }}>
                <Center>
                    {p.children}
                </Center>
            </div>
        </Background>
    </Border>