import React from 'react'

export default function Loader({hWrapper}:{hWrapper:number}) {
  return (
    <div className={`custom-loader-wrapper h-${hWrapper}`}>
        <div className="custom-loader"></div>
    </div>
  )
}
export const stopLoader = (callback:()=>void)=>{
    setTimeout(()=>{
        callback()
    },1500)
}