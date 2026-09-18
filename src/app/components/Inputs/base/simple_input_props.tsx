import {Ref} from "react";
import {InputRef} from "./Input_ref";

export interface SimpleInputProps<T> {
    ref: Ref<InputRef>;
    label: string;
    placeholder?: string;
    isRequired?: boolean;
    onValidChange: (value: T) => void;
}



