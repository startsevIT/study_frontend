import React, {useEffect, useRef, useState} from "react";
import {InputRef} from "../../../components/Inputs/Components/InputRef";
import {TeacherRegisterModel} from "../../../../auto_generated_api/repositories/manager_functional/teacher/models";
import {ManagerDisciplineResponse} from "../../../../auto_generated_api/repositories/manager_functional/disciplines/models";
import {DisciplinesRepository} from "../../../../auto_generated_api/repositories/manager_functional/disciplines/disciplines_repository";
import {FormWindow} from "../../../components/Inputs/FormWindow";
import {Row} from "../../../components/Primitives/Row/Row";
import {Spacings} from "../../../style/spacings";
import {Column} from "../../../components/Primitives/Column/Column";
import {Input} from "../../../components/Inputs/Input";
import {Multiselect} from "../../../components/Inputs/Multiselect";
import {KeyValuePair} from "../../../components/Inputs/KeyValuePair";

export const TeacherForm: React.FC<{ onAdd: (teacher: TeacherRegisterModel) => void }> = ({onAdd}) => {
    const empty = {firstName: '', secondName: '', patronymic: '', email: '', phone: '', disciplinesIds: []};
    const [formData, setFormData] = useState<TeacherRegisterModel>(empty);
    const [disciplines, setDisciplines] = useState<ManagerDisciplineResponse[]>([]);

    const refs = {
        secondName: useRef<InputRef>(null),
        firstName: useRef<InputRef>(null),
        patronymic: useRef<InputRef>(null),
        email: useRef<InputRef>(null),
        phone: useRef<InputRef>(null),
        disciplinesIds: useRef<InputRef>(null),
    };

    useEffect(() => {
        const fetchData = async () => setDisciplines(await DisciplinesRepository.get());
        fetchData();
    }, []);

    const handleSubmit = () => {
        onAdd({...formData});
        setFormData(empty);
    };

    return <FormWindow handleSubmit={handleSubmit} buttonText="Добавить преподавателя" title="Регистрация преподавателей" refs={refs}>
        <Row gap={Spacings.L}>
            <Column gap={Spacings.L}>
                <Input
                    ref={refs.secondName}
                    label="Фамилия"
                    isRequired
                    onValidChange={(value) => setFormData({...formData, lastName: value})}
                />
                <Input
                    ref={refs.firstName}
                    label="Имя"
                    isRequired
                    onValidChange={(value) => setFormData({...formData, firstName: value})}
                />
                <Input
                    ref={refs.patronymic}
                    label="Отчество"
                    onValidChange={(value) => setFormData({...formData, patronymic: value})}
                />
            </Column>
            <Column gap={Spacings.L}>
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
                    onValidChange={(value) => setFormData({...formData, email: value})}
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
                    onValidChange={(value) => setFormData({...formData, phone: value})}
                />
                <Multiselect
                    ref={refs.disciplinesIds}
                    isRequired
                    label={"Дисциплины"}
                    items={disciplines.map(x => new KeyValuePair(x.id!, x.name!))}
                    onValidChange={(value) => setFormData({...formData, disciplinesIds: value.map(x => x.key)})}
                    onAddItem={async (item) => {
                        await DisciplinesRepository.post({name: item});
                        setDisciplines(await DisciplinesRepository.get());
                    }}
                />
            </Column>
        </Row>
    </FormWindow>;
};