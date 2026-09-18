import React, {forwardRef, useImperativeHandle, useState} from "react";
import {useValidation} from "../../base/use_validation";
import {KeyValuePair} from "../../base/key_value_pair";
import {InputWrapper} from "../../base/input_wrapper";
import {MultiselectProps} from "./multiselect_props";
import {InputRef} from "../../base/Input_ref";
import {InputField} from "../../base/input_field";
import {DropdownWrapper} from "../base/dropdown_wrapper";
import {InputFieldWrapper} from "../../base/input_field_wrapper";
import {Dropdown} from "../base/dropdown";
import {InputCountSpan} from "../../base/inputCountSpan";

export const Multiselect = forwardRef<InputRef, MultiselectProps>((p, ref) => {
    const [value, setValue] = useState<KeyValuePair[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const validation = useValidation<KeyValuePair[]>({
        isRequired: p.isRequired,
    });

    useImperativeHandle(ref, () => ({
        reset: () => {
            setValue([])
            validation.clearError();
        },
        isValid: () => validation.isValid(value),
    }));

    const toggleItem = (key: string) => {
        const newValue = value.some(x => x.Key === key)
            ? value.filter(k => k.Key !== key)
            : [...value, p.items.find(x => x.Key === key)!]

        p.onValidChange(newValue);
        setValue(newValue);
        if (!query)
            return;

        validation.clearError();
        setIsOpen(false);
        setQuery('');
    };

    return <InputWrapper error={validation.error} label={p.label} isRequired={p.isRequired}>
        <DropdownWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
            <InputFieldWrapper isError={!!validation.error} onClick={() => setIsOpen(true)}>
                <InputField
                    onChange={setQuery}
                    type="text"
                    placeholder={value.length === 0 ? p.placeholder ?? p.label : ''}
                    value={query}/>
                {value.length > 0 && <InputCountSpan count={value.length}/>}
            </InputFieldWrapper>
            {isOpen && <Dropdown
                query={query}
                items={p.items}
                toggleItem={toggleItem}
                isSelected={k => value.some(x => x.Key === k)}
                onAddItem={async (v) => {
                    const newValue = await p.onAddItem!(v);
                    setValue([...value, newValue]);
                    p.onValidChange([...value, newValue]);
                    validation.clearError();
                    setIsOpen(false);
                    setQuery('');
                }}/>}
        </DropdownWrapper>
    </InputWrapper>;
})

