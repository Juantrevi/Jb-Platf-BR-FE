// Import the logo image
import logo from '../assets/images/logo.svg';

// Define the Logo component
const Logo = () => {
    // Return the JSX to render
    return (
        // The logo image. The 'src' prop is the logo image, the 'alt' prop is 'jobify', and the 'className' prop is 'logo'
        <img src={logo} alt='jobify' className='logo'/>
    );
};

// Export the Logo component
export default Logo;