import Wrapper from "../assets/wrappers/SmallSidebar.js";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";
import {FaTimes} from "react-icons/fa";
import Logo from "./Logo.jsx";
import links from "../utils/links.jsx";
import {NavLink} from "react-router-dom";
import NavLinks from "./NavLinks.jsx";

const SmallSidebar = () => {
    const {showSidebar, toggleSidebar} = useDashboardContext();

    return (
        <Wrapper>
                <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>
                    <div className='content'>
                        <button type='button' className='close-btn' onClick={toggleSidebar}>
                            <FaTimes />
                        </button>
                        <header>
                            <Logo />
                        </header>
                        <NavLinks />
                    </div>
                </div>
        </Wrapper>
    )
}

export default SmallSidebar