import React, { useState, useEffect } from 'react'
import styles from "./../../styles/ParentComponent.module.css";
import { PromptInput } from '@/Components/prompt/PromptInput';
import { ITemplateItem, Store, _getEmptyTempaltItem } from '@/store/localStorageStore';
import { IhandleSnackbar } from '@/Components/shared/CommonSnackbar';
import { useRouter } from 'next/router';
type PromptProps = {
  handleSnackbar: IhandleSnackbar
}
export default function Prompt({
  handleSnackbar
}: PromptProps) {
  const router = useRouter();
  console.log(router.query['templateId'])
  const [templateId, settemplateId] = useState("");
  const [template, setTemplate] = useState<ITemplateItem>({ ..._getEmptyTempaltItem(), id: templateId });

  const [resultList, setResultList] = useState<Array<string>>([]);
  const [store, setStore] = useState<Store>();


  useEffect(() => {
    if (router.isReady) {
      const _templateId = router.query?.templateId?.toString() ?? "";
      const newStore = new Store();
      setStore(newStore)
      // get the tamplate item from the store
      const templateChunk = newStore?.getPromptTemplate(_templateId);
      const templateItem: ITemplateItem = JSON.parse(templateChunk ?? '{}');
      // set the template item
      setTemplate(templateItem);
    }
  }, [])

  const onSubmitHandler = (key: string) => {
    store?.setPromptTemplate(template.id, JSON.stringify(template))
    handleSnackbar(`${key} has been submitted successfully`, 'success')
  }
  const handleInputChange = (value: string, key: any) => {
    setTemplate(state => ({ ...state, [key]: value }))
  };

  return (
    <div className={styles.parentComponent}>
      <div className={styles.sectionWrapper}>
        <h2>Template title</h2>
        <PromptInput
          className={`input-one-line`}
          onChange={(value) => { handleInputChange(value, "title") }}
          value={template.title}
          onSubmit={() => { onSubmitHandler("title") }} />
      </div>
      <div className={styles.sectionWrapper}>
        <h2>Template</h2>
        <PromptInput
          onChange={(value) => { handleInputChange(value, "template") }}
          value={template.template}
          onSubmit={() => { onSubmitHandler("template") }} />
      </div>
      <div className={styles.sectionWrapper}>
        <h2>Context</h2>
        <PromptInput
          onChange={(value) => { handleInputChange(value, "context") }}
          value={template.context}
          onSubmit={() => { onSubmitHandler("context") }} />
      </div>
      <div className={styles.sectionWrapper}>
        <h2>Pattern</h2>
        <PromptInput
          onChange={(value) => { handleInputChange(value, "pattern") }}
          value={template.pattern}
          onSubmit={() => { onSubmitHandler("pattern") }} />
      </div>
    </div>
  )
}
