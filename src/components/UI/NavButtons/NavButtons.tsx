import styles from './NavButtons.module.less';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';

interface INavButton {
    label: string;
    disabled?: boolean;
    onClick: () => void;
    prev?: boolean
}

const NavButtons = ({ prev = true, disabled = false, onClick, label }: INavButton) => {
    return <div className={styles.navigationButtons}>
        <Button type='primary' size='large' className={styles.navButton} onClick={onClick} disabled={disabled}>
            {prev && <LeftOutlined />}
            <span>{label}</span>
            {!prev && <RightOutlined />}
        </Button>
    </div>;
}

export default NavButtons;