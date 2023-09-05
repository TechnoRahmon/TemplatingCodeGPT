import React from 'react'
import { VariantType, useSnackbar } from 'notistack';
import { ITemplateItem } from '@/store/localStorageStore';

export type IhandleSnackbarVariantType = VariantType;
export type IhandleSnackbar = (Message: string, variant: VariantType) => void
export default function CommonSnackbar({
  Component, 
  fetchCallback,
  templateList
}: {
  Component: any,
  fetchCallback: () => void,
  templateList: Array<ITemplateItem>
}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbar: IhandleSnackbar = (Message: string, variant: VariantType) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(Message, { variant });
  };



  return <Component handleSnackbar={handleSnackbar} fetchCallback={fetchCallback} templateList={templateList} />

}
