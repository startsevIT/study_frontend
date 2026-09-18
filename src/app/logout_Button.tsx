import React from "react";
import {Background} from "./components/Primitives/Background";
import {Colors} from "./style/colors";
import {Clickable} from "./components/Primitives/Clickable";
import {Padding} from "./components/Primitives/Padding";
import {Spacings} from "./style/spacings";
import {XText} from "./components/Primitives/Text";

export const LogoutButton: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        window.location.href = '/';
    };

    return <div>
        <Background color={Colors.danger} onMouseEnterColor={Colors.dangerHover}>
            <Clickable onClick={handleLogout}>
                <Padding size={Spacings.M}>
                    <XText align={"center"}>
                        Выйти
                    </XText>
                </Padding>
            </Clickable>
        </Background>
    </div>
};