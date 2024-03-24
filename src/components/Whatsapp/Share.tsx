import { convert } from 'html-to-text';
import whatsappShare from '../../assets/images/whatsapp.png';
import smsShare from '../../assets/images/sms.png';
import { Link } from 'react-router-dom';
import styles from './Share.module.less';

enum share {
    WHATSAPP = 'whatsapp',
    SMS = 'sms'
}

interface IShareProps {
    htmlToShare: string | undefined
}

const Share = ({ htmlToShare }: IShareProps) => {

    const convertHtmlToPlainText = (html: any) => {
        console.log('text11', html)
        const plainText = convert(html, { preserveNewlines: true });
        return plainText;
    }

    const getWhatsAppShareLink = (text: any) => {
        console.log('text', text)
        let encodedText = "Votre Devis: %0A";
        encodedText += encodeURIComponent(text);
        encodedText += " %0A N'hésitez pas à nous contacter pour fixer un rendez-vous %0A";
        encodedText += "Au: 07 55 53 23 33 %0A";
        encodedText += "secretariat@idzconsulting.fr %0A";
        encodedText += "IDZ consulting %0A";
        const url = `https://api.whatsapp.com/send?text=${encodedText}`;
        return url;
    }

    function getSmsShareLink(text: any) {
        const encodedMessage = encodeURIComponent(text);
        const url = `sms:?body=${encodedMessage}`;
        return url
      }

    const handleShareClick = (shareOption: share) => {
        const plainText = convertHtmlToPlainText(htmlToShare);
        const shareLink = shareOption === share.WHATSAPP ? getWhatsAppShareLink(plainText) : getSmsShareLink(plainText) 
        window.open(shareLink);
    };

    return (
        <div className={styles.share}>
            <span className={styles.share_text}>Je partage: </span>
            <div>
            <Link onClick={() => handleShareClick(share.WHATSAPP)} to={''}><img className={styles.whatsapp} src={whatsappShare} alt="whatsapp" /> </Link>
            <Link onClick={() => handleShareClick(share.SMS)} to={''}><img className={styles.whatsapp} src={smsShare} alt="sms" /> </Link>
            </div>
        </div>
    );
}

export default Share;