import Choices from '../Choices/Choices';
import React from 'react';
import {Project} from '../../../types/Engagement';
import {IOnSelection} from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import {MaskedInput} from 'antd-mask-input';
import StepCard from '../StepCard/StepCard';

interface IProjectProps extends IOnSelection {
}

const Projects = ({onSelection}: IProjectProps) => {
    const [form] = Form.useForm();

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
                        name="postalCode"
                        rules={[{required: true, message: 'Veuillez entrez votre code postal'}]}
                    >
                        <MaskedInput mask='00000'/>
                    </Form.Item>

                    <Form.Item
                        label="Numéro de téléphone"
                        name="phoneNumber"
                        rules={[{required: true, message: 'Veuillez entrez votre numéro de téléphone'}]}
                    >
                        <MaskedInput mask='00 00 00 00 00'/>
                    </Form.Item>
                </Form>

                <Choices type={Project} title='' onSelection={onSelection}/>
                </StepCard>
        </div>
    );
}

export default Projects;