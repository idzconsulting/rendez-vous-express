import StepCard from '../StepCard/StepCard';
import {IOnSelection} from '../../../types/IOnSelection';
import {Button} from 'antd';
import {DiagnosticsTypes} from '../../../types/DiagnosticsTypes';
import {labelsMap} from '../../../types/Labels';
import styles from './DiagnosticsChoices.module.less';
import {useEffect, useState} from 'react';
import { red, green } from '@ant-design/colors';
import {currentEngagement} from '../../../stores';
import { Diagnostiques } from '../../../types/Engagement';

interface IDiagnosticsProps extends IOnSelection {
    diagnostics:[any]
}

const DiagnosticsChoices = ({onSelection,diagnostics}: IDiagnosticsProps) => {
    const [selectedDiagnostics, setSelectedDiagnostics] = useState<Diagnostiques[]>([]);

    useEffect(() => {
        console.log(diagnostics)
        const savedDiagnostics = currentEngagement.getDiagnostics();
        console.log('dooo',savedDiagnostics)
        setSelectedDiagnostics(savedDiagnostics || []);
    }, []);

    const toggleDiagnostic = (diagnostic: Diagnostiques) => {
        const indexOfDiagnostic = selectedDiagnostics.findIndex(diag => diag.id == diagnostic.id);
        (indexOfDiagnostic === -1)
            ? selectedDiagnostics.push(diagnostic)
            : selectedDiagnostics.splice(indexOfDiagnostic, 1);
        setSelectedDiagnostics([...selectedDiagnostics]);
        currentEngagement.setDiagnostics([...selectedDiagnostics] as Diagnostiques[]);
    }

    return <StepCard title='Diagnostics'>
        <div className={styles.diagnosticsChoicesContainer}>
            <div className={styles.choices}>
                {diagnostics?.map((diagnostic) =>
                    <Button key={diagnostic.id} type='primary' onClick={() => toggleDiagnostic(diagnostic)}
                            style={{backgroundColor: selectedDiagnostics.find(diag => diag.name == diagnostic.name) ? green.primary: red.primary}}>
                        {diagnostic.name}
                    </Button>)
                }
            </div>

            <Button disabled={!selectedDiagnostics.length} type='primary' style={{width: 'fit-content'}} onClick={onSelection}>Valider</Button>
        </div>
    </StepCard>;
}

export default DiagnosticsChoices;