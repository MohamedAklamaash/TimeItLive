"use client"

import React, { useState } from 'react'
import qs from "query-string";
import {Search as SearchIcon,X} from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
function SearchBar() {
  const router = useRouter();
  const [value, setvalue] = useState("");

  const onSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!value) return;
    const url = qs.stringifyUrl({
        url:`/u/${value}`,
        
    },{skipEmptyString:true});

    router.push(url);
  }

  return (
    <form
    onSubmit={onSubmit}
    className=' relative w-full lg:w-[400px] flex items-center '
    >
        <Input
        placeholder='Search'
        className=' rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-within:ring-offset-0'
        onChange={(e)=>{
            setvalue(e.target.value)
        }}
        value={value}
        />
        {
            value&&(
                <X 
                className=' absolute cursor-pointer top-2.5 right-12 text-muted-foreground '
                onClick={()=>{
                    setvalue("");
                }}/>
            )
        }
        <Button type="submit"
        size="sm"
        variant="secondary"
        className=' rounded-l-none '
        >
            <SearchIcon className=' h-5 w-5 text-muted-foreground  '/>
        </Button>
    </form>
  )
}

export default SearchBar