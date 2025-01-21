import React from 'react';
import Carousel from './components/Carousel/Carousel';

const App: React.FC = () => {

  return (
    <div
      style={{
        width: '100%',
        height: '100vh', 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        style={{
          width: '80%',
          height: '70vh', 
          display: 'flex',
          justifyContent: 'center', 
        }}
      >
        <Carousel />
      </div>
    </div>
  );
};

export default App;
