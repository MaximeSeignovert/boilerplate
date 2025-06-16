import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center">
        <h1 className="text-primary text-4xl font-bold animate-breath antialiased">Home</h1>
    </div>
  )
}