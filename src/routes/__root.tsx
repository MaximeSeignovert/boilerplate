import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="bg-transparent fixed top-0 left-0 w-full h-16 flex justify-center items-center gap-4 text-primary text-2xl border-b border-primary/10">
        <Link to="/" className="[&.active]:font-bold [&.active]:underline">
          Home
        </Link>{' '}
        <Link to="/counter" className="[&.active]:font-bold [&.active]:underline">
          Counter
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})