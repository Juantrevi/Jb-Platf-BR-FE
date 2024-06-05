// Import necessary components, icons, and libraries
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

// Extend dayjs with the advancedFormat plugin
day.extend(advancedFormat);

// Define the Job component
const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    jobStatus,
}) => {
    // Format the createdAt date
    const date = day(createdAt).format('MMM Do, YYYY');

    // Return the JSX to render
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    {/* JobInfo components are used to display the job's location, date, and type */}
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${jobStatus}`}>{jobStatus}</div>
                </div>

                <footer className='actions'>
                    {/* Link to the edit job page */}
                    <Link to={`../edit-job/${_id}`} className='btn edit-btn'>
                        Edit
                    </Link>
                    {/* Form to delete the job */}
                    <Form method='post' action={`../delete-job/${_id}`}>
                        <button type='submit' className='btn delete-btn'>
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    );
};

// Export the Job component
export default Job;