import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import './css/LoginComponent.css'

function LoginComponent() {
    const [username, setUserName] = useState('rajib123')
    const [password, setPassword] = useState('dummy123')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth()

    function handleUsernameChange(event) {
        // console.log(event.target.value);
        setUserName(event.target.value);
    }


    function handlePasswordChange(event) {
        // console.log(event.target.value);
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if (authContext.login(username,password)) {
            navigate(`/food/search`);

        } else {
            setShowErrorMessage(true);
            navigate('/login');
        }
    }

    return (
        <div className="LoginComponent">
            {showErrorMessage && <div className="errorMessage">Authentication Failed</div>}
            <div className="LoginForm">
                <div>
                    <input type="text" placeholder="User Name" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent