import { useParams } from 'react-router-dom'

function WelcomeComponent() {
    const { username } = useParams();

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username} to India's Best Platform for Meal Planning </h1>
        </div>
    )
}

export default WelcomeComponent