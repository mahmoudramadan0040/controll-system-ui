"use client"
import { useState } from "react";
import { Tab ,Tabs } from "@nextui-org/react";
function ToolBarComponent({Components,Msg}) {
    const [status , setStatus] = useState(0);
    
    const handelTabChange =(tabkey)=>{
        setStatus(tabkey)
    }
    return ( 
        <div className='flex items-center justify-center'>
            <div className='flex w-full justify-center'>
                <div className="flex flex-col w-full mt-2 overflow-x-hidden">
                    
                    <div className="text-center m-2">
                        <Tabs color="default" variant="bordered" radius="sm" size="md" onSelectionChange={handelTabChange}>
                            { 
                                Msg ? Object.values(Msg).map((msg,index)=>(
                                    <Tab key={index} title={msg}></Tab>
                                )):
                                ""
                            }
                        </Tabs>
                    </div>
                    { 
                    Components ? Object.values(Components).map((Component,index)=>(
                        status == index ? <Component key={index} />:''
                    )) :"" }
                </div>
            </div>
        </div>
    );
}

export default ToolBarComponent;