import React from "react";
import {Page} from "../../components/Page";

export const HomePage: React.FC = () => {
    return <Page>
        Добрый день, {localStorage.getItem("fullName")}
    </Page>
}