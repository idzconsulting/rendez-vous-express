import styles from './StepCard.module.less';
import {ReactNode} from 'react';
import {Typography} from 'antd';

interface IStepCardProps {
    title: string;
    children: ReactNode;
}
const StepCard = ({title, children}: IStepCardProps) => {
    return (
        <div className={styles.stepCard}>
            <Typography.Title className={styles.title} level={2}>{title}</Typography.Title>
            {children}
        </div>
    );
}

export default StepCard;