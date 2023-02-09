import styles from './NavButtons.module.less';
import {Button} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import React from 'react';

const NavButtons = () => {
    return  <div className={styles.navigationButtons}>
        <Button type='primary' className={styles.navButton}>
            <LeftOutlined />
            <span>Précédent</span>
        </Button>

        <Button type='primary' className={styles.navButton}>
            <RightOutlined />
            <span>Suivant</span>
        </Button>
    </div>;
}

export default NavButtons;