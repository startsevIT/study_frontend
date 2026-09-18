import React from "react";
import {TeacherForm} from "./TeacherForm";
import {CreateTab} from "../CreateTab";
import {contactSpan} from "../ContactSpan";
import {TeacherRegisterModel} from "../../../../auto_generated_api/repositories/manager_functional/teacher/models";
import {TeacherRepository} from "../../../../auto_generated_api/repositories/manager_functional/teacher/teacher_repository";
import {XText} from "../../../components/Primitives/Text";

export const TeacherRegisterPage: React.FC = () =>
    CreateTab<TeacherRegisterModel>({
        addFunc: TeacherRepository.post,
        form: TeacherForm,
        tableChildrenBuilder: (s, _, results) =>
            [
                <XText>{`${s.lastName} ${s.firstName} ${s.patronymic}`}</XText>,
                contactSpan(results, s.email!),
                contactSpan(results, s.phone!),
                <XText>{`Всего: ${s.disciplinesIds!.length}`}</XText>
            ],
        tableHeaders: ["ФИО", "Email", "Телефон", "Дисциплины"],
        tableTitle: "Преподаватели",
    })