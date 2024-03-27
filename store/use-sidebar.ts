import { SidebarStore } from "@/types";
import { create } from "zustand";


export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}))