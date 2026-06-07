import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './router'

export const AppRouterProvider = () => {
  return (
    <Suspense
      fallback={
        <div className='grid min-h-screen place-items-center text-sm text-muted-foreground'>
          <div>Loading...</div>
        </div>
      }
    >
      <RouterProvider router={appRouter} />
    </Suspense>
  )
}
