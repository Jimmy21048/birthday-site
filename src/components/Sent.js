import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Sent() {
    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const history = useNavigate();
    const [loading, setLoading] = useState(null);
    const [sms, setSms] = useState(false);
    const [copied, setCopied] = useState('');

    useEffect(() => {
        axios.get('https://birthday-site-server.onrender.com/sent/my', {
        // axios.get('http://localhost:3002/sent/my', {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(response => {
            if(response.data.error ||
                response.data.userError ||
                response.data.validationError ||
                response.data.tokenError) {
                    history('/');
            }
            setEvents(response.data);
            console.log(response.data)
        })
    }, [setLoading, loading]);


    function handleDelete(id) {
        axios.post('https://birthday-site-server.onrender.com/sent/my', { id }, {
            // axios.post('http://localhost:3002/sent/my', { id }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }, setLoading(true)).then(response => {
            setLoading(false);
        })
    }

    function handleCopyText() {
        const data = document.getElementById('my-link');
        navigator.clipboard.writeText(data.href);
        setCopied('Link copied')
        setTimeout(()=> {
            setCopied('');
        }, 4000);
    }
    if(loading) {
        return (
            <div className="loading"><i class="fa-solid fa-circle-notch fa-spin"></i><h3>Just a sec...</h3></div>
        )
    }
    return (
        <div className="sent">
            {
                sms ?
                <div className='sms'>
                    <header>
                        <h3>Responses</h3>
                        <button onClick={() => setSms(false)}>X</button>
                    </header> 
                    <hr/>
                    <div className='sms-values'>
                        {
                            events.map(event => {
                                return <div className='sms-value'>
                                    <h3>{ event.r_name } </h3>
                                    <h4>{ event.event_type }</h4>
                                    <h5>{ event.open_date }</h5>
                                    <p>{ event.r_response ? event.r_response : '...' }</p>
                                </div>
                            })
                        }
                    </div>                   
                </div> : ''
            }
            <header>
                <Link to="/account"><i className="fa-solid fa-circle-left"></i></Link>
                <button onClick={() => setSms(true)} ><i class="fa-regular fa-envelope"></i></button> 
            </header>
            <div className='sent-body'>
                {
                    id ? 
                    <>
                        <div className='send-link'>
                        <p>Send the recipient this link</p>
                        <a href={`https://events-receiver.vercel.app/${id}`} rel='noreferrer' target='_blank' id='my-link' >https://events-receiver.vercel.app/{id}</a>
                        {/* <a href={`http://localhost:3001/${id}`} rel='noreferrer' target='_blank' id='my-link'>http://localhost:3001/{id}</a> */}
                        <button onClick={handleCopyText}>Copy Link</button>
                        <i>{ copied }</i>
                        </div>
                    </> : ''
                }
                <div className='my-events'>
                    <h3>My Events</h3>
                    {
                        events.map(event => {
                            return (
                                <div key={events.r_id}>
                                    <p>{ event.r_name }</p> <a href={`https://events-receiver.vercel.app/${event.recipientId}`} target='_blank' rel='noreferrer'><i class="fa-solid fa-eye"></i></a> <button onClick={() => handleDelete(event.r_id)}><i class="fa-solid fa-trash"></i></button>
                                    {/* <p>{ event.r_name }</p> <a href={`http://localhost:3001/${event.recipientId}`} target='_blank' rel='noreferrer'><i class="fa-solid fa-eye"></i></a> <button onClick={() => handleDelete(event.r_id)}><i class="fa-solid fa-trash"></i></button> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}