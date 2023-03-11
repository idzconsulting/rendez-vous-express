import {Button, InputNumber, Radio, Space} from 'antd';
import StepCard from '../StepCard/StepCard';
import {useEffect, useState} from 'react';
import styles from './Annexes.module.less';
import {currentEngagement, screenStore} from '../../../stores';
import {IOnSelection} from '../../../types/IOnSelection';

interface IAnnexesProps extends IOnSelection {
}

const Annexes = ({onSelection}: IAnnexesProps) => {
    const [hasAnnexes, setHasAnnexes] = useState<boolean | undefined>();
    const [annexes, setAnnexes] = useState<number | undefined>();

    useEffect(() => {
        const savedAnnexes: number | undefined = currentEngagement.getAnnexes();
        console.log(savedAnnexes)
        setHasAnnexes(!!savedAnnexes ?? undefined);
        setAnnexes(savedAnnexes);
    }, []);

    const onOptionChanged = (e: any) => {
        const value = e.target.value;
        console.log(value)
        setHasAnnexes(e.target.value);
        (value == false || value === undefined) && (saveAnnexes());
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
                <Radio.Group buttonStyle='solid' onChange={onOptionChanged}
                             size={screenStore.getSize()}>
                    <Radio.Button value={false}>Non, je n'ai pas d'annexes</Radio.Button>
                    <Radio.Button value={true}>Oui</Radio.Button>
                </Radio.Group>

                {hasAnnexes
                    ? <div>
                        <InputNumber className={styles.annexesNumber} addonAfter={<span>m²</span>}
                                     value={annexes} onChange={onChangeAnnexes}
                                     size='large' min={1} placeholder='Surface totale de vos annexes'></InputNumber>
                        <Space size={screenStore.getSize()}/>
                        <Button type='primary' size={screenStore.getSize()} disabled={!annexes}
                                onClick={saveAnnexes}>Valider</Button>
                    </div>
                    : <></>
                }
            </div>
        </StepCard>
    );
}

export default Annexes;