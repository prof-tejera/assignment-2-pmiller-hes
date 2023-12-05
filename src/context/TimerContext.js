import React, { useContext, createContext } from 'react';
import { TimerQueue } from '../components/TimerQueue';

export const TimerQueueContext = createContext();

export const TimerQueueProvider = ({ children }) => {
    const timerQueue = TimerQueue();

    return (
        <TimerQueueContext.Provider value={timerQueue}>
            {children}
        </TimerQueueContext.Provider>
    );
};


export const useTimerQueue = () => {
    return useContext(TimerQueueContext);
};