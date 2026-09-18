import React, {forwardRef, useImperativeHandle, useState} from "react";
import {InputBase} from "./Components/InputBase";
import {InputLabel, InputWrapper} from "./Components/InputWrapper";
import {useValidation} from "./Components/UseValidation";
import {InputRef} from "./Components/InputRef";
import {InputType} from "./Components/InputType";
import {Column} from "../Primitives/Column/Column";
import {Spacings} from "../../style/spacings";

interface InputProps {
    label: string;
    value? : string;
    isRequired?: boolean;
    type?: InputType;
    placeholder?: string;
    validate?: (value: string) => string | null;
    onValidChange: (value: string) => void;
}

export const Input = forwardRef<InputRef, InputProps>((p, ref) => {
    const [value, setValue] = useState(p.value ?? '');
    const validation = useValidation<string>({
        isRequired: p.isRequired,
        validate: p.validate,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (validation.isValid(newValue)) p.onValidChange(newValue);
    };

    useImperativeHandle(ref, () => ({
        isValid: () => validation.isValid(value),
        reset: () => {
            setValue('');
            validation.clearError();
        },
    }));

    return <Column gap={Spacings.Zero}>
        <InputLabel error={validation.error} isRequired={p.isRequired}>
            {p.label}
        </InputLabel>
        <InputWrapper isError={!!validation.error}>
            <InputBase
                value={value}
                handleChange={handleChange}
                type={p.type}
                placeholder={p.placeholder ?? p.label}
            />
        </InputWrapper>
    </Column>;
});


