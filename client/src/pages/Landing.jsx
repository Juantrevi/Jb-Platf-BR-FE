import Wrapper from "../assets/wrappers/LandingPage.js";
import main from '../assets/images/main.svg';
import {Link} from "react-router-dom";
import Logo from "../components/Logo.jsx";


const Landing = () => {


    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>Job <span>Tracking</span> App</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <Link to={'/register' } className='btn register-link'>Register</Link>
                    <Link to={'/login' } className='btn login-link'>Login / Demo User</Link>
                </div>
                <img src={main} alt='Job hunt' className='img main-img'/>
            </div>
        </Wrapper>
    );
};




export default Landing;