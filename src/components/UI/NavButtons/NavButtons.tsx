import styles from './NavButtons.module.less';
import {Button} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import React from 'react';

interface INavButton {
    hasPreviousButton?: boolean;
    onClick: () => void;
}

const NavButtons = ({hasPreviousButton = true, onClick}: INavButton) => {
    return <div className={styles.navigationButtons}>
        <Button type='primary' size='large' className={styles.navButton} onClick={onClick} disabled={!hasPreviousButton}>
            <LeftOutlined/>
            <span>Précédent</span>
        </Button>
    </div>;
}

export default NavButtons;