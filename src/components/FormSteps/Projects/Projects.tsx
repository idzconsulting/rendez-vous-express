import Choices from '../Choices/Choices';
import React, { useEffect } from 'react';
import {Project, Refs} from '../../../types/Engagement';
import {IOnSelection} from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import {MaskedInput} from 'antd-mask-input';
import StepCard from '../StepCard/StepCard';
import {IEngagementType} from '../../../types/interfaces';
import {currentEngagement} from '../../../stores';

interface IProjectProps extends IOnSelection {
    refs?:[IEngagementType]
}

const Projects = ({onSelection,refs}: IProjectProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        const infos = currentEngagement.getInfos();
        form.setFieldsValue(infos);
    }, []);

    return (
        <div>
            <StepCard title='Votre projet'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    // onFinish={saveForm}
                >
                    <Form.Item
                        label="Code postal"
                        name="cp"
                        rules={[{required: true, message: 'Veuillez entrez votre code postal'}]}
                    >
                        <MaskedInput mask='00000'/>
                    </Form.Item>

                    <Form.Item
                        label="Numéro de téléphone"
                        name="phone"
                        rules={[{required: true, message: 'Veuillez entrez votre numéro de téléphone'}]}
                    >
                        <MaskedInput mask='00 00 00 00 00'/>
                    </Form.Item>
                </Form>

                <Choices type={Refs.TRANSACTION} refs={refs} title='' onSelection={onSelection}/>
                </StepCard>
        </div>
    );
}

export default Projects;