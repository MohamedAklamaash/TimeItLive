'use client'
import { useState, useTransition } from 'react'
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { updateStream } from '@/actions/stream'
import { toast } from 'sonner'
import { useRef, ElementRef } from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'
import { Hint } from '../hints'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
export default function InfoModal({
  name,
  thumbnailUrl,
}: {
  name: string
  thumbnailUrl: string
}) {
  const [initialName, setinitialName] = useState(name)
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const [initialThumbnailUrl, setinitialThumbnailUrl] = useState(thumbnailUrl)
  const [isPending, startTransition] = useTransition()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => {
      updateStream({ name: initialName })
        .then(() => {
          toast.success(`Value is Updated successfully`)
          closeRef.current?.click()
        })
        .catch(() => {
          toast.error('Error in updating the Stream')
        })
    })
  }
  const onRemove = ()=>{
    startTransition(()=>{
        updateStream({thumbnailUrl:null}).then(()=>{
            toast.success("Thumbnail removed successfully")
            setinitialThumbnailUrl("")
            closeRef.current?.click()
        }).catch(() => {
            toast.error("Error in updating the thumbnail url")
        })
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link' size='sm' className=' ml-auto '>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className=' space-y-14 '>
          <div className='space-y-2'>
            <Label>Name</Label>
            <Input
              placeholder='Stream Name'
              value={initialName}
              disabled={isPending}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setinitialName(e.target.value)
              }}
            />
          </div>
          <div className=' space-y-2 '>
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className='relative aspect-video border border-white/10 rounded-xl overflow-hidden'>
                <div className=' absolute top-2 right-2 z-[10] '>
                  <Hint label='remove Thumbnail' side='left' asChild>
                    <Button
                      disabled={isPending}
                      onClick={onRemove}
                      className=' h-auto w-auto p-1.5 '
                    >
                      <TrashIcon className=' h-5 w-5 ' />
                    </Button>
                  </Hint>
                </div>
                <Image src={initialThumbnailUrl} alt='Thumbnail' className=' object-cover ' fill />
              </div>
            ) : (
              <div className='rounded-xl border outline-dashed outline-muted'>
                <UploadDropzone
                  endpoint='thumbNailUploader'
                  appearance={{
                    label: {
                      color: '#fff',
                    },
                    allowedContent: {
                      color: '#fff',
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setinitialThumbnailUrl(res[0].url)
                    closeRef.current?.click();
                    router.refresh()
                  }}
                />
              </div>
            )}
          </div>
          <div className=' flex justify-between '>
            <DialogClose ref={closeRef}>
              <Button type='button' variant='ghost'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant='ghost'
              type='submit'
              className=' bg-blue-600 text-white '
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
