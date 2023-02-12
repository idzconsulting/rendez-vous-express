import {Button, InputNumber, Radio, Space} from 'antd';
import StepCard from '../StepCard/StepCard';
import {useEffect, useState} from 'react';
import styles from './Annexes.module.less';
import {currentEngagement} from '../../../stores';
import {IOnSelection} from '../../../types/IOnSelection';

interface IAnnexesProps extends IOnSelection {
}

const Annexes = ({onSelection}: IAnnexesProps) => {
    const [hasAnnexes, setHasAnnexes] = useState<number | undefined>(0);
    const [annexes, setAnnexes] = useState<number | undefined>();

    useEffect(() => {
        const savedAnnexes: number | undefined = currentEngagement.getAnnexes();
        setHasAnnexes(savedAnnexes);
        setAnnexes(savedAnnexes);
    }, []);

    const onOptionChanged = (e: any) => {
        const value = e.target.value;
        setHasAnnexes(e.target.value);
        (value === false) && (saveAnnexes());
    }

    const onChangeAnnexes = (e: any) => {
        setAnnexes(e);
    }

    const saveAnnexes = () => {
        currentEngagement.setAnnexes(annexes);
        onSelection();
    }

    return (
        <StepCard title='Avez-vous des annexes ?'>
            <div className={styles.annexesContainer}>
                <Radio.Group defaultValue={hasAnnexes} buttonStyle='solid' onChange={onOptionChanged} size='large'>
                    <Radio.Button value={false}>Non, je n'ai pas d'annexes</Radio.Button>
                    <Radio.Button value={true}>Oui</Radio.Button>
                </Radio.Group>

                {hasAnnexes
                    ? <div>
                        <InputNumber className={styles.annexesNumber} addonAfter={<span>m²</span>}
                                     value={annexes} onChange={onChangeAnnexes}
                                     size='large' min={1} placeholder='Surface totale de vos annexes'></InputNumber>
                        <Space size='large'/>
                        <Button type='primary' size='large' disabled={!annexes} onClick={saveAnnexes}>OK</Button>
                    </div>
                    : <></>
                }
            </div>
        </StepCard>
    );
}

export default Annexes;