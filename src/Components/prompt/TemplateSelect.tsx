import { ITemplateItem, Store } from '@/store/localStorageStore';
import React, { useState } from 'react';
import Popup from './Popup';

interface TemplateSelectProps {
    templateList: ITemplateItem[];
    onChange: (selectedTemplate: ITemplateItem | null) => void;
    styles: any;
    store?: Store;
    inputValue: string;
}

const TemplateSelect: React.FC<TemplateSelectProps> = ({ templateList, onChange, styles, store, inputValue }) => {
    const [selectedId, setSelectedId] = useState<string>('');
    const [templateChunk, setTemplateChunk] = useState<string>('');
    const [ShowPopup, setShowPopup] = useState<boolean>(false);
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedId(selectedId);
        const selectedTemplate = templateList.find((temp) => temp.id === selectedId) || null;
        if (selectedTemplate?.id) {
            setTemplateChunk(store?.getFullPrompt(selectedTemplate, inputValue) ?? "")
        }
        onChange(selectedTemplate);
    };

    return (
        <div className={styles.selectContainer}>
            
            <span className={templateChunk ?styles.popupTrigger:styles.popupTriggerDisabled} onClick={() => { templateChunk ?setShowPopup(true):"" }}>Show full prompt</span>
               
            <Popup isOpen={ShowPopup} onClose={() => { setShowPopup(false) }} text={templateChunk} title='Seleted Template' />
            <select
                className={styles.select}
                value={selectedId}
                onChange={handleSelectChange}
            >
                <option value="" disabled>Select a template</option>
                {templateList.map((template) => (
                    <option key={template.id} value={template.id}>
                        {template.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TemplateSelect;
