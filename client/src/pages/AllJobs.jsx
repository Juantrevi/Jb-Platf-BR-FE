import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async ({request}) => {

    // Get the query parameters from the URL, and convert them to an object
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);

    try {
        const data = await customFetch.get('/jobs', {
            params,
        });
        console.log('Data from /jobs:', data);
        return  data ;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

// Create a context to pass the data to
const AllJobsContext = createContext();
const AllJobs = () => {
    const { data } = useLoaderData();
    // Pass the data to the context provider. It will be available to all children
    // like passing props to all children, but with context. This is a better way to
    // pass data to deeply nested components.
    return (
        <AllJobsContext.Provider value={{ data }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    );
};

// Create a custom hook to use the data in the context
// This is a better way to access the data in the context
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs