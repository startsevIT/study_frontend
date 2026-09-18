import React, {useState} from "react";
import {Background} from "../../components/Primitives/Background";
import {Center} from "../../components/Primitives/Center";
import {Colors} from "../../style/colors";
import {Border} from "../../components/Primitives/Border";
import {Table, TableColumn} from "../../components/Table/Table";
import {XText} from "../../components/Primitives/Text";
import {Clickable} from "../../components/Primitives/Clickable";
import {FontSizes, Spacings} from "../../style/spacings";
import {Scroll} from "../../components/Primitives/Scroll";
import {Column} from "../../components/Primitives/Column/Column";
import {Row} from "../../components/Primitives/Row/Row";
import {RowElement} from "../../components/Primitives/Row/RowElement";
import {XWindow} from "../../components/XWindow";
import {PrimaryButton} from "../../components/Buttons/PrimaryButton";
import {SecondaryButton} from "../../components/Buttons/SecondaryButton";
import {RedBorderBox} from "../../components/BorderBoxes/RedBorderBox";
import {RegistrationResults} from "./RegistrationResults";
import {AiFillCloseCircle} from "@react-icons/all-files/ai/AiFillCloseCircle";
import {TeacherRegisterResult} from "../../../auto_generated_api/repositories/manager_functional/teacher/models";

interface ManagePageProps<T> {
    tableTitle: string;
    tableHeaders: React.ReactNode[];
    tableChildrenBuilder: (value: T, index: number, exists: string[]) => React.ReactNode[];
    addFunc: (values: T[]) => Promise<TeacherRegisterResult> | null;
    form: React.FC<{ onAdd: (value: T) => void }>,
}

export function CreateTab<T>(p: ManagePageProps<T>) {
    const [values, setValues] = useState<T[]>([]);
    const [results, setResults] = useState<TeacherRegisterResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAdd = (value: T) => {
        setValues(prev => [...prev, value]);
        setError(null);
    };

    const handleRemove = (index: number) => {
        setValues(prev => prev.filter((_, i) => i !== index));
        if (values.length === 1) setResults(null);
    };

    const handleRequest = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const res = await p.addFunc(values);
            setResults(res);
            if (res?.success) setValues([]);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Ошибка при регистрации');
        } finally {
            setLoading(false);
        }
    };

    const clear = () => {
        setValues([]);
        setResults(null);
        setError(null);
    };

    const cell = (item: React.ReactNode, isHeader: boolean = true) => <Border>
        <Background color={isHeader ? Colors.mainBackground2 : "transparent"}>
            <Center>
                {item}
            </Center>
        </Background>
    </Border>;

    let columns: TableColumn<T>[] = [
        {
            header: cell("№"),
            cell: {builder: (_: T, i: number) => cell(<XText fontWeight={500} children={values.length - i}/>, false)}
        },
        ...p.tableHeaders.map((x, index) => ({
            header: cell(x),
            cell: {builder: (x: T, i: number) => cell(p.tableChildrenBuilder(x, i, results?.conflicts ?? [])[index], false)}
        })),
        {
            header: "",
            cell: {
                builder: (x: T, i: number) => <Clickable onClick={() => handleRemove(i)}>
                    <XText fontWeight={500} align={"center"}>
                        <AiFillCloseCircle size={FontSizes.XL} color={Colors.danger}
                                           onMouseEnter={(e: React.MouseEvent<SVGElement>) => e.currentTarget.style.color = Colors.dangerHover}
                                           onMouseLeave={(e: React.MouseEvent<SVGElement>) => e.currentTarget.style.color = Colors.danger}
                        />
                    </XText>
                </Clickable>
            }
        },
    ]

    return <Scroll>
        <Column gap={Spacings.S}>
            <Row gap={Spacings.XL}>
                <RowElement sizePercent={70}>
                    <Column gap={Spacings.XL}>
                        {p.form({onAdd: handleAdd})}
                        {values.length > 0 && <XWindow title={p.tableTitle}>
                            <Table columns={columns} items={[...values].reverse()}/>
                            <Row gap={Spacings.S}>
                                <RowElement sizePercent={90}>
                                    <PrimaryButton disabled={loading} onClick={handleRequest}>
                                        {loading ? "Добавление..." : `Добавить (${values.length})`}
                                    </PrimaryButton>
                                </RowElement>
                                <RowElement sizePercent={10}>
                                    <SecondaryButton onClick={clear} disabled={loading} children="Очистить"/>
                                </RowElement>
                            </Row>
                            {error && <RedBorderBox children={error}/>}
                        </XWindow>}
                    </Column>
                </RowElement>
                <RowElement sizePercent={30}>
                    <RegistrationResults results={results}/>
                </RowElement>
            </Row>
        </Column>
    </Scroll>
}