import StepCard from '../StepCard/StepCard';
import {currentEngagement} from '../../../stores';
import {Divider} from 'antd';
import {useEffect, useState} from 'react';
import styles from './Summary.module.less';
import {Engagement} from '../../../types/Engagement';
import clsx from 'clsx';
import {labelsMap} from '../../../types/Labels';

const Infos = ({key, value}: any) => {
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
        console.log('dii',currentEngagement.getDiagnostics())
        setEngagement(currentEngagement.getCurrentEngagement());
    }, []);

    const getLabel = (label?: string) => labelsMap.get(label ?? '');

    return (
        <StepCard title='Merci'>
            <h3>Votre rendez-vous a bien été pris</h3>

            <Divider/>

            <div className={styles.resume}>
                <div className={styles.row}>
                    <span className={styles.title}>Project</span>
                    <span>{engagement?.project?.nom}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Bien</span>
                    <span>{engagement?.bien?.nom}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Année de construction</span>
                    <span>{engagement?.buildingYear?.nom}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Superficie du bien</span>
                    <span>{engagement?.surface?.nom}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Annexes</span>
                    <span>{engagement?.annexes}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Diagnostics</span>
                    <div>{engagement?.diagnostics?.map((diag) =>
                        <span key={diag?.id}>{diag?.name}, </span>)}</div>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Informations</span>

                    <div className={clsx(styles.infos, styles.row)}>
                        <div className={styles.row}>
                            <span className={styles.title}>Nom et prénom</span>
                            <span>{engagement?.infos?.proprietaire_nom}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Adresse du bien</span>
                            <span>{engagement?.infos?.bien_adresse}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Email</span>
                            <span>{engagement?.infos?.proprietaire_email}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Téléphone</span>
                            <span>{engagement?.infos?.proprietaire_telephone}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Date de rendez-vous</span>
                            <span>{engagement?.infos?.rdv_jour?.split('T')[0]}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Heure de rendez-vous</span>
                            <span>{engagement?.infos?.rdv_jour?.split('T')[1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </StepCard>
    );
}

export default Summary;