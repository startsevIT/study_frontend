import React, {FC, forwardRef, useImperativeHandle, useState} from "react";
import {useValidation} from "../../base/use_validation";
import {KeyValuePair} from "../../base/key_value_pair";
import {InputWrapper} from "../../base/input_wrapper";
import {MultiselectProps} from "./multiselect_props";
import {InputRef} from "../../base/Input_ref";
import {InputField} from "../../base/input_field";
import {DropdownWrapper} from "../base/dropdown_wrapper";
import {InputFieldWrapper} from "../../base/input_field_wrapper";
import {FontSizes, Radiuses, Spacings} from "../../../../style/spacings";
import {Colors} from "../../../../style/colors";
import {Dropdown} from "../base/dropdown";

export const Multiselect = forwardRef<InputRef, MultiselectProps>((p, ref) => {
    const [value, setValue] = useState<KeyValuePair[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const toggleItem = (key: string) => {
        setValue(value.some(x => x.Key === key)
            ? value.filter(k => k.Key !== key)
            : [...value, p.items.find(x => x.Key === key)!]);
        if (!query)
            return;

        setQuery('');
    };

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
                isSelected={k => value.some(x => x.Key === k)}/>}
        </DropdownWrapper>
    </InputWrapper>;
})

export const InputCountSpan: FC<{ count: number }> = (p) =>
    <span
        style={{
            width: 25,
            border: "1px solid gray",
            borderRadius: Radiuses.XS,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: FontSizes.S,
            backgroundColor: Colors.secondary,
            padding: `0px ${Spacings.S}px`,
        }}>
            <span style={{color: Colors.successHover}}>
                ✓
            </span>
        {p.count}
    </span>