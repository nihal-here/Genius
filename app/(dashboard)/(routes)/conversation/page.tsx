'use client'; 

import { useState } from "react";
import * as z from "zod";
import { Heading } from "@/components/heading";
import OpenAI from "openai";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { MessageSquare } from "lucide-react";
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
import { toast } from "react-hot-toast";

import { generateConversation } from "@/actions/conversation";

 const ConversationPage =()=>{
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

        const response = await generateConversation(newMessages);

        if (response.error) {
            if (response.status === 403) {
                proModal.onOpen();
            } else {
                toast.error(response.error);
            }
            return;
        }
            
        setMessages((current) => [...current,userMessage,response.data as OpenAI.Chat.ChatCompletionMessage]);

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
                title="Conversation"
                description="Our most advanced AI powered chatbot"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
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
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg transition-all",
                            message.role==='user' ? "bg-white/10 border border-white/10" : "bg-transparent")}
                            >
                            {message.role==="user"?<UserAvatar/>:<BotAvatar/>}
                            <p className="text-sm text-zinc-100 leading-relaxed">
                                {String(message.content)}
                            </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 w-full p-4 pb-10 bg-gradient-to-t from-background via-background to-transparent">
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
                                     placeholder="How do i calculate the area of a circle?"
                                     {...field}
                                     />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                    className="col-span-12 lg:col-span-2 w-full rounded-full bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 transition" 
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

 export default ConversationPage;