import React from "react";

type CellBuilder<T> = (item: T, index: number) => React.ReactNode;


export interface TableColumn<T> {
    width?: string;
    colSpan?: number;
    header: React.ReactNode;
    cell: {
        isSticky?: boolean;
        rowSpan?: (item: T) => number;
        colSpan?: number;
        builder: CellBuilder<T>;
    }
}

interface FootProps {
    rowSpan?: number;
    colSpan?: number;
    children: React.ReactNode;
}

export const Table = <T, >(p: {
    columns: TableColumn<T>[];
    items: T[];
    foot?: FootProps[];
    caption?: string;
}) => {
    const cells = p.columns.map(x => x.cell);

    const bodyBuilder = () => {
        const hidden = new Map<number, number>();
        return p.items.map((item, rowIndex) => (
            <tr key={rowIndex}>
                {cells.map((cell, cellIndex) => {
                    const isHidden = hidden.has(cellIndex) && hidden.get(cellIndex)! > 0;
                    if (isHidden) {
                        hidden.set(cellIndex, hidden.get(cellIndex)! - 1);
                        return null;
                    }

                    if (cell.rowSpan) hidden.set(cellIndex, cell.rowSpan(item) - 1);

                    return (
                        <td style={{
                            left: cellIndex < cells.length / 2 ? 0 : undefined,
                            right: cellIndex > cells.length / 2 ? 0 : undefined,
                            position: cell.isSticky ? "sticky" : undefined
                        }} key={cellIndex} rowSpan={cell.rowSpan?.(item) ?? 1} colSpan={cell.colSpan}>
                            {cell.builder(item, rowIndex)}
                        </td>
                    );
                })}
            </tr>
        ));
    };

    return (
        <table>
            {p.caption && <caption>{p.caption}</caption>}
            <thead>
            <tr>
                {p.columns.map((column, index) => (
                    <th key={index} style={{
                        left: index === 0 ? 0 : undefined,
                        right: index === cells.length - 1 ? 0 : undefined,
                        top: 0,
                        zIndex: index === 0 ? 10 : 9,
                        width: column.width, position: "sticky"
                    }} colSpan={column.colSpan}>
                        {column.header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {bodyBuilder()}
            </tbody>
            {p.foot && (
                <tfoot>
                <tr>
                    {p.foot.map((x, i) => (
                        <td key={i} colSpan={x.colSpan} rowSpan={x.rowSpan}>
                            {x.children}
                        </td>
                    ))}
                </tr>
                </tfoot>
            )}
        </table>
    );
};