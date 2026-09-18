import React from "react";
import {ManagerPage} from "./pages/registrations/ManagerPage";
import {HomePage} from "./pages/home/HomePage";
import {SchedulePage} from "./pages/schedule_editor/SchedulePage";

export class PageProps {
    public page: React.ReactNode;
    public id: string;
    public roles: string[];
    public label: string;

    constructor(page: React.ReactNode, id: string, label: string, roles: string[] = []) {
        this.id = id;
        this.roles = ['Admin', 'Manager', ...roles];
        this.label = label;
        this.page = page;
    }
}

export const pages: PageProps[] = [
    new PageProps(<HomePage/>, "home", "Главная"),
    new PageProps(<SchedulePage/>, "schedule", "Расписание"),
    new PageProps(<ManagerPage/>, "manager", "Менеджмент"),
];