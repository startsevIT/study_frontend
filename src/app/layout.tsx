import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {pages} from "./pages";
import {Colors} from "./style/colors";
import {Row} from "./components/Primitives/Row/Row";
import {Header} from "./header";


export const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    const menuItems = pages.filter(x => roles.some((r: string) => x.roles.includes(r)));
    const activeId = pages.find(x => location.pathname === `/${x.id}`)?.id ?? 'home';

    const handleSelect = (id: string) => {
        const item = menuItems.find(m => m.id === id);
        if (item) navigate(`/${item.id}`);
    };

    return <div style={{height: '100vh', width: '100vw', background: Colors.mainBackground}}>
        <Row>
            <Header items={menuItems} activeId={activeId} onSelect={handleSelect}/>
            {children}
        </Row>
    </div>;
};