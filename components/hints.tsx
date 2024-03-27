import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HintProps } from '@/types'

export const Hint = ({children,label,align,asChild,side}:HintProps)=>{
    return(
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                side={side}
                align={align}
                className=' text-black bg-white '
                >
                    <p className=' font-semibold'>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}