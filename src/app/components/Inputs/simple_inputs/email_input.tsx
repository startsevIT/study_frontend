import React, {FC} from "react";
import {SimpleInputWithoutLabelProps} from "../base/simple_input_without_label_props";
import {InputBase} from "../base/new_input";

export const EmailInput: FC<SimpleInputWithoutLabelProps> = (p) =>
    <InputBase
        ref={p.ref}
        label="Email"
        isRequired={p.isRequired}
        onValidChange={p.onValidChange}
        type='email'
        placeholder="example@mail.com"
        validate={(v) =>
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                ? 'Некорректный email'
                : null
        }/>