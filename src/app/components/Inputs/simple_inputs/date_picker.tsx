import React, {FC} from "react";
import {SimpleInputProps} from "../base/simple_input_props";
import {InputBase} from "../base/new_input";

export const DatePicker: FC<SimpleInputProps<string>> = (p) =>
    <InputBase
        type={"date"}
        ref={p.ref}
        label={p.label}
        isRequired={p.isRequired}
        onValidChange={p.onValidChange}/>;