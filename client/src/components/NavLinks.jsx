// Import necessary components and hooks
import { useDashboardContext } from "../pages/DashboardLayout.jsx";
import links from "../utils/links.jsx";
import { NavLink } from "react-router-dom";

// Define the NavLinks component
const NavLinks = ({isBigSidebar}) => {
    // Use the useDashboardContext hook to get the toggleSidebar function and user
    const {toggleSidebar, user} = useDashboardContext();

    // Return the JSX to render
    return (
        <div className='nav-links'>
            {
                // Map over the links array
                links.map((link) => {
                    const { text, path, icon } = link;
                    const { role } = user;

                    // If the user's role is not 'admin' and the path is 'admin', do not render the link
                    if (role !== 'admin' && path === 'admin') return;

                    // Otherwise, render the link
                    return (
                        <NavLink
                            to={path}
                            key={text}
                            className='nav-link'
                            // If isBigSidebar is true, do not call the toggleSidebar function when the link is clicked
                            onClick={isBigSidebar ? null : toggleSidebar}
                            end
                        >
                            {/* The icon and text for the link */}
                            <span className='icon'>{icon}</span>
                            {text}
                        </NavLink>
                    );
                })
            }
        </div>
    );
};

// Export the NavLinks component
export default NavLinks;