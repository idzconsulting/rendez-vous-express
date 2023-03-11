import {Link} from 'react-router-dom';
import styles from './Header.module.less';
import {observer} from 'mobx-react';
import logo from '../../../assets/images/logo.png';
import {Header as AntHeader} from 'antd/lib/layout/layout';
import {WhatsAppOutlined} from '@ant-design/icons';
import React from 'react';
import {Button} from 'antd';
import clsx from 'clsx';
import {screenStore} from '../../../stores';

const Header = observer(() => {
    const whatsAppUrl = 'https://wa.me/33755532333?text=Bonjour+nous+souhaiterions+%C3%AAtre+contact%C3%A9s+pour+la+r%C3%A9alisation+de+diagnostics+immobiliers';

    return (
        <AntHeader className={styles.header}>
            <div className={styles.headerSubContainer}>
                <Link to='https://www.idzconsulting.fr/'><img src={logo} className={styles.logo} alt="Logo"/></Link>
                {screenStore.getCurrentWidth() > 1030 && <span>Vos diagnostics immobiliers, tout simplement</span>}
            </div>
            <div className={clsx(styles.headerSubContainer, styles.contactContainer)}>
                <Link to={whatsAppUrl}>
                    <Button type='primary'>Être rappelé</Button></Link>
                <Link to={whatsAppUrl}><WhatsAppOutlined/></Link>
            </div>
        </AntHeader>
    );
});

export default Header;
