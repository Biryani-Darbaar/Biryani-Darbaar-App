import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./theme/variables.css"

const container = document.getElementById('root');
const root = createRoot(container!);

const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1';
document.head.appendChild(viewport);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);