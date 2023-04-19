import StepCard from '../StepCard/StepCard';
import {IOnSelection} from '../../../types/IOnSelection';
import {Button} from 'antd';
import {DiagnosticsTypes} from '../../../types/DiagnosticsTypes';
import {labelsMap} from '../../../types/Labels';
import styles from './DiagnosticsChoices.module.less';
import {useEffect, useState} from 'react';
import { red, green } from '@ant-design/colors';
import {currentEngagement} from '../../../stores';

interface IDiagnosticsProps extends IOnSelection {
    diagnostics:[any]
}

const DiagnosticsChoices = ({onSelection,diagnostics}: IDiagnosticsProps) => {
    const [selectedDiagnostics, setSelectedDiagnostics] = useState<string[]>([]);

    useEffect(() => {
        console.log(diagnostics)
        const savedDiagnostics = currentEngagement.getDiagnostics();
        setSelectedDiagnostics(savedDiagnostics || []);
    }, []);

    const toggleDiagnostic = (diagnostic: string) => {
        const indexOfDiagnostic = selectedDiagnostics.indexOf(diagnostic);
        (indexOfDiagnostic === -1)
            ? selectedDiagnostics.push(diagnostic)
            : selectedDiagnostics.splice(indexOfDiagnostic, 1);
        setSelectedDiagnostics([...selectedDiagnostics]);
        currentEngagement.setDiagnostics([...selectedDiagnostics] as DiagnosticsTypes[]);
    }

    return <StepCard title='Diagnostics'>
        <div className={styles.diagnosticsChoicesContainer}>
            <div className={styles.choices}>
                {diagnostics?.map((diagnostic) =>
                    <Button key={diagnostic.id} type='primary' onClick={() => toggleDiagnostic(diagnostic.id)}
                            style={{backgroundColor: selectedDiagnostics.includes(diagnostic.id) ? green.primary: red.primary}}>
                        {diagnostic.name}
                    </Button>)
                }
            </div>

            <Button disabled={!selectedDiagnostics.length} type='primary' style={{width: 'fit-content'}} onClick={onSelection}>Valider</Button>
        </div>
    </StepCard>;
}

export default DiagnosticsChoices;