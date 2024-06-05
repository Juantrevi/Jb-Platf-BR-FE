// Import necessary components, icons, and hooks
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

// Define the ThemeToggle component
const ThemeToggle = () => {
    // Use the useDashboardContext hook to get the isDarkTheme and toggleDarkTheme functions
    const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

    // Return the JSX to render
    return (
        // The Wrapper component. When clicked, it calls the toggleDarkTheme function
        <Wrapper onClick={toggleDarkTheme}>
            {
                // If isDarkTheme is true, render the BsFillSunFill icon. Otherwise, render the BsFillMoonFill icon
                isDarkTheme ? (
                    <BsFillSunFill className='toggle-icon' />
                ) : (
                    <BsFillMoonFill className='toggle-icon' />
                )
            }
        </Wrapper>
    );
};

// Export the ThemeToggle component
export default ThemeToggle;