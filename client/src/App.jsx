import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
    Admin,
    EditJob
} from "./pages/index.js";
import { action as registerAction} from "./pages/Register.jsx";
import { action as loginAction} from "./pages/Login.jsx";
import { action as addJob} from "./pages/AddJob.jsx";
import { action as deleteJobAction } from './pages/DeleteJob.jsx';
import { action as editJobAction } from './pages/EditJob';
import { loader as dashboardLoader} from "./pages/DashboardLayout.jsx";
import { loader as allJobsLoader} from "./pages/AllJobs.jsx";
import { loader as editJobLoader } from './pages/EditJob';
import { loader as adminLoader } from './pages/Admin';
import { action as profileLoader } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';
import ErrorElement from "./components/ErrorElement.jsx";


export const checkDefaultTheme = () => {
    //Check if dark theme is enabled
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

    //Using vanilla JS to toggle dark theme
    document.body.classList.toggle('dark-theme', isDarkTheme);

    return isDarkTheme;

}

checkDefaultTheme();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            stateTime: 1000*60*5, //5 minutes
        },
    },
});

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
                action: loginAction(queryClient),
            },
            {
                path: "dashboard",
                element: <DashboardLayout queryClient={queryClient} />,
                loader: dashboardLoader(queryClient),
                children: [
                    {
                        index: true,
                        element: <AddJob/>,
                        action: addJob(queryClient),
                    },
                    {
                        path: 'stats',
                        element: <Stats />,
                        loader: statsLoader(queryClient),
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: 'edit-job/:id',
                        element: <EditJob />,
                        loader: editJobLoader(queryClient),
                        action: editJobAction(queryClient),
                    },
                    {
                        path: 'delete-job/:id',
                        action: deleteJobAction(queryClient),
                    },
                    {
                        path: "all-jobs",
                        element: <AllJobs/>,
                        loader: allJobsLoader(queryClient),
                    },
                    {
                        path: "profile",
                        element: <Profile/>,
                        action: profileLoader(queryClient),
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                        loader: adminLoader,
                    },
                ],
            },
        ],
    },
]);

const App = () => {
    return (
        <QueryClientProvider client={ queryClient }>
            <RouterProvider router={ router }/>
            {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
        </QueryClientProvider>

    )
}

export default App