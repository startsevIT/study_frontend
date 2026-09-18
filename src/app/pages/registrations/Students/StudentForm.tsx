import React, {useEffect, useRef, useState} from "react";
import {Spacings} from "../../../style/spacings";
import {Row} from "../../../components/Primitives/Row/Row";
import {Column} from "../../../components/Primitives/Column/Column";
import {StudentRegisterModel} from "../../../../auto_generated_api/repositories/manager_functional/student/models";
import {GroupsRepository} from "../../../../auto_generated_api/repositories/manager_functional/groups/groups_repository";
import {ManagerGroupResponse} from "../../../../auto_generated_api/repositories/manager_functional/groups/models";
import {TextInput} from "../../../components/Inputs/simple_inputs/text_input";
import {EmailInput} from "../../../components/Inputs/simple_inputs/email_input";
import {PhoneInput} from "../../../components/Inputs/simple_inputs/phone_input";
import {Autocomplete} from "../../../components/Inputs/multiinputs/autocomplete/autocomplete";
import {InputRef} from "../../../components/Inputs/base/Input_ref";
import {FormWindow} from "../../../components/Inputs/form/form_window";
import {KeyValuePair} from "../../../components/Inputs/base/key_value_pair";

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
                <TextInput ref={refs.secondName} label="Фамилия" isRequired
                           onValidChange={value => setFormData(prev => ({...prev, secondName: value}))}
                />
                <TextInput ref={refs.firstName} label="Имя" isRequired
                           onValidChange={value => setFormData(prev => ({...prev, firstName: value}))}
                />
                <TextInput ref={refs.patronymic} label="Отчество"
                           onValidChange={value => setFormData(prev => ({...prev, patronymic: value}))}
                />
            </Column>
            <Column gap={Spacings.L}>
                <Autocomplete
                    ref={refs.groupId}
                    label="Группа"
                    placeholder="Напр. ИВ-101"
                    isRequired
                    items={groups.map(x => new KeyValuePair(x.id!, x.name!))}
                    onValidChange={value => setFormData(prev => ({...prev, groupId: value.Key}))}
                    onAddItem={async (item) => {
                        await GroupsRepository.post({name: item});
                        setGroups(await GroupsRepository.get());
                    }}
                />
                <EmailInput ref={refs.email} isRequired
                            onValidChange={value => setFormData(prev => ({...prev, email: value}))}
                />
                <PhoneInput ref={refs.phone} isRequired
                            onValidChange={value => setFormData(prev => ({...prev, phone: value}))}
                />
            </Column>
        </Row>
    </FormWindow>;
};


