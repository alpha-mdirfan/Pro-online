import Side from "./Side"
import Dashnav from "./Dashnav"
import Imgup from "./Imageupload"
import { AuthContext } from "../context/Authcontext";
import { authFetch } from "../auth/Auth";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Biophoto from "./Biophoto";
const Account = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    const [color, setColor] = useState("#ffffff"); // initial div color
    const colorInputRef = useRef(null);

    const handleButtonClick = () => {
        colorInputRef.current.click(); // trigger the hidden color input
    };

    const handleColorChange = (e) => {
        setColor(e.target.value); // update div color
    };

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

        try {
            const res = await authFetch("http://localhost:8000/api/delete-account/", {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Failed to delete account");

            // Logout user & redirect
            logout();
            navigate("/signup"); // or your signup route
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await authFetch("http://localhost:8000/api/me/");
                const data = await res.json();
                if (!res.ok) throw new Error("Failed to fetch user data");
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setAvatar(data.avatar)
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserData();
    }, []);

    const validatePassword = (password) => {
        const minLength = /.{8,}/;
        const upper = /[A-Z]/;
        const lower = /[a-z]/;
        const number = /[0-9]/;
        const special = /[!@#$%^&*(),.?":{}|<>]/;

        if (!minLength.test(password)) return "Password must be at least 8 characters long.";
        if (!upper.test(password)) return "Password must contain at least one uppercase letter.";
        if (!lower.test(password)) return "Password must contain at least one lowercase letter.";
        if (!number.test(password)) return "Password must contain at least one number.";
        if (!special.test(password)) return "Password must contain at least one special character.";
        return null;
    };

    const handleSubmit = async () => {
        setNewPasswordError("");
        setConfirmPasswordError("");
        setMessage("");
        setIsSuccess(false);

        // ✅ validate new password
        if (newPassword) {
            const validationError = validatePassword(newPassword);
            if (validationError) {
                setNewPasswordError(validationError);
                return;
            }
        }

        // ✅ validate confirm password
        if (newPassword !== confirmPassword) {
            setConfirmPasswordError("New password and confirm password do not match!");
            return;
        }

        // 🔹 Validate password strength
        if (newPassword || confirmPassword) {
            const validationError = validatePassword(newPassword);
            if (validationError) {
                setMessage(validationError);
                setIsSuccess(false);
                return;
            }
            if (newPassword !== confirmPassword) {
                setMessage("New password and confirm password do not match!");
                setIsSuccess(false);
                return;
            }
        }

        try {
            const res = await authFetch("http://localhost:8000/api/change-password/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                // Handle serializer errors properly
                if (typeof data === "object") {
                    const firstError = Object.values(data)[0];
                    throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
                }
                throw new Error("Error changing password");
            }

            setIsSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            // 🔹 2. Update name
            const nameRes = await authFetch("http://localhost:8000/api/change-name/", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                }),
            });

            const nameData = await nameRes.json();
            if (!nameRes.ok) {
                const firstError = Object.values(nameData)[0];
                throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
            }

            setMessage("Name, Password change updated successfully!");
            setIsSuccess(true);

        } catch (err) {
            setMessage(err.message);
            setIsSuccess(false);
        }
    };

    const renderPasswordInput = (label, value, setValue, show, setShow, error) => (
        <div className="position-relative mb-3">
            <p className="card-text roboto fs-6 fw-bold text-secondary m-0">{label}</p>
            <input
                type={show ? "text" : "password"}
                className={`form-control form-control-lg roboto ${error ? "is-invalid" : ""}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <i
                className={`bi position-absolute pass-icon ${show ? "bi-eye-fill" : "bi-eye-slash-fill"}`}
                onClick={() => setShow(!show)}
                style={{ right: "10px", top: "65%", transform: "translateY(-50%)", cursor: "pointer" }}
            ></i>
            {error && <div className="text-danger mt-1 roboto" style={{ fontSize: "14px" }}>{error}</div>}
        </div>
    );

    return (
        <div className="d-flex">
            <Side />
            <div className="main-content px-5 w-100 home-b h-auto pb-50 ">
                <Dashnav />
                <div className=" mb-4 mt-10">
                    <span className="fs-4 fw-bold roboto">Update Profile</span>
                </div>
                <div className="card mb-3">
                    <div className="card-body p-0">
                        <div className="d-flex flex-row justify-content-end pt-2 pb-10 strong-blue px-2 top-radius" style={{ backgroundColor: color }}>
                            <button type="button" className="roboto bg-white bord-bill d-flex align-items-center gap-2 px-3 position-relative"
                                onClick={handleButtonClick} >
                                <span style={{
                                    width: "16px", height: "16px", borderRadius: "50%", backgroundColor: color, border: "1px solid #ccc",
                                    display: "inline-block",
                                }} />
                                Select Color</button>
                            {/* hidden color input */}
                            <input type="color" ref={colorInputRef} onChange={handleColorChange} style={{ display: "none" }} />
                        </div>
                        <Imgup preview_image={avatar} firstName={firstName} lastName={lastName} />
                    </div>
                </div>
                <div>
                    <div className="d-flex ">
                        <ul className="nav nav-underline mb-3 d-flex  px-3 py-3 bg-white w-100 bord-img " id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active roboto " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">General</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link roboto " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Security</button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                            <div className="card h-100 py-4">
                                <div className="card-body">
                                    <h5 className="card-title roboto">Company/Online School Name *</h5>
                                    <input type="text" placeholder="Online School Name or your name or your business" className="form-control form-control-lg roboto bg-gray mb-4" />
                                    <p className="card-text roboto fs-6 fw-bold">About Company/Online School</p>
                                    <textarea rows={4} className='form-control p-2 poppins text-area-nonresize bg-gray' /> <hr />
                                    <h5 className="card-title roboto mb-4">Instructor Information</h5>
                                    <div className="row row-cols-1 row-cols-md-2 g-4">
                                        <div>
                                            <p className="card-text roboto fs-6 fw-bold">First Name</p>
                                            <input type="text" className="form-control form-control-lg roboto bg-gray mb-4"
                                                value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div>
                                            <p className="card-text roboto fs-6 fw-bold">Last Name</p>
                                            <input type="text" className="form-control form-control-lg roboto bg-gray mb-4"
                                                value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <h5 className="card-title roboto">E-mail</h5>
                                    <input type="text" className="form-control form-control-lg roboto bg-gray mb-4" value={email} readOnly />
                                    <h5 className="card-title roboto">Bio</h5>
                                    <div className="mb-4 d-flex flex-row">
                                        <textarea rows={4} className='form-control p-2 poppins text-area-nonresize bg-gray' />
                                        <Biophoto />
                                    </div>

                                    <h5 className="card-title roboto mb-4">Date Format (Customize your date)</h5>
                                    <div className="d-flex flex-row gap-5 mb-4">
                                        <div>
                                            <label className="form-check-label d-flex flex-row gap-2 roboto">
                                                <input type="radio" className="form-check-input scale-110 " name="payment-type" />YYYY-MM-DD
                                            </label>
                                        </div>
                                        <div>
                                            <label className="form-check-label d-flex flex-row gap-2 roboto">
                                                <input type="radio" className="form-check-input scale-110" name="payment-type" />MM-DD-YYYY
                                            </label>
                                        </div>
                                    </div>
                                    <h5 className="card-title roboto mb-4 text-secondary">To sell your courses, please <a href="" className="text-purple text-decoration-none">Connect</a> your Stripe account.</h5>
                                    <button type="button" className="btn roboto mt-2 bg-brown text-white font-14 shadow" onClick={handleDelete}>DELETE ACCOUNT</button>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title roboto mb-4">Change Password</h5>
                                    {renderPasswordInput("Current Password", currentPassword, setCurrentPassword, showCurrent, setShowCurrent, null)}
                                    {renderPasswordInput("New Password", newPassword, setNewPassword, showNew, setShowNew, newPasswordError)}
                                    {renderPasswordInput("Confirm Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm, confirmPasswordError)}
                                    <hr />
                                    <button className="btn roboto mt-2 bg-purple text-white font-14 shadow px-4 py-2" onClick={handleSubmit}>
                                        SAVE
                                    </button>
                                    {message && <p className={`mt-2 ${isSuccess ? "text-primary roboto" : "text-danger roboto"}`}>{message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account