// Import necessary constants
import {JOB_TYPE} from "../../../utils/constants.js";

// Define the FormRowSelect component
const FormRowSelect = ({name, labelText, list, defaultValue=''}) => {
    // Return the JSX to render
    return (
        // Each form row is wrapped in a div with the class 'form-row'
        <div className='form-row'>
            {/* The label for the select field. The 'htmlFor' prop associates the label with the select field */}
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            {/* The select field. The 'name', 'id', and 'defaultValue' props are passed in as props to the component */}
            <select
                name={name}
                id={name}
                className='form-select'
                defaultValue={defaultValue}
            >
                {/* The options for the select field are generated from the 'list' prop */}
                {list.map((itemValue) => {
                    return (
                        // Each option has a 'key' prop for React's diffing algorithm and a 'value' prop for the option's value
                        <option key={itemValue} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

// Export the FormRowSelect component
export default FormRowSelect