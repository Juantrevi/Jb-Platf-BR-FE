import {Form, redirect, Link, useNavigate} from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import Logo from "../components/Logo.jsx";
import FormRow from "../components/FormRow.jsx";
import customFetch from "../utils/customFetch.js";
import { toast } from 'react-toastify';
import {SubmitBtn} from "../components/index.js";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/auth/login', data);
        toast.success('Login successful');
        return redirect('/dashboard');
    }catch (error) {
        toast.error(error?.response?.data?.msg || 'An error occurred')
        return error;
    }


}

const Login = () => {
    const navigate = useNavigate();

    const loginDemoUser = async () => {
        try{
            const data = {
                email: 'test@test.com',
                password: 'secret123'
            }
            await customFetch.post('/auth/login', data);
            toast.success('Login successful, take a test drive!');
            navigate('/dashboard');
        }catch (error) {
            toast.error(error?.response?.data?.msg || 'An error occurred')
        }
    }

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo/>
                <h4 className='form-title'>Login</h4>
                <FormRow type='email' name='email' placeholder='Username' />
                <FormRow type='password' name='password' placeholder='Password' />

                <SubmitBtn formBtn />

                <button type='button' className='btn btn-block' onClick={loginDemoUser}>Explore the App</button>

                <p>
                    Not a member yet?
                    <Link to='/register' className='member-btn'>
                        Register</Link>
                </p>
            </Form>

        </Wrapper>
    )
}

export default Login