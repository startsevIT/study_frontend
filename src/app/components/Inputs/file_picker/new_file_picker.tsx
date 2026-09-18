import {InputWrapper} from "../base/input_wrapper";
import {useValidation} from "../base/use_validation";
import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {InputFieldWrapper} from "../base/input_field_wrapper";
import {InputCountSpan} from "../multiinputs/multiselect/multiselect";
import {KeyValuePair} from "../base/key_value_pair";
import {FontSizes, Radiuses, Spacings} from "../../../style/spacings";
import {Colors} from "../../../style/colors";
import {InputRef} from "../base/Input_ref";
import {FileInputProps} from "./file_input_props";

export const FilePicker = forwardRef<InputRef, FileInputProps>((p, ref) => {
    const [files, setFiles] = useState<File[]>([]);

    const filePickerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setFiles([]);
            validation.clearError();
        },
        isValid: () => validation.isValid(files),
    }));

    const validation = useValidation<File[]>({
        isRequired: p.isRequired,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected) return;

        const validFiles: File[] = [];

        for (const file of Array.from(selected)) {
            if ([...files, ...validFiles].some(x => x.name === file.name && x.size === file.size))
                continue;
            validFiles.push(file);
        }

        if (validFiles.length > 0) {
            setFiles(prev => p.multiple ? [...prev, ...validFiles] : validFiles);
            if (validation.isValid(validFiles)) p.onValidChange(validFiles);
        }

        e.target.value = '';
    };

    return <InputWrapper label={p.label} isRequired={p.isRequired} error={validation.error}>
        <input
            ref={filePickerRef}
            type="file"
            accept={p.accept}
            multiple={p.multiple}
            onChange={handleChange}
            style={{display: 'none'}}
        />
        <InputFieldWrapper isError={!!validation.error}>
            <button
                style={{
                    width: "100%",
                    border: "1px solid gray",
                    borderRadius: Radiuses.XS,
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: FontSizes.S,
                    backgroundColor: Colors.secondary,
                    padding: `0px ${Spacings.S}px`,
                }}
                onClick={() => filePickerRef.current?.click()}>
                Выбрать
            </button>
            {files.length > 0 && <InputCountSpan count={files.length}/>}
        </InputFieldWrapper>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'white',
        }}>
            {files.map(x => new KeyValuePair(x.name + x.size, x.name)).map(item =>
                <div
                    key={item.Key}
                    style={{
                        padding: `${Spacings.XS}px ${Spacings.S}px`,
                        fontSize: FontSizes.S,
                        backgroundColor: 'transparent',
                        borderBottom: `1px solid ${Colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <span>{item.Value}</span>
                    <button onClick={() => setFiles(files.filter(x => x.name + x.size !== item.Key))}>
                        X
                    </button>
                </div>
            )}
        </div>
    </InputWrapper>
})

//TODO DESIGN