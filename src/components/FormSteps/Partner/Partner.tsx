import StepCard from '../StepCard/StepCard';
import { IOnSelection } from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import { Button, Divider, Input, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { currentEngagement, insererStore, screenStore } from '../../../stores';
import { PartnersFetcher } from '../../../fetchers/role-fetchers/PartnersFetcher';
import { observer } from 'mobx-react';
import styles from './Partner.module.less';
import { Engagement } from '../../../types/Engagement';
import clsx from 'clsx';

interface IInfosProps extends IOnSelection {
}

enum SurPlace {
    Locataire = 'Locataire',
    Agent = 'Agent',
    Proprietaire = 'Proprietaire',
    Autre = 'Autre'
}

enum Partenaire {
    Agent = 'Agent',
    Notaire = 'Notaire'
}

const Partner = ({ onSelection }: IInfosProps) => {
    const [formAgentImmo] = Form.useForm();
    const [formLocataire] = Form.useForm();
    const [formAutreSurPlace] = Form.useForm();
    const [autreSurPlace, setAutreSurPlace] = useState<boolean>(false);
    const [EnvoiRapportPartner, setEnvoiRapportPartner] = useState<boolean>(false);
    const [locataireSurPlace, setlocataireSurPlace] = useState<boolean>(false);
    const [engagement, setEngagement] = useState<Engagement>();
    const [agentExist, setAgentExist] = useState<boolean>(false);

    useEffect(() => {
        const infos = currentEngagement.getInfos();
        getPartner(infos?.tel || "");
        formAgentImmo.setFieldsValue(infos);
        formLocataire.setFieldsValue(infos);
        formAutreSurPlace.setFieldsValue(infos);
        setEngagement(currentEngagement.getCurrentEngagement());
        insererStore.setNext(true);
        if ((infos?.envoi_rapport_agent || infos?.envoi_rapport_notaire) || infos?.tel) {
            setEnvoiRapportPartner(true);
            if (infos?.tel) currentEngagement.setInfos({ envoi_rapport_agent: true })
        }
    }, []);

    const getPartner = async (value: string) => {
        const { data } = await PartnersFetcher.getPartner({ telephone: value, type_partenaire: 1 });
        const { nom, mail, tel } = data[0]

        if (tel == value) {
            setAgentExist(true)
            formAgentImmo.setFieldValue('nom', nom)
            formAgentImmo.setFieldValue('mail', mail)
        }

    }

    const saveForm = (values: any) => {
        currentEngagement.setInfos({ [values[0].name[0]]: values[0].value });
    }

    const finishForm = async () => {
        const nom = formAgentImmo.getFieldValue('nom')
        const tel = formAgentImmo.getFieldValue('tel')
        const mail = formAgentImmo.getFieldValue('mail')
        const agence = formAgentImmo.getFieldValue('agence')
        const type_partenaire = currentEngagement.getInfos()?.envoi_rapport_agent ? 1 : 2;
        if (!agentExist && nom != undefined && mail != undefined) {
            const agent = {
                nom,
                mail,
                tel,
                agence,
                type_partenaire
            }

            await PartnersFetcher.addPartner(agent);
        }

        onSelection()
    }

    const completeAgent = async (e: any) => {
        const value = e.target.value;
        if (value.length > 9) {
            await getPartner(value)
        }
    }

    const onOptionChangedFacturer = (e: any) => {
        const value: boolean = e.target.value;
        currentEngagement.setInfos({ agent_facturer: value })
    }

    const onOptionChangedSurPlace = (e: any) => {
        const value: string = e.target.value;
        currentEngagement.setInfos({ sur_place: value })
        if (value === SurPlace.Autre) {
            setAutreSurPlace(true)
            currentEngagement.setInfos({ autre_sur_place: true, sur_place: '' })
        } else {
            setAutreSurPlace(false)
            currentEngagement.setInfos({ autre_sur_place: false, sur_place: value })
        }
        if (value === SurPlace.Locataire) {
            setlocataireSurPlace(true)
        } else {
            setlocataireSurPlace(false)
        }
    }

    const onOptionChangedRapports = (e: any) => {
        const value: string = e.target.value;
        if (value === Partenaire.Agent) {
            setEnvoiRapportPartner(true)
            currentEngagement.setInfos({ envoi_rapport_agent: true, envoi_rapport_notaire: false })
        }
        if (value === Partenaire.Notaire) {
            setEnvoiRapportPartner(true)
            currentEngagement.setInfos({ envoi_rapport_notaire: true, envoi_rapport_agent: false })
        }
    }

    return (
        <StepCard title="">
            <StepCard title='Envoi des rapports'>
                <div>Vous pouvez choisir d'envoyer directement les rapports de diagnostics à votre agent immobilier ou à votre notaire</div>
                <br></br>
                <Radio.Group buttonStyle='solid' onChange={onOptionChangedRapports}
                    size={screenStore.getSize()} value={currentEngagement.getInfos()?.envoi_rapport_agent ? Partenaire.Agent : currentEngagement.getInfos()?.envoi_rapport_notaire ? Partenaire.Notaire : undefined} >
                    <Radio.Button value={Partenaire.Agent}>Envoyer à mon agent immobilier</Radio.Button>
                    <Radio.Button value={Partenaire.Notaire}>Envoyer à mon notaire</Radio.Button>
                </Radio.Group>
                <br></br><br></br>
                {EnvoiRapportPartner && <Form
                    form={formAgentImmo}
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 12 }}
                    style={{ maxWidth: 700, textAlignLast: "start" }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFieldsChange={saveForm}
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
                        label="Agence"
                        name="agence"
                    >
                        <Input size='large' style={{ textTransform: 'capitalize' }} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="mail"
                    >
                        <Input size='large' />
                    </Form.Item>
                </Form>}
            </StepCard>
            <br></br>
            <StepCard title='Qui sera sur place ? '>
                <Radio.Group buttonStyle='solid' onChange={onOptionChangedSurPlace}
                    size={screenStore.getSize()} value={currentEngagement.getInfos()?.sur_place}>
                    <Radio.Button value={SurPlace.Proprietaire}>Propriétaire</Radio.Button>
                    <Radio.Button value={SurPlace.Locataire}>Locataire</Radio.Button>
                    <Radio.Button value={SurPlace.Agent}>Mon agent</Radio.Button>
                    <Radio.Button value={SurPlace.Autre}>Autre</Radio.Button>
                </Radio.Group>
                <br></br><br></br>
                {locataireSurPlace &&
                    <Form
                        form={formLocataire}
                        name="basic"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 12 }}
                        style={{ maxWidth: 700, textAlignLast: "start" }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFieldsChange={saveForm}
                    >
                        <Form.Item
                            label="Nom"
                            name="locataire"
                        >
                            <Input size='large' style={{ textTransform: 'capitalize' }} />
                        </Form.Item>

                        <Form.Item
                            label="Tel"
                            name="telLocataire"
                        >
                            <Input size='large' />
                        </Form.Item>
                    </Form>}
                {autreSurPlace &&
                    <Form
                        form={formAutreSurPlace}
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}
                        style={{ maxWidth: 700, textAlignLast: "start" }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFieldsChange={saveForm}
                    >

                        <Form.Item
                            label="Nom"
                            name="nom_sur_place"
                        >
                            <Input size='large' style={{ textTransform: 'capitalize' }} />
                        </Form.Item>

                        <Form.Item
                            label="Tel"
                            name="tel_sur_place"
                        >
                            <Input size='large' style={{ textTransform: 'capitalize' }} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="mail_sur_place"
                        >
                            <Input size='large' />
                        </Form.Item>
                    </Form>}
            </StepCard>
            <br></br>
            <StepCard title='Qui Facturer ? '>
                <Radio.Group buttonStyle='solid' onChange={onOptionChangedFacturer}
                    size={screenStore.getSize()} value={currentEngagement.getInfos()?.agent_facturer}>
                    <Radio.Button value={false}>Propriétaire</Radio.Button>
                    <Radio.Button value={true}>L'agence</Radio.Button>
                </Radio.Group>
            </StepCard>

            <br></br>
            <div className={styles.formButtons}>
            <Button type="primary" className='button' onClick={finishForm}>
                Valider
            </Button>
            <Button type="primary" className='button' onClick={onSelection} >
                Passer
            </Button>
            </div>
        </StepCard>)
}

export default observer(Partner);