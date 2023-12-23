import StepCard from '../StepCard/StepCard';
import { currentEngagement, screenStore } from '../../../stores';
import { Divider, Typography } from 'antd';
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
    const isMobile = screenStore.getIsMobile();

    const getTitleLevel = () => isMobile ? 1 : 2;
    useEffect(() => {
        setEngagement(currentEngagement.getCurrentEngagement());
    }, []);

    const getLabel = (label?: string) => labelsMap.get(label ?? '');

    return (
        <StepCard title=''>
            <StepCard title='Confirmation'>
                {/* <h3><strong>Félicitations</strong> Votre rendez-vous le {engagement?.infos?.rdv_jour?.split('T')[0]} a {engagement?.infos?.rdv_jour?.split('T')[1]} est confirmé</h3> */}
                <div className={styles.confirmation}>
                    <div className={styles.titleConfirmation}>Félicitations !</div>
                    <div>Votre demande de rendez-vous a bien été prise en compte</div>
                    <div>Vous recevrez un email et un sms de confirmation</div>
                    <div>Votre conseiller I.D.Z Consulting reste à votre disposition :</div>
                    <div className={styles.contact}>
                        <span>Par téléphone au 01-77-38-09-79</span>
                        <span>Par WhatsApp au 07-55-53-23-33</span>
                    </div>
                </div>

                <br></br>
                <Divider />
                <Typography.Title level={getTitleLevel()} className={styles.title}>Récapitulatif</Typography.Title>
                <div className={styles.resume}>
                    <div className={styles.title}>Price: {engagement?.infos?.prix}€</div>
                    <div className={styles.row}>
                        <div className={styles.title}>Projet</div>
                        <div>{engagement?.project?.nom}</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Bien</div>
                        <div>{engagement?.bien?.nom}</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Année de construction</div>
                        <div>{engagement?.buildingYear?.nom}</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Superficie du bien</div>
                        <div>{engagement?.surface?.nom}</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Annexes</div>
                        <div>{engagement?.annexes === 0 ? 'Non' : engagement?.annexes}</div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Diagnostics immobiliers à réaliser</div>
                        <div>
                            {engagement?.diagnostics?.map((diag, index) => (
                                <div key={diag?.id}>
                                    {diag?.name}
                                    {engagement?.diagnostics && index !== engagement?.diagnostics?.length - 1 && ','}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>Coordonnées</div>

                        <div className={clsx(styles.infos, styles.row)}>
                            <div className={styles.row}>
                                <div className={styles.title}>Nom et prénom</div>
                                <div>{engagement?.infos?.proprietaire_nom}</div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.title}>Adresse du bien</div>
                                <div>{engagement?.infos?.bien_adresse}</div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.title}>Email</div>
                                <div>{engagement?.infos?.proprietaire_email}</div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.title}>Téléphone</div>
                                <div>{engagement?.infos?.proprietaire_telephone}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </StepCard>
        </StepCard>
    );
}

export default Summary;