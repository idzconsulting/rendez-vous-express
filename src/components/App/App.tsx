import React, { useState } from 'react';
import Home from '../FormSteps/Home/Home';
import styles from './App.module.less';
import NavButtons from '../UI/NavButtons/NavButtons';
import PostalCode from '../FormSteps/PostalCode/PostalCode';
import { Content } from 'antd/es/layout/layout';
import Header from '../PageElements/Header/Header';
import Footer from '../PageElements/Footer/Footer';

const App = () => {
    const [isClickedHome, setIsClickedHome] = useState(true);
    const [step, setStep] = useState(0)

    const steps = [<PostalCode />]

    return (
    <>
        <Header />
        <Content>
            <div className={styles.formContainer}>
                {!isClickedHome && <Home onClickStart={() => setIsClickedHome(true)} />}
                {isClickedHome && steps[step]}

                <div>{isClickedHome && <NavButtons />}</div>
            </div>
        </Content>
        <Footer />
    </>);
}

export default App;
