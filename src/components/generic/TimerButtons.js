import React, { useRef, useState } from "react";
import Button from "../generic/button/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSyncAlt, faForward } from '@fortawesome/free-solid-svg-icons';


const TimerButtons =  ({ Start, Stop, Reset, FastForward, enabled = true })  => {
    const [buttonStateIcon, setButtonSetIcon] = useState(faPlay);
    const [activeState, setActiveState] = useState(false);
    const buttonState = useRef(0);


    const ToggleButton = () => {
        if (buttonState.current === 0){
            Start();
            buttonState.current = 1;
            setButtonSetIcon(faPause);
            setActiveState(true);
        }
        else if (buttonState.current === 1){
            Stop();
            buttonState.current = 2;
            setButtonSetIcon(faPlay);
            setActiveState(false);
        }
        else {
            Start();
            buttonState.current = 1;
            setButtonSetIcon(faPause);
            setActiveState(true);
        }
    };

    const ToggleResetButton = () => {
        Reset();
        buttonState.current = 0;
        setButtonSetIcon(faPlay);
        setActiveState(false);
    };

    const ToggleFastForward = () =>
    {
        FastForward();
        buttonState.current = 0;
        setButtonSetIcon(faPlay);
        setActiveState(false);
    }

    return (
        <div>
            <Button onClick={() => ToggleButton()} disabled={!enabled} icon={<FontAwesomeIcon icon={buttonStateIcon} />} active={activeState}></Button>
            <Button onClick={() => ToggleResetButton()} disabled={!activeState} icon={<FontAwesomeIcon icon={faSyncAlt} />}></Button>
            <Button onClick={() => ToggleFastForward()} disabled={!activeState} icon={<FontAwesomeIcon icon={faForward} />}></Button>
        </div>    
    );
};

export default TimerButtons;

