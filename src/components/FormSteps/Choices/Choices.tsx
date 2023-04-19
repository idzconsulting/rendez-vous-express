import {IEngagementType} from '../../../types/interfaces';
import {Refs} from '../../../types/Engagement';
import {Button} from 'antd';
import {labelsMap} from '../../../types/Labels';
import styles from './Choices.module.less';
import {useEffect, useState} from 'react';
import {currentEngagement, screenStore} from '../../../stores';
import StepCard from '../StepCard/StepCard';
import {IOnSelection} from '../../../types/IOnSelection';
import {observer} from 'mobx-react';

interface IChoicesProps extends IOnSelection {
    title: string;
    type: any;
    refs?:[any]
}

const Choices = observer(({title, type, onSelection,refs}: IChoicesProps) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    useEffect(() => {
        const selectedOption: any = currentEngagement.getProperty(type);
        setSelectedOption(selectedOption);
        console.log({refs})
    }, [title, type,refs]);

    const onButtonClick = (choice: string) => {
        setSelectedOption(choice);
        currentEngagement.setProperty(type, choice);
        onSelection();
    }

    return (
        <StepCard title={title}>
            <div className={styles.choices}>
                <div className={styles.buttonsContainer}>
                    {refs?.map((ref) =>
                        <Button key={ref.id} type={selectedOption === ref.id ? 'primary' : 'default'}
                                size={screenStore.getSize()}
                                onClick={() => onButtonClick(ref.id)}>{ref.nom}</Button>)}
                </div>
            </div>
        </StepCard>
    );
});

export default Choices;
