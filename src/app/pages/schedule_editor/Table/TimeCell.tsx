import React, {useRef, useState} from "react";
import {KeyValueLabel} from "./KeyValueLabel";
import {VerticalHeader} from "./VerticalHeader";
import {Clickable} from "../../../components/Primitives/Clickable";
import {Modal} from "../../../components/Modal";
import {Column} from "../../../components/Primitives/Column/Column";
import {Spacings} from "../../../style/spacings";
import {PrimaryButton} from "../../../components/Buttons/PrimaryButton";
import {
    ScheduleEditorRepository
} from "../../../../auto_generated_api/repositories/schedule_editor_functional/schedule_editor/schedule_editor_repository";
import {TimePicker} from "../../../components/Inputs/simple_inputs/time_picker";
import {InputRef} from "../../../components/Inputs/base/Input_ref";
import {Form} from "../../../components/Inputs/form/form";

export const TimeCell: React.FC<{
    time: string;
    dayId: string;
    pairIndex: number;
}> = (p) => {
    const [data, setData] = useState<string>(p.time);
    const [editData, setEditData] = useState<string | null>(null);

    const handleSave = async () => {
        await  ScheduleEditorRepository.putDay(p.dayId, {time: editData!, number: p.pairIndex});
        setEditData(null);
        setData(editData!);
    };

    const refs = {value: useRef<InputRef>(null)}

    return <>
        <Clickable onClick={() => setEditData(data)}>
            <VerticalHeader height="13%">{data}</VerticalHeader>
        </Clickable>
        {editData && <Modal title="Редактировать время" onClose={() => setEditData(null)}>
            <Form handleSubmit={handleSave} refs={refs}>
                <Column gap={Spacings.Zero}>
                    {KeyValueLabel({key: "Текущее время:", value: p.time})}
                    {KeyValueLabel({key: "Номер пары:", value: p.pairIndex + 1})}
                </Column>,
                <TimePicker label="Новое время" isRequired onValidChange={setEditData} ref={refs.value}/>,
                <PrimaryButton full onClick={handleSave}>
                    Сохранить
                </PrimaryButton>
            </Form>
        </Modal>}
    </>;
}

