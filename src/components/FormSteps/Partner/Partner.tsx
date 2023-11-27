import StepCard from '../StepCard/StepCard';
import { IOnSelection } from '../../../types/IOnSelection';
import Form from 'antd/es/form';
import { Button, Input, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { currentEngagement, insererStore, screenStore } from '../../../stores';
import { PartnersFetcher } from '../../../fetchers/role-fetchers/PartnersFetcher';

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

    useEffect(() => {
        const infos = currentEngagement.getInfos();
        formAgentImmo.setFieldsValue(infos);
        formLocataire.setFieldsValue(infos);
        formAutreSurPlace.setFieldsValue(infos)
        insererStore.setNext(true);
    }, []);


    const saveForm = (values: any) => {
        currentEngagement.setInfos({ [values[0].name[0]]: values[0].value });
    }

    const finishForm = async () => {
        const nom = formAgentImmo.getFieldValue('nom')
        const tel = formAgentImmo.getFieldValue('tel')
        const mail = formAgentImmo.getFieldValue('mail')
        const agence = formAgentImmo.getFieldValue('agence')
        const type_partenaire = currentEngagement.getInfos()?.envoi_rapport_agent ? 1 : 2;

        if(nom != undefined && mail != undefined){
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
            const { data } = await PartnersFetcher.getPartner({ telephone: value, type_partenaire: 1 });
            const { nom, mail } = data[0]
            formAgentImmo.setFieldValue('nom', nom)
            formAgentImmo.setFieldValue('mail', mail)
        }
    }

    const onOptionChangedFacturer = (e: any) => {
        const value: boolean = e.target.value;
        currentEngagement.setInfos({ agent_facturer: value })
    }

    const onOptionChangedSurPlace = (e: any) => {
        const value: string = e.target.value;
        if (value === SurPlace.Autre) {
            setAutreSurPlace(true)
            currentEngagement.setInfos({ autre_sur_place: true })
            currentEngagement.setInfos({ sur_place: '' })
        } else {
            setAutreSurPlace(false)
            currentEngagement.setInfos({ autre_sur_place: false })
            currentEngagement.setInfos({ sur_place: value })
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
            currentEngagement.setInfos({ envoi_rapport_agent: true })
        } 
        if (value === Partenaire.Notaire) {
            setEnvoiRapportPartner(true)
            currentEngagement.setInfos({ envoi_rapport_notaire: true })
        } 
    }

    return (
        <StepCard title="">
            <StepCard title='Envoi des rapports'>
                <div>Vous pouvez choisir d'envoyer directement les rapports de diagnostics à votre agent immobilier ou à votre notaire</div>
                <br></br>
                <Radio.Group buttonStyle='solid' onChange={onOptionChangedRapports}
                    size={screenStore.getSize()}>
                    <Radio.Button value={Partenaire.Agent}>Envoyer à mon agent immobilier</Radio.Button>
                    <Radio.Button value={Partenaire.Notaire}>Envoyer à mon notaire</Radio.Button>
                </Radio.Group>
                <br></br><br></br>
                { EnvoiRapportPartner && <Form
                    form={formAgentImmo}
                    name="basic"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                    style={{ maxWidth: 700 }}
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
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700 }}
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
                    size={screenStore.getSize()}>
                    <Radio.Button value={false}>Moi meme</Radio.Button>
                    <Radio.Button value={true}>L'agence</Radio.Button>
                </Radio.Group>
            </StepCard>
            <br></br>
            <Form.Item >
                <Button type="primary" size='large' onClick={finishForm}>
                    Valider
                </Button>
                <Button type="primary" size='large' onClick={finishForm} >
                    Passer
                </Button>
            </Form.Item>
        </StepCard>
    )
}

export default Partner;