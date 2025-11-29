'use client'; 

import { useState } from "react";
import { generateCode } from "@/actions/code";
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
import { PromptLibrary } from "@/components/prompt-library";


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
        const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
            role: "user",
            content: values.prompt
          }
        const newMessages=[...messages,userMessage];

        const response = await generateCode(newMessages);

        if (response.error) {
            if (response.status === 403) {
                proModal.onOpen();
            } else {
                toast.error(response.error);
            }
            return;
        }
            
        setMessages((current) => [...current,userMessage,response.data as OpenAI.Chat.ChatCompletionMessageParam]);

        form.reset();


    }catch(error:any){
        console.log(error);
        toast.error("Something went wrong");
    }finally{
        router.refresh();
    }
}

    return(
        <div className="h-full relative flex flex-col">
            <Heading 
                title="Code Generation"
                description="Generate code using descriptive text."
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
            />
            <div className="flex-1 overflow-y-auto pb-32 px-4 lg:px-8">
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted/50">
                            <Loader />
                        </div>
                    )}
                    {messages.length===0 && !isLoading &&(
                        <Empty label="No Conversations Started"/>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message)=>(
                            <div 
                            key={String(message.content)}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <div className="flex flex-col w-full overflow-hidden">
                                    <ReactMarkdown components={{
                                        pre: ({ node, ...props }) => (
                                            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({ node, ...props }) => (
                                            <code className="bg-black/10 rounded-lg p-1" {...props} />
                                        )
                                    }} className="text-sm overflow-hidden leading-7">
                                        {message.content as string || ""}
                                    </ReactMarkdown>
                                    {message.role !== "user" && (
                                        <Button 
                                            onClick={() => {
                                                navigator.clipboard.writeText(message.content as string);
                                                toast.success("Copied to clipboard!");
                                            }}
                                            className="self-end mt-2 h-auto p-1 px-2 text-xs text-muted-foreground hover:text-primary"
                                            variant="ghost"
                                            size="sm"
                                        >
                                            Copy Code
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 w-full p-4 pb-10 bg-gradient-to-t from-background via-background to-transparent">
                <div className="mb-4 px-4 md:px-6">
                    <PromptLibrary 
                        type="code" 
                        onSelect={(prompt) => form.setValue("prompt", prompt)} 
                    />
                </div>
                <Form {...form}>
                    <form  onSubmit={form.handleSubmit(onSubmit)} className="
                    rounded-full
                    border
                    border-zinc-700
                    w-full
                    p-2
                    px-4
                    md:px-6
                    focus-within:shadow-2xl
                    focus-within:border-primary/50
                    grid
                    grid-cols-12
                    gap-2
                    bg-secondary/10
                    backdrop-blur-md
                    transition-all
                    duration-300
                    shadow-xl
                    ">
                    <FormField 
                        name="prompt"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                     <Input className="border-0 outline-none focus-visible:ring-0
                                     focus-visible:ring-transparent w-full bg-transparent placeholder:text-zinc-400"
                                     disabled={isLoading}
                                     placeholder="Simple toggle button using react hooks."
                                     {...field}
                                     />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                    className="col-span-12 lg:col-span-2 w-full rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 transition" 
                    disabled={isLoading}
                    >
                        Generate
                    </Button>
                    </form>
                </Form>
            </div>
        </div>
    );

 }

 export default CodePage;