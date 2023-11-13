import TimeFragmentSelectInput from "./Input/TimeFragmentSelectInput";
import Panel from "./Panel/Panel";


const TimeInput =({ className, update, state = null, ...selectInputProps }) => {

  return <Panel className={className}>
        <TimeFragmentSelectInput placeholder="mm" min={0} max={59} stepSize={1} onChange={(e) => update(state, null, parseInt(e.target.value), null, null) } />
        :<TimeFragmentSelectInput placeholder="ss" min={0} max={59} stepSize={5} onChange={(e) => update(state, null, null, parseInt(e.target.value), null) } />
    </Panel>;  
};
  
  export default TimeInput;



