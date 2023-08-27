import React, { useEffect, useMemo, useState } from 'react';
import { Transaction, Refs } from '../../../types/Engagement';
import { IOnSelection } from '../../../types/IOnSelection';
import StepCard from '../StepCard/StepCard';
import { IEngagementType } from '../../../types/interfaces';
import { currentEngagement, screenStore } from '../../../stores';
import { DisponibiliteFetcher } from '../../../fetchers/role-fetchers/DisponibiliteFetcher';
import { clearObserving } from 'mobx/dist/internal';

interface IProjectProps extends IOnSelection {
    refs?: [IEngagementType]
}

const CodePromo = ({ onSelection, refs }: IProjectProps) => {
 
    const [rdv, setRdv] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data}:any = await DisponibiliteFetcher.getTechInNearDistance('59000')
            console.log(data.prochains_rdv_proches)
            const rdvClose:any = Object.values(data.prochains_rdv_proches).filter(({distance}:any) => distance <= 30)
            setRdv(rdvClose)
        };
        
        fetchData()
        
    }, []);


    return (
        <div>
            <StepCard title='Code promo'>
            {Object.values(rdv).map(((el:any) => {
               return  <div>{el.nom}</div>
            }))}
            </StepCard>
        </div>
    );
}

export default CodePromo;