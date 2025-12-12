import React from 'react';

const CustomCursor = ({ mousePosition }) => (
  <div
    className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
    style={{
      left: mousePosition.x - 12,
      top: mousePosition.y - 12,
      transform: 'scale(0.8)'
    }}
  />
);

export default CustomCursor;