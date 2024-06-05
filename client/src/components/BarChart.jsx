// Import necessary components from 'recharts'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Define the BarChartComponent
const BarChartComponent = ({ data }) => {
    // Return the JSX to render
    return (
        // ResponsiveContainer adjusts the chart size based on its parent container's size
        <ResponsiveContainer width='100%' height={300}>
            {/* BarChart is the main container for the bar chart */}
            <BarChart data={data} margin={{ top: 50 }}>
                {/* CartesianGrid renders horizontal and vertical grid lines */}
                <CartesianGrid strokeDasharray='3 3 ' />
                {/* XAxis is the x-axis of the chart */}
                <XAxis dataKey='date' />
                {/* YAxis is the y-axis of the chart */}
                <YAxis allowDecimals={false} />
                {/* Tooltip shows a tooltip box when hovering over a bar in the chart */}
                <Tooltip />
                {/* Bar is the actual bar being rendered in the chart */}
                <Bar dataKey='count' fill='#2cb1bc' barSize={75} />
            </BarChart>
        </ResponsiveContainer>
    );
};

// Export the BarChartComponent
export default BarChartComponent;