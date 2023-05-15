import styles from './StepCard.module.less';
import {ReactNode} from 'react';
import {Typography} from 'antd';
import {observer} from 'mobx-react';
import {screenStore} from '../../../stores';

interface IStepCardProps {
    title: string;
    children: ReactNode;
}

const StepCard = observer(({title, children}: IStepCardProps) => {
    const isMobile = screenStore.getIsMobile();

    const getTitleLevel = () => isMobile ? 1 : 2;

    return (
        <div className={styles.stepCard}>
            <Typography.Title className={styles.title} level={getTitleLevel()}>{title}</Typography.Title>
            {children}
        </div>
    );
});

export default StepCard;