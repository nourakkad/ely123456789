import React from 'react';

const ElyptekWord = ({ tm = false, onDark = false, className = '' }) => (
  <span
    className={`elyptek-word${onDark ? ' elyptek-word--on-dark' : ''}${className ? ` ${className}` : ''}`}
    dir="ltr"
  >
    <span className="elyp">Elyp</span>
    <span className="tek">tek</span>
    {tm ? '™' : null}
  </span>
);

export default ElyptekWord;
