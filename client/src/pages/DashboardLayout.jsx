import {Outlet} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard.js";
import {BigSidebar, Navbar, SmallSidebar} from "../components/index.js";
import {createContext, useContext, useState} from "react";
import {checkDefaultTheme} from "../App.jsx";
const DashboardContext = createContext();


const DashboardLayout = () => {
    // temp
    const user = {
        name: 'John Doe'
    }
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

    const logutUser = async () => {
        console.log("Logout user")
    };

    return (
        <DashboardContext.Provider value={{
            user,
            showSidebar,
            isDarkTheme,
            toggleSidebar,
            toggleDarkTheme,
            logutUser
        }}>
        <Wrapper>
            <main className='dashboard'>
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout