import React, {useState} from 'react';
import styles from './App.module.less';
import NavButtons from '../UI/NavButtons/NavButtons';
import {Content} from 'antd/es/layout/layout';
import Header from '../PageElements/Header/Header';
import Footer from '../PageElements/Footer/Footer';
import Choices from '../FormSteps/Choices/Choices';
import {BuildingYear, Good, GoodSurface, Project} from '../../types/Engagement';
import {Steps} from 'antd';
import Annexes from '../FormSteps/Annexes/Annexes';
import Diagnostics from '../FormSteps/DiagnosticsChoices/DiagnosticsChoices';
import {screenStore} from '../../stores';
import {observer} from 'mobx-react';

const App = observer(() => {
    const [currentStep, setCurrentStep] = useState(0);
    const isMobile = screenStore.getIsMobile();
    const TIME_BEFORE_SKIPPING_NEXT_PAGE: number = 300;

    const steps = [{
        title: 'Projet',
        content: <Choices title='Votre projet' type={Project} onSelection={setNextStep}/>,
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
    }
    ];

    const items = steps.map((item) => ({key: item.title, title: item.title}));

    function setNextStep() {
        setTimeout(() => {
            (currentStep + 1 < steps.length) &&
            setCurrentStep(currentStep + 1);
        }, TIME_BEFORE_SKIPPING_NEXT_PAGE);
    }

    const setPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const getStepsComponent = () => <Steps responsive={true} className={styles.stepper} size='default'
                                           current={currentStep} items={items}/>;

    return (
        <div className={styles.appContainer}>
            <Header/>
            <Content>
                <div className={styles.formContainer}>
                    {!isMobile && getStepsComponent()}

                    {steps[currentStep].content}
                    <div className={styles.navButton}>{<NavButtons hasPreviousButton={currentStep > 0}
                                                                   onClick={setPreviousStep}/>}</div>

                    {isMobile && getStepsComponent()}
                </div>
            </Content>
            <Footer/>
        </div>);
});

export default App;
