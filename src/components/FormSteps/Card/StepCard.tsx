import styles from './StepCard.module.less';
import {PropsWithChildren} from 'react';

const StepCard = ({children}: PropsWithChildren) => {
    return (
        <div className={styles.stepCard}>
            {children}
        </div>
    );
}

export default StepCard;