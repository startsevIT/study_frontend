import React, {FC} from "react";
import {SimpleInputProps} from "../base/simple_input_props";
import {InputBase} from "../base/new_input";

export const TextInput: FC<SimpleInputProps<string>> = (p) =>
    <InputBase
        ref={p.ref}
        label={p.label}
        isRequired={p.isRequired}
        placeholder={p.placeholder}
        onValidChange={p.onValidChange}/>