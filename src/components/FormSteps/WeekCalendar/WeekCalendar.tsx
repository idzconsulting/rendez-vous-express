import {IOnSelection} from '../../../types/IOnSelection';
import StepCard from '../StepCard/StepCard';
import React, {useEffect, useState} from 'react';
import styles from './WeekCalendar.module.less';
import {Button} from 'antd';
import {currentEngagement} from '../../../stores';

interface IWeekCalendarProps extends IOnSelection {
}

interface ILabeledDate {
    date: Date;
    label: string;
}

enum IHours {
    '9-11' = '09h - 11h',
    '11-13' = '11h - 13h',
    '13-15' = '13h - 15h',
    '15-17' = '15h - 17h'
}

const Calendar = ({onSelection}: IWeekCalendarProps) => {
    const [numWeek, setNumWeek] = useState(0);
    const [date, setDate] = useState<Date>();
    const [dates, setDates] = useState<ILabeledDate[]>();
    const options: any = { weekday: 'long', month: 'numeric', day: 'numeric' };

    useEffect(() => {
        const date = new Date();
        setDate(date);
        initDates()
    }, []);

    const initDates = () => {
        let date = new Date();
        let dates: ILabeledDate[] = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i * 24);
            dates.push({
                date: currentDate,
                label: currentDate.toLocaleDateString('fr-FR', options)
            });
        }

        setDates(dates);
    }

    const onSelectHour = (hour: IHours, index: number) => {
        if (dates) {
            console.log(hour, dates[index]);
            currentEngagement.setRDV(dates[index].date, hour);
            onSelection();
        }
    }

    return (
        <div className={styles.calendar}>
            {dates?.map((label: ILabeledDate, index: number) =>
                <div key={label.label} className={styles.column}>
                    <span key={label.label} className={styles.header}>{label.label}</span>
                    {Object.values(IHours).map((hour) => <Button type='primary' onClick={() => onSelectHour(hour, index)}>{hour}</Button>)}
                </div>)}
        </div>
    );
}

export const WeekCalendar = ({onSelection}: IWeekCalendarProps) => {
    return (
        <StepCard title='Rendez-vous'>
            <Calendar onSelection={onSelection} />
        </StepCard>
    );
}

export default WeekCalendar;