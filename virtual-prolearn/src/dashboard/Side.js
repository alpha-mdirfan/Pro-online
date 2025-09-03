import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { authFetch } from "../auth/Auth";
import { AuthContext } from "../context/Authcontext";
const Side = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await authFetch("http://localhost:8000/api/me/");
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (location.pathname.startsWith("/build")) {
            setOpen(true);  
        } else {
            setOpen(false); 
        }
    }, [location]);

    const { logout } = useContext(AuthContext)
    return (
        <>
            <div className="sidebar d-none d-lg-flex flex-column shadow">
                <div className="d-flex flex-column justify-content-center mt-4">
                    <div className="d-flex flex-row justify-content-center">
                        <img src="../../img/logo.f2cdc4aa.png" className="side-logo mb-4" alt="Logo" />
                    </div>

                    {!loading && user && (
                        <span className="roboto fw-bold text-center text-white fs-4">
                            {user.first_name} {user.last_name}
                        </span>
                    )}
                </div>
                <nav className="nav flex-column align-items-start p-3">
                    <NavLink to="/home" className={({ isActive }) => "nav-link roboto " +
                        (isActive ? "text-white fw-bold d-flex gap-2 py-3 bg-light-dark home-btn" : " d-flex text-secondary gap-2 home-btn")}>
                        <img src="../../img/Home.244d1866.svg" alt="Logout" className="me-2 w-25 " /> Home
                    </NavLink>
                    <div className="relative">
                        <button
                            className="nav-link roboto d-flex gap-2 py-3 home-btn bg-light-dark mt-2 fw-bold side-build text-secondary "
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <img
                                src="../../img/build.a699f2ce.svg"
                                alt="Build"
                                className="me-2 w-25"
                            />
                            Build
                        </button>

                        {open && (
                            <div className="absolute  shadow rounded mt-2 d-flex flex-column" style={{ marginLeft: "30px" }}>
                                <NavLink
                                    to="/build/courses"
                                    className={({ isActive }) =>
                                        `block px-4 py-2 mb-2 text-decoration-none py-3 rounded-3 roboto text-secondary ${isActive ? "bg-light-dark fw-bold text-white" : "  "}`}
                                >
                                    Courses
                                </NavLink>
                                <NavLink
                                    to="/build/sessions"
                                    className={({ isActive }) =>
                                        `block px-4 py-2 mb-2 text-decoration-none py-3 rounded-3 roboto text-secondary ${isActive ? "bg-light-dark fw-bold text-white" : " "}`}
                                >
                                    Sessions
                                </NavLink>
                                <NavLink
                                    to="/build/modules"
                                    className={({ isActive }) =>
                                        `block px-4 py-2 mb-2 text-decoration-none py-3 rounded-3 roboto text-secondary ${isActive ? "bg-light-dark fw-bold text-white" : " "}`}
                                >
                                    Modules
                                </NavLink>
                            </div>
                        )}
                    </div>
                    <NavLink to="/billing" className={({ isActive }) => "nav-link roboto mt-2 " +
                        (isActive ? "text-white fw-bold d-flex gap-2 py-3 bg-light-dark home-btn" : "text-secondary d-flex gap-2 home-btn")}>
                        <img src="../../img/pricing.4be70ef3.svg" alt="Logout" className="me-2 w-25 " /> Billing
                    </NavLink>
                    <NavLink to="/account" className={({ isActive }) => "nav-link roboto " +
                        (isActive ? "text-white fw-bold d-flex gap-2 py-3 bg-light-dark home-btn" : "text-secondary d-flex gap-2 home-btn")}>
                        <img src="../../img/accountIcon.e0cd9211.svg" alt="Logout" className="me-2 w-25 " /> Account
                    </NavLink>
                </nav>
                <div className="mt-auto p-3">
                    <button
                        className="btn bg-transparent w-100 d-flex align-items-center justify-content-center gap-2 roboto text-white"
                        onClick={logout}>
                        <img src="../../img/logout.19c36abf.svg" alt="Logout" className="me-2 w-25 " />
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}
export default Side