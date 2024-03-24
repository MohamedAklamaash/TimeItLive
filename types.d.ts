interface Wrapper {
    children: React.ReactNode
}

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

interface HintProps {
    children: React.ReactNode;
    label: String;
    asChild?: boolean;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}
