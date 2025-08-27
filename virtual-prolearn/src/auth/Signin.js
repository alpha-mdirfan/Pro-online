import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { loginWithEmail, } from "./Auth";
import { AuthContext } from "../context/Authcontext";
const Signin = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // --- validation rules ---
    const validateField = (name, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch (name) {
            case "email":
                if (!value.trim()) return "Email is required";
                if (!emailRegex.test(value)) return "Invalid email address";
                break;
            case "password":
                if (!value) return "Password is required";
                if (value.length < 8) return "Password must be at least 8 characters";
                break;
            default:
                return null;
        }
        return null;
    };

    const validateAll = () => {
        const newErrors = {};
        const emailErr = validateField("email", email);
        if (emailErr) newErrors.email = emailErr;

        const passErr = validateField("password", password);
        if (passErr) newErrors.password = passErr;

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);

        // live validation
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let error = "";

        if (name === "email") {
            if (!value) {
                error = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Enter a valid email";
            }
        }

        if (name === "password") {
            if (!value) {
                error = "Password is required";
            } else if (value.length < 6) {
                error = "Password must be at least 6 characters";
            }
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const signin = async (e) => {
        e.preventDefault();
        setError(null);

        const validationErrors = validateAll();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            const data = await loginWithEmail(email, password);
            login(data.access, data.refresh); // ✅ update context + localStorage
            navigate("/home");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setSubmitting(false);
        }
    };

    const togglePassword = () => {
        const input = document.getElementById("passwordInput");
        input.type = input.type === "password" ? "text" : "password";
        const icon = document.querySelector("#passwordInput + .bi");
        if (input.type === "text") {
            icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
        } else {
            icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
        }
    };
    return (
        <div className="container-fluid signin-lg-mt px-5">
            <div className="row  align-items-center">
                <div className=" mt-5 col-12 col-lg-6 gap-10 px-5 ">
                    <div className="mb-3">
                        <div className="mb-3 d-block d-sm-none ">
                            <img src="../../img/new-login-banner.ef5236ac.png" className="signin-top-img" />
                        </div>
                        <div className="mb-3">
                            <img src="../../img/logo.21564628.svg" className="signup-img" />
                        </div>
                        <div className="mb-3">
                            <h1 className="roboto fw-bold signin-welcome">Welcome</h1>
                        </div>
                        <div className="mb-5">
                            <img src="../../img/signin-label.0d954d20.svg" className="signup-img" />
                        </div>
                    </div>
                    <form onSubmit={signin} >
                        <div className="d-flex flex-column justify-content-start mb-3">
                            <span className="roboto mb-2">Email Address</span>
                            <div className="position-relative mb-2">
                                <input type="email" name="email" className="form-control form-control-lg roboto"
                                    value={email} onChange={handleChange} onBlur={handleBlur} required />
                                <i className="bi bi-envelope-fill position-absolute email-icon"></i>
                            </div>
                            {errors.email && <p className="text-danger roboto mb-0">{errors.email}</p>}

                        </div>
                        <div className="mb-3">
                            <span className="roboto mb-2">Password</span>
                            <div className="position-relative mb-3">
                                <input type="password" name="password"  id="passwordInput" className="form-control form-control-lg roboto "
                                    value={password} onChange={handleChange} onBlur={handleBlur} required />
                                <i className="bi bi-eye-slash-fill position-absolute pass-icon" onClick={togglePassword} />
                            </div>
                            {errors.password && <p className="text-danger roboto mb-0">{errors.password}</p>}
                            <div className="d-flex flex-row justify-content-between">
                                <span className="roboto text-secondary"> By entering VPL you agree to <a href="/our-terms" className="text-purple"> Our Teams of Use
                                </a></span>
                                <span className="roboto"><a href="#" className="text-secondary text-decoration-none">Forgot Password</a></span>
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div>
                            <button className="text-white border-0 w-100 mb-2 py-2 fs-6 fw-bold in-clr roboto" type="submit" disabled={submitting}>
                                {submitting ? "Signing In..." : "SIGN IN"}
                            </button>
                            <div className="d-flex flex-column align-items-center">
                                <span className="text-center roboto text-secondary">Don't have an account yet? <a href="/register" className="text-dark">Sign up Build a Course.</a> </span>
                                <span className="text-center roboto text-secondary">Attending A Course? Contact your course instructor to create an account.</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-lg-6 mt-5 d-none d-lg-block px-22">
                    <img src="../../img/new-login-banner.ef5236ac.png" className="img-fluid signin-img" />
                </div>
            </div>
        </div>
    )
}

export default Signin