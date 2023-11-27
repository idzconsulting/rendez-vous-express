import {IEngagementType} from '../../../types/interfaces';
import {Refs} from '../../../types/Engagement';
import {Button} from 'antd';
import {labelsMap} from '../../../types/Labels';
import styles from './Choices.module.less';
import {useEffect, useLayoutEffect, useState} from 'react';
import {currentEngagement, insererStore, screenStore} from '../../../stores';
import StepCard from '../StepCard/StepCard';
import {IOnSelection} from '../../../types/IOnSelection';
import {observer} from 'mobx-react';

interface IChoicesProps extends IOnSelection {
    title: string;
    type: Refs;
    refs?:any[] 
}

const Choices = observer(({title, type, onSelection,refs = []}: IChoicesProps) => {
    const [selectedOption, setSelectedOption] = useState<any>();
    
    if(type === Refs.ANNEE_CONSTRUCTION) refs[4] = {id:'',nom:'je ne sais pas'}

    useEffect(() => {
        const selectedOption: any = currentEngagement.getProperty(type);
        if(selectedOption) insererStore.setNext(true);
        setSelectedOption(selectedOption);
    }, [title, type,refs]);


    const onButtonClick = (choice: any) => {
        setSelectedOption(choice);
        currentEngagement.setProperty(type, choice);
        onSelection();
    }

    return (
        <StepCard title={title}>
            <div className={styles.choices}>
                <div className={styles.buttonsContainer}>
                    {refs?.map((ref) =>
                        <Button key={ref.id} type={selectedOption?.id === ref.id ? 'primary' : 'default'}
                                size={screenStore.getSize()}
                                className='button-select'
                                onClick={() => onButtonClick(ref)}>{ref.nom}</Button>)}
                </div>
            </div>
        </StepCard>
    );
});

export default Choices;
