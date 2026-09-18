export interface PickerProps {
    label: string
    isRequired: boolean
    onValidChange: (value: string) => void;
}