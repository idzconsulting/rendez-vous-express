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
                    <span>{getLabel(engagement?.project)}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Bien</span>
                    <span>{getLabel(engagement?.good)}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Année de construction</span>
                    <span>{getLabel(engagement?.buildingYear)}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Superficie du bien</span>
                    <span>{getLabel(engagement?.goodSurface)}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Annexes</span>
                    <span>{engagement?.annexes}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Diagnostics</span>
                    <div>{engagement?.diagnostics?.map((diag) =>
                        <span key={diag}>{getLabel(diag)}, </span>)}</div>
                </div>

                <div className={styles.row}>
                    <span className={styles.title}>Informations</span>

                    <div className={clsx(styles.infos, styles.row)}>
                        <div className={styles.row}>
                            <span className={styles.title}>Nom et prénom</span>
                            <span>{engagement?.infos?.name}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Adresse du bien</span>
                            <span>{engagement?.infos?.address}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Email</span>
                            <span>{engagement?.infos?.email}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Téléphone</span>
                            <span>{engagement?.infos?.phoneNumber}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Date de rendez-vous</span>
                            <span>{engagement?.infos?.date?.toLocaleDateString()}</span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.title}>Heure de rendez-vous</span>
                            <span>{engagement?.infos?.hour}</span>
                        </div>
                    </div>
                </div>
            </div>
        </StepCard>
    );
}

export default Summary;