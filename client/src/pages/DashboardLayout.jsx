import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from "../assets/wrappers/Dashboard.js";
import {BigSidebar, Navbar, SmallSidebar} from "../components/index.js";
import {createContext, useContext, useState} from "react";
import {checkDefaultTheme} from "../App.jsx";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
const DashboardContext = createContext();

export const loader = async () => {
    try {
        const { data } = await customFetch.get('/users/current-user');
        console.log(data)
        return data;
    } catch (error) {
        return redirect('/');
    }
}

const DashboardLayout = () => {
    const { user } = useLoaderData();
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());


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
        navigate('/');
        await customFetch.get('/auth/logout');
        toast.success('Logged out successfully');
    };

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
                        <Outlet context={{user}} />
                    </div>
                </div>
            </main>
        </Wrapper>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout