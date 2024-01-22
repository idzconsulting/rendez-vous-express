import Choices from '../Choices/Choices';
import React, { useEffect, useMemo, useState } from 'react';
import { Transaction, Refs } from '../../../types/Engagement';
import { IOnSelection } from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import styles from './Projects.module.less'
import StepCard from '../StepCard/StepCard';
import { IEngagementType } from '../../../types/interfaces';
import { currentEngagement, insererStore } from '../../../stores';
import { Input } from 'antd';
import { InsererFetcher } from '../../../fetchers/role-fetchers/InsererFetcher';

interface IProjectProps extends IOnSelection {
    refs?: [IEngagementType]
}

const Projects = ({ onSelection, refs }: IProjectProps) => {
    const [form] = Form.useForm();
    const [showChoices, setShowChoices] = useState<boolean>(false)

    useEffect(() => {
        const infos = currentEngagement.getInfos();
        if (infos) {
            insererStore.setNext(true);
            setShowChoices(true)
        }
        form.setFieldsValue(infos);

    }, []);

    const saveForm = (values: any) => {
        const { bien_code_postal, proprietaire_telephone } = form.getFieldsValue()
        const isCodePostalValid = bien_code_postal?.length > 4;
        const isTelephoneValid = proprietaire_telephone?.length > 9;
        const isFormValid = isCodePostalValid && isTelephoneValid;
        setShowChoices(isFormValid);
        currentEngagement.setInfos(values);
    }
    const checkValidNumber = async () => {
        const { proprietaire_telephone } = form.getFieldsValue()
        const isTelephoneValid = proprietaire_telephone?.length > 9;
        // if (isTelephoneValid) {
        //     const response: { data: any; status: number } = await InsererFetcher.inserer(currentEngagement.getCurrentMission());
        //     if (response.data.insert_mission) currentEngagement.setMissionId(response.data.insert_mission)
        // }
    }

    const checkCodePostal = async () => {
        const { bien_code_postal } = form.getFieldsValue()
        const isCodePostalValid = bien_code_postal?.length > 4;
        // if (isCodePostalValid) {
        //     const response: { data: any; status: number } = await InsererFetcher.inserer(currentEngagement.getCurrentMission());
        //     if (response.data.insert_mission) currentEngagement.setMissionId(response.data.insert_mission)
        // }
    }

    return (
        <div>
            <StepCard title='Votre projet'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 17 }}
                    style={{ maxWidth: 700 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onValuesChange={saveForm}
                    size='large'

                >
                    <Form.Item
                        label="Code postal"
                        name="bien_code_postal"
                        className='label'

                        rules={[{ required: true, message: 'Veuillez entrez votre code postal' }]}

                    >
                        <Input size='large' maxLength={5} onChange={checkCodePostal} />
                    </Form.Item>

                    <Form.Item
                        label="Tél propriétaire"
                        name="proprietaire_telephone"
                        rules={[{ required: true, message: 'Veuillez entrez votre numéro de téléphone' }]}
                    >
                        <Input size='large' maxLength={10} onChange={checkValidNumber} />
                    </Form.Item>
                    {/* <Form.Item
                        label="Tél agent immobilier"
                        name="tel"
                        rules={[{ required: false, message: 'Veuillez entrez votre numéro de téléphone' }]}
                    >
                        <Input size='large' maxLength={10} onChange={checkValidNumber} />
                    </Form.Item> */}
                </Form>

                {showChoices && <Choices type={Refs.TRANSACTION} refs={refs} title='' onSelection={onSelection} />}
            </StepCard>
        </div>
    );
}

export default Projects;