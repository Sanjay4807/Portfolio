import React from 'react';
import SpaceBackground from '../components/SpaceBackground';
import FoldText from '../components/FoldText';
import SplashCursor from '../components/SplashCursor';

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Background layer */}
      <SpaceBackground />
      
      {/* Splash Cursor Effect */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2.5}
        PRESSURE={0}
        CURL={3}
        SPLAT_RADIUS={0.1}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={15}
        SHADING={true}
        RAINBOW_MODE={true}
        COLOR="#A855F7"
      />
      
      {/* Navigation Layer */}
      <nav style={{
        position: 'absolute',
        top: '1rem', // Give some breathing room from the top
        left: '5%',  // Center it slightly
        width: '90%', // Make it span most of the screen
        padding: '1rem 2rem',
        zIndex: 10,
        border: '1px solid rgba(255, 255, 255, 0.8)', // White border
        borderRadius: '12px', // Rounded corners
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(3, 5, 13, 0.5)', // Slight transparent background matching space
        backdropFilter: 'blur(5px)' // Glassmorphism effect
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FoldText
            text="Sanjay S"
            splitBy="char"
            hinge="top"
            trigger="mount"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize={32} // Adjusted size to fit nicely in the bordered navbar
            fontWeight={800}
            color="#f7f2e8"
          />
        </div>
      </nav>
      
      {/* Other content can go here */}
    </main>
  );
}
