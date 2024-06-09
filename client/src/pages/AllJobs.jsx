// Importing necessary modules and components
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

// Creating a context for all jobs
const AllJobsContext = createContext();

// Function to create a query for all jobs
const allJobsQuery = (params) => {
    const { search, jobStatus, jobType, sort, page } = params;
    return {
        queryKey: [
            'jobs',
            search ?? '',
            jobStatus ?? 'all',
            jobType ?? 'all',
            sort ?? 'newest',
            page ?? 1,
        ],
        queryFn: async () => {
            // Fetching the jobs data from the server
            const { data } = await customFetch.get('/jobs', {
                params,
            });
            return data;
        },
    };
};

// Loader function to ensure the query data is fetched
export const loader =
    (queryClient) =>
        async ({ request }) => {
            // Converting the URL search parameters to an object
            const params = Object.fromEntries([
                ...new URL(request.url).searchParams.entries(),
            ]);

            // Ensuring the query data is fetched
            await queryClient.ensureQueryData(allJobsQuery(params));
            return { searchValues: { ...params } };
        };

// AllJobs component
const AllJobs = () => {
    // Using the loader data and the query data
    const { searchValues } = useLoaderData();
    const { data } = useQuery(allJobsQuery(searchValues));

    // Returning the AllJobs component
    return (
        // Providing the AllJobs context
        <AllJobsContext.Provider value={{ data, searchValues }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    );
};

// Exporting the AllJobs component
export default AllJobs;

// Hook to use the AllJobs context
export const useAllJobsContext = () => useContext(AllJobsContext);