import React, { useEffect, useRef, useState } from "react";
import Panel from "../generic/Panel/Panel";
import Timer from "../generic/Timer";
import Input from "../generic/Input/Input";
import IterativeTimerDisplay from "../generic/screen/IterativeTimerDisplay";
import TimerButtons from "../generic/TimerButtons";
import TimeInput from "../generic/TimeInput";

const XY = ({ editMode = true, initialState, onUpdate }) => {
    const [duration, setDuration] = useState(initialState?.duration || 0);
    const [iterations, setIterations] = useState(initialState?.iterations || 0);
    const [state, setState] = useState(initialState?.state || null);
    const iterationState = useRef(initialState?.iterationState || 0);
    const seconds = useRef(initialState?.seconds || 0);
    const [timerEnabled, setTimerEnabled] = useState(initialState?.timerEnabled || false);

    useEffect(() => {
        if (initialState) {
            setDuration(initialState?.duration || 0);
            setIterations(initialState?.iterations || 0);
            setState(initialState?.state || null);
            iterationState.current = initialState?.iterationState || 0;
            seconds.current = initialState?.seconds || 0;
            setTimerEnabled(initialState?.timerEnabled !== undefined ? initialState.timerEnabled : false);
        }
    }, [initialState]);

    useEffect(() => {
        if (onUpdate) {
            onUpdate({ duration, iterations, state, timerEnabled, iterationState: iterationState.current, seconds: seconds.current });
        }
    }, [duration, iterations, state, timerEnabled, onUpdate]);

    const OnTimerElapse = () => {
        iterationState.current -= 1;
        if (iterationState.current > 0) {
            Reset(null, iterationState.current, false);
        } else {
            setDuration(0);
            setIterations(0);
            Stop();
            setState("complete");
            setTimerEnabled(false);
        }
    };

    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    };

    const OnUpdated = (updatedState, updatedSeconds, updatedIteration) => {
        seconds.current = updatedSeconds;
        setDuration(updatedSeconds);
        iterationState.current = updatedIteration;
        setIterations(updatedIteration);
        setState(updatedState);
        setTimerEnabled(updatedSeconds > 0);
    };

    const OnReset = (resetSeconds, iteration, isStopped) => {
        setDuration(resetSeconds);
        setIterations(iteration);
        iterationState.current = iteration;
        if (isStopped) {
            Stop();
            setState(null);
            setTimerEnabled(false);
        }
    };

    const FastForward = () => {
        Reset(0, 0);
        Stop();
        setState(null);
        setTimerEnabled(false);
    };

    const TimerInputUpdated = (inputState = null, hr = null, min = null, sec = null, iteration = null) => {
        Update(inputState, hr, min, sec, iteration);
    };

    const { Update, Start, Stop, Reset } = Timer(OnUpdated, OnReset, OnTimerElapse, OnTick, seconds.current, -1, -1);

    return (
        <Panel>
            <IterativeTimerDisplay seconds={duration} iteration={iterations} state={state}></IterativeTimerDisplay>
            <TimerButtons enabled={timerEnabled} Start={Start} Stop={Stop} Reset={Reset} FastForward={FastForward} />
            {editMode && (
                <>
                    <TimeInput update={TimerInputUpdated}></TimeInput>
                    <Panel>
                        <h3>Cycles</h3>
                        <Input text="Iterations" type="number" max="100" min="1" onChange={(e) => { TimerInputUpdated(null, null, null, null, e.target.value); }} placeHolder="Cycles"></Input>
                    </Panel>
                </>
            )}
        </Panel>
    );
};

export default XY;
