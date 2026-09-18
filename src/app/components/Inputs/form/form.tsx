import React from "react";

export const Form: React.FC<{
    handleSubmit: () => void;
    children?: React.ReactNode;
    refs: Object;
}> = (p) => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Object.values(p.refs).map(ref => ref.current?.isValid?.()).every(ref => ref)) {
            return;
        }
        p.handleSubmit();
        Object.values(p.refs).forEach(ref => ref.current?.reset?.());
    }
    return <form onSubmit={handleSubmit}>
        {p.children}
    </form>
}