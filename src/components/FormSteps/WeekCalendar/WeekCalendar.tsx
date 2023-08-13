import React, { useEffect, useState } from 'react';
import { RdvFetcher } from '../../../fetchers/role-fetchers/RdvFetcher';
import { IOnSelection } from '../../../types/IOnSelection';
import StepCard from '../StepCard/StepCard';
import { screenStore } from '../../../stores';
import styles from './WeekCalendar.module.less';
import { Form, Select } from 'antd';

interface IWeekCalendarProps extends IOnSelection { }

const formatDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const formatTime = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const Calendar = ({ onSelection }: IWeekCalendarProps) => {
    const [allCESData, setAllCESData] = useState<number[][]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(-1);
    const [timeSlots, setTimeSlots] = useState<number[]>([]);

    const getDatesForMeeting = async () => {
        const { data } = await RdvFetcher.getRdvAvailable();
        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
            const { creneau } = await getDatesForMeeting();
            setAllCESData(creneau);
        };

        fetchData();
    }, []);

    const handleDaySelect = (value: any) => {

        const selectedDayIndex = Number(value);
        setSelectedDay(selectedDayIndex);

        // Update time slots based on the selected day
        if (selectedDayIndex >= 0) {
            const selectedDaySlots = allCESData[selectedDayIndex];
            setTimeSlots(selectedDaySlots);
        } else {
            setTimeSlots([]);
        }
    };

    return (
        <div className={screenStore.getIsMobile() ? styles.calendarMobile : styles.calendar}>
            <h1>Reserver votre rendez-vous</h1>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 1000 }}
            >
                <Form.Item label="Quel jour desirez-vous?">
                    <Select  onSelect={handleDaySelect}>
                        {allCESData.map((dayData, index) => (
                            <Select.Option value={index} key={index}>
                                   {formatDate(dayData[0])}</Select.Option>
                        ))}

                    </Select>
                </Form.Item>
                <Form.Item label="Quel heure desirez-vous?">
                    <Select>
                        {timeSlots.map((timestamp, index) => (
                            <Select.Option value={timestamp} key={index} >
                                {formatTime(timestamp)}</Select.Option>
                        ))}

                    </Select>
                </Form.Item>
            </Form>
            {/* <select value={selectedDay} onChange={handleDaySelect}>
        <option value={-1}>Sélectionner un jour</option>
        {allCESData.map((dayData, index) => (
          <option key={index} value={index}>
            {formatDate(dayData[0])}
          </option>
        ))}
      </select>

      <h2>Horaires pour le jour sélectionné</h2>
      <select>
        {timeSlots.map((timestamp, index) => (
          <option key={index} value={timestamp}>
            {formatTime(timestamp)}
          </option>
        ))}
      </select> */}
        </div>
    );
};

const WeekCalendar = ({ onSelection }: IWeekCalendarProps) => {
    return (
        <StepCard title="Rendez-vous">
            <Calendar onSelection={onSelection} />
        </StepCard>
    );
};

export default WeekCalendar;