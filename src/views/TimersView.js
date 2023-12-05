import React, { useState } from "react";
import styled from "styled-components";
import { useTimerQueue } from '../context/TimerContext';
import Button from '../components/generic/button/Button';
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

// Styled components
const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerContainer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;

const TimersView = () => {
  const { addTimer } = useTimerQueue();

  const [stopwatchState, setStopwatchState] = useState({});
  const [countdownState, setCountdownState] = useState({});
  const [xyState, setXYState] = useState({});
  const [tabataState, setTabataState] = useState({});
  



  return (
    <Timers>
      {/* Stopwatch Timer */}
      <TimerContainer>
        <TimerTitle>Stopwatch</TimerTitle>
        <Stopwatch      
            editMode={true}   
            onUpdate={(state) => setStopwatchState(state)}
          />
          <Button onClick={() => addTimer('Stopwatch', stopwatchState)} text='Add Timer to Workout'></Button>
        </TimerContainer>

      {/* Countdown Timer */}
      <TimerContainer>
        <TimerTitle>Countdown</TimerTitle>
        <Countdown 
                editMode={true}
                onUpdate={(state) => setCountdownState(state)}
                />
              <Button onClick={() => addTimer('Countdown', countdownState)} text='Add Timer to Workout'></Button>
      </TimerContainer>

      {/* XY Timer */}
      <TimerContainer>
        <TimerTitle>XY</TimerTitle>
        <XY 
             editMode={true}
             onUpdate={(state) => setXYState(state)}
             />
           <Button onClick={() => addTimer('XY', xyState)} text='Add Timer to Workout'></Button>
      </TimerContainer>

      {/* Tabata Timer */}
      <TimerContainer>
        <TimerTitle>Tabata</TimerTitle>
        <Tabata
           editMode={true}
           onUpdate={(state) => setTabataState(state)}
           />
         <Button onClick={() => addTimer('Tabata', tabataState)} text='Add Timer to Workout'></Button>
      </TimerContainer>
    </Timers>
  );
};

export default TimersView;
