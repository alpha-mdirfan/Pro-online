import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashnav = () => {
    const { logout } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const nagivator = useNavigate()
    const settings = () => {
        nagivator("/account")
    }
    return (
        <nav class="navbar navbar-dark fixed-top d-flex custom-navbar ">
            <div class="container-fluid d-flex align-items-center ">
                <button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <img src="../../img/LogoHeader.b387320a.svg" alt="Logo" height="25" className="d-block d-lg-none mx-auto" />
                <div className="position-relative ms-lg-auto bg-gray bord-bill" ref={menuRef}>
                    <button className="py-2 px-3 font-12 fw-semibold roboto border-0 bg-transparent" onClick={() => setOpen(!open)}>
                        <img src="../../img/user.73011e17.png" alt="Logo" height="25" className="bg-gray mx-1"/>ACCOUNT
                    </button>
                    {open && (
                        <div className="position-absolute bg-white ml-40 w-80p d-flex flex-column py-2 ">
                            <button className=" text-center mx-2 py-1 bg-white border-0 roboto-1 menu-btn" onClick={settings}>Settings</button>
                            <button className=" text-center mx-2 py-1 bg-white border-0 roboto-1 menu-btn" onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
                <div class="offcanvas offcanvas-start " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item"><a class="nav-link text-black roboto fs-5 active" aria-current="page" href="/home">Home</a></li>
                            <li class="nav-item"><a class="nav-link text-black roboto fs-5" href="/billing">Billing</a></li><hr />
                            <li class="nav-item"><a class="nav-link text-black roboto fs-5" href="/account">Account</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Dashnav