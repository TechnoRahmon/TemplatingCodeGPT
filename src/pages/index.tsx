import { PromptInput } from '@/Components/prompt/PromptInput';
import { ViewSection } from '@/Components/prompt/ViewSection';
import React, { useEffect, useState } from 'react'
import styles from "./../styles/ParentComponent.module.css";
import { sentPrompt } from '@/Service/GPT';
import { Store } from '@/store/localStorageStore';
import Link from 'next/link';
import Loader, { stopLoader } from '@/Components/shared/Loader';
import { IhandleSnackbar } from '@/Components/shared/CommonSnackbar';
import ClearListButton from '@/Components/prompt/ClearListButton';
import Switch from '@/Components/shared/Switch';
type props = {
  handleSnackbar: IhandleSnackbar
}
export default function index({
  handleSnackbar
}: props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [resultList, setResultList] = useState<Array<string>>([]);
  const [openai_key, setOpenai_key] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [sendingLoader, setSendingLoader] = useState<boolean>(false);
  const [withoutTemplatMode, setTemplateMode] = useState<boolean>(false);

  const [store, setStore] = useState<Store>();
  const list: string[] = [`# Welcome to Our Site!

  We're excited to have you here. Our site has a lot of great features, including:
  
  
  - **Easy-to-use interface**: Our site is designed to be intuitive and user-friendly, so you can find what you're looking for quickly and easily.
  
  - **Powerful search**: With our advanced search capabilities, you can easily find exactly what you're looking for, no matter how obscure.
  
  - **Community-driven content**: Our site is powered by a community of passionate users who contribute content, answer questions, and share their expertise.
  
  So why not join the community today? Sign up now and start exploring all the great features our site has to offer!
  `,
    " this is a test \n\
  ```jsx \n\
  import React from 'react'; \n\
  \n\
  const HelloWorld = () => {\n\
    return (\n\
      <div>\n\
        <h1>Hello World!</h1>\n\
      </div>\n\
    );\n\
  };\n\
  \n\
  expo\n\
  ```"
  ]
  useEffect(() => {
    debugger
    const newStore = new Store();
    setStore(newStore)
    const openaiKey = newStore.getOpenaiKey();
    let array: any[] = JSON.parse(`[${newStore.getResultList()}]`);
    setResultList(array.length ? array[0] : [])
    if (openaiKey)
      setOpenai_key(openaiKey);
    stopLoader(() => {
      setisLoading(false);
    })
  }, [])
  const onSubmit = async () => {
    setSendingLoader(true);
    try {
      debugger
      const fullPrompt = store?.getFullPrompt(inputValue) ?? inputValue;
      const resp = await sentPrompt(fullPrompt, openai_key);
      const resultView = inputValue + '\n\n ------------------- Result --------------------------- \n\n' + resp;
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
