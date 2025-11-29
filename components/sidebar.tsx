"use client";

import  Link  from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import {usePathname} from "next/navigation";
import { FreeCounter } from "@/components/free-counter";
import { 
    Code,
    ImageIcon, 
    LayoutDashboard, 
    MessageSquare,  
    MusicIcon, 
    Settings, 
    VideoIcon} from "lucide-react";

import { cn } from "@/lib/utils";



const montserrat=Montserrat({
    weight:"600",
    subsets:["latin"],
});

const routes=[
    {
     label:"Dashboard",
     icon:LayoutDashboard,
     href:"/dashboard",
     color: "text-sky-500"
    },
    {
        label:"Conversation",
        icon:MessageSquare,
        href:"/conversation",
        color: "text-violet-500"
    },
    {
        label:"Image Generation",
        icon:ImageIcon,
        href:"/image",
        color: "text-pink-700"
    },
    {
        label:"Video Generation",
        icon:VideoIcon,
        href:"/video",
        color: "text-orange-700"
    },
    {
        label:"Music Generation",
        icon:MusicIcon,
        href:"/music",
        color: "text-emerald-500"
    },
    {
        label:"Code Generation",
        icon:Code,
        href:"/code",
        color: "text-green-700"
    },
    {
        label:"Settings",
        icon:Settings,
        href:"/settings",
    },
];

interface SidebarProps{
    apiLimitCount:number;
    isPro:boolean;
}
const Sidebar = ({
    apiLimitCount=0,
    isPro=false
}:SidebarProps)=> {
     const pathname= usePathname();



    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white overflow-hidden border-r border-white/10">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14 hover:opacity-75 transition">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                        fill 
                        alt="Logo"
                        src="/logo.png" />
                        </div>
                        <h1 className={cn("text-2xl font-bold tracking-tight",montserrat.className)}>
                            Genius
                        </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route)=>(
                        <Link
                        href={route.href}
                        key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition duration-200",
                            pathname===route.href ? "text-white bg-white/10 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]" : "text-zinc-400"
                            )}
                            >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("mr-3 w-5 h-5 transition-all group-hover:scale-110",route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>
                <div className="mt-auto px-3">
            <FreeCounter isPro={isPro}
                apiLimitCount={apiLimitCount} 
            />
            </div>
        </div>
    );
}

export default Sidebar;