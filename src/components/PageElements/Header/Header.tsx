import {Link, useNavigate} from 'react-router-dom';
import styles from './Header.module.less';
import {observer} from 'mobx-react';
import logo from '../../../assets/images/logo.png';
import {Header as AntHeader} from 'antd/lib/layout/layout';
import {PhoneOutlined} from '@ant-design/icons';

const Header = observer(() => {
    const navigate = useNavigate();

    return (
        <AntHeader className={styles.header}>
            <Link to='/'><img src={logo} className={styles.logo} alt="Logo"/></Link>
            {/*<span>Vos diagnostics immobiliers, tout simplement</span>*/}
            <a href="tel:0755532333" className={styles.phoneNumber}>
                <span>Contactez-nous</span>
                <PhoneOutlined/>
                <span>0755532333</span>
            </a>
        </AntHeader>
    );
});

export default Header;
