// Import necessary components and hooks
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';

// Define the JobsContainer component
const JobsContainer = () => {
    // Use the useAllJobsContext hook to get the data
    const { data } = useAllJobsContext();
    const { jobs } = data;

    // If there are no jobs, display a message
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    // Otherwise, render the jobs
    return (
        <Wrapper>
            <div className='jobs'>
                {/* Map over the jobs array and render a Job component for each job */}
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
        </Wrapper>
    );
};

// Export the JobsContainer component
export default JobsContainer;