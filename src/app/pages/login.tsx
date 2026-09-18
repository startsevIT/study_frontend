import React, {useRef, useState} from 'react';
import {UserRepository} from "../../auto_generated_api/repositories/user/user_repository";
import {Colors} from "../style/colors";
import {Column} from "../components/Primitives/Column/Column";
import {Spacings} from "../style/spacings";
import {RedBorderBox} from "../components/BorderBoxes/RedBorderBox";
import {TextInput} from "../components/Inputs/simple_inputs/text_input";

import {PasswordInput} from "../components/Inputs/simple_inputs/password_input";
import {InputRef} from "../components/Inputs/base/Input_ref";
import {FormWindow} from "../components/Inputs/form/form_window";

export const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const refs = {
        login: useRef<InputRef>(null),
        password: useRef<InputRef>(null),
    }

    const handleSubmit = async () => {
        setError(null);
        try {
            const res = await UserRepository.postLogin(formData);
            localStorage.setItem('token', res.token!);
            localStorage.setItem('roles', JSON.stringify(res.roles));
            localStorage.setItem('fullName', res.fullName!);
            window.location.href = '/';
        } catch (err: any) {
            setError(err.response?.data?.error || 'Ошибка входа');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: Colors.mainBackground,
        }}>
            <div style={{maxWidth: 400, width: '100%'}}>
                <FormWindow handleSubmit={handleSubmit} buttonText="Войти" title="Вход" refs={refs}>
                    <Column gap={Spacings.L}>
                        <TextInput ref={refs.login} label="Email или телефон" placeholder="Логин" isRequired
                                   onValidChange={(value) => setFormData(prev => ({...prev, login: value}))}
                        />
                        <PasswordInput ref={refs.password} isRequired
                                       onValidChange={(value) => setFormData(prev => ({...prev, password: value}))}
                        />
                    </Column>
                    {error && <RedBorderBox>{error}</RedBorderBox>}
                </FormWindow>
            </div>
        </div>
    );
};