// TimerQueue.js

import { useState } from 'react';

export const TimerQueue = () => {
    const [timerQueue, setTimerQueue] = useState([]);
    const [currentTimer, setCurrentTimer] = useState(null);

    const addTimer = (timerType, timerState) => {
        setTimerQueue(prevQueue => [...prevQueue, { timerType, timerState }]);
        if (!currentTimer) {
            setCurrentTimer({ timerType, timerState });
        }
    };

    const nextTimer = () => {
        setTimerQueue((prevQueue) => {
            const nextQueue = prevQueue.slice(1);
            setCurrentTimer(nextQueue.length > 0 ? nextQueue[0] : null);
            return nextQueue;
        });
    };

    return {
        timerQueue,
        currentTimer,
        addTimer,
        nextTimer,
    };
};
