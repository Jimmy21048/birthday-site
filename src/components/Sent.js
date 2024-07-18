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
            console.log(response.data);
            setEvents(response.data);
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
    }
    if(loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className="sent">
            <header>
                <Link to="/account">Back</Link>
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
                        </div>
                    </> : ''
                }
                <div className='my-events'>
                    <h3>My Events</h3>
                    {
                        events.map(event => {
                            return (
                                <div key={events.r_id}>
                                    <p>{ event.r_name }</p> <p>{ event.event_type }</p> <p>{ event.open_date }</p> <button onClick={() => handleDelete(event.r_id)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}