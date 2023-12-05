import SelectInput from "./SelectInput";
import "./TimeFragementSelectInput.css";


const TimeFragmentSelectInput =({ min, max, stepSize, placeholder, className, ...selectInputProps }) => {

  const generateOptions = () => {
    const options = [];

    for (let value = min; value <= max; value += stepSize) {
      options.push(value);
    }

    return options;
  };

  const options = generateOptions();

  return <SelectInput className={'default-TimeFragmentSelectInput '+ className} {...selectInputProps}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
    </SelectInput>;
  };
  
  export default TimeFragmentSelectInput;



