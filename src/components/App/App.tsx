import React, { useEffect, useState } from 'react';
import styles from './App.module.less';
import NavButtons from '../UI/NavButtons/NavButtons';
import { Content } from 'antd/es/layout/layout';
import Header from '../PageElements/Header/Header';
import Choices from '../FormSteps/Choices/Choices';
import { Refs } from '../../types/Engagement';
import { Steps } from 'antd';
import Annexes from '../FormSteps/Annexes/Annexes';
import Diagnostics from '../FormSteps/DiagnosticsChoices/DiagnosticsChoices';
import { screenStore } from '../../stores';
import { insererStore } from '../../stores';
import { observer } from 'mobx-react';
import WeekCalendar from '../FormSteps/WeekCalendar/WeekCalendar';
import Infos from '../FormSteps/Infos/Infos';
import Summary from '../FormSteps/Summary/Summary';
import Projects from '../FormSteps/Projects/Projects';
import { RefsFetcher } from '../../fetchers/role-fetchers/RefFetcher';
import { InsererFetcher } from '../../fetchers/role-fetchers/InsererFetcher';
import { currentEngagement } from '../../stores';
import { EnregistrerFetcher } from '../../fetchers/role-fetchers/EnregistrerFetcher';
import Biens from '../FormSteps/Biens/Biens';
import Price from '../FormSteps/Price/Price';
import Partner from '../FormSteps/Partner/Partner';
import { useLocation } from 'react-router-dom';

const App = observer(() => {
    const [currentStep, setCurrentStep] = useState(0);
    const isMobile = screenStore.getIsMobile();
    const TIME_BEFORE_SKIPPING_NEXT_PAGE: number = 300;
    const [refs, setRefs] = useState<any>({})
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const id_agent = queryParams.get('id');

    useEffect(() => {

        id_agent && currentEngagement.setInfos({ id_agent: parseInt(id_agent) })
        const getRefs = async () => {
            const allRefs = await RefsFetcher.getRefs();
            setRefs(allRefs.data)
        }
        getRefs();

    }, [])

    const setNextStep = async () => {

        (currentStep + 1 < steps.length) && setStep(currentStep + 1, undefined);
        if (currentStep === 9) {
            await EnregistrerFetcher.enregistrer(currentEngagement.getCurrentMission());
        }
        else {
            const response: { data: any; status: number } = await InsererFetcher.inserer(currentEngagement.getCurrentMission());
            if (response.data.insert_mission) currentEngagement.setMissionId(response.data.insert_mission)
        }
        insererStore.setNext(false);

    }

    const setPreviousStep = () => setStep(currentStep - 1, 0);
    const setStep = (step: number, timeout: number = TIME_BEFORE_SKIPPING_NEXT_PAGE) => {
        setTimeout(() => setCurrentStep(step), timeout);
    }

    const onChangeStep = (step: number) => (step < currentStep) && setStep(step, 0);

    const steps = [{
        title: 'Projet',
        content: <Projects refs={refs.type_transaction} onSelection={setNextStep} />,
    }, {
        title: 'Bien',
        content: <Biens refs={refs.type_bien} onSelection={setNextStep} />,
    }, {
        title: 'Année de construction',
        content: <Choices title='Année de construction' refs={refs.date_construction} type={Refs.ANNEE_CONSTRUCTION} onSelection={setNextStep} />,

    }, {
        title: 'Superficie',
        content: <Choices title='Superficie du bien' refs={refs.type_surface} type={Refs.SURFACE} onSelection={setNextStep} />,
    }, {
        title: 'Annexes',
        content: <Annexes onSelection={setNextStep} />
    }, {
        title: 'Diagnostics',
        content: <Diagnostics diagnostics={refs.diagnostiques} onSelection={setNextStep} />
    }, {
        title: 'Informations',
        content: <Infos onSelection={setNextStep} />
    },
    {
        title: 'Rdv',
        content: <WeekCalendar onSelection={setNextStep} />
    },
    {
        title: 'Prix',
        content: <Price onSelection={setNextStep} />
    },
    {
        title: 'Partenaire',
        content: <Partner onSelection={setNextStep} />
    }, {
        title: 'Merci',
        content: <Summary />
    }
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const getStepsComponent = () =>
        <Steps responsive={true} className={styles.stepper} size={isMobile ? 'default' : 'small'}
            current={currentStep} items={items} labelPlacement={'vertical'}
            onChange={onChangeStep} />;

    return (
        <div className={styles.appContainer}>
            <Header />
            <Content>
                <div className={styles.formContainer}>
                    <div className={styles.navContainer}>
                        <div className={styles.navButton}>{<NavButtons label={'Précédent'} disabled={!(currentStep > 0)}
                            onClick={setPreviousStep} />}</div>
                        <div className={styles.navButton}>{<NavButtons prev={false} label={'Suivant'} disabled={!insererStore.getNext()}
                            onClick={setNextStep} />}</div>
                    </div>

                    {!isMobile && getStepsComponent()}

                    {steps[currentStep].content}

                    {isMobile && getStepsComponent()}
                </div>
            </Content>
            {/*<Footer/>*/}
        </div>);
});

export default App;
