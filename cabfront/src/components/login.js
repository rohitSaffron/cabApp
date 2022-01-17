import { useLocation, useNavigate } from "react-router-dom";
import pmlAPI from "../api/pmlAPI";
import  useAsync from "../hooks/useAsync"
// const authReducer = (state, action) => {
//     switch()
// }
const loginUser = async (email, password) => {
    return await pmlAPI.post('/api/auth/login',  {email, password });
}
export default function Login({ setToken}) {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || "/";
    const  { data: token, error, status, setStatus, setData, setError } = useAsync()
    async function submit(event) {
        event.preventDefault();
        const { password, email } = event.target.elements;
        setStatus('loading');
        loginUser(email.value, password.value)
        .then(response => setData(response.data.data.token))
        .catch(error => {
            console.log(error.response);

            setError(error.response.data.message)
        }
            )
        

    }
    console.log(token, status);
    if(status === 'resolved') {
        window.localStorage.setItem('token', token);
        navigate(from, { replace: true})
    }
    return <div className="login-wrapper">
        <form onSubmit={submit}>
            <h1>welcome back</h1>
            {status === 'rejected' ? <p className="login-error">{error}</p> : null}
            <label>email</label>
            <input placeholder="Enter your email" type="email" name="email" required />
            <label>password</label>
            <input type="password" placeholder="Enter your password" name="password" required />
            <button>{status === 'loading' ? 'logging in' : 'login'}</button>
        </form>
    </div>
}