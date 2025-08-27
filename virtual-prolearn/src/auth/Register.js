import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
const Register = () => {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [ok, setOk] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [touched, setTouched] = useState({});

    const pwdRef = useRef(null);
    const cpwdRef = useRef(null);

    const navigate = useNavigate()

    // --- Validation Rules ---
    const validateField = (name, value) => {
        const nameRegex = /^[A-Za-z\s]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        switch (name) {
            case "first_name":
                if (!value.trim()) return "First name is required";
                if (!nameRegex.test(value)) return "Enter a valid first name";
                break;
            case "last_name":
                if (!value.trim()) return "Last name is required";
                if (!nameRegex.test(value)) return "Enter a valid last name";
                break;
            case "email":
                if (!value.trim()) return "Email is required";
                if (!emailRegex.test(value)) return "Invalid email address";
                break;
            case "password":
                if (!value) return "Password is required";
                if (!passwordRegex.test(value))
                    return "Password must be 8+ chars, include upper, lower, number & special char";
                break;
            case "confirm_password":
                if (!value) return "Confirm password is required";
                if (value !== form.password) return "Passwords do not match";
                break;
            default:
                return null;
        }
        return null;
    };

    // validate all fields
    const validateAll = () => {
        const newErrors = {};
        for (let field in form) {
            const err = validateField(field, form[field]);
            if (err) newErrors[field] = err;
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));

        // live validation as user types
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        // Only validate if user actually typed something
        if (form[name].trim() !== "") {
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(name, form[name]),
            }));
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setOk(false);
        const validationErrors = validateAll();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrors({ api: JSON.stringify(data) });
            } else {
                setOk(true);
                navigate("/signin");
            }
        } catch (err) {
            setErrors({ api: err.message || "Network error" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex flex-row flex-lg-row flex-column w-100 px-30 justify-content-center align-items-center gap-10 mt-5">
            <div className=" w-100 mt-sm-5 px-lg-3 px-5 ">
                <div className="mb-3 d-flex flex-column">
                    <div className="d-none d-sm-block">
                        <img src="../../img/logo.21564628.svg" />
                    </div>
                    <div className="d-none d-sm-block">
                        <h1 className="roboto fw-bold">Create Your Account</h1>
                    </div>
                    <div className="d-block d-sm-none">
                        <img src="../../img/signup-banner-small.cefbd556.svg" className="signup-small-top-img" />
                    </div>
                    <div>
                        <img src="../../img/signupLabel.0733dd0e.svg" className="signup-img" />
                    </div>
                </div>
                <form onSubmit={submit}  >
                    <div>
                        <div className="d-flex flex-xxl-row flex-column gap-4 mb-3 ">
                            <div className="d-flex flex-column justify-content-start w-100 ">
                                <span className="roboto">First Name</span>
                                <div className="position-relative mb-1">
                                    <input type="text" className=" form-control form-control-lg roboto " name="first_name"
                                        value={form.first_name} onChange={handleChange} onBlur={handleBlur} />
                                    <i className="bi bi-person-circle position-absolute email-icon" />
                                </div>
                                {touched.first_name && errors.first_name && (<small className="text-danger mb-0 roboto">{errors.first_name}</small>)}

                            </div>
                            <div className="d-flex flex-column justify-content-start w-100 ">
                                <span className="roboto">Last Name</span>
                                <div className="position-relative mb-1">
                                    <input type="text" className=" form-control form-control-lg roboto " name="last_name"
                                        value={form.last_name} onChange={handleChange} onBlur={handleBlur} />
                                    <i className="bi bi-person-circle position-absolute email-icon" />
                                </div>
                                {errors.last_name && <small className="text-danger mb-0 roboto">{errors.last_name}</small>}
                            </div>

                        </div>
                        <div className="d-flex flex-column justify-content-start mb-3">
                            <span className="roboto">Email Address</span>
                            <div className="position-relative mb-1">
                                <input type="email" className=" form-control form-control-lg roboto " name="email"
                                    value={form.email} onChange={handleChange} onBlur={handleBlur} />
                                <i className="bi bi-envelope-fill position-absolute email-icon" />
                            </div>
                            {touched.email && errors.email && (<p className="text-danger roboto mb-0">{errors.email}</p> )}
                        </div>

                        <div className="mb-3">
                            <span className="roboto">Password</span>
                            <div className="position-relative mb-1">
                                <input type={showPassword ? "text" : "password"}
                                    id="passwordInput" className=" form-control form-control-lg roboto " ref={pwdRef} name="password"
                                    value={form.password} onChange={handleChange} onBlur={handleBlur} minLength={8} required />
                                <i className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"} position-absolute pass-icon`}
                                    onClick={() => setShowPassword((prev) => !prev)} role="button" aria-label="Toggle password visibility" />
                            </div>
                            {touched.password && errors.password && (<p className="text-danger roboto mb-0 ">{errors.password}</p>)}
                        </div>

                        <div className="mb-3">
                            <span className="roboto">Confirm Password</span>
                            <div className="position-relative mb-1">
                                <input type={showConfirmPassword ? "text" : "password"}
                                    id="confirmpasswordInput" className=" form-control form-control-lg roboto " ref={cpwdRef}
                                    name="confirm_password" value={form.confirm_password} onChange={handleChange} onBlur={handleBlur} minLength={8} required />
                                <i className={`bi ${showConfirmPassword ? "bi-eye-fill" : "bi-eye-slash-fill"} position-absolute pass-icon`}
                                    onClick={() => setShowConfirmPassword((prev) => !prev)} role="button" aria-label="Toggle confirm password visibility" />
                            </div>
                            {errors.confirm_password && <p className="text-danger roboto mb-0 ">{errors.confirm_password}</p>}

                            <span className="roboto text-secondary">By entering VPL you agree to <a href="/our-terms" className="up-clr"> Our Terms of Use</a></span>
                        </div>

                        {errors.api && <div className="alert alert-danger roboto">{errors.api}</div>}
                        {ok && <div className="alert alert-success">Account created!</div>}

                        <div>
                            <button className="text-white border-0 w-100 mb-2 py-2 in-clr roboto" type="submit" disabled={submitting} >
                                {submitting ? "Signing UP..." : "SIGN UP"}
                            </button>
                            <div className="text-center">
                                <span className=" roboto text-secondary">Already have an account? <a href="/signin" className="roboto up-clr">Sign in.</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="d-none d-lg-block">
                <img src="../../img/signup-banner.png" />
            </div>
        </div>
    )
}

export default Register

