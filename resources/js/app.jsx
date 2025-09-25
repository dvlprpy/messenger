import React from 'react';
import ReactDOM from 'react-dom/client';
import MainMessanger from './MainMessanger';


function App() {
    return <MainMessanger />
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
