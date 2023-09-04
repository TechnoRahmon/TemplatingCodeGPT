import React, { useState } from 'react';
import styles from "./../../styles/ViewSection.module.css";
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyToClipboard from 'react-copy-to-clipboard';
import { IResult } from '@/store/localStorageStore';
type ViewSectionprops = {
  inputValue: IResult[];
}
export function ViewSection({
  inputValue
}: ViewSectionprops): JSX.Element {
  const [isCopied, setIsCopied] = useState(false)

  const setCopied = () => {
    setIsCopied(true)
    setTimeout(() => { setIsCopied(false) }, 1000);
  }
  return <>{
    inputValue.length ? inputValue.map((result: IResult, index) => (
      <div className={styles.sectionWrapper} key={index}>
        <div className={styles.viewSection}>
          <h2 className={styles.viewSectionTitle}>Input:</h2>
          <p>{result.input}</p>
          <br/>
          <h2 className={styles.viewSectionTitle}>Output:</h2>

          <ReactMarkdown
            children={result.output}
            className={styles.ReactMarkdown}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return <>
                  <div className={styles.copyBar}>
                    <CopyToClipboard text={children}>
                      <button onClick={() => setCopied()} className={`${styles.copyButton} ${isCopied ? {} : styles.copy}`}>
                        {isCopied
                          ? <span title="Copied!">Copied!</span>
                          : <span title="Copy to Clipboard">Copy</span>
                        }
                      </button>
                    </CopyToClipboard>
                  </div>
                  <div className={styles.code}>
                    {!inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={atomDark}
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    )}
                  </div>
                </>
              }
            }}
          />

        </div>
      </div>
    )) : <></>
  }</>;
};
