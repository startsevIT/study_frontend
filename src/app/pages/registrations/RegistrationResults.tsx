import React from "react";
import {GrayBorderBox} from "../../components/BorderBoxes/GrayBorderBox";
import {XWindow} from "../../components/XWindow";
import {GreenBorderBox} from "../../components/BorderBoxes/GreenBorderBox";
import {RedBorderBox} from "../../components/BorderBoxes/RedBorderBox";
import {TeacherRegisterResult} from "../../../auto_generated_api/repositories/manager_functional/teacher/models";

export const RegistrationResults: React.FC<{ results: TeacherRegisterResult | null }> = ({results}) => {
    if (!results) return <XWindow title="Результаты"><GrayBorderBox>Результаты появятся здесь</GrayBorderBox></XWindow>

    return <XWindow title="Результаты">
        {results.success
            ? <GreenBorderBox>Пользователи успешно зарегистрированы</GreenBorderBox>
            : <RedBorderBox>Такие данные уже есть, обратите внимание, мы их выделили</RedBorderBox>}
        <GrayBorderBox>Пароли генерируются автоматически и отправляются на email пользователя</GrayBorderBox>
    </XWindow>;
};