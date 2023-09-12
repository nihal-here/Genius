'use client'; 

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import OpenAI from "openai";

import{zodResolver} from "@hookform/resolvers/zod";
import { formSchema } from "./constants";

import { Code, Divide } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";


 const CodePage =()=>{
    const proModal=useProModal();
    const router=useRouter();
    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessageParam[]>([])



    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
         }
});

const isLoading=form.formState.isSubmitting;
const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    try{
        const userMessage: OpenAI.Chat.ChatCompletionMessage = {
            role: "user",
            content: values.prompt
          }
        const newMessages=[...messages,userMessage];

        const response=await axios.post("api/code",{messages:newMessages});
            
        setMessages((current) => [...current,userMessage,response.data]);

        form.reset();


    }catch(error:any){
        if(error?.response?.status===403){
            proModal.onOpen(); 
        }else{
            toast.error("Something went wrong");
        }
    }finally{
        router.refresh();
    }
}

    return(
        <div>
            <Heading 
                title="Code Generation"
                description="Generate code using descriptive text"
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                    <form  onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2">
                    <FormField 
                        name="prompt"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0s p-0">
                                     <Input className="border-0 outline-none focus-visible:ring-0
                                     focus-visible:ring-transparent w-full"
                                     disabled={isLoading}
                                     placeholder="Design a simple toggle button using react hooks"
                                     {...field}
                                     />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                    className="col-span-12 lg:col-span-2 w-full" 
                    disabled={isLoading}
                    >
                        Generate
                    </Button>
                    </form>
                </Form>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="flex flex-col-reverse gap-y-4">
                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader />
                            </div>
                        )
                        }
                        {messages.length===0 && !isLoading &&(
                            <Empty label="No Conversations Started"/>
                        )}
                        {messages.map((message)=>(
                            <div 
                            key={message.content}
                            className={cn("p-5 max-w-screen-lg w-full flex items-start gap-x-2 rounded-lg",message.role==="user"?"bg-white border border-black/10": "bg-muted")}
                            >
                            {message.role==="user"?<UserAvatar/>:<BotAvatar/>}
                            <p className="text-sm">
                                <ReactMarkdown components={
                                        {
                                            pre: ({ node, ...props }) => (
                                                <div className="overflow-x-auto w-full my-2 bg-black/10 p-2 rounded-lg ">
                                                  <pre {...props}  />
                                                </div>
                                              ),
                                              code: ({ node, ...props }) => (
                                                <code className="inline-block bg-black/10  px-2 py-1 rounded-lg mb-2"
                                                   {...props} />
                                              )
                                        }} 
                                        className="text-sm overflow-hidden leading-7"
                                >
                                    {message.content || " "}
                                </ReactMarkdown>
                            </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

 }

 export default CodePage;