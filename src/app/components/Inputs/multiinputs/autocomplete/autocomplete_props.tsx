import {SimpleInputProps} from "../../base/simple_input_props";
import {KeyValuePair} from "../../base/key_value_pair";

export interface AutocompleteProps extends SimpleInputProps<KeyValuePair> {
    items: KeyValuePair[];
    onAddItem?: (item: string) => Promise<KeyValuePair>;
}