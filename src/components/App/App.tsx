import React, {useState} from 'react';
import styles from './App.module.less';
import NavButtons from '../UI/NavButtons/NavButtons';
import {Content} from 'antd/es/layout/layout';
import Header from '../PageElements/Header/Header';
import Choices from '../FormSteps/Choices/Choices';
import {BuildingYear, Good, GoodSurface} from '../../types/Engagement';
import {Steps} from 'antd';
import Annexes from '../FormSteps/Annexes/Annexes';
import Diagnostics from '../FormSteps/DiagnosticsChoices/DiagnosticsChoices';
import {screenStore} from '../../stores';
import {observer} from 'mobx-react';
import WeekCalendar from '../FormSteps/WeekCalendar/WeekCalendar';
import Infos from '../FormSteps/Infos/Infos';
import Summary from '../FormSteps/Summary/Summary';
import Projects from '../FormSteps/Projects/Projects';

const App = observer(() => {
    const [currentStep, setCurrentStep] = useState(0);
    const isMobile = screenStore.getIsMobile();
    const TIME_BEFORE_SKIPPING_NEXT_PAGE: number = 300;

    const setNextStep = () => {
        (currentStep + 1 < steps.length) && setStep(currentStep + 1, undefined);
    }

    const steps = [{
        title: 'Projet',
        content: <Projects onSelection={setNextStep} />,
    }, {
        title: 'Bien',
        content: <Choices title='Votre bien' type={Good} onSelection={setNextStep}/>,
    }, {
        title: 'Année de construction',
        content: <Choices title='Année de construction' type={BuildingYear} onSelection={setNextStep}/>,

    }, {
        title: 'Superficie',
        content: <Choices title='Superficie du bien' type={GoodSurface} onSelection={setNextStep}/>,
    }, {
        title: 'Annexes',
        content: <Annexes onSelection={setNextStep}/>
    }, {
        title: 'Diagnostics',
        content: <Diagnostics onSelection={setNextStep}/>
    }, {
        title: 'Informations',
        content: <Infos onSelection={setNextStep}/>
    }, {
        title: 'Rendez-vous',
        content: <WeekCalendar onSelection={setNextStep}/>
    }, {
        title: 'Merci',
        content: <Summary/>
    }
    ];

    const items = steps.map((item) => ({key: item.title, title: item.title}));

    const setPreviousStep = () => setStep(currentStep - 1, 0);

    const setStep = (step: number, timeout: number = TIME_BEFORE_SKIPPING_NEXT_PAGE) => {
        setTimeout(() => setCurrentStep(step), timeout);
    }

    const onChangeStep = (step: number) => (step < currentStep) && setStep(step, 0);

    const getStepsComponent = () =>
        <Steps responsive={true} className={styles.stepper} size='small'
               current={currentStep} items={items} labelPlacement={'vertical'}
               onChange={onChangeStep}/>;

    return (
        <div className={styles.appContainer}>
            <Header/>
            <Content>
                <div className={styles.formContainer}>
                    <div className={styles.navButton}>{<NavButtons hasPreviousButton={currentStep > 0}
                                                                   onClick={setPreviousStep}/>}</div>

                    {!isMobile && getStepsComponent()}

                    {steps[currentStep].content}

                    {isMobile && getStepsComponent()}
                </div>
            </Content>
            {/*<Footer/>*/}
        </div>);
});

export default App;
