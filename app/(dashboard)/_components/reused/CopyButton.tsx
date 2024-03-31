'use client'
import { Button } from '@/components/ui/button'
import { CheckCheck, CopyIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

export default function CopyButton({ value }: { value?: string }) {
  const [isCopied, setisCopied] = useState(false)
  const onCopy = () => {
    if (!value) return
    setisCopied(true)
    navigator.clipboard.writeText(value)
    setTimeout(() => {
      setisCopied(false)
    }, 1000)
  }
  const Icon = isCopied ? CheckCheck : CopyIcon
  return (
    <Button
    onClick={onCopy}
    disabled={isCopied || !value}
    variant="ghost"
    size="sm"
    className='cursor-pointer '
    >
      <Icon className=' h-4 w-4  ' />
    </Button>
  )
}
