import React, {useRef, useState} from "react";
import {useClickOutside} from "./UseClickOutside";
import {Dropdown} from "./Dropdown";
import {KeyValuePair} from "../KeyValuePair";

export function DropdownWrapper(p: {
    onSelect: (item: KeyValuePair) => void;
    items: KeyValuePair[];
    selectedItems?: KeyValuePair[];
    onRemove?: (item: KeyValuePair) => void;
    children?: React.ReactNode;
    onAddItem?: () => void;
}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useClickOutside(wrapperRef, () => setIsOpen(false));

    return <div
        ref={wrapperRef}
        style={{position: 'relative', width: '100%'}}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
    >
        {p.children}
        <Dropdown
            isOpen={isOpen}
            items={p.items}
            selectedItems={p.selectedItems}
            onRemove={p.onRemove}
            onSelect={p.onSelect}
            wrapperRef={wrapperRef}
            onAddItem={p.onAddItem}
        />
    </div>
}