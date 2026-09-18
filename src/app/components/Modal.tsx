import React from "react";
import {Column} from "./Primitives/Column/Column";
import {IoMdCloseCircle} from "@react-icons/all-files/io/IoMdCloseCircle";
import {Overlay} from "./Overlay";
import {XText} from "./Primitives/Text";
import {Row} from "./Primitives/Row/Row";
import {Border} from "./Primitives/Border";
import {Padding} from "./Primitives/Padding";
import {Background} from "./Primitives/Background";
import {RowElement} from "./Primitives/Row/RowElement";
import {Center} from "./Primitives/Center";
import {Clickable} from "./Primitives/Clickable";
import {Spacings} from "../style/spacings";
import {Colors} from "../style/colors";

export const Modal: React.FC<{
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}> = (p) =>
    <Overlay onClick={p.onClose}>
        <div style={{width: 450, boxShadow: '0 4px 12px rgba(0,0,0,1)'}} onClick={e => e.stopPropagation()}>
            <Border radius={8}>
                <Background color={Colors.secondaryBackground}>
                    <Padding size={Spacings.L}>
                        <Column gap={Spacings.L}>
                            <Row>
                                <RowElement sizePercent={90}>
                                    <Center>
                                        <XText color={Colors.text} fontWeight={500} size={20}>
                                            {p.title}
                                        </XText>
                                    </Center>
                                </RowElement>
                                <RowElement sizePercent={10}>
                                    <Clickable onClick={p.onClose}>
                                        <XText size={24} fontWeight={500} align={"center"}>
                                            <IoMdCloseCircle/>
                                        </XText>
                                    </Clickable>
                                </RowElement>
                            </Row>
                            {p.children}
                        </Column>
                    </Padding>
                </Background>
            </Border>
        </div>
    </Overlay>;

