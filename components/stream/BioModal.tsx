'use client'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '../ui/textarea'
import { useRef, useState, useTransition,ElementRef } from 'react'
import { UpdateUser } from '@/actions/user'
import { toast } from 'sonner'
export default function BioModal({ bio }: { bio: string }) {
  const [initialBio, setinitialBio] = useState(bio)
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition()
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => {
      UpdateUser({ bio: initialBio })
        .then(() => {
          toast.success(` Bio is Updated successfully`)
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error(` Failed to update user ${initialBio}`)
        })
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link'>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} action=''>
          <Textarea
            placeholder='User Bio'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setinitialBio(e.target.value)
            }}
            value={initialBio || ''}
            className=' resize-none '
          />
          <div className=' flex max-lg:flex-col justify-between  '>
            <DialogClose ref={closeRef} >
              <Button type='button' variant='ghost'>
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type='submit'
              className=' bg-blue-600 text-white '
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
