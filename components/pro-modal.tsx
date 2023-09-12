"use client";
import axios from "axios";
import { useState } from "react";

import { 
    Check,
    Code, 
    ImageIcon,
    MessageSquare,
    Music, 
    VideoIcon, 
    Zap, 
} from "lucide-react";

import { Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogDescription,
     DialogFooter
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

const tools=[
    {
      label:"Conversation",
      icon:MessageSquare,
      color:"text-violet-500",
      bgcolor:"bg-violet-500/10",

    },
    {
      label:"Image Generation",
      icon:ImageIcon,
      color:"text-pink-700",
      bgcolor:"bg-pink-700/10",

    },
    {
      label:"Video Generation",
      icon:VideoIcon,
      color:"text-orange-500",
      bgcolor:"bg-orange-500/10",

    },
    {
      label:"Music Generation",
      icon:Music,
      color:"text-emerald-500",
      bgcolor:"bg-emerald-500/10",

    },
    {
      label:"Code Generation",
      icon:Code,
      color:"text-green-500",
      bgcolor:"bg-green-500/10",
    },
      
    ]


export const ProModal=()=>{
    const proModal=useProModal();
    const [Loading, setLoading]=useState(false);

    const onSubscribe=async()=>{
        try{
            setLoading(true);
            const response=await axios.get("/api/stripe");

            window.location.href=response.data.url;
        }catch(error){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return(
       <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                    Upgrade to Genius
                    <Badge variant="premium" className="uppercase text-sm py-1">
                        Pro
                    </Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool)=>(
                        <Card key={tool.label}
                        className="p-3 border-black/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-x-4 "> 
                                <div className={cn("p-2 w-fit rounded-md",tool.bgcolor)}>
                                    <tool.icon className={cn("w-6 h-6",tool.color)}/>
                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.label}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5"/>
                        </Card>
                    ))}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                        <Button 
                        disabled={Loading}
                        onClick={onSubscribe}
                        size="lg"
                        variant="premium"
                         className="w-full">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white border-0" />
                        </Button>
            </DialogFooter>
        </DialogContent>
       </Dialog>
    )
}