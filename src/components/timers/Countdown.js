import React, { useEffect, useRef, useState } from "react";
import Panel from "../generic/Panel/Panel";
import Timer from "../generic/Timer";
import TimeInput from "../generic/TimeInput";
import TimerDisplay from "../generic/screen/TimerDisplay";
import TimerButtons from "../generic/TimerButtons";

const Countdown = ({ editMode = true, initialState, onUpdate }) => {
    const [duration, setDuration] = useState(initialState.duration || 0);
    const [state, setState] = useState(initialState.state || null);
    const [timerEnabled, setTimerEnabled] = useState(initialState.timerEnabled || false);
    const seconds = useRef(initialState.seconds || 0);

    useEffect(() => {
        if (initialState) {
            setDuration(initialState.duration || 0);
            setState(initialState.state || null);
            seconds.current = initialState.seconds || 0;
            setTimerEnabled(initialState.timerEnabled !== undefined ? initialState.timerEnabled : false);
        }
    }, [initialState]);

    useEffect(() => {
        if (onUpdate) {
            onUpdate({ duration, state, timerEnabled, seconds: seconds.current });
        }
    }, [duration, state, timerEnabled, onUpdate]);

    const OnTimerElapse = () => {
        Stop();
        setState("complete");
        setTimerEnabled(false);
    };

    const OnTick = (secondsRemaining) => {
        setDuration(secondsRemaining);
    };

    const OnUpdated = (updatedState, updatedSeconds, updatedIteration) => {
        seconds.current = updatedSeconds;
        setDuration(updatedSeconds);
        setState(updatedState);
        setTimerEnabled(updatedSeconds > 0);
    };

    const OnReset = (resetSeconds, iteration) => {
        setDuration(resetSeconds);
        setState(null);
        Stop();
        setTimerEnabled(false);
    };

    const FastForward = () => {
        Reset(0, null);
        setState(null);
        Stop();
        setTimerEnabled(false);
    };

    const TimerInputUpdated = (inputState = null, hr = null, min = null, sec = null, iteration = null) => {
        Update(inputState, hr, min, sec, iteration);
    };

    const { Update, Start, Stop, Reset } = Timer(OnUpdated, OnReset, OnTimerElapse, OnTick, seconds.current, 0, -1);

    return (
        <Panel>
            <TimerDisplay seconds={duration} state={state}></TimerDisplay>
            <TimerButtons enabled={timerEnabled} Start={Start} Stop={Stop} Reset={Reset} FastForward={FastForward}/>
            {editMode && <TimeInput update={TimerInputUpdated}></TimeInput>}
        </Panel>
    );
};

export default Countdown;
