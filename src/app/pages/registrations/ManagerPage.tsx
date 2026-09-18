import React, {MouseEventHandler, useState} from "react";
import {Clickable} from "../../components/Primitives/Clickable";
import {Border} from "../../components/Primitives/Border";
import {Background} from "../../components/Primitives/Background";
import {Padding} from "../../components/Primitives/Padding";
import {XText} from "../../components/Primitives/Text";
import {Colors} from "../../style/colors";
import {StudentRegisterPage} from "./Students/StudentRegisterPage";
import {TeacherRegisterPage} from "./Teachers/TeacherRegisterPage";
import {Page} from "../../components/Page";
import {ColumnElement} from "../../components/Primitives/Column/ColumnElement";
import {XWindow} from "../../components/XWindow";
import {Row} from "../../components/Primitives/Row/Row";
import {Spacings} from "../../style/spacings";

const TabButton: React.FC<{
    onClick: MouseEventHandler,
    isActive: Boolean,
    children: string,
}> = (p) =>
    <div>
        <Clickable onClick={p.onClick}>
            <Border radius={6} color="transparent">
                <Background color={p.isActive ? Colors.primaryBackground : 'transparent'}>
                    <Padding size={10}>
                        <XText size={14} color={p.isActive ? Colors.primary : Colors.text} fontWeight={p.isActive ? 500 : 400}>
                            {p.children}
                        </XText>
                    </Padding>
                </Background>
            </Border>
        </Clickable>
    </div>

interface Tab {
    id: string;
    label: string;
    component: React.ReactNode;
}

const tabs: Tab[] = [
    {id: "students", label: "Студенты", component: <StudentRegisterPage/>},
    {id: "teachers", label: "Преподаватели", component: <TeacherRegisterPage/>},
];

export const ManagerPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

    return <Page>
        <ColumnElement sizePercent={15}>
            <XWindow>
                <Row gap={Spacings.S}>
                    {tabs.map(t =>
                        <TabButton onClick={() => setActiveTab(t.id)} isActive={activeTab === t.id}>
                            {t.label}
                        </TabButton>
                    )}
                </Row>
            </XWindow>
        </ColumnElement>
        {tabs.find(tab => tab.id === activeTab)?.component}
    </Page>;
};