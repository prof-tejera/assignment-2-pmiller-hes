import Panel from "../generic/Panel/Panel";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import { useEffect, useRef, useState } from "react";
import TabataTimerDisplay from "../generic/screen/TabataTimerDisplay";
import TimerButtons from "../generic/TimerButtons";
import TimeInput from "../generic/TimeInput";

const Tabata = ({ editMode = true, initialState, onUpdate }) => {
    const [duration, setDuration] = useState(0);
    const [iterations, setIterations] = useState(0);
    const [state, setState] = useState('on');
    const iterationState = useRef(0);
    const onOffState = useRef('on');
    const onSeconds = useRef(0);
    const offSeconds = useRef(0);
    const [timerEnabled, setTimerEnabled] = useState(false);

    useEffect(() => {
        if (initialState) {
            setDuration(initialState.duration || 0);
            setIterations(initialState.iterations || 0);
            setState(initialState.state || 'on');
            iterationState.current = initialState.iterationState || 0;
            onOffState.current = initialState.onOffState || 'on';
            onSeconds.current = initialState.onSeconds || 0;
            offSeconds.current = initialState.offSeconds || 0;
            setTimerEnabled(initialState.timerEnabled !== undefined ? initialState.timerEnabled : false);
        }
    }, [initialState]);
    

    useEffect(() => {
        if (onUpdate) {
            onUpdate({ duration, iterations, state });
        }
    }, [duration, iterations, state, onUpdate]);


    const OnTimerElapse = () => {       
        if (onOffState.current === 'on') {
            onOffState.current = 'off';
            setState("off");
        } else {
            iterationState.current = iterationState.current -1;
           onOffState.current = 'on';
           setState("on");
        }
    
        if (iterationState.current > 0) {
            Reset(onOffState.current === 'off' ? offSeconds.current : onSeconds.current, iterationState.current, false);
        } else {
            setDuration(0);
            setIterations(0);
            
            Stop();
            setState("complete");
        }
    };
    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    };
    const OnUpdated = (state, updatedSeconds, updatedIteration) => {
        if (state === "on") {
            onSeconds.current = updatedSeconds;
            setDuration(onSeconds.current);
        }
        else
        {
            offSeconds.current = updatedSeconds;
        }
        iterationState.current = updatedIteration;
        setIterations(updatedIteration);
        setState("on");
        setTimerEnabled(updatedSeconds > 0);
    };
    const OnReset = (seconds, iteration, isStopped) => {
        setDuration(seconds);
        setIterations(iteration);
       

        if (isStopped){
            iterationState.current = iteration;
            setState("on");
            Stop();
        }    
   
    };
    const FastForward = () => {
        Reset(0, 0);
        Stop();
        setState("on");
    };
    const { Update, Start, Stop, Reset } = Timer(OnUpdated, OnReset, OnTimerElapse, OnTick, onSeconds.current, -1, -1);

    return <Panel>
        <TabataTimerDisplay seconds={duration} iteration={iterations} state={state}></TabataTimerDisplay>
        <TimerButtons  enabled={timerEnabled} Start={Start} Stop={Stop} Reset={Reset} FastForward={FastForward} />
        {editMode && (
        <>
            <Panel>
                <h3>Time On</h3>
                <TimeInput update={Update} state="on"></TimeInput>
            </Panel>
            <Panel>
                <h3>Time Off</h3>
                <TimeInput update={Update} state="off"></TimeInput>
            </Panel>
            <Panel>
                <h3>Sets</h3>
                <Input text="Rounds" type="number" max="999" min="0" onChange={(e) => {Update(null, null, null, null, e.target.value)}} placeHolder="Sets"></Input>
            </Panel>
        </>
        )}
    </Panel>
};

export default Tabata;
