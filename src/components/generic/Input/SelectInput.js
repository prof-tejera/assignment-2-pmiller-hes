import "./SelectInput.css";


const SelectInput =({ className, ...selectInputProps }) => {
    return <select className={'default-SelectInputField '+ className} {...selectInputProps}>
        {selectInputProps.children}
    </select>;
  };
  
  export default SelectInput;
  