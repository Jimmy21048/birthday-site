import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Signup() {
    const [ inputs, setInputs] = useState({username: '', password: ''});
    const [feedback, setFeedback] = useState({});
    const [login, setLogin] = useState(false);


    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs(values => ({...values, [name]: value}));
    }

    const  handleSignup = async (e) => {
        e.preventDefault();

            axios.post('http://localhost:/Bday/signup.php', inputs, { headers: { 'Content-Type': 'application/json'}})
            .then(response => {
                if(response.data.error) {
                    console.log(response.data.error);
                } else {
                    setFeedback(response.data);
                    setTimeout(() => {
                        setFeedback({});
                    }, 10000);
                    if(response.data.success) {
                        setLogin(true);
                    }
                }
                setInputs({username: '', password: ''});
            })
    }

    const handleLogin = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className="signup-page">
            <div className="signup-page-left"></div>
            <div className="signup-page-right">
                <h3>{ login ? 'LOG IN' : 'SIGN UP' }</h3>
                {
                    login ? 
                    <form className="auth-form" onSubmit={handleLogin}>
                        <h4 style={{color: "green"}}>{ feedback.success ? feedback.success : '' }</h4>
                        <label>username
                            <input type="text" name="username" autoComplete="off" value={inputs.username} onChange={handleChange}/>
                        </label>
                         
                        <label>password
                            <input type="password" name="password" autoComplete="off" value={inputs.password} onChange={handleChange} />
                        </label>
                                           
                    <button>log in</button>
                </form>
                 :

                <form className="auth-form" onSubmit={handleSignup}>
                <h4 style={{color: "green"}}>{ feedback.success ? feedback.success : '' }</h4>
                    <label>username
                        <input type="text" name="username" autoComplete="off" value={inputs.username} onChange={handleChange}/>
                        <p>{!feedback.success ? feedback.username : ''}</p>
                    </label>
                    
                    
                    <label>password
                        <input type="password" name="password" autoComplete="off" value={inputs.password} onChange={handleChange} />
                        <p>{ !feedback.sucess ? feedback.password : '' }</p>
                    </label>
                                       
                <button>sign up</button>
                </form>                
                }

            </div>
        </div>
    )
}