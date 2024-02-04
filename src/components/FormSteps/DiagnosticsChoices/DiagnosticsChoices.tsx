import StepCard from '../StepCard/StepCard';
import { IOnSelection } from '../../../types/IOnSelection';
import { Button } from 'antd';
import Form from 'antd/es/form';
import styles from './DiagnosticsChoices.module.less';
import { useEffect, useState } from 'react';
import { red, green } from '@ant-design/colors';
import { currentEngagement, insererStore } from '../../../stores';
import { Diagnostiques } from '../../../types/Engagement';
import { DiagnoscticsFetcher } from '../../../fetchers/role-fetchers/DiagnosticsFetcher';
import TextArea from 'antd/es/input/TextArea';

interface IDiagnosticsProps extends IOnSelection {
    diagnostics: [any]
}

const DiagnosticsChoices = ({ onSelection, diagnostics }: IDiagnosticsProps) => {
    
    const [form] = Form.useForm();
    const [selectedDiagnostics, setSelectedDiagnostics] = useState<Diagnostiques[]>([]);

    if(currentEngagement?.getCurrentEngagement()?.project?.id == 3) onSelection()

    const getDiagsObligatoires = async () => {
        const { data: diags } = await DiagnoscticsFetcher.obligatoires(currentEngagement.getCurrentMission());
        return diags?.map((diag: Diagnostiques) => {
            return {
                id: diag.id,
                name: diag.name
            }
        })
    }

    const saveForm = (values: any) => {
        currentEngagement.setInfos(values);
    }

    useEffect(() => {

        const fetchData = async () => {


            let savedDiagnostics = currentEngagement.getDiagnostics();
            if (savedDiagnostics) {
                insererStore.setNext(true);
            } else {
                const diagsObliagtoires = await getDiagsObligatoires();
                currentEngagement.setDiagnostics([...diagsObliagtoires] as Diagnostiques[]);
                savedDiagnostics = currentEngagement.getDiagnostics()
            }

            setSelectedDiagnostics(savedDiagnostics || []);
        };

        const infos = currentEngagement.getInfos();
        form.setFieldsValue(infos);
        fetchData();
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
        <div className={styles.explain}>Voici les diagnostics obligatoires (en vert)
            À décocher: les diagnostics obligatoires déjà en votre possession</div>
        <br></br>
        <div className={styles.diagnosticsChoicesContainer}>
            <div className={styles.choices}>
                {diagnostics?.map((diagnostic) =>
                    <Button key={diagnostic.id} type='primary' onClick={() => toggleDiagnostic(diagnostic)}
                        style={{ backgroundColor: selectedDiagnostics.find(diag => diag.name == diagnostic.name) ? green.primary : red.primary }}>
                        {diagnostic.name}
                    </Button>)
                }
            </div>
            <Form
                form={form}
                name="basic"

                initialValues={{ remember: true }}
                autoComplete="off"
                onValuesChange={saveForm}

            >
                <Form.Item
                    label="Commentaire"
                    name="commentaire"
                >
                    <TextArea size='large' />
                </Form.Item>
            </Form>
            <Button disabled={!selectedDiagnostics.length} type='primary' className='button' onClick={onSelection}>Valider</Button>
        </div>

    </StepCard >;
}

export default DiagnosticsChoices;