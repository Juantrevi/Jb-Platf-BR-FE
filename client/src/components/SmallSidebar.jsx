// Import necessary components, icons, and hooks
import Wrapper from "../assets/wrappers/SmallSidebar.js";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";
import {FaTimes} from "react-icons/fa";
import Logo from "./Logo.jsx";
import NavLinks from "./NavLinks.jsx";

// Define the SmallSidebar component
const SmallSidebar = () => {
    // Use the useDashboardContext hook to get the showSidebar and toggleSidebar functions
    const {showSidebar, toggleSidebar} = useDashboardContext();

    // Return the JSX to render
    return (
        <Wrapper>
            <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>
                <div className='content'>
                    {/* The close button. When clicked, it calls the toggleSidebar function */}
                    <button type='button' className='close-btn' onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        {/* The Logo component */}
                        <Logo />
                    </header>
                    {/* The NavLinks component */}
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

// Export the SmallSidebar component
export default SmallSidebar