import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './router/RootLayout'
import { RootRedirect } from './router/RootRedirect'
import { GusetRoutre } from './router/GusetRoutre'
import { ProtectedRoutre } from './router/ProtectedRoutre'
import AuthRegisterPage from '@/pages/auth/register/page'
import AuthLoginPage from '@/pages/auth/login/page'
import { AllEventsPage } from '@/pages/evensts/all/page'
import { EventsNewPage } from '@/pages/evensts/new/page'
import { EventDetailsPage } from '@/pages/evensts/details/page'
import EventEditPage from '@/pages/evensts/edit/page'
import EventsMyPage from '@/pages/evensts/my/page'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <RootRedirect /> },
            {
                element: <GusetRoutre />,
                children: [
                    { path: 'login', element: <AuthLoginPage /> },
                    { path: 'register', element: <AuthRegisterPage /> }
                ]
            },
            {
                element: <ProtectedRoutre />,
                children: [
                    { path: 'events', element: <AllEventsPage /> },
                    { path: 'events/my', element: <EventsMyPage /> },
                    { path: 'events/new', element: <EventsNewPage /> },
                    { path: 'events/:id', element: <EventDetailsPage /> },
                    { path: 'events/:id/edit', element: <EventEditPage /> },
                ]
            },
            {
                path: "*",
                element: <Navigate to="/" replace />
            }
        ]
    },
])
