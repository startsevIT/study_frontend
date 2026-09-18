import React, {FC, useRef} from "react";
import {useClickOutside} from "./use_click_outside";

export const DropdownWrapper: FC<{
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}> = (p) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => p.setIsOpen(false));

    return <div ref={containerRef} style={{
        position: "relative",
        width: "100%",
    }}>
        {p.children}
    </div>
}