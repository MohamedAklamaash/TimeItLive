'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createIngress } from '@/actions/ingress'
import { IngressInput } from 'livekit-server-sdk'
import { useState, useTransition, useRef, ElementRef } from 'react'
import { toast } from 'sonner'

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

export default function ConnectModal() {
  const [ingressType, setingressType] = useState<IngressType>(RTMP)
  const [isPending, startTransition] = useTransition()
  const closeref = useRef<ElementRef<'button'>>(null)
  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then((d) => {
          toast.success(`Ingress Created Successfully`)
          closeref.current?.click()
        })
        .catch(() => {
          toast.error(`Failed to create ingress`)
        })
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=' bg-blue-600 text-white '>
          Generate Connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(e) => {
            setingressType(e)
          }}
        >
          <SelectTrigger className=' w-full '>
            <SelectValue placeholder='Ingress Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className=' h-4 w-4 ' />
          <AlertTitle>Warning!!</AlertTitle>
          <AlertDescription>
            This action will reset all the active streams using the current
            connection
          </AlertDescription>
        </Alert>
        <div className='flex justify-between'>
          <DialogClose asChild ref={closeref}>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button className=' bg-blue-600 text-white ' onClick={onSubmit}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
