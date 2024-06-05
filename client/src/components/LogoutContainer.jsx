// Import necessary components, icons, and hooks
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

// Define the LogoutContainer component
const LogoutContainer = () => {
    // Use the useState hook to manage the state of the logout dropdown
    const [showLogout, setShowLogout] = useState(false);
    // Use the useDashboardContext hook to get the user and logoutUser function
    const { user, logoutUser } = useDashboardContext();

    // Return the JSX to render
    return (
        <Wrapper>
            {/* The logout button. When clicked, it toggles the state of the logout dropdown */}
            <button
                type='button'
                className='btn logout-btn'
                onClick={() => setShowLogout(!showLogout)}
            >
                {/* If the user has an avatar, display it. Otherwise, display a default icon */}
                {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className='img' />
                ) : (
                    <FaUserCircle />
                )}

                {/* The user's name */}
                {user?.name}
                <FaCaretDown />
            </button>
            {/* The logout dropdown. Its class depends on the state of the logout dropdown */}
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                {/* The logout button. When clicked, it calls the logoutUser function */}
                <button type='button' className='dropdown-btn' onClick={logoutUser}>
                    logout
                </button>
            </div>
        </Wrapper>
    );
};

// Export the LogoutContainer component
export default LogoutContainer;