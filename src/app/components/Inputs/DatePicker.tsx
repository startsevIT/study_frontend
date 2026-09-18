import React, {forwardRef} from "react";
import {InputRef} from "./Components/InputRef";
import {Input} from "./Input";
import {PickerProps} from "./Components/PickerProps";

export const DatePicker = forwardRef<InputRef, PickerProps>((p, ref) =>
    <Input
        type={"date"}
        ref={ref}
        label={p.label}
        isRequired={p.isRequired}
        onValidChange={p.onValidChange}
    />);

