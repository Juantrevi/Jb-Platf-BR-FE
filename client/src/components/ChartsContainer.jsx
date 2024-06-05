// Import necessary hooks and components
import { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

// Define the ChartsContainer component
const ChartsContainer = ({ data }) => {
    // Use the useState hook to manage the state of the chart type
    const [barChart, setBarChart] = useState(true);

    // Return the JSX to render
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            {/* Button to toggle between Bar Chart and Area Chart */}
            <button type='button' onClick={() => setBarChart(!barChart)}>
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {/* Conditional rendering of BarChart or AreaChart based on the state */}
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    );
};

// Export the ChartsContainer component
export default ChartsContainer;