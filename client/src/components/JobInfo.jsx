// Import necessary components
import Wrapper from '../assets/wrappers/JobInfo';

// Define the JobInfo component
const JobInfo = ({ icon, text }) => {
    // Return the JSX to render
    return (
        <Wrapper>
            {/* The icon for the job info. The 'icon' prop is passed in as a child to the span */}
            <span className='job-icon'>{icon}</span>
            {/* The text for the job info. The 'text' prop is passed in as a child to the span */}
            <span className='job-text'>{text}</span>
        </Wrapper>
    );
};

// Export the JobInfo component
export default JobInfo;