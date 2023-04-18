import React from 'react'
import { VariantType, useSnackbar  } from 'notistack';

export type IhandleSnackbarVariantType = VariantType;
export type IhandleSnackbar = (Message:string , variant: VariantType)=> void
export default function CommonSnackbar({
    Component
}:{Component:any}) {
    const { enqueueSnackbar } = useSnackbar();

    const handleSnackbar:IhandleSnackbar = (Message:string , variant: VariantType) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(Message, { variant });
    };


      
      return <Component handleSnackbar={handleSnackbar}/>

}
