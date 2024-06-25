import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [ inputs, setInputs] = useState({username: '', password: ''});
    const [feedback, setFeedback] = useState({});
    const [login, setLogin] = useState(false);
    const history = useNavigate();
    const [loading, setLoading] = useState(null);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs(values => ({...values, [name]: value}));
    }

    const  handleSignup = async (e) => {
        e.preventDefault();

            axios.post('http://localhost:3001/signup', inputs, { headers: { 'Content-Type': 'application/json'}}, setLoading(true))
            .then(response => {
                setLoading(false);
                if(response.data.error) {
                    console.log(response.data.error);
                } else {
                    setFeedback(response.data);
                    if(response.data.signupSuccess) {
                        setInputs({username: '', password: ''});
                        setLogin(true);
                    }
                    setTimeout(() => {
                        setFeedback({});
                    }, 5000);
                }
                
            })
    }

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/login', inputs, {
            headers : {'Content-Type': 'application/json'}
        }, setLoading(true)).then(response => {
            setLoading(false);
            if(response.data.error) {
                console.log(response.data.error);
                return;
            }
            setFeedback(response.data);
            if(response.data.loginSuccess) {
                localStorage.setItem("accessToken", response.data.loginSuccess);
                history('/account');
            }
            setTimeout(() => {
                setFeedback({});
            }, 5000);
        })
    }
    if(loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="signup-page">
            <div className="signup-page-left"></div>
            <div className="signup-page-right">
                <h3>{ login ? 'LOG IN' : 'SIGN UP' }</h3>
                {
                    login ? 
                    <form className="auth-form" onSubmit={handleLogin}>
                        {
                            feedback.signupSuccess  ? <h4 style={{color: "green"}}>{ feedback.signupSuccess  }</h4> 
                            : feedback.loginSuccess ? 
                            <h4 style={{color: "green"}}>{ feedback.loginSuccess }</h4> 
                            :feedback.loginError ?
                            <h4 style={{color: "red"}}>{ feedback.loginError }</h4> : ''
                        }
                        <input 
                        type="text" 
                        name="username" 
                        placeholder='Username here...' 
                        autoComplete="off" 
                        value={inputs.username} 
                        onChange={handleChange}/>
                         
                        <input 
                        type="password" 
                        name="password" 
                        placeholder='Password here...' 
                        autoComplete="off" 
                        value={inputs.password} 
                        onChange={handleChange} />

                        <span>Don't have an account? <Link onClick={() => {setLogin(false); setInputs({username: '', password: ''})}}>signup</Link></span>
                    <button>log in</button>
                </form>
                 :

                <form className="auth-form" onSubmit={handleSignup}>
                    {
                        feedback.signupSuccess ? <h4 style={{color: "green"}}>{ feedback.signupSuccess  }</h4> : ''
                    }
                    <input 
                    type="text" 
                    required name="username" 
                    autoComplete="off" 
                    placeholder='Enter username'
                    value={inputs.username} 
                    onChange={handleChange}/>
                    {
                        !feedback.success ? <p>{feedback.usernameError}</p> : ''
                    }
                    
                    <input 
                    type="password" 
                    required name="password"
                    placeholder='Enter password' 
                    autoComplete="off" 
                    value={inputs.password} 
                    onChange={handleChange} />
                    {
                        !feedback.sucess ? <p>{feedback.passwordError}</p> : ''
                    }
                    <span>Already have an account? <Link onClick={() => {setLogin(true); setInputs({username: '', password: ''})}}>login</Link></span>                
                <button>sign up</button>
                </form>                
                }

            </div>
        </div>
    )
}