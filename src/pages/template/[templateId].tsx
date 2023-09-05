import React, { useState, useEffect } from 'react'
import styles from "./../../styles/ParentComponent.module.css";
import { PromptInput } from '@/Components/prompt/PromptInput';
import { ITemplateItem, Store, _getEmptyTempaltItem } from '@/store/localStorageStore';
import { IhandleSnackbar } from '@/Components/shared/CommonSnackbar';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

type PromptProps = {
  handleSnackbar: IhandleSnackbar,
  fetchCallback: () => void,
  templateList: Array<ITemplateItem>
}
export default function Prompt({
  handleSnackbar,
  fetchCallback,
  templateList
}: PromptProps) {
  const router = useRouter();
  const [template, setTemplate] = useState<ITemplateItem>({ ..._getEmptyTempaltItem(), id: "" });
  const [isDeleteMode, setIsDeleteMode] = useState(false);
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
    handleSnackbar(`${key} has been submitted successfully`, 'success');
    fetchCallback()
  }
  const handleInputChange = (value: string, key: any) => {
    setTemplate(state => ({ ...state, [key]: value }))
  };
  const onDeleteHandler = () => {
    if (!isDeleteMode) {
      return setIsDeleteMode(true);
    }
    if (templateList.length == 1) {
      return handleSnackbar(`Template can't be deleted, need at least one template!`, 'error')
    }
    // set new template list without the current template
    const newTemplateList = templateList.filter(temp => temp.id !== template.id);
    // set the mewTemplateList
    store?.deletePromptTemplate(template.id)
    handleSnackbar(`Template has been deleted successfully`, 'success')
    // get the redirect url
    const redirectUrl = `/template/${newTemplateList[0].id}`;
    fetchCallback()
    // redirect to the first template
    router.push(redirectUrl);
  }
  return (
    <div className={styles.parentComponent}>
      <div className={styles.actionBar}>
        {isDeleteMode ?
          <>
            <span>Are you sure ?</span>
            <span className={styles.icon} onClick={() => { setIsDeleteMode(false) }}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </>
          : ""}
        <span className={styles.icon} onClick={onDeleteHandler}>
          <FontAwesomeIcon icon={isDeleteMode ? faCheck : faTrash} />
        </span>
      </div>
      <div className={styles.sectionWrapper}>
        <h2>Template title</h2>
        <PromptInput
          className={`input-one-line`}
          onChange={(value) => { handleInputChange(value, "title") }}
          value={template.title}
          onSubmit={() => { onSubmitHandler("title"); }} />
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
