import React, {CSSProperties, FC, useState} from "react";
import {KeyValuePair} from "../../base/key_value_pair";

export const Dropdown: FC<{
    query: string;
    items: KeyValuePair[];
    onAddItem?: (item: string) => Promise<void>;
    isSelected: (key: string) => boolean;
    toggleItem: (key: string) => void;
}> = (p) => {
    const filtered = (p.query
        ? p.items.filter(x => x.includes(p.query))
        : [...p.items.filter(item => p.isSelected(item.key)),
            ...p.items.filter(item => !p.isSelected(item.key))])
        .sort((a, b) => a.value.localeCompare(b.value, 'ru'));

    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async () => {
        if (!p.onAddItem || isAdding) return;
        setIsAdding(true);
        try {
            await p.onAddItem(p.query);
        } finally {
            setIsAdding(false);
        }
    };

    const dropdownStyle: CSSProperties = {
        position: "absolute",
        zIndex: 10,
        marginTop: 4,
        width: "100%",
        maxHeight: 240,
        overflow: "auto",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        backgroundColor: "white",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    };

    const buttonStyle: CSSProperties = {
        padding: "8px 12px",
        color: "#2563eb",
        fontSize: 14,
        width: "100%",
    }

    const notFoundStyle: CSSProperties = {
        padding: "8px 12px",
        color: "#9ca3af",
        fontSize: 14,
    }

    const dropdownItemStyle: CSSProperties = {
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }

    return <div style={dropdownStyle}>
        {filtered.length === 0
            ? p.onAddItem && p.query
                ? <button
                    type="button"
                    style={buttonStyle}
                    onClick={handleAdd}
                    children={isAdding ? 'Добавление...' : 'Добавить'}/>
                : <div style={notFoundStyle} children="Ничего не найдено"/>
            : filtered.map(item =>
                <div key={item.key}
                     style={{...dropdownItemStyle, backgroundColor: p.isSelected(item.key) ? "#eff6ff" : "transparent"}}
                     onClick={() => p.toggleItem(item.key)}>
                    <span>
                        {item.value}
                        {p.isSelected(item.key) && <span style={{color: "#2563eb"}}>✓</span>}
                    </span>
                </div>)
        }
    </div>
}