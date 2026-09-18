import React, {CSSProperties} from "react";
import {Background} from "./Primitives/Background";
import {Center} from "./Primitives/Center";

export const Overlay: React.FC<{
    onClick?: () => void;
    children?: React.ReactNode;
}> = (p) => {
    const style: CSSProperties = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 999, //todo const z_index
    };

    return <div style={style} onClick={p.onClick}>
        <Background color={'rgba(0,0,0,0.5)'}>
            <Center>
                {p.children}
            </Center>
        </Background>
    </div>
}