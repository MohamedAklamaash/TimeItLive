import { SidebarStore } from "@/types";
import { create } from "zustand";

export enum ChatEnum {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY",
}

type ChatStore = SidebarStore & {
    variant: ChatEnum,
    onChangeVariant?: (variant: ChatEnum) => void
}
export const useChatSidebar = create<ChatStore>((set) => ({
    collapsed: false,
    variant: ChatEnum.CHAT,
    onChangeVariant: (variant: ChatEnum) => set(() => ({ variant })),
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}))
