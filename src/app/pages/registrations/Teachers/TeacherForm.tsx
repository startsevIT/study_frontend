import React, {useEffect, useRef, useState} from "react";
import {TeacherRegisterModel} from "../../../../auto_generated_api/repositories/manager_functional/teacher/models";
import {ManagerDisciplineResponse} from "../../../../auto_generated_api/repositories/manager_functional/disciplines/models";
import {DisciplinesRepository} from "../../../../auto_generated_api/repositories/manager_functional/disciplines/disciplines_repository";
import {Row} from "../../../components/Primitives/Row/Row";
import {Spacings} from "../../../style/spacings";
import {Column} from "../../../components/Primitives/Column/Column";
import {TextInput} from "../../../components/Inputs/simple_inputs/text_input";
import {EmailInput} from "../../../components/Inputs/simple_inputs/email_input";
import {PhoneInput} from "../../../components/Inputs/simple_inputs/phone_input";
import {Multiselect} from "../../../components/Inputs/multiinputs/multiselect";
import {InputRef} from "../../../components/Inputs/base/Input_ref";
import {FormWindow} from "../../../components/Inputs/form/form_window";
import {KeyValuePair} from "../../../components/Inputs/base/key_value_pair";

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
                <TextInput ref={refs.secondName} label="Фамилия" isRequired
                           onValidChange={(value) => setFormData({...formData, lastName: value})}
                />
                <TextInput ref={refs.firstName} label="Имя" isRequired
                           onValidChange={(value) => setFormData({...formData, firstName: value})}
                />
                <TextInput ref={refs.patronymic} label="Отчество"
                           onValidChange={(value) => setFormData({...formData, patronymic: value})}
                />
            </Column>
            <Column gap={Spacings.L}>
                <EmailInput ref={refs.email} isRequired
                            onValidChange={(value) => setFormData({...formData, email: value})}
                />
                <PhoneInput ref={refs.phone} isRequired
                            onValidChange={(value) => setFormData({...formData, phone: value})}
                />
                <Multiselect
                    ref={refs.disciplinesIds}
                    isRequired
                    label={"Дисциплины"}
                    items={disciplines.map(x => new KeyValuePair(x.id!, x.name!))}
                    onValidChange={value => setFormData({...formData, disciplinesIds: value.map(x => x.key)})}
                    onAddItem={async (item) => {
                        const newDiscipline = await DisciplinesRepository.post({name: item});
                        setDisciplines([...disciplines, newDiscipline]);
                        return new KeyValuePair(newDiscipline.id!, newDiscipline.name!);
                    }}
                />
            </Column>
        </Row>
    </FormWindow>;
};