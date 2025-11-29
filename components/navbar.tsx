
import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar=async () =>{
    const apiLimitCount=await getApiLimitCount();
    const isPro=await checkSubscription();
    return(
        <div className="flex items-center p-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
           <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
        <div className="flex w-full justify-end gap-x-2">
            <ModeToggle />
            <UserButton afterSignOutUrl="/"/> 
        </div>
        </div>
    );
}

export default  Navbar;