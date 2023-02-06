import Layout from '../../wrappers/Layout/Layout';
import {Button} from 'antd';
import {FileProtectOutlined} from '@ant-design/icons';
import styles from './Home.module.less';
import React from 'react';

const Home = () => {
    return (
        <Layout>
            <div className={styles.home}>
                <span className={styles.title}>Bienvenue sur Rendez-vous Express</span>
                <FileProtectOutlined className={styles.icon}/>
                <Button type='primary'>Cliquer ici pour commencer</Button>
            </div>
        </Layout>
    );
}

export default Home;
