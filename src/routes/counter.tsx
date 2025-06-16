import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
export const Route = createFileRoute('/counter')({
  component: Counter,
})

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen h-screen bg-background flex flex-col justify-center items-center gap-10">
        <h1 className="text-primary text-4xl font-bold animate-pulse antialiased">Clicked {count} time{count > 1 ? 's' : ''}</h1>
        <div className="flex gap-2">
            <Button className="cursor-pointer" onClick={() => setCount(count + 1)}>Click me {count}</Button>
            <Button variant="outline" className="cursor-pointer" onClick={() => setCount(0)}>Reset</Button>
        </div>
    </div>
  )
}