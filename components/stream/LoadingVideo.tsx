import { Loader } from "lucide-react"
export default function LoadingVideo({label}:{label:string}) {
  return (
    <div
    className= ' h-full flex flex-col space-y-4 justify-center items-center '
    >
        <Loader className=' h-10 w-10 text-muted-foreground animate-spin '/>
        <p
        className=' text-muted-foreground capitalize '
        >
            <span>{label}</span>
        </p>
    </div>
  )
}
