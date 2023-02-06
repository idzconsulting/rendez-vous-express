import {Link, useNavigate} from 'react-router-dom';
import styles from './Header.module.less';
import {observer} from 'mobx-react';
import React from 'react';
import {Header as AntHeader} from 'antd/lib/layout/layout';

const Header = observer(() => {
    const navigate = useNavigate();

    return (
        <AntHeader className={styles.header}>
            <span><Link to='/'>Rendez-vous Express</Link></span>
        </AntHeader>
    );
});

export default Header;
