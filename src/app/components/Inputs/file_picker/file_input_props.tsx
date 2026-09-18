import {SimpleInputProps} from "../base/simple_input_props";

export interface FileInputProps extends SimpleInputProps<File[]> {
    accept?: string; // например: ".pdf,.doc,.docx" или "image/*"
    multiple?: boolean;
}