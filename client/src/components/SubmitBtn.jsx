// Import necessary hooks
import {useNavigation} from "react-router-dom";

// Define the SubmitBtn component
const SubmitBtn = ({formBtn}) => {
    // Use the useNavigation hook to get the navigation state
    const navigation = useNavigation();
    // Determine if the form is currently being submitted
    const isSubmitting = navigation.state === 'submitting';

    // Return the JSX to render
    return (
        <button
            // The type of the button is 'submit'
            type='submit'
            // The class of the button depends on the 'formBtn' prop
            className={`btn btn-block ${formBtn && 'form-btn'}`}
            // The button is disabled if the form is currently being submitted
            disabled={isSubmitting}
        >
            {/* The text of the button depends on whether the form is currently being submitted */}
            {isSubmitting ? 'submitting...' : 'submit'}
        </button>
    )
}

// Export the SubmitBtn component
export default SubmitBtn