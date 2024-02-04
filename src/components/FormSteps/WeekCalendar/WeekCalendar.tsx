import { IOnSelection } from '../../../types/IOnSelection';
import StepCard from '../StepCard/StepCard';
import { useEffect, useState } from 'react';
import styles from './WeekCalendar.module.less';
import { addMinutes, format } from 'date-fns';
import { currentEngagement, insererStore } from '../../../stores';
import { screenStore } from '../../../stores';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { RdvFetcher } from '../../../fetchers/role-fetchers/RdvFetcher';
import LoadingSpinner from '../../Microcomponents/LoadingSpinner/LoadingSpinner';

interface IWeekCalendarProps extends IOnSelection {
}

interface ILabeledDate {
    date: Date;
    label: string;
}


const Calendar = ({ onSelection }: IWeekCalendarProps) => {
    const [event, setEvents] = useState<any>([]);
    const [dates, setDates] = useState<ILabeledDate[]>();
    const [initDate, setInitDate] = useState<Date>();
    const [selectedStart, setSelectedStart] = useState(null);
    const options: any = { weekday: 'long', month: 'numeric', day: 'numeric' };
    const [isLoading, setIsLoading] = useState(true);
    const [displayPrice] = useState(currentEngagement?.getCurrentEngagement()?.project?.id != 3)


    const getRdvIdeal = async (cp: string, diagnostics: string[], type_surface_id: string) => {
        const localStorageKey = "rdv_ideal";

        const cachedData = localStorage.getItem(localStorageKey);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (
                parsedData.cp === cp &&
                JSON.stringify(parsedData.diagnostics) === JSON.stringify(diagnostics) &&
                parsedData.type_surface_id === type_surface_id
            ) {
                return parsedData.data;
            }
        }

        const response: any = await RdvFetcher.getRdvIdeal(cp, diagnostics, type_surface_id);
        const newData = {
            cp,
            diagnostics,
            type_surface_id,
            data: response.data
        };
        localStorage.setItem(localStorageKey, JSON.stringify(newData));
        return newData.data;
    }

    const getIdTechAndPrix = (info: string) => {
        const segments = info?.split('|');

        const id_technicien = segments[0];
        const prix = segments[segments?.length - 1];

        return { id_technicien, prix };
    }

    const filterUniqueEvents = (missions: any[]) => {
        const uniqueEvents: { [key: string]: any } = {};
        let overallMinPrice = Number.POSITIVE_INFINITY;
        let eventWithMinPrice: any = null;

        missions.forEach((item: any) => {
            const { id_technicien, prix } = getIdTechAndPrix(item.technicien_distance);
            const creneau = item.creneau;
            const existingEvent = uniqueEvents[creneau];

            if (!existingEvent || parseFloat(prix) < parseFloat(getIdTechAndPrix(existingEvent.technicien_distance).prix)) {
                uniqueEvents[creneau] = {
                    title: displayPrice ? prix + '€' : 'Rdv idéal',
                    start: creneau,
                    end: addMinutes(new Date(creneau), +30),
                    extendedProps: {
                        id_technicien,
                        prix
                    },
                    technicien_distance: item.technicien_distance,
                    textColor: 'blue',
                    backgroundColor: 'transparent'
                };

                if (parseFloat(prix) < overallMinPrice) {
                    overallMinPrice = parseFloat(prix);
                    eventWithMinPrice = uniqueEvents[creneau];
                } else if (parseFloat(prix) === overallMinPrice) {
                    uniqueEvents[creneau].backgroundColor = 'transparent';
                    uniqueEvents[creneau].textColor = 'blue';
                }
            }
        });

        if (eventWithMinPrice) {
            eventWithMinPrice.textColor = 'orange';
            eventWithMinPrice.backgroundColor = 'transparent';
        }

        return Object.values(uniqueEvents);
    };



    useEffect(() => {
        const fetchData = async () => {
            const diagnostics = currentEngagement.getCurrentEngagement().diagnostics?.map(({ id }) => id) || [];
            const cp = currentEngagement.getInfos()?.bien_code_postal || '';
            const type_surface_id = currentEngagement.getCurrentMission()?.type_surface_id || '';
            let events = []
            try {
                const { missions }: any = await getRdvIdeal(cp, diagnostics, type_surface_id);
                events = filterUniqueEvents(missions);
            } catch (error) {
                console.error('An error occurred:', error);
            }
            setInitDate(events[0]?.start ? new Date(events[0].start) : new Date())
            setEvents(events);
            setIsLoading(false);
        };

        if (currentEngagement.getCurrentEngagement()?.infos?.rdv_jour) insererStore.setNext(true);
        fetchData();


    }, []);



    const customSlotLabelContent = (arg: any) => {
        const startHour = arg.date.getHours();
        const startMinute = arg.date.getMinutes();
        return `${startHour}:${startMinute === 0 ? '00' : '30'}`;
    };

    const handleDateSelectEvent = (selectInfo: any) => {

        const { prix, id_technicien } = selectInfo.event._def.extendedProps
        const startDate = selectInfo.event._instance.range.start;

        const date: any = new Date(startDate.getTime()).toISOString().slice(0, 19).replace('T', ' ');

        if (prix) {
            setSelectedStart(date);
            currentEngagement.setRDV(date);
            currentEngagement.setInfos({ prix, id_technicien })
            onSelection();
        }
    };

    const handleDateSelect = (selectInfo: any) => {
        const date: any = format(selectInfo?.date, 'yyyy-MM-dd HH:mm:ss');
        setSelectedStart(date);
        currentEngagement.setRDV(date);
        onSelection();

    };

    return (
        <div className={screenStore.getIsMobile() ? styles.calendarMobile : styles.calendar}>
            {isLoading ? <LoadingSpinner /> :
                initDate &&
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
                    initialDate={initDate}
                    editable={true}
                    selectAllow={(selectInfo) => {
                        return true;
                    }}
                    eventClick={handleDateSelectEvent}
                    dateClick={handleDateSelect}
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
                />}
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