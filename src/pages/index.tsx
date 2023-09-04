import { PromptInput } from '@/Components/prompt/PromptInput';
import { ViewSection } from '@/Components/prompt/ViewSection';
import React, { useEffect, useState } from 'react'
import styles from "./../styles/ParentComponent.module.css";
import { sentPrompt } from '@/Service/GPT';
import { IResult, Store } from '@/store/localStorageStore';
import Link from 'next/link';
import Loader, { stopLoader } from '@/Components/shared/Loader';
import { IhandleSnackbar } from '@/Components/shared/CommonSnackbar';
import ClearListButton from '@/Components/prompt/ClearListButton';
import Switch from '@/Components/shared/Switch';
type props = {
  handleSnackbar: IhandleSnackbar
}
const emptyResult: IResult = {
  input: '',
  output: ''
}
export default function index({
  handleSnackbar
}: props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [resultList, setResultList] = useState<Array<IResult>>([emptyResult]);
  const [openai_key, setOpenai_key] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [sendingLoader, setSendingLoader] = useState<boolean>(false);
  const [withoutTemplatMode, setTemplateMode] = useState<boolean>(false);

  const [store, setStore] = useState<Store>();

  useEffect(() => {

    const newStore = new Store();
    setStore(newStore)
    const openaiKey = newStore.getOpenaiKey();
    let array: any[] = JSON.parse(`[${newStore.getResultList()}]`);
    const storedList = checkStoredList(array.length ? array[0] : []);
    setResultList(storedList)
    if (openaiKey)
      setOpenai_key(openaiKey);
    stopLoader(() => {
      setisLoading(false);
    })
  }, [])

  const checkStoredList = (_list:any[])=>{
    return _list.map<IResult>((item:any)=> {
      if (typeof item == 'string'){
        const [inputString, output ] = item.split("------------------- Result ---------------------------");
        return { input:inputString, output}
      }
      return item as IResult
    })
  }
  const onSubmit = async () => {
    setSendingLoader(true);
    try {
      const fullPrompt = `store?.getFullPrompt(inputValue) ?? inputValue`;
      const resp = await sentPrompt(fullPrompt, openai_key);
      const resultView: IResult = { input: inputValue, output: resp ?? "" }
      setResultList(state => [resultView, ...state]);
      store?.setResultList(JSON.stringify([resultView, ...resultList]))
      setSendingLoader(false);
    } catch (error: any) {
      setSendingLoader(false);
      let message = error?.response?.data?.error?.message;
      handleSnackbar(message, "error");
    }
  }
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  const clearChat = () => {
    store?.setResultList(`[]`);
    setResultList([]);
  }
  if (isLoading)
    return <Loader hWrapper={80} />
  return (
    <div className={styles.parentComponent}>
      {openai_key == "" ?
        <Link href={"/prompt"} className={styles.button}>Add Openai Key</Link>
        :
        <>
          <div className={styles.sectionWrapper}>
            <h2>Prompt Input</h2>
            <PromptInput
              className={`input`}
              onChange={handleInputChange}
              value={inputValue}
              onSubmit={onSubmit}
              customButton={<>
                <ClearListButton label='clear chat' onSubmit={clearChat} />
              </>} />

          </div>
          {sendingLoader ?
            <Loader hWrapper={25} />
            :
            <ViewSection inputValue={resultList} />
          }
        </>
      }

    </div>
  );
}
