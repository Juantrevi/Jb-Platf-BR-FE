import {FormRow, SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// Function to resize an image
const resizeImage = (file) => new Promise((resolve) => {
    // Create a new FileReader object
    const reader = new FileReader();

    // Read the file as a Data URL
    reader.readAsDataURL(file);

    // This event listener will be called once the reader has finished reading the file
    reader.onload = (event) => {
        // Create a new Image object
        const img = new Image();

        // Set the source of the Image object to be the data URL of the file
        img.src = event.target.result;

        // This event listener will be called once the image has finished loading
        img.onload = () => {
            // Create a new canvas element
            const canvas = document.createElement('canvas');

            // Define the maximum width of the image
            const MAX_WIDTH = 500;

            // Calculate the scale factor
            const scaleFactor = MAX_WIDTH / img.width;

            // Set the width of the canvas
            canvas.width = MAX_WIDTH;

            // Set the height of the canvas (maintaining the aspect ratio)
            canvas.height = img.height * scaleFactor;

            // Get the 2D rendering context for the canvas
            const ctx = canvas.getContext('2d');

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Convert the canvas image to a Blob object
            ctx.canvas.toBlob((blob) => {
                // Create a new File object from the Blob
                const file = new File([blob], 'resizedImage.jpg', { type: 'image/jpeg', lastModified: Date.now() });

                // Resolve the Promise with the new File object
                resolve(file);
            }, 'image/jpeg', 1);
        };
    };
});

export const action = async ({ request }) => {
    let formData = await request.formData();

    let file = formData.get('avatar');
    if (file && file.size > 500000) {
        file = await resizeImage(file);
        formData.delete('avatar');
        formData.append('avatar', file);
    }

    try {
        await customFetch.patch('/users/update-user', formData);
        toast.success('Profile updated successfully');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
    return null;
};

const Profile = () => {
    const { user } = useOutletContext();
    const { name, lastName, email, location } = user;

    return (
        <Wrapper>
            <Form method='post' className='form' encType='multipart/form-data'>
                <h4 className='form-title'>profile</h4>

                <div className='form-center'>
                    <div className='form-row'>
                        <label htmlFor='avatar' className='form-label'>
                            Select an image file (max 0.5 MB):
                        </label>
                        <input
                            type='file'
                            id='avatar'
                            name='avatar'
                            className='form-input'
                            accept='image/*'
                        />
                    </div>
                    <FormRow type='text' name='name' defaultValue={name} />
                    <FormRow
                        type='text'
                        labelText='last name'
                        name='lastName'
                        defaultValue={lastName}
                    />
                    <FormRow type='email' name='email' defaultValue={email} />
                    <FormRow type='text' name='location' defaultValue={location} />

                    <SubmitBtn formBtn />

                </div>
            </Form>
        </Wrapper>
    );
};

export default Profile;