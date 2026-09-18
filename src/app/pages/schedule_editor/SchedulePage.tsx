import React, {useCallback, useEffect, useState} from "react";
import {ScheduleTable} from "./Table/ScheduleTable";
import {ScheduleNavigation} from "./ScheduleNavigation";
import {Page} from "../../components/Page";
import {ColumnElement} from "../../components/Primitives/Column/ColumnElement";
import {Scroll} from "../../components/Primitives/Scroll";
import {
    ScheduleEditorRepository
} from "../../../auto_generated_api/repositories/schedule_editor_functional/schedule_editor/schedule_editor_repository";
import {ScheduleResponse} from "../../../auto_generated_api/repositories/schedule_editor_functional/schedule_editor/models";

export const SchedulePage: React.FC = () => {
    const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getWeekStart = (date: Date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date()));

    const loadSchedule = useCallback(async (date: Date) => {
        setLoading(true);
        setError(null);
        try {
            setSchedule(await ScheduleEditorRepository.get(date.toISOString()));
        } catch (err) {
            setError('Ошибка загрузки расписания');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSchedule(weekStart);
    }, [weekStart, loadSchedule]);

    const handleAddWeek = async () => {
        const nextWeekStart = new Date(weekStart);
        nextWeekStart.setDate(weekStart.getDate() + 7);
        setWeekStart(nextWeekStart);
    };

    if (loading) return <Page>
        <div style={{textAlign: 'center', padding: 40}}>Загрузка...</div>
    </Page>;

    if (error) return <Page>
        <div style={{textAlign: 'center', padding: 40, color: 'red'}}>{error}</div>
    </Page>;

    if (!schedule) return <Page>
        <div style={{textAlign: 'center', padding: 40}}>Нет данных</div>
    </Page>;

    return <Page>
        <ColumnElement sizePercent={15}>
            <ScheduleNavigation weekStart={weekStart} onAddWeek={handleAddWeek} setWeekStart={setWeekStart}/>
        </ColumnElement>
        <Scroll>
            <ScheduleTable schedule={schedule} onUpdateSchedule={() => loadSchedule(weekStart)}/>
        </Scroll>
    </Page>;
};