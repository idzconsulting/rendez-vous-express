import {Link} from 'react-router-dom';
import styles from './Header.module.less';
import {observer} from 'mobx-react';
import logo from '../../../assets/images/logo.png';
import {Header as AntHeader} from 'antd/lib/layout/layout';
import {WhatsAppOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import {Button, Input, Modal} from 'antd';
import clsx from 'clsx';
import {screenStore} from '../../../stores';
import Form from 'antd/es/form';
import {MaskedInput} from 'antd-mask-input';
import {CheckCircleOutlined} from '@ant-design/icons';
import {RappelerFetcher} from '../../../fetchers/role-fetchers/RappelerFetcher';
import {RappelDTO} from '../../../types/dto/RappelDTO';

const Header = observer(() => {
    const whatsAppUrl = 'https://wa.me/33755532333?text=Bonjour+nous+souhaiterions+%C3%AAtre+contact%C3%A9s+pour+la+r%C3%A9alisation+de+diagnostics+immobiliers';

    const [form] = Form.useForm();

    const [isShowModal, setShowModal] = useState<boolean>(false);
    const [isShowConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const showModal = () => setShowModal(true);
    const hideModal = () => setShowModal(false);
    const showConfirmationModal = () => setShowConfirmationModal(true);
    const hideConfirmationModal = () => setShowConfirmationModal(false);

    const saveForm = (values: any) => {
         RappelerFetcher.rappeler(values as RappelDTO).then(_ => {
             hideModal();
             showConfirmationModal();
         });
    }

    return (
        <AntHeader className={styles.header}>
            <div className={styles.headerSubContainer}>
                <Link to='https://www.idzconsulting.fr/'><img src={logo} className={styles.logo} alt="Logo"/></Link>
                {screenStore.getCurrentWidth() > 1030 && <span>Vos diagnostics immobiliers, tout simplement</span>}
            </div>
            <div className={clsx(styles.headerSubContainer, styles.contactContainer)}>
                <Button type='primary' onClick={showModal}>Être rappelé</Button>
                <Link to={whatsAppUrl}><WhatsAppOutlined/></Link>
            </div>

            {/* -- Modals --*/}

            <Modal title='Être rappelé' open={isShowModal} footer={null} onCancel={hideModal}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: false}}
                    autoComplete="off"
                    onFinish={saveForm}
                >
                    <Form.Item
                        label="Nom"
                        name="proprietaire"
                        rules={[{required: true, message: 'Veuillez entrez votre nom'}]}
                    >
                        <Input style={{textTransform: 'capitalize'}} />
                    </Form.Item>

                    <Form.Item
                        label="Numéro de téléphone"
                        name="tel"
                        rules={[{required: true, message: 'Veuillez entrez votre numéro de téléphone'}]}
                    >
                        <MaskedInput mask='00 00 00 00 00'/>
                    </Form.Item>

                    <Form.Item
                        label="Code postal"
                        name="cp"
                        rules={[{required: true, message: 'Veuillez entrez votre code postal'}]}
                    >
                        <MaskedInput mask='00000'/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8}}>
                        <Button type="primary" htmlType="submit" onClick={saveForm}>
                            Être rappelé
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title='Merci' open={isShowConfirmationModal} footer={null} onCancel={hideConfirmationModal}>
                <div className={styles.confirmationContainer}>
                    <CheckCircleOutlined className={styles.confirmationIcon} />
                    <h2>Votre demande a bien été prise en compte.</h2>
                    <h4>Nous vous rappelerons sous les plus brefs délais</h4>
                </div>
            </Modal>
        </AntHeader>
    );
});

export default Header;
