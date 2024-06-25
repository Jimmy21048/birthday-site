import './App.css';
import Signup from './Signup';
import Account from './Account';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <div className="app">
                <Routes>
                    <Route path='/' element={<Signup />} />
                    <Route path='/account' element={<Account />} />
                </Routes>         
        </div>
    )
}