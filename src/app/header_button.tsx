import React, {MouseEventHandler} from "react";
import {Background} from "./components/Primitives/Background";
import {Colors} from "./style/colors";
import {Clickable} from "./components/Primitives/Clickable";
import {Padding} from "./components/Primitives/Padding";
import {XText} from "./components/Primitives/Text";
import {Spacings} from "./style/spacings";


export const HeaderButton: React.FC<{
    id: string,
    onClick: MouseEventHandler,
    activeId: string,
    children: string,
}> = (p) => {
    return <div>
        <Background color={p.activeId === p.id ? Colors.primary : 'transparent'}
                    onMouseEnterColor={p.activeId === p.id ? Colors.primaryHover : Colors.secondaryHover}>
            <Clickable onClick={p.onClick}>
                <Padding size={Spacings.M}>
                    <XText align={"center"}>
                        {p.children}
                    </XText>
                </Padding>
            </Clickable>
        </Background>
    </div>;
}