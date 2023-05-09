import Choices from '../Choices/Choices';
import React, { useEffect, useMemo, useState } from 'react';
import { Transaction, Refs } from '../../../types/Engagement';
import { IOnSelection } from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import { MaskedInput } from 'antd-mask-input';
import StepCard from '../StepCard/StepCard';
import { IEngagementType } from '../../../types/interfaces';
import { currentEngagement, screenStore } from '../../../stores';
import { Input, Radio } from 'antd';

interface IProjectProps extends IOnSelection {
    refs?: [IEngagementType]
}

const Biens = ({ onSelection, refs }: IProjectProps) => {
    const [form] = Form.useForm();
    const [hasAppart, setHasAppart] = useState<boolean | undefined>();
    const [isChauffageCollectif, setIsChauffageCollectif] = useState<boolean | undefined>();
    useEffect(() => {
        const bien = currentEngagement.getProperty(Refs.BIEN);
        if(bien?.nom === 'Appartement') setHasAppart(true)
    }, []);

    const onOptionChanged = (e: any) => {
        const value: boolean = e.target.value;
        setIsChauffageCollectif(value);
        currentEngagement.setInfos({chauffage_collectif: value});
        onSelection();
    }

    const checkSelectionBien = () => {
        const selectedOption: any = currentEngagement.getProperty(Refs.BIEN);
        console.log('jo',selectedOption.nom)
        if(selectedOption.nom === 'Appartement') setHasAppart(true)
        else onSelection()
    }

    const saveForm = (values: any) => {
        currentEngagement.setInfos(values);
    }


    return (
        <div>
            <StepCard title='Votre bien'>
                <Choices type={Refs.BIEN} refs={refs} title='' onSelection={checkSelectionBien} />
                <br/>
                {hasAppart
                    ? <StepCard title='Votre chauffage est collectif ?'>
                        <Radio.Group buttonStyle='solid' onChange={onOptionChanged}
                            size={screenStore.getSize()}>
                            <Radio.Button value={false}>Non</Radio.Button>
                            <Radio.Button value={true}>Oui</Radio.Button>
                        </Radio.Group>
                    </StepCard>
                    : <></>
                }
            </StepCard>
        </div>
    );
}

export default Biens;