import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Account() {
    const [inputs, setInputs] = useState({
        recipientName: '',
        birthDate: '',
        eventType: '',
        openDate: '',
        recipientImage: '',
        bdayMessage: ''
    })
    const [loading, setLoading] = useState(null);
    const [data, setData] = useState({});
    const history = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [viewAccount, setViewAccount] = useState(false);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs({...inputs, [name] : value});
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        setInputs({...inputs, recipientImage: file});
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        if(file) {
            reader.readAsDataURL(file);
        }
    }


    function convertToFormData(data) {
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        return formData;
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(inputs);
        const formData = convertToFormData(inputs);
        axios.post('https://birthday-site-server.onrender.com/account', formData, { 
        // axios.post('http://localhost:3002/account', formData, { 
            headers: { 
                accessToken: localStorage.getItem("accessToken")
            }
        }, setLoading(true))
        .then(response => {
            setLoading(false)
            if(response.data.success) {
                history(`/sent/${response.data.success}`);
            }
        })
    }


    useEffect(() => {
        axios.get('https://birthday-site-server.onrender.com/account', {
        // axios.get('http://localhost:3002/account', {
            headers : {
                'Content-Type': 'application/json',
                accessToken: localStorage.getItem("accessToken")
            }
        }, setLoading(true))
        .then(response => {
            setLoading(false);

            if(response.data.error ||
            response.data.userError ||
            response.data.validationError ||
            response.data.tokenError) {
                history('/');
            }
            setData(response.data);
        })
        
    }, []);

    function logout() {
        localStorage.removeItem("accessToken");
        history('/');
    }

    if(loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="account-page">
            {
                viewAccount ? 
                <>
                    <div className="account-settings">
                        <button className="account-option" onClick={ history('/sent')}>My Events</button>
                        <button className="account-option">someonexyz@gmail.com</button>
                        <button className="account-option" onClick={logout}>Logout</button>
                    </div>
                </> : ''
            }
            <header>
                <h3>Hello {data.username}</h3>
                
                <button className="account-icon" onClick={() => setViewAccount(account => {return !account})} >i<i class="fa-solid fa-user"></i></button>
            </header>
            <div className="account-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="account-body-left">
                        <label>Enter recipient's name
                            <input type="text" autoComplete="off" name="recipientName" value={inputs.recipientName} onChange={handleChange}/>
                        </label>
                        <label>Event Type
                            <select name="eventType" onChange={handleChange}>
                                <option value=''>None Selected</option>
                                <option value='Birth Day'>Birth Day</option>
                                <option value='Fathers Day'>Fathers Day</option>
                                <option value='Mothers Day'>Mothers Day</option>
                            </select>
                        </label>
                        {
                            inputs.eventType === 'Birth Day' ? 
                            <label>Recipient's date of Birth
                                <input type="date" name="birthDate" value={inputs.birthDate} onChange={handleChange} />
                            </label> : ''
                        }
                        <label>When to open 
                            <input type="date" name="openDate" onChange={handleChange} />
                        </label>
                    </div>
                    <div className="account-body-right">
                    <textarea placeholder="Type or paste your birthday message here..." cols={30} rows={10} name="bdayMessage" onChange={handleChange} />
                        <label>Upload recipient's image
                            <input type="file" name="recipientImage" onChange={handleFileChange} />
                        </label>
                        {
                            previewUrl && <img src={previewUrl} alt="recipient-pic" />
                        }
                        
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}