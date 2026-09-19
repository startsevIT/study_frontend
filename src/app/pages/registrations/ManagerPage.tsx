import React, { MouseEventHandler, useState } from 'react';
import { Clickable } from '../../components/Primitives/Clickable';
import { Border } from '../../components/Primitives/Border';
import { Background } from '../../components/Primitives/Background';
import { Padding } from '../../components/Primitives/Padding';
import { XText } from '../../components/Primitives/Text';
import { Colors } from '../../style/colors';
import { StudentRegisterPage } from './Students/StudentRegisterPage';
import { TeacherRegisterPage } from './Teachers/TeacherRegisterPage';
import { Page } from '../../components/Page';
import { ColumnElement } from '../../components/Primitives/Column/ColumnElement';
import { XWindow } from '../../components/XWindow';
import { Row } from '../../components/Primitives/Row/Row';
import { Spacings, FontSizes } from '../../style/spacings';
import { StudentsAll } from './Students/students_all';
import { FaUserGraduate } from '@react-icons/all-files/fa/FaUserGraduate';
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher';
import { AiOutlinePlusCircle } from '@react-icons/all-files/ai/AiOutlinePlusCircle';
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList';
import {TeachersAll} from "./Teachers/teachers_all";

/* ───────────────────── SectionButton (верхний уровень) ───────────────────── */

const SectionButton: React.FC<{
    onClick: MouseEventHandler;
    isActive: boolean;
    icon: React.ReactNode;
    children: string;
}> = ({ onClick, isActive, icon, children }) => (
    <Clickable onClick={onClick}>
        <Background color={isActive ? Colors.primaryBackground : 'transparent'}
                    onMouseEnterColor={isActive ? Colors.primaryBackground : Colors.secondaryHover}>
            <Border radius={6} color="transparent">
                <Padding size={10}>
                    <Row gap={Spacings.XS}>
                        <XText color={isActive ? Colors.primary : Colors.text} size={FontSizes.M}>
                            {icon}
                        </XText>
                        <XText color={isActive ? Colors.primary : Colors.text}
                               fontWeight={isActive ? 600 : 400}
                               size={FontSizes.M}>
                            {children}
                        </XText>
                    </Row>
                </Padding>
            </Border>
        </Background>
    </Clickable>
);

/* ───────────────────── SubTabButton (внутри раздела) ───────────────────── */

const SubTabButton: React.FC<{
    onClick: MouseEventHandler;
    isActive: boolean;
    icon: React.ReactNode;
    children: string;
}> = ({ onClick, isActive, icon, children }) => (
    <Clickable onClick={onClick}>
        <Background color={isActive ? Colors.mainBackground2 : 'transparent'}
                    onMouseEnterColor={Colors.secondaryHover}>
            <Border radius={4} color="transparent">
                <Padding size={8}>
                    <Row gap={Spacings.XS}>
                        <XText color={isActive ? Colors.primary : Colors.text} size={FontSizes.S}>
                            {icon}
                        </XText>
                        <XText color={isActive ? Colors.primary : Colors.text}
                               fontWeight={isActive ? 500 : 400}
                               size={FontSizes.S}>
                            {children}
                        </XText>
                    </Row>
                </Padding>
            </Border>
        </Background>
    </Clickable>
);

/* ───────────────────── Типы вкладок ───────────────────── */

interface Section {
    id: string;
    label: string;
    icon: React.ReactNode;
    tabs: Tab[];
}

interface Tab {
    id: string;
    label: string;
    icon: React.ReactNode;
    component: React.ReactNode;
}

const sections: Section[] = [
    {
        id: 'students',
        label: 'Студенты',
        icon: <FaUserGraduate />,
        tabs: [
            {
                id: 'students_add',
                label: 'Добавить',
                icon: <AiOutlinePlusCircle />,
                component: <StudentRegisterPage />,
            },
            {
                id: 'students_all',
                label: 'Все студенты',
                icon: <AiOutlineUnorderedList />,
                component: <StudentsAll />,
            },
        ],
    },
    {
        id: 'teachers',
        label: 'Преподаватели',
        icon: <FaChalkboardTeacher />,
        tabs: [
            {
                id: 'teachers_add',
                label: 'Добавить',
                icon: <AiOutlinePlusCircle />,
                component: <TeacherRegisterPage />,
            },
            {
                id: 'teachers_all',
                label: 'Все преподаватели',
                icon: <AiOutlineUnorderedList />,
                component: <TeachersAll />,
            },
        ],
    },
];

export const ManagerPage: React.FC = () => {
    const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
    const [activeTabId, setActiveTabId] = useState(sections[0].tabs[0].id);

    const activeSection = sections.find(s => s.id === activeSectionId) ?? sections[0];
    const activeTab = activeSection.tabs.find(t => t.id === activeTabId) ?? activeSection.tabs[0];

    const handleSectionChange = (section: Section) => {
        setActiveSectionId(section.id);
        setActiveTabId(section.tabs[0].id);
    };

    return <Page>
        <ColumnElement sizePercent={15}>
            <XWindow>
                <Row gap={Spacings.S}>
                    {/* Основные разделы */}
                    {sections.map(section => (
                        <SectionButton
                            key={section.id}
                            onClick={() => handleSectionChange(section)}
                            isActive={activeSectionId === section.id}
                            icon={section.icon}
                        >
                            {section.label}
                        </SectionButton>
                    ))}

                    {/* Разделитель */}
                    {activeSection.tabs.length > 1 && (
                        <div style={{
                            width: 1,
                            alignSelf: 'stretch',
                            margin: `0 ${Spacings.XS}px`,
                            backgroundColor: Colors.border,
                        }}/>
                    )}

                    {/* Подвкладки активного раздела */}
                    {activeSection.tabs.length > 1 && activeSection.tabs.map(tab => (
                        <SubTabButton
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            isActive={activeTabId === tab.id}
                            icon={tab.icon}
                        >
                            {tab.label}
                        </SubTabButton>
                    ))}
                </Row>
            </XWindow>
        </ColumnElement>

        {activeTab.component}
    </Page>;
};