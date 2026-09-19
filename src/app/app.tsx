import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./layout";
import {pages} from "./pages";
import {LoginPage} from "./pages/login";
import {setAuthTokenProvider} from "../auto_generated_api/http";

export const App: React.FC = () => {
    const token = localStorage.getItem('token');
    setAuthTokenProvider(() => token)
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    return <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        {pages.map(p => (
            <Route
                key={p.id}
                path={`/${p.id}`}
                element={
                    !token ? <Navigate to="/login"/> :
                        !roles.some((r: string) => p.roles.includes(r)) ? <Navigate to="/home"/> :
                            <Layout>{p.page}</Layout>
                }
            />
        ))}
        <Route path="*" element={<Navigate to="/home"/>}/>
    </Routes>;
};