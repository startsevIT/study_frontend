import {Ref} from "react";
import {InputRef} from "./Input_ref";

export interface SimpleInputWithoutLabelProps {
    ref: Ref<InputRef>;
    isRequired?: boolean;
    onValidChange: (value: string) => void;
}