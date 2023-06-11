import StepCard from '../StepCard/StepCard';
import { IOnSelection } from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import { AutoComplete, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { currentEngagement } from '../../../stores';
import styles from './Infos.module.less';
import { AddressesFetcher, AddressesResponses } from '../../../fetchers/role-fetchers/AddressesFetcher';
import TextArea from 'antd/es/input/TextArea';

interface IInfosProps extends IOnSelection {
}

const Infos = ({ onSelection }: IInfosProps) => {
    const [form] = Form.useForm();
    const [options, setOptions] = useState<{ value: string, code: number }[]>([]);

    const onSelect = (data: any) => {
        console.log('onSelect', data);
    };

    const onChange = (data: any) => {
        console.log(data);
    };

    const getOptions = async (text: string) => {
        const response: { data: AddressesResponses; status: number } = await AddressesFetcher.searchAddress(text);

        setOptions([]);
        if (response.status === 200) {
            const options: { value: string, code: number }[] = [];
            response.data.adresses.forEach((adresse) => {
                options.push({ value: adresse.adresse, code: adresse.code_postal })
            });

            setOptions(options);
        }
    }

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
                style={{ maxWidth: 700 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={saveForm}
            >
                <Form.Item
                    label="Nom et prénom"
                    name="proprietaire_nom"
                    rules={[{ required: true, message: 'Veuillez entrez votre nom et prénom' }]}
                >
                    <Input   size='large' style={{ textTransform: 'capitalize' }} />
                </Form.Item>

                <Form.Item
                    label="Addresse du bien"
                    name="bien_adresse"
                    rules={[{ required: true, message: 'Veuillez entrez une addresse' }]}
                >
                    <AutoComplete
                        size='large'
                        options={options}
                        onSelect={onSelect}
                        onSearch={(text: string) => getOptions(text)}
                        onChange={onChange}
                        style={{ textTransform: 'capitalize' }} />
                </Form.Item>

                <Form.Item
                    label="Addresse email"
                    name="proprietaire_email"
                  
                    rules={[{ type: 'email', message: 'Veuillez entrez votre addresse email' }]}
                >
                    <Input size='large'   className='csslabel'/>
                </Form.Item>

                <Form.Item
                    label="Notes"
                    name="note"
                    className='csslabel'
                >
                    <TextArea  size='large' />
                </Form.Item>


                {/* <Form.Item
                    label="Mon agence"
                    name="agence"
                >
                    <Input style={{textTransform: 'capitalize'}} />
                </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 8 }} className={styles.formButtons}>
                    <Button type="primary" htmlType="submit">
                        Valider
                    </Button>
                    <Button type="primary" htmlType="reset" style={{ marginLeft: 10 }}>
                        Réinitialiser
                    </Button>
                </Form.Item>
            </Form>
        </StepCard>
    )
}

export default Infos;