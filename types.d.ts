import { User } from '@prisma/client'

interface Wrapper {
    children: React.ReactNode
}

interface SidebarStore {
    collapsed: boolean
    onExpand: () => void
    onCollapse: () => void
}

interface HintProps {
    children: React.ReactNode
    label: String
    asChild?: boolean
    side?: 'top' | 'bottom' | 'left' | 'right'
    align?: 'start' | 'center' | 'end'
}

interface RecommdationService {
    data: User[]
}

interface UserItemProps {
    key?: String
    username: String
    imageUrl: String
    isLive?: boolean
    showBadge?: boolean
}

interface UserPageProps {
    params: {
        username: string
    }
}