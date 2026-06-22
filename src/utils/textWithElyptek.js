import React from 'react';
import ElyptekWord from '../components/ElyptekWord';

const BRAND_REGEX = /Elyptek|إيليبتك/gi;

export const elyptekHtml = (tm = false, onDark = false) => {
  const tmStr = tm ? '™' : '';
  const darkClass = onDark ? ' elyptek-word--on-dark' : '';
  return `<span class="elyptek-word${darkClass}" dir="ltr"><span class="elyp">Elyp</span><span class="tek">tek</span>${tmStr}</span>`;
};

export const injectElyptekHtml = (text, options = {}) => {
  if (!text) return '';
  const { tm = false, onDark = false } = options;
  return text.replace(BRAND_REGEX, elyptekHtml(tm, onDark));
};

const TextWithElyptek = ({ text, tm = false, onDark = false }) => {
  if (!text) return null;

  const nodes = [];
  let lastIndex = 0;
  const regex = new RegExp(BRAND_REGEX.source, 'gi');
  let match = regex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <ElyptekWord key={`${match.index}-${nodes.length}`} tm={tm} onDark={onDark} />
    );
    lastIndex = match.index + match[0].length;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 && typeof nodes[0] === 'string' ? nodes[0] : <>{nodes}</>;
};

export default TextWithElyptek;
