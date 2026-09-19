import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {StudentRepository} from "../../../../auto_generated_api/repositories/manager_functional/student/student_repository";
import {ManagerGroupsWithStudentsResponse, ManagerStudentsResponse} from "../../../../auto_generated_api/repositories/manager_functional/student/models";
import {GroupsRepository} from "../../../../auto_generated_api/repositories/manager_functional/groups/groups_repository";
import {Scroll} from "../../../components/Primitives/Scroll";
import {Column} from "../../../components/Primitives/Column/Column";
import {Row} from "../../../components/Primitives/Row/Row";
import {RowElement} from "../../../components/Primitives/Row/RowElement";
import {XWindow} from "../../../components/XWindow";
import {XText} from "../../../components/Primitives/Text";
import {Border} from "../../../components/Primitives/Border";
import {Background} from "../../../components/Primitives/Background";
import {Center} from "../../../components/Primitives/Center";
import {Clickable} from "../../../components/Primitives/Clickable";
import {Padding} from "../../../components/Primitives/Padding";
import {Table, TableColumn} from "../../../components/Table/Table";
import {RedBorderBox} from "../../../components/BorderBoxes/RedBorderBox";
import {Modal} from "../../../components/Modal";
import {Form} from "../../../components/Inputs/form/form";
import {SubmitButton} from "../../../components/Inputs/form/submit_button";
import {TextInput} from "../../../components/Inputs/simple_inputs/text_input";
import {EmailInput} from "../../../components/Inputs/simple_inputs/email_input";
import {PhoneInput} from "../../../components/Inputs/simple_inputs/phone_input";
import {InputRef} from "../../../components/Inputs/base/Input_ref";
import {Colors} from "../../../style/colors";
import {FontSizes, Spacings} from "../../../style/spacings";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import {MdDeleteForever} from "@react-icons/all-files/md/MdDeleteForever";

export const StudentsAll: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [groups, setGroups] = useState<ManagerGroupsWithStudentsResponse[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    const loadStudents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await StudentRepository.get();
            setGroups(data);
            setSelectedGroupId(prev =>
                prev && data.some(g => g.id === prev)
                    ? prev
                    : data[0]?.id ?? null
            );
        } catch {
            setError('Ошибка загрузки студентов');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    const selectedGroup = useMemo(
        () => groups.find(g => g.id === selectedGroupId) ?? null,
        [groups, selectedGroupId]
    );

    const handleDeleteGroup = async (group: ManagerGroupsWithStudentsResponse) => {
        if (!group.id) return;
        if (!window.confirm(`Удалить группу "${group.name}"?`)) return;
        try {
            //await GroupsRepository.delete(group.id);
            await loadStudents();
        } catch {
            setError('Ошибка удаления группы');
        }
    };

    if (loading) {
        return <Scroll>
            <XWindow title="Студенты">
                <XText align="center">Загрузка...</XText>
            </XWindow>
        </Scroll>;
    }

    return <Scroll>
        <Column gap={Spacings.L}>
            <XText fontWeight={700} size={FontSizes.XL} color={Colors.text}>
                Студенты
            </XText>

            {error && <RedBorderBox children={error}/>}

            <Row gap={Spacings.L}>
                {/* Левая колонка — группы */}
                <RowElement sizePercent={30}>
                    <XWindow title="Группы">
                        {groups.length === 0
                            ? <XText align="center">Нет групп</XText>
                            : <Column gap={Spacings.XS}>
                                {groups.map(group => (
                                    <GroupListItem
                                        key={group.id}
                                        group={group}
                                        isActive={group.id === selectedGroupId}
                                        onSelect={() => setSelectedGroupId(group.id)}
                                        onEditSaved={loadStudents}
                                        onDelete={() => handleDeleteGroup(group)}
                                    />
                                ))}
                            </Column>
                        }
                    </XWindow>
                </RowElement>

                {/* Правая колонка — студенты выбранной группы */}
                <RowElement sizePercent={70}>
                    {selectedGroup
                        ? <GroupStudentsWindow
                            group={selectedGroup}
                            onChanged={loadStudents}
                        />
                        : <XWindow title="Студенты">
                            <XText align="center">Выберите группу</XText>
                        </XWindow>
                    }
                </RowElement>
            </Row>
        </Column>
    </Scroll>;
};

/* ───────────────────── GroupListItem ───────────────────── */

const GroupListItem: React.FC<{
    group: ManagerGroupsWithStudentsResponse;
    isActive: boolean;
    onSelect: () => void;
    onEditSaved: () => void;
    onDelete: () => void;
}> = ({group, isActive, onSelect, onEditSaved, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);

    return <>
        <Border>
            <Background color={isActive ? Colors.mainBackground2 : "transparent"}
                        onMouseEnterColor={Colors.primaryBackground}>
                <Padding size={Spacings.XS}>
                    <Row gap={Spacings.XS}>
                        <RowElement sizePercent={70}>
                            <Clickable onClick={onSelect}>
                                <XText fontWeight={isActive ? 600 : 400}>
                                    {`${group.name} (${group.students.length})`}
                                </XText>
                            </Clickable>
                        </RowElement>
                        <RowElement sizePercent={15}>
                            <Clickable onClick={() => setIsEditing(true)}>
                                <XText align="center" color={Colors.text}>
                                    <AiOutlineEdit size={FontSizes.L}/>
                                </XText>
                            </Clickable>
                        </RowElement>
                        <RowElement sizePercent={15}>
                            <Clickable onClick={onDelete}>
                                <XText align="center" color={Colors.danger}>
                                    <MdDeleteForever size={FontSizes.L}/>
                                </XText>
                            </Clickable>
                        </RowElement>
                    </Row>
                </Padding>
            </Background>
        </Border>

        {isEditing && <GroupEditModal
            group={group}
            onClose={() => setIsEditing(false)}
            onSaved={() => {
                setIsEditing(false);
                onEditSaved();
            }}
        />}
    </>;
};

/* ───────────────────── GroupStudentsWindow ───────────────────── */

const GroupStudentsWindow: React.FC<{
    group: ManagerGroupsWithStudentsResponse;
    onChanged: () => void;
}> = ({group, onChanged}) => {
    const cell = (item: React.ReactNode, isHeader: boolean = true) => <Border>
        <Background color={isHeader ? Colors.mainBackground2 : "transparent"}>
            <Center>
                {item}
            </Center>
        </Background>
    </Border>;

    const columns: TableColumn<ManagerStudentsResponse>[] = [
        {
            header: cell("ФИО"),
            cell: {
                isSticky: true,
                builder: (s) => cell(
                    <XText>{`${s.lastName} ${s.firstName} ${s.patronymic}`}</XText>,
                    false)
            }
        },
        {
            header: cell("Email"),
            cell: {builder: (s) => cell(<XText>{s.email}</XText>, false)}
        },
        {
            header: cell("Телефон"),
            cell: {builder: (s) => cell(<XText>{s.phone}</XText>, false)}
        },
        {
            header: cell(""),
            cell: {
                builder: (s) => cell(<StudentActions student={s} onChanged={onChanged}/>, false)
            }
        },
    ];

    return <XWindow title={group.name}>
        {group.students.length === 0
            ? <XText align="center">В группе нет студентов</XText>
            : <Table columns={columns} items={group.students}/>
        }
    </XWindow>;
};

/* ───────────────────── StudentActions (внутри ячейки) ───────────────────── */

const StudentActions: React.FC<{
    student: ManagerStudentsResponse;
    onChanged: () => void;
}> = ({student, onChanged}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        if (!student.id) return;
        if (!window.confirm(`Удалить студента "${student.lastName} ${student.firstName}"?`)) return;
        //await StudentRepository.delete(student.id);
        onChanged();
    };

    return <>
        <Row gap={Spacings.XS}>
            <Clickable onClick={() => setIsEditing(true)}>
                <XText color={Colors.text}>
                    <AiOutlineEdit size={FontSizes.L}/>
                </XText>
            </Clickable>
            <Clickable onClick={handleDelete}>
                <XText color={Colors.danger}>
                    <MdDeleteForever size={FontSizes.L}/>
                </XText>
            </Clickable>
        </Row>

        {isEditing && <StudentEditModal
            student={student}
            onClose={() => setIsEditing(false)}
            onSaved={() => {
                setIsEditing(false);
                onChanged();
            }}
        />}
    </>;
};

/* ───────────────────── GroupEditModal ───────────────────── */

const GroupEditModal: React.FC<{
    group: ManagerGroupsWithStudentsResponse;
    onClose: () => void;
    onSaved: () => void;
}> = ({group, onClose, onSaved}) => {
    const [name, setName] = useState(group.name);
    const refs = {name: useRef<InputRef>(null)};

    const handleSave = async () => {
        if (!group.id) return;
        await GroupsRepository.put(group.id, {name});
        onSaved();
    };

    return <Modal title="Редактировать группу" onClose={onClose}>
        <Form handleSubmit={handleSave} refs={refs}>
            <Column gap={Spacings.L}>
                <TextInput
                    ref={refs.name}
                    label="Название группы"
                    isRequired
                    onValidChange={setName}
                />
                <SubmitButton buttonText="Сохранить"/>
            </Column>
        </Form>
    </Modal>;
};

/* ───────────────────── StudentEditModal ───────────────────── */

const StudentEditModal: React.FC<{
    student: ManagerStudentsResponse;
    onClose: () => void;
    onSaved: () => void;
}> = ({student, onClose, onSaved}) => {
    const [data, setData] = useState({
        firstName: student.firstName,
        lastName: student.lastName,
        patronymic: student.patronymic,
        email: student.email,
        phone: student.phone,
    });

    const refs = {
        lastName: useRef<InputRef>(null),
        firstName: useRef<InputRef>(null),
        patronymic: useRef<InputRef>(null),
        email: useRef<InputRef>(null),
        phone: useRef<InputRef>(null),
    };

    const handleSave = async () => {
        if (!student.id) return;
        //await StudentRepository.put(student.id, data);
        onSaved();
    };

    return <Modal title="Редактировать студента" onClose={onClose}>
        <Form handleSubmit={handleSave} refs={refs}>
            <Column gap={Spacings.L}>
                <TextInput ref={refs.lastName} label="Фамилия" isRequired
                           onValidChange={v => setData(p => ({...p, lastName: v}))}/>
                <TextInput ref={refs.firstName} label="Имя" isRequired
                           onValidChange={v => setData(p => ({...p, firstName: v}))}/>
                <TextInput ref={refs.patronymic} label="Отчество"
                           onValidChange={v => setData(p => ({...p, patronymic: v}))}/>
                <EmailInput ref={refs.email} isRequired
                            onValidChange={v => setData(p => ({...p, email: v}))}/>
                <PhoneInput ref={refs.phone} isRequired
                            onValidChange={v => setData(p => ({...p, phone: v}))}/>
                <SubmitButton buttonText="Сохранить"/>
            </Column>
        </Form>
    </Modal>;
};