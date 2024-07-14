import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
export default function Sent() {
    const { id } = useParams();
    
    return (
        <div className="sent">
            <header>

            </header>
            <div className='sent-body'>
                <div className='send-link'>
                    <p>Send the recipient this link</p>
                    <a href={`https://events-receiver.vercel.app/${id}`} rel='noreferrer' target='_blank' >https://events-receiver.vercel.app/{id}</a>
                    <button>Copy Link</button>
                    <button>My Events</button>
                </div>
            </div>
        </div>
    )
}