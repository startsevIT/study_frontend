import React, {useRef, useState} from "react";
import {InputRef} from "../../../components/Inputs/Components/InputRef";
import {Column} from "../../../components/Primitives/Column/Column";
import {FontSizes, Spacings} from "../../../style/spacings";
import {ColumnElement} from "../../../components/Primitives/Column/ColumnElement";
import {Row} from "../../../components/Primitives/Row/Row";
import {Colors} from "../../../style/colors";
import {RowElement} from "../../../components/Primitives/Row/RowElement";
import {Padding} from "../../../components/Primitives/Padding";
import {XText} from "../../../components/Primitives/Text";
import {Center} from "../../../components/Primitives/Center";
import {Border} from "../../../components/Primitives/Border";
import {Background} from "../../../components/Primitives/Background";
import {Clickable} from "../../../components/Primitives/Clickable";
import {Modal} from "../../../components/Modal";
import {Form} from "../../../components/Inputs/Form";
import {Autocomplete} from "../../../components/Inputs/Autocomplete";
import {KeyValuePair} from "../../../components/Inputs/KeyValuePair";
import {Input} from "../../../components/Inputs/Input";
import {KeyValueLabel} from "./KeyValueLabel";
import {SubmitButton} from "../../../components/Inputs/SubmitButton";
import {SecondaryButton} from "../../../components/Buttons/SecondaryButton";
import {MdDeleteForever} from "@react-icons/all-files/md/MdDeleteForever";
import {formatDate} from "../../../extensions/DateExtensions";
import {TiDocumentAdd} from "@react-icons/all-files/ti/TiDocumentAdd";
import {ScheduleTeacherResponse} from "../../../../auto_generated_api/repositories/schedule_editor_functional/schedule_editor/models";
import {PairsRepository} from "../../../../auto_generated_api/repositories/schedule_editor_functional/pairs/pairs_repository";

export interface PairCellValue {
    id: string;
    discipline?: KeyValuePair;
    cabinet: string;
    teacher?: KeyValuePair;
}

export const PairCell: React.FC<{
    teachers: ScheduleTeacherResponse[];
    value?: PairCellValue;
    backgroundColor: string;
    group: KeyValuePair;
    day: KeyValuePair;
    pairNumber: number;
}> = (p) => {
    const [data, setData] = useState<PairCellValue | null>(p.value ?? null);
    const [editData, setEditData] = useState<PairCellValue | null>(null);
    const [disciplines, setDisciplines] = useState<KeyValuePair[]>([]);

    const handleSave = async () => {
        if (p.value?.id)
            await PairsRepository.put(p.value.id, {
                cabinet: editData?.cabinet,
                teacherId: editData?.teacher?.key,
                disciplineId: editData?.discipline?.key
            });
        else
            await PairsRepository.post({
                groupId: p.group.key,
                dayId: p.day.value,
                number: p.pairNumber,
                cabinet: editData!.cabinet,
                teacherId: editData!.teacher!.key,
                disciplineId: editData!.discipline!.key
            })
        setData(editData);
        setEditData(null);
    };

    const handleDelete = async () => {
        if (!p.value?.id) return;
        if (!window.confirm('Удалить пару?')) return;

        await PairsRepository.delete(p.value.id);

        setData(null);
        setEditData(null);
    };

    const refs = {
        discipline: useRef<InputRef>(null),
        cabinet: useRef<InputRef>(null),
        teacher: useRef<InputRef>(null),
    }

    const body = data
        ? <Column gap={Spacings.Zero}>
            <ColumnElement sizePercent={70}>
                <div style={{borderBottom: `1px solid ${Colors.border}`}}>
                    <Row gap={0}>
                        <RowElement sizePercent={80}>
                            <div style={{borderRight: `1px solid ${Colors.border}`, height: 70}}>
                                <Padding size={5}>
                                    <XText size={FontSizes.S} align={"center"}>
                                        {data!.discipline?.value ?? "ошибка"}
                                    </XText>
                                </Padding>
                            </div>
                        </RowElement>
                        <RowElement sizePercent={20}>
                            <div style={{paddingLeft: 5}}>
                                <Center>
                                    <XText size={FontSizes.S} fontWeight={500}>
                                        {data!.cabinet}
                                    </XText>
                                </Center>
                            </div>
                        </RowElement>
                    </Row>
                </div>
            </ColumnElement>
            <Center>
                <XText size={FontSizes.S} color={Colors.text} align={"center"}>
                    {data!.teacher?.value ?? "ошибка"}
                </XText>
            </Center>
        </Column>
        : <Center>
            <TiDocumentAdd fontSize={FontSizes.XL}/>
        </Center>

    return <div style={{height: 120, minWidth: 170}}>
        <Padding size={5}>
            <Border radius={6}>
                <Background color={data ? "white" : p.backgroundColor ?? Colors.secondaryBackground}
                            onMouseEnterColor={Colors.primaryBackground}>
                    <Clickable onClick={() => setEditData({
                        id: p.value?.id ?? "",
                        discipline: p.value?.discipline,
                        cabinet: p.value?.cabinet ?? "",
                        teacher: p.value?.teacher
                    })}>
                        <Padding size={5}>
                            {body}
                        </Padding>
                    </Clickable>
                </Background>
            </Border>
        </Padding>
        {editData && <Modal title={p.value ? 'Редактировать пару' : 'Добавить пару'} onClose={() => setEditData(null)}>
            <Form handleSubmit={handleSave} refs={refs}>
                <Column gap={Spacings.L}>
                    <Autocomplete
                        ref={refs.teacher}
                        label="Преподаватель"
                        placeholder={data?.teacher?.value ?? "Начните вводить значение..."}
                        isRequired
                        items={p.teachers.map(x => new KeyValuePair(x.id!, x.fullName!))}
                        onValidChange={async (v) => {
                            setEditData({...editData, teacher: v});
                            setDisciplines(disciplines.filter(x => x.key === v.key));
                        }}
                    />
                    {editData?.teacher && <Autocomplete
                        ref={refs.discipline}
                        label="Предмет"
                        placeholder={data?.discipline?.value ?? "Начните вводить значение..."}
                        isRequired
                        items={disciplines.map(x => new KeyValuePair(x.key, x.value))}
                        onValidChange={(v) => setEditData({...editData, discipline: v})}
                    />}
                    <Input
                        ref={refs.cabinet}
                        label="Кабинет"
                        placeholder={data?.cabinet ?? "Начните вводить значение..."}
                        isRequired
                        onValidChange={(v) => setEditData({...editData, cabinet: v})}
                    />
                    <Column gap={Spacings.Zero}>
                        {KeyValueLabel({key: "Группа:", value: p.group.value})}
                        {KeyValueLabel({key: "Номер пары:", value: p.pairNumber + 1})}
                        {KeyValueLabel({key: "Дата", value: formatDate(p.day.value)})}
                    </Column>
                    <Row gap={Spacings.S}>
                        <RowElement sizePercent={p.value ? 90 : 100}>
                            <SubmitButton buttonText="Сохранить"/>
                        </RowElement>
                        {p.value && <SecondaryButton onClick={handleDelete}>
                            <MdDeleteForever size={FontSizes.XL}/>
                        </SecondaryButton>}
                    </Row>
                </Column>
            </Form>
        </Modal>}
    </div>;
}