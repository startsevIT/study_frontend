import React, {forwardRef, useImperativeHandle, useState} from "react";
import {InputRef} from "../../base/Input_ref";
import {KeyValuePair} from "../../base/key_value_pair";
import {useValidation} from "../../base/use_validation";
import {InputWrapper} from "../../base/input_wrapper";
import {AutocompleteProps} from "./autocomplete_props";
import {DropdownWrapper} from "../base/dropdown_wrapper";
import {InputFieldWrapper} from "../../base/input_field_wrapper";
import {InputField} from "../../base/input_field";
import {Dropdown} from "../base/dropdown";

export const Autocomplete = forwardRef<InputRef, AutocompleteProps>((p, ref) => {
    const [value, setValue] = useState<KeyValuePair | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const validation = useValidation<KeyValuePair | null>({
        isRequired: p.isRequired,
    });

    useImperativeHandle(ref, () => ({
        reset: () => {
            setValue(null)
            validation.clearError();
        },
        isValid: () => validation.isValid(value),
    }));

    const toggleItem = (key: string) => {
        const newValue = p.items.find(x => x.Key === key);
        if (!newValue)
            return;
        update(newValue);
    };

    const update = (value: KeyValuePair) => {
        setValue(value);
        p.onValidChange(value);
        validation.clearError();
        setIsOpen(false);
        setQuery('');
    }

    return <InputWrapper error={validation.error} label={p.label} isRequired={p.isRequired}>
        <DropdownWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
            <InputFieldWrapper isError={!!validation.error} onClick={() => setIsOpen(true)}>
                <InputField
                    onChange={setQuery}
                    type="text"
                    placeholder={!value ? p.placeholder ?? p.label : ''}
                    value={isOpen ? query : value?.Value ?? ''}
                />
            </InputFieldWrapper>
            {isOpen && <Dropdown
                query={query}
                items={p.items}
                toggleItem={toggleItem}
                isSelected={k => value?.Key === k}
                onAddItem={async (v) => {
                    const newValue = await p.onAddItem!(v);
                    update(newValue);
                }}/>}
        </DropdownWrapper>
    </InputWrapper>;
})

