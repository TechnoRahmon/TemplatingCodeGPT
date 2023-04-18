import React, { useState, useEffect } from 'react'
import styles from "./../styles/ParentComponent.module.css";
import { PromptInput } from '@/Components/prompt/PromptInput';
import { Store } from '@/store/localStorageStore';
import { IhandleSnackbar } from '@/Components/shared/CommonSnackbar';
type PromptProps = {
  handleSnackbar: IhandleSnackbar
}
export default function Prompt({
  handleSnackbar
}: PromptProps) {

  const [template, setTemplate] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [pattern, setpattern] = useState<string>("");
  const [openAiKey, setOpenAiKey] = useState<string>("");
  const [showApiKey, setshowApiKey] = useState<boolean>(false);

  const [resultList, setResultList] = useState<Array<string>>([]);
  const [store, setStore] = useState<Store>();
  var onSubmit: any = {
    "template": () => { store?.setPromptTemplate(template) },
    "context": () => { store?.setPromptContext(context) },
    "pattern": () => { store?.setPromptPattern(pattern) },
    "openAiKey": () => { store?.setOpenaiKey(openAiKey) }
  }
  var onChange: any = {
    "template": setTemplate,
    "context": setContext,
    "pattern": setpattern,
    "openAiKey": setOpenAiKey
  };
  var getter: any;
  useEffect(() => {
    const newStore = new Store();
    setStore(newStore)
    const states = ["template",
      "context",
      "pattern",
      "openAiKey"];
    getter = {
      "template": newStore?.getPromptTemplate.bind(newStore),
      "context": newStore?.getPromptContext.bind(newStore),
      "pattern": newStore?.getPromptPattern.bind(newStore),
      "openAiKey": newStore?.getOpenaiKey.bind(newStore)
    }
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
        {showApiKey ?
          <>
            <h2>Openai Api Key</h2>
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
      <div className={styles.sectionWrapper}>
        <h2>Template Prompt</h2>
        <PromptInput
          onChange={(value) => { handleInputChange(value, "template") }}
          value={template}
          onSubmit={() => { onSubmitHandler("template") }} />
      </div>
      <div className={styles.sectionWrapper}>
        <h2>Context Prompt</h2>
        <PromptInput
          onChange={(value) => { handleInputChange(value, "context") }}
          value={context}
          onSubmit={() => { onSubmitHandler("context") }} />
      </div>
      <div className={styles.sectionWrapper}>
        <h2>Pattern Prompt</h2>
        <PromptInput
          onChange={(value) => { handleInputChange(value, "pattern") }}
          value={pattern}
          onSubmit={() => { onSubmitHandler("pattern") }} />
      </div>
    </div>
  )
}
