import { IOnSelection } from '../../../types/IOnSelection';
import StepCard from '../StepCard/StepCard';
import React, { useEffect, useState } from 'react';
import styles from './WeekCalendar.module.less';
import { format } from 'date-fns';
import { currentEngagement } from '../../../stores';
import { screenStore } from '../../../stores';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
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
    const [date, setDate] = useState<Date>();
    const [dates, setDates] = useState<ILabeledDate[]>();
    const [selectedStart, setSelectedStart] = useState(null);
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
        console.log({ date })
        if (date) {
            currentEngagement.setRDV(date.dateStr.split('+')[0]);
            onSelection();
        }
    }

    const customSlotLabelContent = (arg: any) => {
        const startHour = arg.date.getHours();
        const startMinute = arg.date.getMinutes();
        return `${startHour}:${startMinute === 0 ? '00' : '30'}`;
    };

    const handleDateSelect = (selectInfo: any) => {
        const date: any = format(selectInfo.start, 'yyyy-MM-dd HH:mm:ss')
        if (selectedStart === null) {
            setSelectedStart(date);
            currentEngagement.setRDV(date);
            onSelection();
        }
    };

    return (
        <div className={screenStore.getIsMobile() ? styles.calendarMobile : styles.calendar}>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                headerToolbar={{
                    right: "prev next",
                }}
                allDaySlot={true}
                height='100%'

                slotDuration={{ minutes: 30 }}
                slotLabelInterval={{ minutes: 30 }}
                slotLabelContent={customSlotLabelContent}
                slotMinTime={'07:00'}
                slotMaxTime={'18:00'}
                slotMinWidth={200}
                weekends={false}
                locale={'fr'}
                editable={true}
                selectAllow={(selectInfo) => {
                    // Assurez-vous que la sélection commence et se termine à des moments valides ici
                    return true; // ou false en fonction de votre logique
                }}
                // dateClick={handleDateSelect}
                selectable={true}
                // eventClick={handleDateSelect}
                select={handleDateSelect}
                //selectLongPressDelay={500}
                longPressDelay={120}
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