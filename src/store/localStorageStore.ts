import { generateRandomId } from "@/utils/randomId";
import { template } from "./defaultData";
export type IResult = {
  input: string;
  output: string;
}
export type ITemplateItem = {
  title:string;
  id:string;
  template :string;
  pattern: string;
  context:string;
}
export const _getEmptyTempaltItem = () => ({
    title:'New Prompt',
    id:generateRandomId(),
    context:'',
    pattern:'',
    template:template
  })

function getlocalStorage(key:string):Storage|any{
    return typeof window != undefined ? window?.localStorage.getItem(key):"";
}
function setlocalStorage(key:string, value:string):Storage|any{
    return typeof window != undefined ? window?.localStorage.setItem(key,value):"";
}
function deletelocalStorage(key:string):Storage|any{
  return typeof window != undefined ? window?.localStorage.removeItem(key):"";
}
export class Store {
    private PROMPT_TEMPLATE_LIST_KEY = "PROMPT_TEMPLATE_LIST_KEY_";
    private RESULT_LIST_KEY = "RESULT_LIST_KEY";
    private OPENAI_KEY_KEY = "OPENAI_KEY";
  
    constructor() {

    }
  
    private promptTemplate: string = "";
    private ResultList:string ="";
    private openaiKey: string = "";
    
    setPromptTemplate(id:string, value: string): void {
      this.promptTemplate = value;

      setlocalStorage(this.PROMPT_TEMPLATE_LIST_KEY + id, value);
    }
    deletePromptTemplate(id:string): void {
      deletelocalStorage(this.PROMPT_TEMPLATE_LIST_KEY + id);
    }
    getPromptTemplate(id:string,): string {
      return this.promptTemplate || getlocalStorage(this.PROMPT_TEMPLATE_LIST_KEY + id) || JSON.stringify({..._getEmptyTempaltItem(),id,template});
    }
    
    getPromptTemplateList():Array<ITemplateItem>{
        const templateItem =  Object.entries(localStorage)
            .filter(([key, value])=>key.includes(this.PROMPT_TEMPLATE_LIST_KEY) && key != this.PROMPT_TEMPLATE_LIST_KEY && JSON.parse(value)?.id )
            .map(item=>JSON.parse(item[1])) as Array<ITemplateItem>;

        return templateItem;
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

    getFullPrompt({ context, pattern, template }:ITemplateItem, input:string){
      let templateText = template;
      templateText = template.replace(/{{pattern}}/i, pattern+'\n\n');
      templateText = templateText.replace(/{{context}}/i, context+'\n\n');
      templateText = templateText.replace(/{{input}}/i, input+'\n\n');
      return templateText;
    }
  }
  