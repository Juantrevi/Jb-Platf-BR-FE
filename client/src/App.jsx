import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    AddJob,
    Stats,
    AllJobs,
    Profile,
    Admin
} from "./pages/index.js";
import { action as registerAction} from "./pages/Register.jsx";
import { action as loginAction} from "./pages/Login.jsx";
import {loader as dashboardLoader} from "./pages/DashboardLayout.jsx";


export const checkDefaultTheme = () => {
    //Check if dark theme is enabled
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

    //Using vanilla JS to toggle dark theme
    document.body.classList.toggle('dark-theme', isDarkTheme);

    return isDarkTheme;

}

checkDefaultTheme();

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Landing/>,
            },
            {
                path: "register",
                element: <Register/>,
                action: registerAction,
            },
            {
                path: "login",
                element: <Login/>,
                action: loginAction,
            },
            {
                path: "dashboard",
                element: <DashboardLayout />,
                loader: dashboardLoader,
                children: [
                    {
                        index: true,
                        element: <AddJob/>,
                    },
                    {
                        path: "stats",
                        element: <Stats/>,
                    },
                    {
                        path: "all-jobs",
                        element: <AllJobs/>,
                    },
                    {
                        path: "profile",
                        element: <Profile/>,
                    },
                    {
                        path: "admin",
                        element: <Admin/>,
                    },
                ],
            },
        ],
    },
]);

const App = () => {
    return (

        <RouterProvider router={router}/>
    )
}

export default App