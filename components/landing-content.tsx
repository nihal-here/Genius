"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Testimonials = [
    {
        name: "Maria",
        image: "M",
        title: "Web Developer",
        description:"Genius has been a life saver for me. I am able to generate content in a fraction of the time it used to take me.",
    },
    {
        name: "John",
        image: "J",
        title: "Web Developer",
        description:"Genius has been a life saver for me. I am able to generate content in a fraction of the time it used to take me.",
    },
    {
        name: "Jane",
        image: "J",
        title: "Web Developer",
        description:"Genius has been a life saver for me. I am able to generate content in a fraction of the time it used to take me.",
    },
    {
        name: "Micheal",
        image: "M",
        title: "Web Developer",
        description:"Genius has been a life saver for me. I am able to generate content in a fraction of the time it used to take me.",
    }
]
export const LandingContent = () => {
    return(
        <div className="px-20 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Our Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {Testimonials.map((item)=>(
                     <Card
                     key={item.description}
                     className=" bg-[#192339] border-none text-white"
                     >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                       <p className="text-lg"> {item.name}</p>
                                       <p className="text-sm text-zinc-400">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>   
                 ))}
            </div>
        </div>
    )
}