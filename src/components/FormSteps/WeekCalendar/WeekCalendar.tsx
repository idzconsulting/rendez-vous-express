import { IOnSelection } from '../../../types/IOnSelection';
import StepCard from '../StepCard/StepCard';
import React, { useEffect, useState } from 'react';
import styles from './WeekCalendar.module.less';
import { Button } from 'antd';
import { currentEngagement } from '../../../stores';
import { screenStore } from '../../../stores';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import allLocales from '@fullcalendar/core/locales-all'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"

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

const Calendar = ({ onSelection }: IWeekCalendarProps) => {
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

    const onSelectHour = (date: any) => {
        alert('selected ' + date.startStr.split('+')[0] + ' to ' + date.endStr);
        if (date) {
            currentEngagement.setRDV(date.startStr.split('+')[0]);
            onSelection();
        }
    }

    return (
        <div className={screenStore.getIsMobile() ? styles.calendarMobile : styles.calendar}>
            <FullCalendar
                plugins={[timeGridPlugin,interactionPlugin]}

                headerToolbar={{
                    right: "today next",
                }}
                allDaySlot={true}
                height='100%'
                slotDuration={'02:00'}
                slotMinTime={'07:00'}
                slotMaxTime={'19:00'}
                slotMinWidth={200}
                weekends={false}
                locale={'fr'}
                locales={allLocales}
                editable={true}
                selectable={true}
                select={onSelectHour}
            />
        </div>
    );
}

export const WeekCalendar = ({ onSelection }: IWeekCalendarProps) => {
    return (
        <StepCard title='Rendez-vous'>
            <Calendar onSelection={onSelection} />
        </StepCard>
    );
}

export default WeekCalendar;