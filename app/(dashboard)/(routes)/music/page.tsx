'use client'; 

import { useState } from "react";
import { generateMusic } from "@/actions/music";
import * as z from "zod";
import { Heading } from "@/components/heading";


import{zodResolver} from "@hookform/resolvers/zod";
import { formSchema } from "./constants";

import { Music, MusicIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Underdog } from "next/font/google";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { PromptLibrary } from "@/components/prompt-library";

 const MusicPage =()=>{
    const proModal=useProModal();
    const router=useRouter();
    const [music, setMusic] = useState<string>( )



    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
         }
});

const isLoading=form.formState.isSubmitting;
const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    try{
         setMusic(undefined);

        const response = await generateMusic(values.prompt);

        if (response.error) {
            if (response.status === 403) {
                proModal.onOpen();
            } else {
                toast.error(response.error);
            }
            return;
        }

        setMusic((response.data as any).audio);

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
                title="Music Generation"
                description="Turn your prompt into music."
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <div className="flex-1 overflow-y-auto pb-32 px-4 lg:px-8">
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted/50">
                            <Loader />
                        </div>
                    )}
                    {music && !isLoading &&(
                        <div className="w-full mt-8">
                            <audio controls className="w-full mt-8 bg-black/10 rounded-lg">
                                <source src={music} />
                            </audio>
                        </div>
                    )}
                    {!music && !isLoading &&(
                        <Empty label="No Music Generated"/>
                    )}
                </div>
            </div>
            <div className="absolute bottom-0 w-full p-4 pb-10 bg-gradient-to-t from-background via-background to-transparent">
                <div className="mb-4 px-4 md:px-6">
                    <PromptLibrary 
                        type="music" 
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
                                     placeholder="Piano solo"
                                     {...field}
                                     />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                    className="col-span-12 lg:col-span-2 w-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90 transition" 
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

 export default MusicPage  ;