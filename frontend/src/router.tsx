import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import App from "./pages/app";
import DefaultLayout from "./components/layouts/DefaultLayout";
import VideoPage from "./pages/video";

const router = createBrowserRouter([
    {
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
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/videos/:id',
                element: <VideoPage />
            }
        ]
    },
]);

export default router;