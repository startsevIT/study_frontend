import React, {FC} from "react";
import {SimpleInputWithoutLabelProps} from "../base/simple_input_without_label_props";
import {InputBase} from "../base/new_input";

export const PasswordInput: FC<SimpleInputWithoutLabelProps> = (p) =>
    <InputBase
        ref={p.ref}
        label="Пароль"
        type="password"
        placeholder="••••••••"
        isRequired={p.isRequired}
        onValidChange={p.onValidChange}/>

//todo visibleButton