import React, {CSSProperties, useState} from "react";
import {PageProps} from "./pages";
import {Colors} from "./style/colors";
import {Background} from "./components/Primitives/Background";
import {Clickable} from "./components/Primitives/Clickable";
import {XText} from "./components/Primitives/Text";
import {Overlay} from "./components/Overlay";
import {Column} from "./components/Primitives/Column/Column";
import {Spacings} from "./style/spacings";
import {HeaderButton} from "./header_button";
import {LogoutButton} from "./logout_Button";
import {AiOutlineMenuUnfold} from "@react-icons/all-files/ai/AiOutlineMenuUnfold";


export const Header: React.FC<{
    items: PageProps[];
    activeId: string;
    onSelect: (id: string) => void;
}> = ({items, activeId, onSelect}) => {
    const [isOpen, setIsOpen] = useState(true);

    const burgerStyle: CSSProperties = {
        position: 'fixed',
        top: 5,
        left: 0,
        zIndex: 999,
        overflow: 'hidden',
        border: `1px solid ${Colors.border}`,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        display: isOpen ? 'none' : 'block',
    };

    const headerStyle: CSSProperties = {
        height: '100vh',
        borderRight: `1px solid ${Colors.border}`,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        background: Colors.secondaryBackground,
        boxShadow: '0 4px 12px rgba(0,0,0,1)',
        transition: 'transform 0.3s ease',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    };

    return <>
        <div style={burgerStyle}>
            <Background color={Colors.secondaryBackground} onMouseEnterColor={Colors.secondaryHover}>
                <Clickable onClick={() => setIsOpen(true)}>
                    <XText align={"center"}>
                        <AiOutlineMenuUnfold/>
                    </XText>
                </Clickable>
            </Background>
        </div>

        {isOpen && <Overlay onClick={() => setIsOpen(false)}/>}

        <div style={headerStyle}>
            <Background color={Colors.secondaryBackground}>
                <Column>
                    <Column gap={Spacings.S}>
                        <div>
                            <XText color={Colors.text} fontWeight={900} size={20} align="center">
                                STAR.STUDY
                            </XText>
                            <XText color={Colors.text} fontWeight={500} size={12} align="center">
                                BackOffice
                            </XText>
                        </div>
                        <Column gap={Spacings.Zero}>
                            {items.map(item => (
                                <HeaderButton
                                    key={item.id}
                                    id={item.id}
                                    activeId={activeId}
                                    onClick={() => {
                                        onSelect(item.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.label}
                                </HeaderButton>
                            ))}
                        </Column>
                    </Column>
                    <LogoutButton/>
                </Column>
            </Background>
        </div>
    </>;
};