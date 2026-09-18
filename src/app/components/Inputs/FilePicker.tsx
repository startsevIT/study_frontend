import React, {forwardRef, useImperativeHandle, useState} from "react";
import {XText} from "../Primitives/Text";
import {Column} from "../Primitives/Column/Column";
import {Padding} from "../Primitives/Padding";
import {Background} from "../Primitives/Background";
import {Border} from "../Primitives/Border";
import {useValidation} from "./Components/UseValidation";
import {InputRef} from "./Components/InputRef";
import {InputLabel, InputWrapper} from "./Components/InputWrapper";
import {InputBase} from "./Components/InputBase";
import {Clickable} from "../Primitives/Clickable";
import {AiFillCloseCircle} from "@react-icons/all-files/ai/AiFillCloseCircle";
import {FontSizes, Radiuses, Spacings} from "../../style/spacings";
import {Colors} from "../../style/colors";
import {Row} from "../Primitives/Row/Row";
import {RowElement} from "../Primitives/Row/RowElement";

interface FilePickerProps {
    label: string;
    isRequired?: boolean;
    accept?: string; // например: ".pdf,.doc,.docx" или "image/*"
    multiple?: boolean;
    onValidChange: (files: File[]) => void;
}

export const FilePicker = forwardRef((
    p: FilePickerProps,
    ref: React.ForwardedRef<InputRef>
) => {
    const [files, setFiles] = useState<File[]>([]);

    const validation = useValidation<File[]>({
        isRequired: p.isRequired,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected) return;

        const validFiles: File[] = [];

        for (const file of Array.from(selected)) {
            validFiles.push(file);
        }

        if (validFiles.length > 0) {
            setFiles(prev => p.multiple ? [...prev, ...validFiles] : validFiles);
            if (validation.isValid(validFiles)) p.onValidChange(validFiles);
        }

        e.target.value = '';
    };

    const handleRemove = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        if (files.length - 1 === 0) {
            if (validation.isValid(files)) p.onValidChange([]);
        }
    };

    useImperativeHandle(ref, () => ({
        reset: () => {
            setFiles([]);
            validation.clearError();
        },
        isValid: () => validation.isValid(files),
    }));

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    };

    return <Column gap={Spacings.XS}>
        <InputLabel error={validation.error} isRequired={p.isRequired}>
            {p.label}
        </InputLabel>
        <InputWrapper isError={!!validation.error}>
            <InputBase
                type="file"
                accept={p.accept}
                multiple={p.multiple}
                handleChange={handleChange}
            />
        </InputWrapper>
        {files.length > 0 && <Column gap={Spacings.XS}>
            {files.map((file, index) => (

                <Border radius={Radiuses.S}>
                    <Background color={Colors.secondary}>
                        <Padding size={`${Spacings.XS}px ${Spacings.S}px`}>
                            <Row key={index}>
                                <RowElement sizePercent={95}>
                                    <XText>
                                        {file.name} ({formatFileSize(file.size)})
                                    </XText>
                                </RowElement>
                                <RowElement sizePercent={5}>
                                    <Clickable onClick={() => handleRemove(index)}>
                                        <AiFillCloseCircle size={FontSizes.XL} color={Colors.danger}
                                                           onMouseEnter={(e: React.MouseEvent<SVGElement>) => e.currentTarget.style.color = Colors.dangerHover}
                                                           onMouseLeave={(e: React.MouseEvent<SVGElement>) => e.currentTarget.style.color = Colors.danger}
                                        />
                                    </Clickable>
                                </RowElement>
                            </Row>
                        </Padding>
                    </Background>
                </Border>

            ))}
        </Column>}
    </Column>;
}) as (p: FilePickerProps & { ref?: React.ForwardedRef<InputRef> }) => React.ReactElement;