import React from "react";
import {Border} from "../../../components/Primitives/Border";
import {Background} from "../../../components/Primitives/Background";
import {Colors} from "../../../style/colors";
import {Radiuses, Spacings} from "../../../style/spacings";
import {Padding} from "../../../components/Primitives/Padding";
import {Center} from "../../../components/Primitives/Center";

export const ScheduleHeader: React.FC<{ children: React.ReactNode }> = (p) =>
    <Border radius={Radiuses.XS}>
        <Background color={Colors.mainBackground2}>
            <Padding size={Spacings.XS}>
                <Center>
                    {p.children}
                </Center>
            </Padding>
        </Background>
    </Border>