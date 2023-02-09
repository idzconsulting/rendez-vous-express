import styles from './PostalCode.module.less';
import {InputNumber} from 'antd';

const PostalCode = () => {
    return (
        <div className={styles.postalCode}>
            <div className={styles.container}>
                <span>Entrez votre code postal</span>
                <InputNumber size='large' placeholder='75001' autoFocus
                             className={styles.input} maxLength={5}/>
            </div>

            <div className={styles.container}>
                <span>Localité</span>
                <span className={styles.localization}>Paris</span>
            </div>

        </div>
    );
}

export default PostalCode;