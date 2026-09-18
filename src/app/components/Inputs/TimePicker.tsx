import React, {forwardRef} from "react";
import {InputRef} from "./Components/InputRef";
import {Input} from "./Input";

import {PickerProps} from "./Components/PickerProps";

export const TimePicker = forwardRef<InputRef, PickerProps>((p, ref) =>
    <Input
        type={"time"}
        ref={ref}
        label={p.label}
        isRequired={p.isRequired}
        onValidChange={p.onValidChange}
    />);