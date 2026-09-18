import React, {useEffect, useState} from "react";
import {PairCell, PairCellValue} from "./PairCell";
import {TimeCell} from "./TimeCell";
import {ScheduleHeader} from "./ScheduleHeader";
import {VerticalHeader} from "./VerticalHeader";
import {Table, TableColumn} from "../../../components/Table/Table";
import {Colors} from "../../../style/colors";
import {formatDate, getDayOfWeek} from "../../../extensions/DateExtensions";
import {KeyValuePair} from "../../../components/Inputs/KeyValuePair";
import {ScheduleResponse} from "../../../../auto_generated_api/repositories/schedule_editor_functional/schedule_editor/models";

interface PairRowProps {
    pairCount: number;
    day: KeyValuePair;
    time: string;
    pairNumber: number;
    pairs: Map<string, PairCellValue>;
}

export const ScheduleTable: React.FC<{
    schedule: ScheduleResponse;
    onUpdateSchedule: () => void;
}> = (p) => {
    const [groupedPairs, setGroupedPairs] = useState<PairRowProps[]>([]);
    const [loading, setLoading] = useState(true);

    const {days, pairs, groups, teachers, disciplines} = p.schedule;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const disciplinesMap = new Map(disciplines!.map(d => [d.id, d]));
                const teachersMap = new Map(teachers!.map(t => [t.id, t]));

                const grouped = days!.flatMap(day => day.times!.map((time, pairNumber) => {
                        const currentPairs = pairs!.filter(p => p.dayId === day.id && p.number === pairNumber);

                        return {
                            pairCount: day.times!.length,
                            day: new KeyValuePair(day.id!, day.date!),
                            time: time.slice(0, 5),
                            pairNumber: pairNumber,
                            pairs: new Map(currentPairs.map(pair => [pair.groupId!, {
                                id: pair.id!,
                                discipline: new KeyValuePair(disciplinesMap.get(pair.disciplineId!)!.id!, disciplinesMap.get(pair.disciplineId!)!.name!),
                                cabinet: pair.cabinet!,
                                teacher: new KeyValuePair(teachersMap.get(pair.teacherId!)!.id!, teachersMap.get(pair.teacherId!)!.fullName!),
                            }]))
                        };
                    })
                ).sort((l, r) => {
                    if (l.day.value !== r.day.value) {
                        return l.day.value! > r.day.value! ? 1 : -1;
                    }
                    return l.pairNumber - r.pairNumber;
                });

                setGroupedPairs(grouped);
            } catch (error) {
                console.error('Ошибка загрузки расписания:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [days, disciplines, p.schedule, pairs, teachers]);

    if (loading) {
        return <div>Загрузка расписания...</div>;
    }

    const columns: TableColumn<PairRowProps>[] = [
        {
            header: <ScheduleHeader>День</ScheduleHeader>,
            cell: {
                isSticky: true,
                rowSpan: (x: PairRowProps) => x.pairCount,
                builder: (x: PairRowProps, _: number) => <VerticalHeader height="85%">
                    {`${getDayOfWeek(x.day.value)} (${formatDate(x.day.value)})`}
                </VerticalHeader>
            }
        },
        ...groups!.map(group => ({
            header: <ScheduleHeader>{group.name}</ScheduleHeader>,
            cell: {
                builder: (x: PairRowProps, _: number) => <PairCell
                    value={x.pairs.get(group.id!)}
                    teachers={teachers!}
                    group={new KeyValuePair(group.id!, group.name!)}
                    day={x.day}
                    pairNumber={x.pairNumber}
                    backgroundColor={new Date(x.day.value).getDay() % 2 === 0 ? Colors.secondaryBackground : Colors.secondaryBackground2}
                />
            }
        })),
        {
            header: <ScheduleHeader>Время</ScheduleHeader>,
            cell: {
                isSticky: true,
                builder: (x: PairRowProps, _: number) => <TimeCell
                    time={x.time}
                    dayId={x.day.key}
                    pairIndex={x.pairNumber}
                />
            }
        }
    ];

    return <Table columns={columns} items={groupedPairs}/>;
};