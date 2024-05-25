import {Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import Logo from "../components/Logo.jsx";
import FormRow from "../components/FormRow.jsx";

const Register = () => {
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>Register</h4>

                <FormRow type='text' name='name' labelText='Name' defaultValue='John' />
                <FormRow type='text' name='lastName' labelText='Last Name' defaultValue='Doe' />
                <FormRow type='text' name='location' labelText='Location' defaultValue='earth' />
                <FormRow type='email' name='email' labelText='Email' defaultValue='john@email.com' />
                <FormRow type='password' name='password' labelText='Password' defaultValue='secret123' />


                <button type='submit' className='btn btn-block'>Submit</button>
                    <p>
                        Already a member?
                        <Link to='/login' className='member-btn'>Login</Link>
                    </p>
            </form>
        </Wrapper>
    )
}

export default Register