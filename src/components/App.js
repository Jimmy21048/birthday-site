import './App.css';
import Signup from './Signup';
import Account from './Account';
import Sent from './Sent';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <div className="app">
                <Routes>
                    <Route path='/' element={<Signup />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/sent' element={<Sent />} />
                    <Route path='/sent/:id' element={<Sent />} />
                </Routes>         
        </div>
    )
}