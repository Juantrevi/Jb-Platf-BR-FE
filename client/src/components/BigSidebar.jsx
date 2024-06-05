// Import necessary components and hooks
import Wrapper from "../assets/wrappers/BigSidebar.js";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout.jsx";

// Define the BigSidebar component
const BigSidebar = () => {
    // Use the useDashboardContext hook to get the showSidebar state
    const { showSidebar } = useDashboardContext();

    // Return the JSX to render
    return (
        <Wrapper>
            {/* The sidebar-container's class changes based on the showSidebar state */}
            <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className='content'>
                    <header>
                        {/* Logo component is rendered here */}
                        <Logo />
                    </header>
                    {/* NavLinks component is rendered with isBigSidebar prop */}
                    <NavLinks isBigSidebar />
                </div>
            </div>
        </Wrapper>
    )
}

// Export the BigSidebar component
export default BigSidebar