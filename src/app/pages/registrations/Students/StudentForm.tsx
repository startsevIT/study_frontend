import React, {useEffect, useRef, useState} from "react";
import {InputRef} from "../../../components/Inputs/Components/InputRef";
import {FormWindow} from "../../../components/Inputs/FormWindow";
import {Spacings} from "../../../style/spacings";
import {Row} from "../../../components/Primitives/Row/Row";
import {Column} from "../../../components/Primitives/Column/Column";
import {Input} from "../../../components/Inputs/Input";
import {Autocomplete} from "../../../components/Inputs/Autocomplete";
import {KeyValuePair} from "../../../components/Inputs/KeyValuePair";
import {StudentRegisterModel} from "../../../../auto_generated_api/repositories/manager_functional/student/models";
import {GroupsRepository} from "../../../../auto_generated_api/repositories/manager_functional/groups/groups_repository";
import {ManagerGroupResponse} from "../../../../auto_generated_api/repositories/manager_functional/groups/models";


export const StudentForm: React.FC<{ onAdd: (student: StudentRegisterModel) => void }> = ({onAdd}) => {
    const empty: StudentRegisterModel = {firstName: '', lastName: '', patronymic: '', email: '', phone: '', groupId: '',};
    const [formData, setFormData] = useState<StudentRegisterModel>(empty);
    const [groups, setGroups] = useState<ManagerGroupResponse[]>([]);

    const refs = {
        secondName: useRef<InputRef>(null),
        firstName: useRef<InputRef>(null),
        patronymic: useRef<InputRef>(null),
        groupId: useRef<InputRef>(null),
        email: useRef<InputRef>(null),
        phone: useRef<InputRef>(null),
    };

    useEffect(() => {
        const fetchData = async () => setGroups(await GroupsRepository.get());
        fetchData();
    }, []);

    const handleSubmit = () => {
        onAdd({...formData});
        setFormData(empty);
    };

    return <FormWindow handleSubmit={handleSubmit} buttonText="Добавить студента" title="Регистрация студентов" refs={refs}>
        <Row gap={Spacings.L}>
            <Column gap={Spacings.L}>
                <Input
                    ref={refs.secondName}
                    label="Фамилия"
                    isRequired
                    onValidChange={(value) => setFormData(prev => ({...prev, secondName: value}))}
                />
                <Input
                    ref={refs.firstName}
                    label="Имя"
                    isRequired
                    onValidChange={(value) => setFormData(prev => ({...prev, firstName: value}))}
                />
                <Input
                    ref={refs.patronymic}
                    label="Отчество"
                    onValidChange={(value) => setFormData(prev => ({...prev, patronymic: value}))}
                />
            </Column>
            <Column gap={Spacings.L}>
                <Autocomplete
                    ref={refs.groupId}
                    label="Группа"
                    placeholder="Напр. ИВ-101"
                    isRequired
                    items={groups.map(x => new KeyValuePair(x.id!, x.name!))}
                    onValidChange={(value) => setFormData(prev => ({...prev, groupId: value.key}))}
                    onAddItem={async (item) => {
                        await GroupsRepository.post({name: item});
                        setGroups(await GroupsRepository.get());
                    }}
                />
                <Input
                    ref={refs.email}
                    label="Email"
                    type="email"
                    placeholder="student@mail.com"
                    isRequired
                    validate={(v) =>
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                            ? 'Некорректный email'
                            : null
                    }
                    onValidChange={(value) => setFormData(prev => ({...prev, email: value}))}
                />
                <Input
                    ref={refs.phone}
                    label="Телефон"
                    type="tel"
                    placeholder="+7XXXXXXXXXX"
                    isRequired
                    validate={(v) =>
                        !/^\+?[0-9]{10,15}$/.test(v.replace(/[\s\-()]/g, ''))
                            ? 'Некорректный телефон'
                            : null
                    }
                    onValidChange={(value) => setFormData(prev => ({...prev, phone: value}))}
                />
            </Column>
        </Row>
    </FormWindow>;
};


