'use client'; 

import { useState } from "react";
import { generateVideo } from "@/actions/video";
import * as z from "zod";
import { Heading } from "@/components/heading";

import{zodResolver} from "@hookform/resolvers/zod";
import { formSchema } from "./constants";

import { FileVideo, VideoIcon } from "lucide-react";

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

 const VideoPage =()=>{
    const proModal=useProModal();
    const router=useRouter();
    const [video, setVideo] = useState<string>( )



    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
         }
});

const isLoading=form.formState.isSubmitting;
const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    try{
         setVideo(undefined);

        const response = await generateVideo(values.prompt);

        if (response.error) {
            if (response.status === 403) {
                proModal.onOpen();
            } else {
                toast.error(response.error);
            }
            return;
        }

        setVideo((response.data as any)[0]);
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
                title="Video Generation"
                description="Turn your prompt into video."
                icon={FileVideo}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="flex-1 overflow-y-auto pb-32 px-4 lg:px-8">
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted/50">
                            <Loader />
                        </div>
                    )}
                    {video && !isLoading &&(
                        <div className="w-full mt-8 rounded-lg overflow-hidden border border-white/10 bg-black/20">
                            <video controls className="w-full aspect-video rounded-lg">
                                <source src={video} />
                            </video>
                        </div>
                    )}
                    {!video && !isLoading &&(
                        <Empty label="No Video Generated"/>
                    )}
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
                                     placeholder="Clown fish swimming around a coral reef"
                                     {...field}
                                     />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                    className="col-span-12 lg:col-span-2 w-full rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 transition" 
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

 export default VideoPage  ;