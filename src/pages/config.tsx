import React, { useState, useEffect } from 'react'
import styles from "./../styles/ParentComponent.module.css";
import { PromptInput } from '@/Components/prompt/PromptInput';
import { Store } from '@/store/localStorageStore';
import { IhandleSnackbar } from '@/Components/shared/CommonSnackbar';
type PromptProps = {
    handleSnackbar: IhandleSnackbar
}
export default function Config({
    handleSnackbar
}: PromptProps
) {
    const [showApiKey, setshowApiKey] = useState<boolean>(false);
    const [openAiKey, setOpenAiKey] = useState<string>("");

    const [store, setStore] = useState<Store>();
    var onSubmit: any = {
        "openAiKey": () => { store?.setOpenaiKey(openAiKey) }
    }
    var onChange: any = {
        "openAiKey": setOpenAiKey
    };

    var getter: any;
    useEffect(() => {
        const newStore = new Store();
        setStore(newStore)
        const states = ["openAiKey"];
        getter = {"openAiKey": newStore?.getOpenaiKey.bind(newStore)}
        states.forEach((key: string) => onChange[key](getter[key]()))
      }, [])

    const onSubmitHandler = (key: string) => {
        onSubmit[key]();
        handleSnackbar(`${key} has been submitted successfully`, 'success')
      }
      const handleInputChange = (value: string, key: string) => {
        onChange[key](value);
      };
    return (
        <div className={styles.parentComponent}>
            <div className={styles.sectionWrapper}>
                <h2>Openai Api Key</h2>
                <br />
                {showApiKey ?
                    <>
                        <PromptInput
                            className={`input-one-line`}
                            onChange={(value) => { handleInputChange(value, "openAiKey") }}
                            value={openAiKey}
                            onSubmit={() => { onSubmitHandler("openAiKey"); setshowApiKey(false); }} />
                    </>
                    :
                    <button className={`${styles.button} ${styles.apikeyButton}`} onClick={() => { setshowApiKey(true) }}>API Key</button>
                }
            </div>
        </div>
    )
}
