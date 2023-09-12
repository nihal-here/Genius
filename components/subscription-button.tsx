"use client";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

 
interface SubscriptionButtonProps{
    isPro:boolean;
 };

export const SubscriptionButton=({
    isPro=false
}:SubscriptionButtonProps)=>{

    const[Loading,isLoading]=useState(false);
    const onclick=async()=>{
        try{
            isLoading(true);
            const response=await axios.get("/api/stripe");
            window.location.href=response.data.url;
        }catch(error){
            toast.error("Something went wrong");
        }finally{
            isLoading(false);
        }
    }

     return(
         <Button disabled={Loading} variant={isPro?"default":"premium"} onClick={onclick}>
             {isPro?"Manage Subscription":"Upgrade"}
             {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
         </Button>
     )
}