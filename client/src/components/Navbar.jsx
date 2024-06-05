// Import necessary components, icons, and hooks
import Wrapper from "../assets/wrappers/Navbar.js";
import {FaAlignLeft} from "react-icons/fa";
import Logo from "./Logo.jsx";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";
import LogoutContainer from "./LogoutContainer.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

// Define the Navbar component
const Navbar = () => {
    // Use the useDashboardContext hook to get the toggleSidebar function
    const {toggleSidebar} = useDashboardContext()

    // Return the JSX to render
    return (
        <Wrapper>
            <div className='nav-center'>
                {/* The toggle button. When clicked, it calls the toggleSidebar function */}
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    {/* The Logo component */}
                    <Logo />
                    <h4 className='logo-text'>dashboard</h4>
                </div>
                <div className='btn-container'>
                    {/* The ThemeToggle and LogoutContainer components */}
                    <ThemeToggle />
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    )
}

// Export the Navbar component
export default Navbar