import {IEngagementType} from '../../../types/Engagement';
import {Button} from 'antd';
import {labelsMap} from '../../../types/Labels';
import styles from './Choices.module.less';
import {useEffect, useState} from 'react';
import {currentEngagement} from '../../../stores';
import StepCard from '../StepCard/StepCard';
import {IOnSelection} from '../../../types/IOnSelection';

interface IChoicesProps extends IOnSelection {
    title: string;
    type: IEngagementType;
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
        <StepCard title={title}>
            <div className={styles.choices}>
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
