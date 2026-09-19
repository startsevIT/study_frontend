import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TeacherRepository } from '../../../../auto_generated_api/repositories/manager_functional/teacher/teacher_repository';
import { ManagerTeachersResponse } from '../../../../auto_generated_api/repositories/manager_functional/teacher/models';
import { Scroll } from '../../../components/Primitives/Scroll';
import { Column } from '../../../components/Primitives/Column/Column';
import { XWindow } from '../../../components/XWindow';
import { XText } from '../../../components/Primitives/Text';
import { Border } from '../../../components/Primitives/Border';
import { Background } from '../../../components/Primitives/Background';
import { Center } from '../../../components/Primitives/Center';
import { Clickable } from '../../../components/Primitives/Clickable';
import { Row } from '../../../components/Primitives/Row/Row';
import { Table, TableColumn } from '../../../components/Table/Table';
import { RedBorderBox } from '../../../components/BorderBoxes/RedBorderBox';
import { Modal } from '../../../components/Modal';
import { Form } from '../../../components/Inputs/form/form';
import { SubmitButton } from '../../../components/Inputs/form/submit_button';
import { TextInput } from '../../../components/Inputs/simple_inputs/text_input';
import { EmailInput } from '../../../components/Inputs/simple_inputs/email_input';
import { PhoneInput } from '../../../components/Inputs/simple_inputs/phone_input';
import { InputRef } from '../../../components/Inputs/base/Input_ref';
import { Colors } from '../../../style/colors';
import { FontSizes, Spacings } from '../../../style/spacings';
import { AiOutlineEdit } from '@react-icons/all-files/ai/AiOutlineEdit';
import { MdDeleteForever } from '@react-icons/all-files/md/MdDeleteForever';

export const TeachersAll: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [teachers, setTeachers] = useState<ManagerTeachersResponse[]>([]);

    const loadTeachers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setTeachers(await TeacherRepository.get());
        } catch {
            setError('Ошибка загрузки преподавателей');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTeachers();
    }, [loadTeachers]);

    if (loading) {
        return <Scroll>
            <XWindow title="Преподаватели">
                <XText align="center">Загрузка...</XText>
            </XWindow>
        </Scroll>;
    }

    if (error) {
        return <Scroll>
            <XWindow title="Преподаватели">
                <RedBorderBox children={error}/>
            </XWindow>
        </Scroll>;
    }

    const cell = (item: React.ReactNode, isHeader: boolean = true) => <Border>
        <Background color={isHeader ? Colors.mainBackground2 : 'transparent'}>
            <Center>{item}</Center>
        </Background>
    </Border>;

    const columns: TableColumn<ManagerTeachersResponse>[] = [
        {
            header: cell('ФИО'),
            cell: {
                isSticky: true,
                builder: (t) => cell(
                    <XText>{`${t.lastName} ${t.firstName} ${t.patronymic}`}</XText>,
                    false)
            }
        },
        {
            header: cell('Email'),
            cell: { builder: (t) => cell(<XText>{t.email}</XText>, false) }
        },
        {
            header: cell('Телефон'),
            cell: { builder: (t) => cell(<XText>{t.phone}</XText>, false) }
        },
        {
            header: cell('Дисциплины'),
            cell: {
                builder: (t) => cell(
                    <XText>
                        {t.disciplines.length === 0
                            ? '—'
                            : t.disciplines.map(d => d.name).join(', ')}
                    </XText>,
                    false)
            }
        },
        {
            header: cell(''),
            cell: {
                builder: (t) => cell(<TeacherActions teacher={t} onChanged={loadTeachers}/>, false)
            }
        },
    ];

    return <Scroll>
        <Column gap={Spacings.L}>
            <XText fontWeight={700} size={FontSizes.XL} color={Colors.text}>
                Преподаватели
            </XText>

            {teachers.length === 0
                ? <XWindow title="Преподаватели">
                    <XText align="center">Нет преподавателей</XText>
                </XWindow>
                : <XWindow title={`Все преподаватели (${teachers.length})`}>
                    <Table columns={columns} items={teachers}/>
                </XWindow>
            }
        </Column>
    </Scroll>;
};

const TeacherActions: React.FC<{
    teacher: ManagerTeachersResponse;
    onChanged: () => void;
}> = ({ teacher, onChanged }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        if (!teacher.id) return;
        if (!window.confirm(`Удалить преподавателя "${teacher.lastName} ${teacher.firstName}"?`)) return;
        //await TeacherRepository.delete(teacher.id);
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

        {isEditing && <TeacherEditModal
            teacher={teacher}
            onClose={() => setIsEditing(false)}
            onSaved={() => {
                setIsEditing(false);
                onChanged();
            }}
        />}
    </>;
};

const TeacherEditModal: React.FC<{
    teacher: ManagerTeachersResponse;
    onClose: () => void;
    onSaved: () => void;
}> = ({ teacher, onClose, onSaved }) => {
    const [data, setData] = useState({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        patronymic: teacher.patronymic,
        email: teacher.email,
        phone: teacher.phone,
    });

    const refs = {
        lastName: useRef<InputRef>(null),
        firstName: useRef<InputRef>(null),
        patronymic: useRef<InputRef>(null),
        email: useRef<InputRef>(null),
        phone: useRef<InputRef>(null),
    };

    const handleSave = async () => {
        if (!teacher.id) return;
        //await TeacherRepository.put(teacher.id, data);
        onSaved();
    };

    return <Modal title="Редактировать преподавателя" onClose={onClose}>
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