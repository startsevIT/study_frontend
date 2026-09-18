import {XWindow} from "../XWindow";
import React from "react";
import {Form} from "./Form";
import {SubmitButton} from "./SubmitButton";

interface FormProps {
    handleSubmit: () => void;
    children?: React.ReactNode;
    buttonText?: string;
    title: string;
    refs: Object;
}

export const FormWindow: React.FC<FormProps> = (p) =>
    <Form handleSubmit={p.handleSubmit} refs={p.refs}>
        <XWindow title={p.title}>
            {p.children}
            {p.buttonText && <SubmitButton buttonText={p.buttonText}/>}
        </XWindow>
    </Form>


