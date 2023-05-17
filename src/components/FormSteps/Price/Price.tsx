import StepCard from '../StepCard/StepCard';
import { currentEngagement } from '../../../stores';
import { Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import styles from './Price.module.less';
import { Engagement } from '../../../types/Engagement';
import clsx from 'clsx';
import { labelsMap } from '../../../types/Labels';
import { IOnSelection } from '../../../types/IOnSelection';
import { DiagnoscticsFetcher } from '../../../fetchers/role-fetchers/DiagnosticsFetcher';

interface IPrice extends IOnSelection {
}

const Price = ({ onSelection }: IPrice) => {
    const [engagement, setEngagement] = useState<Engagement>();
    const [price, setPrice] = useState<any>()

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
        <StepCard title='Récapitulatif'>
            <h3>Price: {price}€</h3>

            <Divider />

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
                    </div>
                </div>
            </div>
            <br />
            <Button type='primary' style={{ width: 'fit-content' }} onClick={onSelection}>Fixer un rendez-vous</Button>
        </StepCard>
    );
}

export default Price;