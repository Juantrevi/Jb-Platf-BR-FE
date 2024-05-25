import {Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import Logo from "../components/Logo.jsx";
import FormRow from "../components/FormRow.jsx";

const Login = () => {
    return (
        <Wrapper>
            <form className='form'>
                <Logo/>
                <h4 className='form-title'>Login</h4>
                <FormRow type='email' name='email' placeholder='Username' defaultValue='john@gmail.com'/>
                <FormRow type='password' name='password' placeholder='Password' defaultValue='secret123'/>

                <button type='button' className='btn btn-block'>Submit</button>
                <button type='button' className='btn btn-block'>Explore the App</button>

                <p>
                    Not a member yet?
                    <Link to='/register' className='member-btn'>Register</Link>
                </p>
            </form>

        </Wrapper>
    )
}

export default Login