 import {create} from "zustand";

interface useProModaStore {
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
};

export const useProModal = create<useProModaStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
 
}));
 

     
