import StepCard from '../StepCard/StepCard';
import { currentEngagement } from '../../../stores';
import { Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import styles from './Price.module.less';
import { Engagement } from '../../../types/Engagement';
import clsx from 'clsx';
import { IOnSelection } from '../../../types/IOnSelection';
import { DiagnoscticsFetcher } from '../../../fetchers/role-fetchers/DiagnosticsFetcher';
import WhatsApp from '../../Whatsapp/Share';
import Share from '../../Whatsapp/Share';


interface IPrice extends IOnSelection {
}

const Price = ({ onSelection }: IPrice) => {
    const [engagement, setEngagement] = useState<Engagement>();
    const [price, setPrice] = useState<any>()
    const [htmlToShare, setHtmlToShare] = useState('');

    const getPrice = async () => {
        const { data } = await DiagnoscticsFetcher.price(currentEngagement.getCurrentMission());
        const { prix } = data
        currentEngagement.setInfos({ prix });
        return prix
    }

    useEffect(() => {
        const fetchData = async () => {
            setEngagement(currentEngagement.getCurrentEngagement());
            const priceOfMission = await getPrice();
            setPrice(priceOfMission)
        };

        fetchData();
    }, []);

    return (
        <div>
            <StepCard title='Récapitulatif'>
                <div ref={(ref) => ref && setHtmlToShare(ref.innerHTML)} >
                    <div className={styles.title}>Price: {price}€</div>
                    
                    <Divider />

                    <div className={styles.resume}>
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
                </div>
                <br />

                <Button type='primary' style={{ width: 'fit-content' }} onClick={onSelection}>Fixer un rendez-vous</Button>
            </StepCard>
            <br></br>
            <div className={styles.share}> 
                <Share htmlToShare={htmlToShare}></Share>
            </div>
        </div>
    );
}

export default Price;