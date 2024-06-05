import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import Logo from "../components/Logo.jsx";
import FormRow from "../components/FormRow.jsx";
import customFetch from "../utils/customFetch.js";
import {SubmitBtn} from "../components/index.js";

/*
* The FormData API provides a way to easily construct
* a set of key/value pairs representing form fields and
* their values, which can then be easily sent using the
* XMLHttpRequest.send() method.
* [FormData API - JS Nuggets](https://youtu.be/5-x4OUM-SP8)
[FormData API - React ](https://youtu.be/WrX5RndZIzw)
* */


// Create the function for the action used in the router
export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/auth/register', data);
        return redirect('/login');
    }catch (error) {
        console.log(error);
        return error;
    }

}

const Register = () => {

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h4>Register</h4>

                <FormRow type='text' name='name' labelText='Name' defaultValue='John' />
                <FormRow type='text' name='lastName' labelText='Last Name' defaultValue='Doe' />
                <FormRow type='text' name='location' labelText='Location' defaultValue='earth' />
                <FormRow type='email' name='email' labelText='Email' defaultValue='john@email.com' />
                <FormRow type='password' name='password' labelText='Password' defaultValue='secret123' />


                <SubmitBtn formBtn />

                    <p>
                        Already a member?
                        <Link to='/login' className='member-btn'>Login</Link>
                    </p>
            </Form>
        </Wrapper>
    )
}

export default Register