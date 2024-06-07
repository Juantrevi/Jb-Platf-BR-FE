// Define the FormRow component
const FormRow = ({type, name, labelText, defaultValue, onChange}) => {
    // Return the JSX to render
    return (
        // Each form row is wrapped in a div with the class 'form-row'
        <div className='form-row'>
            {/* The label for the input field. The 'htmlFor' prop associates the label with the input field */}
            <label htmlFor={name} className='form-label'>{labelText || name}</label>
            {/* The input field. The 'type', 'id', 'name', and 'defaultValue' props are passed in as props to the component */}
            <input
                type={type}
                id={name}
                name={name}
                className='form-input'
                defaultValue={defaultValue || ''}
                onChange={onChange}
                required
            />
        </div>
    )
}

// Export the FormRow component
export default FormRow