import StepCard from '../StepCard/StepCard';
import {IOnSelection} from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import {Button, Input} from 'antd';
import {MaskedInput} from 'antd-mask-input';
import {useEffect} from 'react';
import {currentEngagement} from '../../../stores';
import styles from './Infos.module.less';

interface IInfosProps extends IOnSelection {
}

const Infos = ({onSelection}: IInfosProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        const infos = currentEngagement.getInfos();
        form.setFieldsValue(infos);
    }, []);

    const saveForm = (values: any) => {
        currentEngagement.setInfos(values);
        onSelection();
    }

    return (
        <StepCard title='Informations'>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={saveForm}
            >
                <Form.Item
                    label="Nom et prénom"
                    name="name"
                    rules={[{ required: true, message: 'Veuillez entrez votre nom et prénom' }]}
                >
                    <Input style={{textTransform: 'capitalize'}} />
                </Form.Item>

                <Form.Item
                    label="Addresse du bien"
                    name="address"
                    rules={[{ required: true, message: 'Veuillez entrez une addresse' }]}
                >
                    {/*<LocationSearchInput address={'Rue du lt'} clearAddress={''} onChange={(e:any) => {console.log(e)}} onAddressSelect={(e:any) => {console.log(e)}} />*/}
                    <Input style={{textTransform: 'capitalize'}} />
                </Form.Item>

                <Form.Item
                    label="Numéro de téléphone"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Veuillez entrez votre numéro de téléphone' }]}
                >
                    <MaskedInput mask='00 00 00 00 00'/>
                </Form.Item>

                <Form.Item
                    label="Addresse email"
                    name="email"
                    rules={[{ type: 'email', message: 'Veuillez entrez votre addresse email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mon agence"
                    name="agence"
                >
                    <Input style={{textTransform: 'capitalize'}} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8 }} className={styles.formButtons}>
                    <Button type="primary" htmlType="submit">
                        Valider
                    </Button>
                    <Button type="primary" htmlType="reset" style={{marginLeft: 10}}>
                        Réinitialiser
                    </Button>
                </Form.Item>
            </Form>
        </StepCard>
    )
}

export default Infos;