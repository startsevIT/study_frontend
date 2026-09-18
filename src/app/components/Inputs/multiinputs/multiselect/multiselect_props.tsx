import {SimpleInputProps} from "../../base/simple_input_props";
import {KeyValuePair} from "../../base/key_value_pair";

export interface MultiselectProps extends SimpleInputProps<KeyValuePair[]> {
    items: KeyValuePair[];
    onAddItem?: (item: string) => void;
}

