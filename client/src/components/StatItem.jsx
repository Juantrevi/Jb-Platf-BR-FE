// Import necessary components
import Wrapper from "../assets/wrappers/StatItem.js";

// Define the StatItem component
const StatItem = ({count, title, icon, color, bcg}) => {
    // Return the JSX to render
    return (
        // The Wrapper component. The 'color' and 'bcg' props are passed to it
        <Wrapper color={color} bcg={bcg}>
            <header>
                {/* The count and icon. The 'count' and 'icon' props are passed to them */}
                <span className='count'>{count}</span>
                <span className='icon'>{icon}</span>
            </header>
            {/* The title. The 'title' prop is passed to it */}
            <h5 className='title'>{title}</h5>
        </Wrapper>
    )
}

// Export the StatItem component
export default StatItem