// Import necessary components from 'recharts'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

// Define the AreaChartComponent
const AreaChartComponent = ({ data }) => {
    // Return the JSX to render
    return (
        // ResponsiveContainer adjusts the chart size based on its parent container's size
        <ResponsiveContainer width='100%' height={300}>
            {/* AreaChart is the main container for the area chart */}
            <AreaChart data={data} margin={{ top: 50 }}>
                {/* CartesianGrid renders horizontal and vertical grid lines */}
                <CartesianGrid strokeDasharray='3 3' />
                {/* XAxis is the x-axis of the chart */}
                <XAxis dataKey='date' />
                {/* YAxis is the y-axis of the chart */}
                <YAxis allowDecimals={false} />
                {/* Tooltip shows a tooltip box when hovering over an area in the chart */}
                <Tooltip />
                {/* Area is the actual area being rendered in the chart */}
                <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
            </AreaChart>
        </ResponsiveContainer>
    );
};

// Export the AreaChartComponent
export default AreaChartComponent;