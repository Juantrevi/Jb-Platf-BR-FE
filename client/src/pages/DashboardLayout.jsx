import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from "../assets/wrappers/Dashboard.js";
import {BigSidebar, Navbar, SmallSidebar, Loading} from "../components/index.js";
import {createContext, useContext, useEffect, useState} from "react";
import {checkDefaultTheme} from "../App.jsx";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {useQuery} from "@tanstack/react-query";


const userQuery = {
    queryKey: ['user'],
    queryFn: async () => {
        const { data } = await customFetch('/users/current-user');
        return data;
    },
};

export const loader = (queryClient) => async () => {
    try {
        return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
        return redirect('/');
    }
};

const Dashboard = ({ prefersDarkMode, queryClient }) => {
    const { user } = useQuery(userQuery)?.data;
};

const DashboardContext = createContext();
const DashboardLayout = (queryClient) => {
    const { user } = useQuery(userQuery).data;
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
    const [isAuthError, setIsAuthError] = useState(false);


    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);

        //Using vanilla JS to toggle dark theme
        document.body.classList.toggle('dark-theme', newDarkTheme);

        //Save the theme in local storage
        localStorage.setItem('darkTheme', newDarkTheme);
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const logoutUser = async () => {
        await customFetch.get('/auth/logout');
        toast.success('Logging out...');
        navigate('/');
    };

    customFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                setIsAuthError(true);
            }
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        if (!isAuthError) return;
        logoutUser();
    }, [isAuthError]);
    return (
        // Here we pass the user to the context provider
        <DashboardContext.Provider value={{
            user,
            showSidebar,
            isDarkTheme,
            toggleSidebar,
            toggleDarkTheme,
            logoutUser
        }}>
        <Wrapper>
            <main className='dashboard'>
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        {/*This is how we pass the user to all the pages and components inside */}
                        {isPageLoading ? <Loading /> : <Outlet context={{user}} />}

                    </div>
                </div>
            </main>
        </Wrapper>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout