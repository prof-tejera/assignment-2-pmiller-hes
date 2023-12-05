import React, { useState } from "react";
import styled from "styled-components";
import { useTimerQueue } from '../context/TimerContext';

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


  const [stopwatchSettings, setStopwatchSettings] = useState({});
  const [countdownSettings, setCountdownSettings] = useState({});
  const [xySettings, setXYSettings] = useState({});
  const [tabataSettings, setTabataSettings] = useState({
    timeOn: 0,
    timeOff: 0,
    sets: 0,
  });

  
  const handleSettingsChange = (settingsUpdater, field, value) => {
    settingsUpdater(prev => ({ ...prev, [field]: value }));
  };


  const handleAddTimer = (Component, settings, timerType) => {
    const timerWithProps = { component: <Component {...settings} />, timerType: timerType };
    addTimer(timerWithProps);
  };


  return (
    <Timers>
      {/* Stopwatch Timer */}
      <TimerContainer>
        <TimerTitle>Stopwatch</TimerTitle>
        <Stopwatch         
          editMode={true}
          timeOn={stopwatchSettings.timeOn}
          timeOff={stopwatchSettings.timeOff}
          sets={stopwatchSettings.sets}
          onTimeOnUpdate={(value) => handleSettingsChange(setStopwatchSettings, 'timeOn', value)}
          onTimeOffUpdate={(value) => handleSettingsChange(setStopwatchSettings, 'timeOff', value)}
          onSetsUpdate={(value) => handleSettingsChange(setStopwatchSettings, 'sets', value)}
          />
        <button onClick={() => handleAddTimer(Stopwatch, stopwatchSettings, 'Stopwatch')}>Add Stopwatch</button>
      </TimerContainer>

      {/* Countdown Timer */}
      <TimerContainer>
        <TimerTitle>Countdown</TimerTitle>
        <Countdown 
                editMode={true}
                timeOn={countdownSettings.timeOn}
                timeOff={countdownSettings.timeOff}
                sets={countdownSettings.sets}
                onTimeOnUpdate={(value) => handleSettingsChange(setCountdownSettings, 'timeOn', value)}
                onTimeOffUpdate={(value) => handleSettingsChange(setCountdownSettings, 'timeOff', value)}
                onSetsUpdate={(value) => handleSettingsChange(setCountdownSettings, 'sets', value)}
                 />
        <button onClick={() => handleAddTimer(Countdown, countdownSettings, 'Countdown')}>Add Countdown</button>
      </TimerContainer>

      {/* XY Timer */}
      <TimerContainer>
        <TimerTitle>XY</TimerTitle>
        <XY 
                editMode={true}
                timeOn={xySettings.timeOn}
                timeOff={xySettings.timeOff}
                sets={xySettings.sets}
                onTimeOnUpdate={(value) => handleSettingsChange(setXYSettings, 'timeOn', value)}
                onTimeOffUpdate={(value) => handleSettingsChange(setXYSettings, 'timeOff', value)}
                onSetsUpdate={(value) => handleSettingsChange(setXYSettings, 'sets', value)}
                 />
        <button onClick={() => handleAddTimer(XY, xySettings, 'XY')}>Add XY</button>
      </TimerContainer>

      {/* Tabata Timer */}
      <TimerContainer>
        <TimerTitle>Tabata</TimerTitle>
        <Tabata
          editMode={true}
          timeOn={tabataSettings.timeOn}
          timeOff={tabataSettings.timeOff}
          sets={tabataSettings.sets}
          onTimeOnUpdate={(value) => handleSettingsChange(setTabataSettings, 'timeOn', value)}
          onTimeOffUpdate={(value) => handleSettingsChange(setTabataSettings, 'timeOff', value)}
          onSetsUpdate={(value) => handleSettingsChange(setTabataSettings, 'sets', value)}
        />
        <button onClick={() => handleAddTimer(Tabata, tabataSettings, 'Tabata')}>Add Tabata</button>
      </TimerContainer>
    </Timers>
  );
};

export default TimersView;
