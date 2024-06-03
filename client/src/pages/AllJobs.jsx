import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async () => {

    try {
        const data = await customFetch.get('/jobs');
        return { data };
    }catch(error){
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
    return<AllJobsContext.Provider value={{data}}>
        <SearchContainer/>
        <JobsContainer />
    </AllJobsContext.Provider>

};

// Create a custom hook to use the data in the context
// This is a better way to access the data in the context
export const useAllJobs = () => {
    return useContext(AllJobsContext);
};

export default AllJobs