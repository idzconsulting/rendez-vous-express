import Layout from '../../wrappers/Layout/Layout';
import React, {useState} from 'react';
import Home from '../FormSteps/Home/Home';
import styles from './App.module.less';
import NavButtons from '../UI/NavButtons/NavButtons';
import PostalCode from '../FormSteps/PostalCode/PostalCode';

const App = () => {
    const [isClickedHome, setIsClickedHome] = useState(false);
    const [step, setStep] = useState(0)

    return (
        <Layout>
            <div className={styles.formContainer}>
                {!isClickedHome && <Home onClickStart={() => setIsClickedHome(true)} />}
                {isClickedHome && <>
                    {step === 0 && <PostalCode />}
                </>}
            </div>

            {isClickedHome && <NavButtons />}
        </Layout>
    );
}

export default App;
