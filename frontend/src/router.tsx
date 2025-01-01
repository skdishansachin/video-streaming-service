import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import App from "./pages/app";
import DefaultLayout from "./components/layouts/DefaultLayout";
import VideoPage from "./pages/video";

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/app',
                element: <App />
            },
            {
                path: '/app/:id',
                element: <VideoPage />
            }
        ]
    }
]);

export default router;