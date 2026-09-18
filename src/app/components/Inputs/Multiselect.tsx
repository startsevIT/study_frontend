import React, {forwardRef, useImperativeHandle, useState} from "react";
import {Padding} from "../Primitives/Padding";
import {InputBase} from "./Components/InputBase";
import {InputLabel, InputWrapper} from "./Components/InputWrapper";
import {useValidation} from "./Components/UseValidation";
import {InputRef} from "./Components/InputRef";
import {DropdownWrapper} from "./Components/DropdownWrapper";
import {Column} from "../Primitives/Column/Column";
import {KeyValuePair} from "./KeyValuePair";
import { RowElement } from "../Primitives/Row/RowElement";
import { Row } from "../Primitives/Row/Row";
import { GrayBorderBox } from "../BorderBoxes/GrayBorderBox";
import { XText } from "../Primitives/Text";
import {Spacings} from "../../style/spacings";

interface MultiselectProps {
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    items: KeyValuePair[];
    onAddItem?: (item: string) => void;
    onValidChange: (value: KeyValuePair[]) => void;
}

export const Multiselect = forwardRef((
    p: MultiselectProps,
    ref: React.ForwardedRef<InputRef>
) => {
    const [query, setQuery] = useState('');
    const [value, setValue] = useState<KeyValuePair[]>([]);

    const validation = useValidation<KeyValuePair[]>({
        isRequired: p.isRequired,
    });

    const filteredItems = p.items.filter(item => {
        let allValues = value.map(item => item.getKey());
        const isSelected = new Set(allValues).has(item.getKey());

        if (isSelected) return false;

        if (query.trim() === '') return true;

        return item.getValue().toLowerCase().includes(query.toLowerCase());
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        validation.clearError();
    };

    const handleSelect = (item: KeyValuePair) => {
        const newValue = [...value, item];
        setValue(newValue);
        if (validation.isValid(newValue)) p.onValidChange(newValue);
        setQuery('');
    };

    const handleRemove = (item: KeyValuePair) => {
        const newValue = value.filter(x => item.getKey() !== x.getKey());
        setValue(newValue);
        validation.isValid(newValue);
    };

    useImperativeHandle(ref, () => ({
        reset: () => {
            setQuery('');
            setValue([]);
            validation.clearError();
        },
        isValid: () => validation.isValid(value),
    }));

    return <Column>
        <InputLabel error={validation.error} isRequired={p.isRequired}>
            {p.label}
        </InputLabel>
        <DropdownWrapper onRemove={handleRemove}
                         items={filteredItems}
                         selectedItems={!query ? value : []}
                         onSelect={handleSelect}
                         onAddItem={query ? () => p.onAddItem?.(query) : undefined}
        >
            <InputWrapper isError={!!validation.error}>
                <Row>
                    <RowElement sizePercent={75}>
                        <InputBase
                            value={query}
                            handleChange={handleChange}
                            placeholder={value.length === 0 ? (p.placeholder || p.label) : ''}
                        />
                    </RowElement>
                    {value.length > 0 &&
                        <RowElement sizePercent={25}>
                            <GrayBorderBox inline>
                                <Padding size={`${Spacings.Zero}px ${Spacings.S}px`}>
                                    <XText>
                                        Выбрано: {value.length}
                                    </XText>
                                </Padding>
                            </GrayBorderBox>
                        </RowElement>}
                </Row>
            </InputWrapper>
        </DropdownWrapper>
    </Column>;
});