import React, {useEffect, useRef, useState} from 'react';
import {InputRef} from "../../components/Inputs/Components/InputRef";
import {XWindow} from "../../components/XWindow";
import {Row} from "../../components/Primitives/Row/Row";
import {SecondaryButton} from "../../components/Buttons/SecondaryButton";
import {FontSizes, Spacings} from "../../style/spacings";
import {XText} from "../../components/Primitives/Text";
import {PrimaryButton} from "../../components/Buttons/PrimaryButton";
import {Modal} from "../../components/Modal";
import {Form} from "../../components/Inputs/Form";
import {Column} from "../../components/Primitives/Column/Column";
import {FilePicker} from "../../components/Inputs/FilePicker";
import {SubmitButton} from "../../components/Inputs/SubmitButton";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {FaChevronRight} from "@react-icons/all-files/fa/FaChevronRight";
import {FaTruckLoading} from "@react-icons/all-files/fa/FaTruckLoading";
import {ImFileEmpty} from "@react-icons/all-files/im/ImFileEmpty";
import {FaFileDownload} from "@react-icons/all-files/fa/FaFileDownload";
import {FaFileUpload} from "@react-icons/all-files/fa/FaFileUpload";
import {FaChevronLeft} from "@react-icons/all-files/fa/FaChevronLeft";
import {
    ScheduleEditorRepository
} from "../../../auto_generated_api/repositories/schedule_editor_functional/schedule_editor/schedule_editor_repository";

export const ScheduleNavigation: React.FC<{
    onAddWeek: () => void;
    weekStart: Date;
    setWeekStart: (date: Date) => void;
}> = (p) => {
    const [canGoForward, setCanGoForward] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const checkCanGoForward = async () => {
            try {
                const lastDay = await ScheduleEditorRepository.getLastActualDate();
                if (!lastDay) {
                    setCanGoForward(false);
                    return;
                }
                const nextWeekStart = new Date(p.weekStart);
                nextWeekStart.setDate(p.weekStart.getDate() + 7);
                setCanGoForward(nextWeekStart <= new Date(lastDay));
            } catch (error) {
                setCanGoForward(false);
            } finally {
                setLoading(false);
            }
        };

        checkCanGoForward();
    }, [p.weekStart]);

    const weekEnd = new Date(p.weekStart);
    weekEnd.setDate(p.weekStart.getDate() + 6);

    const handlePrev = () => {
        const prev = new Date(p.weekStart);
        prev.setDate(p.weekStart.getDate() - 7);
        p.setWeekStart(prev);
    };

    const handleNext = () => {
        if (canGoForward) {
            const next = new Date(p.weekStart);
            next.setDate(p.weekStart.getDate() + 7);
            p.setWeekStart(next);
        } else {
            p.onAddWeek();
        }
    };

    const refs = {
        files: useRef<InputRef>(null),
    }

    return <XWindow>
        <Row>
            <SecondaryButton onClick={handlePrev} full={false}>
                <FaChevronLeft size={FontSizes.L}/>
            </SecondaryButton>

            <XText size={FontSizes.XL} fontWeight={500} align={'center'}>
                {`${(p.weekStart.toLocaleDateString())} - ${(weekEnd.toLocaleDateString())}`}
            </XText>


            <Row gap={Spacings.XS} full={false}>
                <PrimaryButton onClick={() => setIsUploading(true)} full={false}>
                    <FaFileUpload size={FontSizes.L}/> {/*загрузить*/}
                </PrimaryButton>
                <PrimaryButton onClick={() => null} full={false}>
                    <FaFileDownload size={FontSizes.L}/> {/*скачать*/}
                </PrimaryButton>
                <PrimaryButton onClick={() => null} full={false}>
                    <ImFileEmpty size={FontSizes.L}/> {/*скачать пустой*/}
                </PrimaryButton>
                {loading ?
                    <SecondaryButton onClick={() => null} full={false}>
                        <FaTruckLoading size={FontSizes.L}/>
                    </SecondaryButton>
                    : canGoForward
                        ? <SecondaryButton onClick={handleNext} full={false}>
                            <FaChevronRight size={FontSizes.L}/>
                        </SecondaryButton>
                        : <PrimaryButton onClick={handleNext} full={false}>
                            <FaPlus size={FontSizes.L}/>
                        </PrimaryButton>
                }
            </Row>
        </Row>
        {isUploading && <Modal title={"Выбор файлов"} onClose={() => setIsUploading(false)}>
            <Form handleSubmit={() => null} refs={refs}>
                <Column gap={Spacings.S}>
                    <FilePicker
                        ref={refs.files}
                        label="Выберите файл"
                        onValidChange={() => null}
                        accept=".xlsx,.xls"
                        isRequired
                        multiple={false}
                    />
                    <SubmitButton buttonText="Загрузить"/>
                </Column>
            </Form>
        </Modal>}
    </XWindow>;
};