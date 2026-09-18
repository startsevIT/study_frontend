import React, {FC} from "react";
import {SimpleInputWithoutLabelProps} from "../base/simple_input_without_label_props";
import {InputBase} from "../base/new_input";

export const PhoneInput: FC<SimpleInputWithoutLabelProps> = (p) =>
    <InputBase
        ref={p.ref}
        label="Телефон"
        isRequired={p.isRequired}
        onValidChange={p.onValidChange}
        type='tel'
        placeholder="+7XXXXXXXXXX"
        validate={(v) =>
            !/^\+?[0-9]{10,15}$/.test(v.replace(/[\s\-()]/g, ''))
                ? 'Некорректный телефон'
                : null
        }/>