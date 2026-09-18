import React, {forwardRef, useImperativeHandle, useState} from "react";
import {useValidation} from "./use_validation";
import {InputRef} from "./Input_ref";
import {Input_type} from "./Input_type";
import {InputWrapper} from "./input_wrapper";
import {InputFieldWrapper} from "./input_field_wrapper";
import {InputField} from "./input_field";


export const InputBase = forwardRef<InputRef, {
    label: string;
    value?: string;
    isRequired?: boolean;
    placeholder?: string;
    validate?: (value: string) => string | null;
    onValidChange: (value: string) => void;
    type?: Input_type;
}>((p, ref) => {
    const [value, setValue] = useState(p.value ?? '');

    const validation = useValidation<string>({
        isRequired: p.isRequired,
        validate: p.validate,
    });

    const handleChange = (value: string) => {
        setValue(value);
        if (validation.isValid(value)) p.onValidChange(value);
    };

    useImperativeHandle(ref, () => ({
        isValid: () => validation.isValid(value),
        reset: () => {
            setValue('');
            validation.clearError();
        },
    }));

    return <InputWrapper error={validation.error} label={p.label} isRequired={p.isRequired}>
        <InputFieldWrapper isError={!!validation.error}>
            <InputField
                onChange={handleChange}
                type={p.type ?? "text"}
                placeholder={p.placeholder ?? p.label}
                value={value}
            />
        </InputFieldWrapper>
    </InputWrapper>
});