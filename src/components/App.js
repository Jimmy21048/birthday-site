import './App.css';
import Signup from './Signup';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <div className="app">
            <Routes>
                <Route path='/' element={<Signup />} />
            </Routes>
            
        </div>
    )
}