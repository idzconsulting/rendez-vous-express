import StepCard from '../StepCard/StepCard';
import { IOnSelection } from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import { AutoComplete, Button, Input, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { currentEngagement, screenStore } from '../../../stores';
import styles from './Partner.module.less';
import { AddressesFetcher, AddressesResponses } from '../../../fetchers/role-fetchers/AddressesFetcher';
import { PartnersFetcher } from '../../../fetchers/role-fetchers/PartnersFetcher';

interface IInfosProps extends IOnSelection {
}

enum SurPlace {
    Locataire = 'Locataire',
    Agent = 'Agent',
    Proprietaire = 'Proprietaire',
    Autre = 'Autre'
}

const Partner = ({ onSelection }: IInfosProps) => {
    const [formAgentImmo] = Form.useForm();
    const [formLocataire] = Form.useForm();
    const [formAutreSurPlace] = Form.useForm();
    const [options, setOptions] = useState<{ value: string, code: number }[]>([]);
    const [autreSurPlace, setAutreSurPlace] = useState<boolean>(false);
    const [locataireSurPlace, setlocataireSurPlace] = useState<boolean>(false);

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

    // useEffect(() => {
    //     const infos = currentEngagement.getInfos();
    //     form.setFieldsValue(infos);
    // }, []);

    const saveForm = (values: any) => {
        currentEngagement.setInfos(values);
        // onSelection();
    }

    const completeAgent = async (e: any) => {
        const value = e.target.value;
        if(value.length > 9){
            const { data } = await PartnersFetcher.getPartner({telephone:value,type_partenaire:1});
            const { nom,mail } = data[0]
            console.log( { nom,mail })
            formAgentImmo.setFieldValue('nom',nom)
            formAgentImmo.setFieldValue('mail',mail)
        }
    }

    const onOptionChanged = (e: any) => {
        const value: string = e.target.value;
        if (value === SurPlace.Autre) {
            setAutreSurPlace(true)
        } else {
            setAutreSurPlace(false)
        }
        if (value === SurPlace.Locataire) {
            setlocataireSurPlace(true)
        } else {
            setlocataireSurPlace(false)
        }
        // currentEngagement.setInfos({chauffage_collectif: value});
        // onSelection();
    }

    return (
        <StepCard title='Mon agence immobiliere'>
            <Form
                form={formAgentImmo}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 700 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={saveForm}
            >
                
                <Form.Item
                    label="Tel"
                    name="tel"
                >
                    <Input size='large' onChange={completeAgent} />
                </Form.Item>

                <Form.Item
                    label="Nom"
                    name="nom"
                >
                    <Input size='large' style={{ textTransform: 'capitalize' }} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="mail"
                >
                    <Input size='large' />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8 }} className={styles.formButtons}>
                    <Button type="primary" htmlType="submit">
                        Valider
                    </Button>
                    <Button type="primary" htmlType="reset" style={{ marginLeft: 10 }}>
                        Réinitialiser
                    </Button>
                </Form.Item>
            </Form>
            <StepCard title='Qui sera sur place ? '>
                <Radio.Group buttonStyle='solid' onChange={onOptionChanged}
                    size={screenStore.getSize()}>
                    <Radio.Button value={SurPlace.Proprietaire}>Moi meme</Radio.Button>
                    <Radio.Button value={SurPlace.Locataire}>Locataire</Radio.Button>
                    <Radio.Button value={SurPlace.Agent}>Mon agent</Radio.Button>
                    <Radio.Button value={SurPlace.Autre}>Autre</Radio.Button>
                </Radio.Group>
                <br></br><br></br>
                {locataireSurPlace &&
                    <Form
                        form={formLocataire}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={saveForm}
                    >
                        <Form.Item
                            label="Nom"
                            name=""
                        >
                            <Input size='large' style={{ textTransform: 'capitalize' }} />
                        </Form.Item>

                        <Form.Item
                            label="Tel"
                            name=""
                        >
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8 }} className={styles.formButtons}>
                            <Button type="primary" htmlType="submit">
                                Valider
                            </Button>
                            <Button type="primary" htmlType="reset" style={{ marginLeft: 10 }}>
                                Réinitialiser
                            </Button>
                        </Form.Item>
                    </Form>}
                {autreSurPlace &&
                    <Form
                        form={formAutreSurPlace}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={saveForm}
                    >
                  
                        <Form.Item
                            label="Nom"
                            name=""
                        >
                            <Input size='large' style={{ textTransform: 'capitalize' }} />
                        </Form.Item>

                        <Form.Item
                            label="Tel"
                            name=""
                        >
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name=""
                        >
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8 }} className={styles.formButtons}>
                            <Button type="primary" htmlType="submit">
                                Valider
                            </Button>
                            <Button type="primary" htmlType="reset" style={{ marginLeft: 10 }}>
                                Réinitialiser
                            </Button>
                        </Form.Item>
                    </Form>}
            </StepCard>
            <br></br>
            <StepCard title='Qui Facturer ? '>
                <Radio.Group buttonStyle='solid' onChange={onOptionChanged}
                    size={screenStore.getSize()}>
                    <Radio.Button value={false}>Moi meme</Radio.Button>
                    <Radio.Button value={true}>L'agence</Radio.Button>
                </Radio.Group>
            </StepCard>
        </StepCard>
    )
}

export default Partner;