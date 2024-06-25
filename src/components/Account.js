import { useEffect, useState } from "react"
import axios from 'axios';

export default function Account() {
    const [inputs, setInputs] = useState({
        recipientName: '',
        birthDate: '',
        openDate: '',
        enableGift: '',
        recipientImage: '',
        bdayMessage: ''
    })
    // const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs({...inputs, [name] : value});
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        setInputs({...inputs, recipientImage: file});
        // setSelectedFile(file);

        const reader = new FileReader();
        console.log(reader);
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        if(file) {
            reader.readAsDataURL(file);
        }
    }



    function handleSubmit(e) {
        e.preventDefault();

        axios.post('https://localhost/Bday/account.php', { headers: { 'Content-Type': 'application/json'}}, inputs)
        .then(response => {
            console.log(response);
        })
    }

    useEffect(() => {
        axios.get('http://localhost/Bday/account.php', {
            headers : {'Content-Type': 'application/json'}
        })
        .then(response => {
            console.log(response);
        })
    }, []);

    return (
        <div className="account-page">
            <header>
                <h3>Hello Username</h3>
                <div>My Account</div>
            </header>
            <div className="account-body">
                <form onSubmit={handleSubmit}>
                    <div className="account-body-left">
                        <label>Enter recipient's name
                            <input type="text" name="recipientName" value={inputs.recipientName} onChange={handleChange}/>
                        </label>
                        <label>Recipient's date of Birth
                            <input type="date" name="birthDate" value={inputs.birthDate} onChange={handleChange} />
                        </label>
                        <label>Date to open 
                            <select name="openDate" onChange={handleChange} >
                                <option value=''>None selected </option>
                                <option value={inputs.birthDate}>Birthday date</option>
                                <option value={1} >Any time</option>
                            </select>
                        </label>
                        <label>Enable gifts
                            <div id="gift-div">
                            <input className="input-radio" type="radio" name="enableGift" value='yes' onChange={handleChange} />yes
                            <input className="input-radio" type="radio" name="enableGift" value='no' onChange={handleChange} />no
                            </div>
                        </label>
                    </div>
                    <div className="account-body-right">
                        <label>Upload recipient's image
                            <input type="file" name="recipientImage" onChange={handleFileChange} />
                        </label>
                        {
                            previewUrl && <img src={previewUrl} alt="recipient-pic" />
                        }
                        <textarea placeholder="Type or paste your birthday message here..." cols={30} rows={10} name="bdayMessage" onChange={handleChange} />
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}