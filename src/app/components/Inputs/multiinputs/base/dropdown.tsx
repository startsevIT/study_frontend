import React, {FC} from "react";
import {KeyValuePair} from "../../base/key_value_pair";

export const Dropdown: FC<{
    query: string;
    items: KeyValuePair[];
    onAddItem?: (item: string) => void;
    isSelected: (key: string) => boolean;
    toggleItem: (key: string) => void;
}> = (p) => {
    const filtered = p.query ? p.items.filter(x => x.includes(p.query)) : p.items;

    return <div style={{
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
    }}>
        {filtered.length === 0
            ? p.onAddItem && p.query
                ? <button style={{
                    padding: "8px 12px",
                    color: "#2563eb",
                    fontSize: 14,
                    width: "100%",
                }} onClick={() => p.onAddItem!(p.query)}>
                    Добавить
                </button>
                : <div style={{
                    padding: "8px 12px",
                    color: "#9ca3af",
                    fontSize: 14,
                }}>
                    Ничего не найдено
                </div>
            : filtered.map(item => {
                return <div
                    key={item.Key}
                    style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: p.isSelected(item.Key) ? "#eff6ff" : "transparent",
                    }}
                    onClick={() => p.toggleItem(item.Key)}
                >
                        <span>
                            {item.Value}
                            {p.isSelected(item.Key) && <span style={{color: "#2563eb"}}>✓</span>}
                        </span>
                </div>;
            })
        }
    </div>
}