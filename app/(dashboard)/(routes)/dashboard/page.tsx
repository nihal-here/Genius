"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";


import { Card } from "@/components/ui/card";
import {  ArrowRight, 
  Code, 
  ImageIcon,
  MessageSquare,
  Music, 
  VideoIcon } from "lucide-react";


const tools=[
{
  label:"Conversation",
  icon:MessageSquare,
  color:"text-violet-500",
  bgcolor:"bg-violet-500/10",
  href:"/conversation"
},
{
  label:"Image Generation",
  icon:ImageIcon,
  color:"text-pink-700",
  bgcolor:"bg-pink-700/10",
  href:"/image"
},
{
  label:"Video Generation",
  icon:VideoIcon,
  color:"text-orange-500",
  bgcolor:"bg-orange-500/10",
  href:"/video"
},
{
  label:"Music Generation",
  icon:Music,
  color:"text-emerald-500",
  bgcolor:"bg-emerald-500/10",
  href:"/music"
},
{
  label:"Code Generation",
  icon:Code,
  color:"text-green-500",
  bgcolor:"bg-green-500/10",
  href:"/code"
},
  
]

const DashboardPage = () =>{
  const router= useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">Explore the power of AI</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Interact with the smartest AI - Experience the next Revolution</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool)=>(
           <Card
           onClick={()=>router.push(tool.href)}
           key={tool.href}
           className="p-4 border-white/5 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer group border hover:border-primary/50 aspect-square"
           >
            <div className={cn("p-4 w-fit rounded-full mb-4 bg-black/20 group-hover:bg-white/10 transition",tool.bgcolor)}>
              <tool.icon className={cn("w-12 h-12",tool.color)}/>
            </div>
            <div className="font-bold text-lg text-white mb-2">
              {tool.label}
            </div>
            <p className="text-xs text-muted-foreground">
                Generate {tool.label.toLowerCase()} with AI
            </p>
           </Card>
        ))}
      </div>
    </div>
  );
}
export default DashboardPage;
 