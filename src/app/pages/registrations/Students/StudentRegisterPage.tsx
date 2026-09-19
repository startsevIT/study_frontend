import React, {useEffect, useState} from "react";
import {StudentForm} from "./StudentForm";
import {CreateTab} from "../CreateTab";
import {XText} from "../../../components/Primitives/Text";
import {BlueBorderBox} from "../../../components/BorderBoxes/BlueBorderBox";
import {contactSpan} from "../ContactSpan";
import {GroupsRepository} from "../../../../auto_generated_api/repositories/manager_functional/groups/groups_repository";
import {ManagerGroupResponse} from "../../../../auto_generated_api/repositories/manager_functional/groups/models";
import {StudentRegisterModel} from "../../../../auto_generated_api/repositories/manager_functional/student/models";
import {StudentRepository} from "../../../../auto_generated_api/repositories/manager_functional/student/student_repository";

export const StudentRegisterPage: React.FC = () => {
    const [groups, setGroups] = useState<ManagerGroupResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => setGroups(await GroupsRepository.get());
        fetchData();
    }, []);

    return CreateTab<StudentRegisterModel>({
        addFunc: StudentRepository.post,
        form: (props) => <StudentForm
            {...props}
            groups={groups}
            onGroupAdded={(g) => setGroups(prev => [...prev, g])}
        />,
        tableChildrenBuilder: (s, _, results) => [
            <XText>{`${s.lastName} ${s.firstName} ${s.patronymic}`}</XText>,
            <BlueBorderBox inline>{groups.find(x => x.id === s.groupId)?.name}</BlueBorderBox>,
            contactSpan(results, s.email),
            contactSpan(results, s.phone),
        ],
        tableHeaders: ["ФИО", "Группа", "Email", "Телефон"],
        tableTitle: "Студенты",
    });
}












