import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {Background} from "../../Primitives/Background";
import {Clickable} from "../../Primitives/Clickable";
import {Padding} from "../../Primitives/Padding";
import {XText} from "../../Primitives/Text";
import {AiOutlineCloseCircle} from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import {Row} from "../../Primitives/Row/Row";
import {RowElement} from "../../Primitives/Row/RowElement";
import {KeyValuePair} from "../KeyValuePair";
import {Colors} from "../../../style/colors";
import {FontSizes, Radiuses, Spacings} from "../../../style/spacings";

export function Dropdown(p: {
    isOpen: boolean,
    items: KeyValuePair[],
    selectedItems?: KeyValuePair[],
    onSelect: (item: KeyValuePair) => void,
    wrapperRef: React.RefObject<HTMLDivElement | null>,
    onRemove?: (item: KeyValuePair) => void;
    onAddItem?: () => void;
}) {
    const [dropdownPosition, setDropdownPosition] = useState({top: 0, left: 0, width: 0});

    useEffect(() => {
        if (p.isOpen && p.wrapperRef.current) {
            const rect = p.wrapperRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [p.isOpen, p.wrapperRef]);

    if (!p.isOpen) return null;

    return ReactDOM.createPortal(
        <div style={{
            position: 'absolute',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            maxHeight: 200,
            overflowY: 'auto',
            zIndex: 9999,
            scrollbarWidth: "thin",
            scrollbarColor: `${Colors.border} transparent`,
            border: `1px solid ${Colors.border}`,
            borderRadius: `${Radiuses.S}px`,
            backgroundColor: `${Colors.secondary}`,
        }}>
            {p.selectedItems?.map((item) => (
                <Background color={Colors.secondaryBackground2}>
                    <Background color={"transparent"} onMouseEnterColor={Colors.secondaryHover}>
                        <Padding size={Spacings.S}>
                            <Row full>
                                <RowElement sizePercent={90}>
                                    <XText>
                                        {item.getValue()}
                                    </XText>
                                </RowElement>
                                <RowElement sizePercent={10}>
                                    <Clickable onClick={() => p.onRemove?.(item)}>
                                        <AiOutlineCloseCircle color={Colors.danger} size={FontSizes.XL}/>
                                    </Clickable>
                                </RowElement>
                            </Row>
                        </Padding>
                    </Background>
                </Background>
            ))}
            {p.items.length > 0
                ? p.items.map((item) => (
                    <Clickable onMouseDown={() => p.onSelect(item)}>
                        <Background color={"transparent"} onMouseEnterColor={Colors.secondaryHover}>
                            <Padding size={Spacings.S}>
                                <XText>{item.getValue()}</XText>
                            </Padding>
                        </Background>
                    </Clickable>
                ))
                : <Padding size={Spacings.S}>
                    <XText size={FontSizes.M} align={'center'} color={Colors.secondaryText}>
                        Ничего не найдено
                    </XText>
                </Padding>
            }
            {p.items.length === 0 && p.onAddItem && <Clickable onClick={p.onAddItem}>
                <Background color={"transparent"} onMouseEnterColor={Colors.secondaryHover}>
                    <Padding size={Spacings.S}>
                        <XText>Добавить</XText>
                    </Padding>
                </Background>
            </Clickable>
            }
        </div>,
        document.body
    );
}


