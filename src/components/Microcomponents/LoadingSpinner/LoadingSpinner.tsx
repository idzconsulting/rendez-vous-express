import { ColorRing } from 'react-loader-spinner';
import styles from './LoadingSpinner.module.less';

const LoadingSpinner = () => {

	return(
		<div
			className={styles.loading}
			style={{
				display: 'flex',
			}}>
			<div className={styles.center}>
			<div>Veuillez-patientez</div>
			<ColorRing
				visible={true}
				height="100"
				width="100"
				ariaLabel="blocks-loading"
				wrapperStyle={{}}
				wrapperClass="blocks-wrapper"
				colors={['#adc6ff', '#adc6ff', '#adc6ff', '#adc6ff', '#adc6ff']}
			/>
			<div>Nous recherchons le meilleur devis</div>
			</div>
			
		</div>
	);
};

export default LoadingSpinner;
