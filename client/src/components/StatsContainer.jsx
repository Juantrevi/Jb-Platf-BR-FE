// Import necessary components and icons
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

// Define the StatsContainer component
const StatsContainer = ({ defaultStats }) => {
    // Define the stats array
    const stats = [
        {
            title: 'pending applications',
            count: defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#f59e0b',
            bcg: '#fef3c7',
        },
        {
            title: 'interviews scheduled',
            count: defaultStats?.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: 'jobs declined',
            count: defaultStats?.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ];

    // Return the JSX to render
    return (
        <Wrapper>
            {
                // Map over the stats array and render a StatItem for each stat
                stats.map((item) => {
                    return <StatItem key={item.title} {...item} />;
                })
            }
        </Wrapper>
    );
};

// Export the StatsContainer component
export default StatsContainer;