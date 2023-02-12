import StepCard from '../StepCard/StepCard';
import {IOnSelection} from '../../../types/IOnSelection';
import {Button} from 'antd';
import {DiagnosticsTypes} from '../../../types/DiagnosticsTypes';
import {labelsMap} from '../../../types/Labels';
import styles from './DiagnosticsChoices.module.less';
import {useState} from 'react';
import { red, green } from '@ant-design/colors';

interface IDiagnosticsProps extends IOnSelection {
}

const DiagnosticsChoices = ({onSelection}: IDiagnosticsProps) => {
    const [selectedDiagnostics, setSelectedDiagnostics] = useState<string[]>([]);

    const toggleDiagnostic = (diagnostic: string) => {
        const indexOfDiagnostic = selectedDiagnostics.indexOf(diagnostic);
        (indexOfDiagnostic === -1)
            ? selectedDiagnostics.push(diagnostic)
            : selectedDiagnostics.splice(indexOfDiagnostic, 1);
        setSelectedDiagnostics([...selectedDiagnostics]);
    }

    return <StepCard title='Diagnostics obligatoires'>
        <div className={styles.diagnosticsChoicesContainer}>
            <div className={styles.choices}>
                {Object.values(DiagnosticsTypes).map((label) =>
                    <Button type='primary' onClick={() => toggleDiagnostic(label)}
                            style={{backgroundColor: selectedDiagnostics.includes(label) ? green.primary: red.primary}}>
                        {labelsMap.get(label)}
                    </Button>)
                }

            </div>

            <Button type='primary' style={{width: 'fit-content'}} onClick={onSelection}>Suivant</Button>
        </div>
    </StepCard>;
}

export default DiagnosticsChoices;