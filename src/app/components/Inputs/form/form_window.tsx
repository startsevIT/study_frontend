import React from "react";
import {Form} from "./form";
import {SubmitButton} from "./submit_button";
import {XWindow} from "../../XWindow";

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


