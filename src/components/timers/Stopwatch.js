import Panel from "../generic/Panel/Panel";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import { useRef, useState } from "react";
import TimerDisplay from "../generic/screen/TimerDisplay";
import TimerButtons from "../generic/TimerButtons";

const Stopwatch = () => {
    const [duration, setDuration] = useState(0);
    const [state, setState] = useState(null);
    const seconds = useRef(0);

    const OnTimerElapse = () => {
        Stop();
        setState("complete");
    };
    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    };
    const OnUpdated = (state, updatedSeconds, updatedIteration) => {        
        seconds.current = updatedSeconds;
        setDuration(seconds.current);
    };  
    const OnReset = (seconds, iteration) => {
        setDuration(seconds);
        setState(null);
        Stop();
    };
    const FastForward = () => {
        Reset(seconds.current, null);
        setState(null);
        Stop();
    };
    const { Update, Start, Stop, Reset } = Timer(OnUpdated, OnReset, OnTimerElapse, OnTick, 0, seconds.current, 1);

    return <Panel>
        <TimerDisplay seconds={duration} state={state}></TimerDisplay>
        <TimerButtons Start={Start} Stop={Stop} Reset={Reset} FastForward={FastForward} />
        <Panel>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, e.target.value, null, null, null)}} placeHolder="Duration (hour)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, null, e.target.value, null, null)}} placeHolder="Duration (min)"></Input>
            <Input text="Duration" type="number" max="59" min="0" onChange={(e) => {Update(null, null, null, e.target.value, null)}} placeHolder="Duration (seconds)"></Input>
        </Panel>
    </Panel>
};

export default Stopwatch;
