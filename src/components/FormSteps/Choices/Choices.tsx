import {IEngagementType} from '../../../types/Engagement';
import {Button, Typography} from 'antd';
import {labelsMap} from '../../../types/Labels';
import styles from './Choices.module.less';
import {useEffect, useState} from 'react';
import {currentEngagement} from '../../../stores';
import StepCard from '../Card/StepCard';

interface IChoicesProps {
    title: string;
    type: IEngagementType;
    onSelection: () => void;
}

const Choices = ({title, type, onSelection}: IChoicesProps) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    useEffect(() => {
        const selectedOption: any = currentEngagement.getProperty(type);
        setSelectedOption(selectedOption);
    }, [title, type]);

    const onButtonClick = (choice: string) => {
        setSelectedOption(choice);
        currentEngagement.setProperty(type, choice);
        setTimeout(onSelection, 200);
    }

    return (
        <StepCard>
            <div className={styles.choices}>
                <Typography.Title level={2}>{title}</Typography.Title>

                <div className={styles.buttonsContainer}>
                    {Object.values(type).map((label) =>
                        <Button key={label} type={selectedOption === label ? 'primary' : 'default'}
                                size='large'
                                onClick={() => onButtonClick(label)}>{labelsMap.get(label)}</Button>)}
                </div>
            </div>
        </StepCard>
    );
}

export default Choices;
