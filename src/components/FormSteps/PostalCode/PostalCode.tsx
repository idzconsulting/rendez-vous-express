import styles from './PostalCode.module.less';
import {InputNumber} from 'antd';
import postalCodesData from '../../../assets/data/postal-codes.json';
import {useState} from 'react';
import {screenStore} from '../../../stores';

const PostalCode = () => {
    const [postalCode, setPostalCode] = useState<string | null>('');
    const [city, setCity] = useState<string | null>('');
    let postalCodes: Map<string, string> = new Map(Object.entries(postalCodesData));

    const onValueChange = (value: any) => {
        value = String(value);
        
        if (value?.length < 5) {
            setCity('');
            return;
        }

        setPostalCode(value);
        const postal: string = postalCodes.get(value) || '';
        setCity(postal);
    };

    return (
        <div className={styles.postalCode}>
            <div className={styles.container}>
                <span>Entrez votre code postal</span>
                <InputNumber size={screenStore.getSize()} placeholder='75001' autoFocus
                             className={styles.input} maxLength={5} 
                             onChange={onValueChange}/>
            </div>

            <div className={styles.container}>
                <span>Localité</span>
                <span className={styles.localization}>{city}</span>
            </div>

        </div>);
}

export default PostalCode;