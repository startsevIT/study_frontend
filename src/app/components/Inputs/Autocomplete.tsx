import React, {forwardRef, useImperativeHandle, useState} from "react";
import {InputBase} from "./Components/InputBase";
import {InputLabel, InputWrapper} from "./Components/InputWrapper";
import {useValidation} from "./Components/UseValidation";
import {InputRef} from "./Components/InputRef";
import {DropdownWrapper} from "./Components/DropdownWrapper";
import {Column} from "../Primitives/Column/Column";
import {KeyValuePair} from "./KeyValuePair";
import {Spacings} from "../../style/spacings";

interface AutocompleteProps {
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    items: KeyValuePair[];
    onValidChange: (item: KeyValuePair) => void;
    onAddItem?: (item: string) => void;
}

export const Autocomplete = forwardRef((
    p: AutocompleteProps,
    ref: React.ForwardedRef<InputRef>
) => {
    const [query, setQuery] = useState('');
    const [value, setValue] = useState<KeyValuePair | null>(null);

    const validation = useValidation<KeyValuePair | null>({
        isRequired: p.isRequired,
    });

    const filteredItems = p.items.filter(item => item.includes(query));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setValue(null);
        validation.clearError();
    };

    const handleSelect = (item: KeyValuePair) => {
        setValue(item);
        setQuery(item.getValue());
        if (validation.isValid(item)) p.onValidChange?.(item);
    };

    useImperativeHandle(ref, () => ({
        reset: () => {
            setQuery('');
            setValue(null);
            validation.clearError();
        },
        isValid: () => validation.isValid(value),
    }));

    return <Column gap={Spacings.Zero}>
        <InputLabel error={validation.error} isRequired={p.isRequired}>
            {p.label}
        </InputLabel>
        <DropdownWrapper items={filteredItems} onSelect={handleSelect} onAddItem={() => p.onAddItem?.(query) ?? undefined}>
            <InputWrapper isError={!!validation.error}>
                <InputBase value={query} handleChange={handleChange} placeholder={p.placeholder}/>
            </InputWrapper>
        </DropdownWrapper>
    </Column>;
})