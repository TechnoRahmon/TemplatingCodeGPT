import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const Code = ({ children, language, isDark, setIsDark }:any) => {
  const [isCopied, setIsCopied] = useState(false)

  //SyntaxHighlighter.registerLanguage('jsx', jsx);

  const setCopied = () => {
    setIsCopied(true)
    setTimeout(() => { setIsCopied(false) }, 1000);
  }

  return (
    <div className="code">
      <div className="code__icons">
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "Dark": "Light"}
        </button>

        <CopyToClipboard text={children}>
          <button onClick={() => setCopied()}>
            {isCopied
              ? <span title="Copied!">Copied!</span>
              : <span title="Copy to Clipboard">Copy</span>
            }
          </button>
        </CopyToClipboard>
      </div>

      <SyntaxHighlighter language={language} style={docco}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code