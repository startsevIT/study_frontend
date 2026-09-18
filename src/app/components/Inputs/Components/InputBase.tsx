import React, {CSSProperties, forwardRef, useRef} from "react";
import {Clickable} from "../../Primitives/Clickable";
import {InputType} from "./InputType";
import {XText} from "../../Primitives/Text";
import {Column} from "../../Primitives/Column/Column";
import {maxSize, Spacings} from "../../../style/spacings";
import {Colors} from "../../../style/colors";

interface InputProps {
    type?: InputType;
    value?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onFocus?: () => void;
    onClick?: () => void;
    accept?: string; // например: ".pdf,.doc,.docx" или "image/*"
    multiple?: boolean;
}

export const InputBase = forwardRef<HTMLInputElement, InputProps>((p, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRef = ref || inputRef;

    const type = p.type ?? "text";
    const style: CSSProperties = {
        ...maxSize,
        backgroundColor: "transparent",
        outline: 'none',
    };

    const handleClick = () => {
        if (typeof mergedRef === 'object' && mergedRef?.current) {
            mergedRef.current.focus();
        }
        p.onClick?.();
    };

    if (p.type === "file") {
        return <Clickable onClick={() => inputRef.current?.click()}>
            <input
                ref={inputRef}
                type="file"
                accept={p.accept}
                multiple={p.multiple}
                onChange={p.handleChange}
                style={{display: 'none'}}
            />
            <Column gap={Spacings.S}>
                <XText color={Colors.secondaryText}>
                    Кликните для выбора
                </XText>
                {p.accept && (
                    <XText size={12} color={Colors.secondaryText}>
                        Поддерживаемые форматы: {p.accept}
                    </XText>
                )}
            </Column>
        </Clickable>
    }

    return <Clickable cursor="text" onClick={handleClick}>
        <input
            ref={mergedRef as React.RefObject<HTMLInputElement>}
            type={type}
            value={p.value}
            onChange={p.handleChange}
            onFocus={p.onFocus}
            style={style}
            placeholder={p.placeholder}
        />
    </Clickable>;
});