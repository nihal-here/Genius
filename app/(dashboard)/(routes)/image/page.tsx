'use client'; 

import { useState } from "react";
import { generateImage } from "@/actions/image";
import * as z from "zod";
import { Heading } from "@/components/heading";


import{zodResolver} from "@hookform/resolvers/zod";

import { amountOptions, 
    formSchema, 
    resolutionOptions
}from "./constants";

import { Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from "@/components/ui/select";

import { Download, ImageIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { Form, 
    FormControl,
    FormField,
    FormItem 
} from "@/components/ui/form";
    
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

 const ImagePage =()=>{
    const proModal=useProModal();
    const router=useRouter();
    const [images,setImages]=useState<string[]>([]);
 



    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:"",
            amount:"1",
            resolution:"512x512"
         }
});

const isLoading=form.formState.isSubmitting;
const onSubmit=async(values:z.infer<typeof formSchema>)=>{
    try{
        setImages([]);
        console.log(values)

        const response = await generateImage(values.prompt, values.amount, values.resolution);

        if (response.error) {
            if (response.status === 403) {
                proModal.onOpen();
            } else {
                toast.error(response.error);
            }
            return;
        }

        const urls=response.data?.map((image)=>image.url).filter((url): url is string => !!url) || [];
        setImages(urls);

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
                title="Image Generation"
                description="Turn your prompt into an image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="flex-1 overflow-y-auto pb-32 px-4 lg:px-8">
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {images.length===0 && !isLoading &&(
                        <Empty label="No Images Generated"/>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src)=>(
                            <Card
                            key={src}
                            className="rounded-lg overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm group relative"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                    alt="Image"
                                    fill
                                    src={src}
                                    />
                                </div>
                                <CardFooter className="p-2 absolute bottom-0 w-full bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button 
                                    onClick={()=>window.open(src)}
                                    variant="secondary" 
                                    className="w-full h-8 text-xs"
                                    >
                                        <Download className="h-4 w-4 mr-2"/>
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
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
                            <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                     <Input className="border-0 outline-none focus-visible:ring-0
                                     focus-visible:ring-transparent w-full bg-transparent placeholder:text-zinc-400"
                                     disabled={isLoading}
                                     placeholder="A picture of a moose in the snow"
                                     {...field}
                                     />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="amount"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select 
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-transparent border-0 outline-none focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize">
                                            <SelectValue defaultValue={field.value}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {amountOptions.map((option)=>(
                                            <SelectItem
                                            key={option.value}
                                            value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="resolution"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-2">
                                <Select 
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-transparent border-0 outline-none focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize">
                                            <SelectValue defaultValue={field.value}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {resolutionOptions.map((option)=>(
                                            <SelectItem
                                            key={option.value}
                                            value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button 
                    className="col-span-12 lg:col-span-2 w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90 transition" 
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

 export default ImagePage;