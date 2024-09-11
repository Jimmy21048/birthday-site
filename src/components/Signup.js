import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [ inputs, setInputs] = useState({username: '', password: ''});
    const [feedback, setFeedback] = useState({});
    const [login, setLogin] = useState(true);
    const history = useNavigate();
    const [loading, setLoading] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    let pwd = document.getElementById('password-input');
    let pwdCheck = document.getElementById("pwd-check");

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs(values => ({...values, [name]: value}));
    }

    const  handleSignup = async (e) => {
        e.preventDefault();
            axios.post('https://birthday-site-server.onrender.com/signup', inputs, { headers: { 'Content-Type': 'application/json'}}, setLoading(true))
            // axios.post('http://localhost:3002/signup', inputs, { headers: { 'Content-Type': 'application/json'}}, setLoading(true))
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
                }
                setTimeout(() => {
                    setFeedback({});
                }, 5000);
            })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('https://birthday-site-server.onrender.com/login', inputs, {
        // axios.post('http://localhost:3002/login', inputs, {
            headers : {'Content-Type': 'application/json'}
        }, setLoading(true)).then(response => {
            setLoading(false);
            console.log(response);
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

    function togglePassword() {
        if(pwdCheck.checked === true) {
            pwd.type = 'text';
        } else {
            pwd.type = 'password';
        }
    }

    function handleSignin() {
        setLogin(!login); 
        setInputs({username: '', password: ''}); 
        pwdCheck.checked = false;
        pwd.type = "password";
    }

    useEffect(() => {
        const inter = setInterval(() => {
            if(currentImage < 4) {
                setCurrentImage(currentImage => currentImage + 1);
            } else {
                setCurrentImage(0);
            }
        }, 20000)
        return () => clearInterval(inter);
    }, [currentImage])

    if(loading) {
        return <div className="loading"><i class="fa-solid fa-circle-notch fa-spin"></i><h3>Just a minute... loading page</h3></div>
    }
    return (
        <div className="signup-page">
            <div className="signup-page-left">
                <h1>MY EVENTS</h1>
                <img src={`../images/disp7.png`} alt='display' />
                <h1>
                    <p>BIRTHDAYS</p>
                    <p>FATHERS DAY</p>
                    <p>MOTHERS DAY</p>
                    <p>ALL YOUR EVENTS</p>
                    <p>BIRTHDAYS</p>
                </h1>
            </div>
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
                        id='password-input'
                        type="password" 
                        name="password" 
                        placeholder='Password here...' 
                        autoComplete="off" 
                        value={inputs.password} 
                        onChange={handleChange} />

                        <label>
                            <input type='checkbox' id='pwd-check' onChange={togglePassword} />
                            show password
                        </label>

                        <span>Don't have an account? <Link onClick={handleSignin}>signup</Link></span>
                    <button>log in</button>
                </form>
                 :

                <form className="auth-form" onSubmit={handleSignup}>
                    {
                        feedback.signupSuccess ? <h4 style={{color: "green"}}>{ feedback.signupSuccess  }</h4> : 
                        feedback.userExists ? <h4 style={{color: "red"}}>{ feedback.userExists  }</h4> : 
                        feedback.usernameError ? <p>{feedback.usernameError}</p> : 
                        feedback.passwordError ? <p>{feedback.passwordError}</p> : ''
                    }
                    <input 
                    type="text" 
                    required name="username" 
                    autoComplete="off" 
                    placeholder='Enter username'
                    value={inputs.username} 
                    onChange={handleChange}/>
                    
                    <input 
                    id='password-input'
                    type="password" 
                    required name="password"
                    placeholder='Enter password' 
                    autoComplete="off" 
                    value={inputs.password} 
                    onChange={handleChange} />

                    <label>
                        <input type='checkbox' id='pwd-check' onChange={togglePassword} />
                        show password
                    </label>

                    <span>Already have an account? <Link onClick={handleSignin}>login</Link></span>                
                <button>sign up</button>
                </form>                
                }

            </div>
        </div>
    )
}
