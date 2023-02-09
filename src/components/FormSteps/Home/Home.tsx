import {FileProtectOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import React from 'react';
import styles from './Home.module.less';

export interface IHomeProps {
    onClickStart: () => void;
}

const Home = ({onClickStart}: IHomeProps) => {
    return (
            <div className={styles.home}>
                <span className='title'>Bienvenue sur Rendez-vous Express</span>
                <FileProtectOutlined className={styles.icon}/>
                <Button type='primary' onClick={onClickStart}>Cliquer ici pour commencer</Button>
            </div>
    );
}

export default Home;