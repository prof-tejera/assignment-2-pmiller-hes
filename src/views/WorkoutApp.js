import React from 'react';
import { useTimerQueue } from '../context/TimerContext';
import Button from '../components/generic/button/Button';
import Tabata from '../components/timers/Tabata';
import Stopwatch from '../components/timers/Stopwatch';
import Countdown from '../components/timers/Countdown';
import XY from '../components/timers/XY';

const WorkoutApp = () => {
    const { currentTimer, nextTimer } = useTimerQueue();

    const renderCurrentTimer = () => {
        if (!currentTimer) {
            return <p>No active timer.</p>;
        }

        const { timerType, timerState } = currentTimer;

        switch (timerType) {
            case 'Tabata':
                return <Tabata initialState={timerState} editMode={false}/>;
            case 'Stopwatch':
                return <Stopwatch initialState={timerState} editMode={false} />;
            case 'Countdown':
                return <Countdown initialState={timerState} editMode={false} />;
            case 'XY':
                return <XY initialState={timerState} editMode={false}/>;
            default:
                return <p>Unknown timer type.</p>;
        }
    };

    return (
        <div>
            <h1>Workout App</h1>
            {renderCurrentTimer()}
            <Button onClick={nextTimer} text='Next Timer'></Button>
        </div>
    );
};

export default WorkoutApp;
