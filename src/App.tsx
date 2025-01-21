import React from 'react';
import Carousel from './components/Carousel/Carousel';

const App: React.FC = () => {

  return (
    <div
      style={{
        width: '100%',
        height: '100vh', // Take full viewport height
        display: 'flex',
        alignItems: 'center', // Vertically center the content
        justifyContent: 'center', // Horizontally center the content
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        style={{
          width: '80%',
          height: '70vh', // Set carousel height to 50% of the viewport height
          display: 'flex',
          justifyContent: 'center', // Center carousel content horizontally
        }}
      >
        <Carousel />
      </div>
    </div>
  );
};

export default App;
