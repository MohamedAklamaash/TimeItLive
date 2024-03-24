import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import clerkLogo from "@/public/cloud-backup-svgrepo-com.svg";
const font = Poppins({
    subsets:["latin"],
    weight:["600","200","300","400","500","700","800"]
})

export const Logo= ()=>{
  return (
    <div
    className=" flex flex-col items-center justify-center "
    >
        <Image src={clerkLogo} width={80} className="  " alt="Logo"/>
        <h1
        className={cn(" text-white ",font.className)}
        >
            Time IT!
        </h1>
    </div>
  )
}
