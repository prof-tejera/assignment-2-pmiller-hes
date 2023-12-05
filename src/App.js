import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import DocumentationView from './views/DocumentationView';
import TimersView from './views/TimersView';
import WorkoutApp from './views/WorkoutApp';

import { TimerQueueProvider } from './context/TimerContext'; 

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/add">Add Timer</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
        <li>
          <Link to="/workout">Workout</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <TimerQueueProvider>
      <Container>
        <Router>
          <Nav />
          <Routes>
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="/add" element={<TimersView />} />
            <Route path="/workout" element={<WorkoutApp />} />
          </Routes>
        </Router>
      </Container>
    </TimerQueueProvider>
  );
};

export default App;
