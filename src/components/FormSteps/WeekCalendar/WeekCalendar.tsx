import { IOnSelection } from '../../../types/IOnSelection';
import StepCard from '../StepCard/StepCard';
import React, { useEffect, useState } from 'react';
import styles from './WeekCalendar.module.less';
import { addMinutes, format } from 'date-fns';
import { currentEngagement } from '../../../stores';
import { screenStore } from '../../../stores';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { RdvFetcher } from '../../../fetchers/role-fetchers/RdvFetcher';

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
    const [event, setEvents] = useState<any>([]);
    const [dates, setDates] = useState<ILabeledDate[]>();
    const [selectedStart, setSelectedStart] = useState(null);
    const options: any = { weekday: 'long', month: 'numeric', day: 'numeric' };

    const getRdvIdeal = async (cp: any, diagnostics: any,type_surface_id:string) => {
        return RdvFetcher.getRdvIdeal(cp, diagnostics,type_surface_id);
    }

    const getIdTechAndPrix = (info: string) => {

        const segments = info.split('|');

        const id_technicien = segments[0];
        const prix = segments[segments.length - 1];

        return { id_technicien, prix };
    }

    const filterUniqueEvents = (missions: any[]) => {
        const uniqueEvents: { [key: string]: any } = {};
    
        missions.forEach((item: any) => {
            const { id_technicien, prix } = getIdTechAndPrix(item.technicien_distance);
    
            const creneau = item.creneau;
            const existingEvent = uniqueEvents[creneau];
    
            if (!existingEvent || parseFloat(prix) < parseFloat(getIdTechAndPrix(existingEvent.technicien_distance).prix)) {
                uniqueEvents[creneau] = {
                    title: prix + '€',
                    start: creneau,
                    end: addMinutes(new Date(creneau), +30),
                    extendedProps: {
                        id_technicien,
                        prix
                    },
                    technicien_distance: item.technicien_distance,
                };
            }
        });
    
        return Object.values(uniqueEvents);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const diagnostics = currentEngagement.getCurrentEngagement().diagnostics?.map(({ id }) => id);
            const cp = currentEngagement.getInfos()?.bien_code_postal;
            const type_surface_id = currentEngagement.getCurrentMission()?.type_surface_id;
            const response: any = await getRdvIdeal(cp, diagnostics,type_surface_id);
    
            const events = filterUniqueEvents(response.data.missions || []);
    
            setEvents(events);
        };
    
        fetchData();
        const date = new Date();
        setDate(date);
        initDates();
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
     
        const {prix,id_technicien} = selectInfo.event._def.extendedProps
        const date: any = format(selectInfo.event._instance.range.start, 'yyyy-MM-dd HH:mm:ss')
        if (selectedStart === null) {
            setSelectedStart(date);
            currentEngagement.setRDV(date);
            currentEngagement.setInfos({prix,id_technicien})
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
                slotLabelContent={customSlotLabelContent}
                slotDuration={{ minute: 30 }}
                slotLabelInterval={{ minute: 30 }}
                slotMinTime={'08:00'} // Heure de début de la journée
                slotMaxTime={'18:30'}
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
                eventClick={handleDateSelect}
                // select={handleDateSelect}
                //selectLongPressDelay={500}
                longPressDelay={200}
                events={event}
                eventContent={({ event }) => (
                    <>
                        <div style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            position: 'absolute',
                            left: '5px',
                            right: '5px',
                            top: '45px',
                            fontSize: 'large'
                        }}>{event.title}</div>
            </>
                )}
            />
        </div>
    );
}

export const WeekCalendar = ({ onSelection }: IWeekCalendarProps) => {
    return (
        <StepCard title='Rendez-vous'>
            <div style={{
                textAlign: 'center',
                fontWeight: 'bold'
            }}>
                <Calendar onSelection={onSelection} />
            </div>
        </StepCard>
    );
}

export default WeekCalendar;