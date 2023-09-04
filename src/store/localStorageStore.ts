import { template } from "./defaultData";

function getlocalStorage(key:string):Storage|any{
    return typeof window != undefined ? window?.localStorage.getItem(key):"";
}
function setlocalStorage(key:string, value:string):Storage|any{
    return typeof window != undefined ? window?.localStorage.setItem(key,value):"";
}
export class Store {
    private PROMPT_TEMPLATE_KEY = "PROMPT_TEMPLATE";
    private PROMPT_PATTERN_KEY = "PROMPT_PATTERN";
    private PROMPT_CONTEXT_KEY = "PROMPT_CONTEXT";
    private RESULT_LIST_KEY = "RESULT_LIST_KEY";
    private INPUT_HISTORY = "INPUT_HISTORY";
    private OPENAI_KEY_KEY = "OPENAI_KEY";
  
    constructor() {

    }
  
    private promptTemplate: string = "";
    private promptPattern: string = "";
    private promptContext: string = "";
    private ResultList:string ="";
    private openaiKey: string = "";
    
    setPromptTemplate(value: string): void {
        debugger
      this.promptTemplate = value;

      setlocalStorage(this.PROMPT_TEMPLATE_KEY, value);
    }
  
    getPromptTemplate(): string {
      return this.promptTemplate || getlocalStorage(this.PROMPT_TEMPLATE_KEY) || template;
    }
  
    setPromptPattern(value: string): void {
      this.promptPattern = value;
      setlocalStorage(this.PROMPT_PATTERN_KEY, value);
    }
  
    getPromptPattern(): string {
      return this.promptPattern || getlocalStorage(this.PROMPT_PATTERN_KEY) || "";
    }
  
    setPromptContext(value: string): void {
      this.promptContext = value;
      setlocalStorage(this.PROMPT_CONTEXT_KEY, value);
    }
  
    getPromptContext(): string {
      return this.promptContext || getlocalStorage(this.PROMPT_CONTEXT_KEY) || "";
    }
  
    setOpenaiKey(value: string): void {
      this.openaiKey = value;
      setlocalStorage(this.OPENAI_KEY_KEY, value);
    }
  
    getOpenaiKey(): string {
      return this.openaiKey || getlocalStorage(this.OPENAI_KEY_KEY) || "";
    }

    setResultList(value: string): void {
        this.ResultList = value;
        setlocalStorage(this.RESULT_LIST_KEY, value);
      }
    
      getResultList(): string {
        return this.ResultList || getlocalStorage(this.RESULT_LIST_KEY) || "";
      }

    getFullPrompt(input:string){
      let template = this.getPromptTemplate();
      const pattern = this.getPromptPattern();
      const context = this.getPromptContext();
      template = template.replace(/{{pattern}}/i, pattern+'\n\n');
      template = template.replace(/{{context}}/i, context+'\n\n');
      template = template.replace(/{{input}}/i, input+'\n\n');
      return template;
    }
  }
  