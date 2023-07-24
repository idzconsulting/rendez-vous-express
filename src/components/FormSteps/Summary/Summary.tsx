import StepCard from '../StepCard/StepCard';
import { currentEngagement } from '../../../stores';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import styles from './Summary.module.less';
import { Engagement } from '../../../types/Engagement';
import clsx from 'clsx';
import { labelsMap } from '../../../types/Labels';

const Infos = ({ key, value }: any) => {
    return (
        <div>
            <span className={styles.title}>{key}</span>
            <span>{value}</span>
        </div>
    );
}

const Summary = () => {
    const [engagement, setEngagement] = useState<Engagement>();

    useEffect(() => {
        setEngagement(currentEngagement.getCurrentEngagement());
    }, []);

    const getLabel = (label?: string) => labelsMap.get(label ?? '');

    return (
        <StepCard title='Confirmation'>
            {/* <h3><strong>Félicitations</strong> Votre rendez-vous le {engagement?.infos?.rdv_jour?.split('T')[0]} a {engagement?.infos?.rdv_jour?.split('T')[1]} est confirmé</h3> */}
            <div className={styles.resume}>
                <div className={styles.title}>Félicitations !</div>
                <div>Votre demande de rendez-vous a bien été prise en compte</div>
                <div>Vous recevrez un email et un sms de confirmation</div>
                <div>Votre conseiller I.D.Z Consulting reste à votre disposition :</div>
                <div className={styles.contact}>
                    <span>Par téléphone au 01-77-38-09-79</span>
                    <span>Par WhatsApp au 07-55-53-23-33</span>
                </div>
            </div>
        </StepCard>
    );
}

export default Summary;