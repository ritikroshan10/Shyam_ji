import logo from "../assets/logo.png";
import "./loginpage.css"
import sideCut from "../assets/Vector 95.png";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };
    return (
        <div className="login-container fullScreen">
            {/* ----------------------------------Left Section--------------------- */}
            <div className="login-left">
                <div className="yellow-section">
                    <img src={sideCut} alt="" className="side-cut" />
                    <div className="content">
                        <img src={logo} alt="Shyam-G Logo" className="login-logo" />
                        <h1 className="title">
                            The Best Snack <br /> Manufacturing in India
                        </h1>
                        <p className="description">
                            Shyam-G Snacks has emerged as a shining star in the vibrant and
                            diverse world of snacks. Renowned as a leading snacks manufacturer
                            in India, Shree Shyam Snacks Food Private Limited, known as
                            Shyam-G Snacks, has carved a niche through its commitment to
                            quality and a wide array of delectable snack offerings.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="login-right">
                <div className="login-card">
                    <h2>Login</h2>
                    <form>
                        <label>Username</label>
                        <input type="email" placeholder="admin@gmail.com"/>

                        <label>Password</label>
                        <input type="password" placeholder="••••••••"/>

                        <div className="forgot">
                            <a href="#">Forget Password?</a>
                        </div>

                        <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;