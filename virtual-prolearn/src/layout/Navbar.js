import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-xl navbar-light navbar-color sticky-top">
            <div className="container pb-2 ps-3 d-flex justify-content-start">
                <Link className="navbar-brand p-0" to="/">
                    <img
                        src="../../img/VPL Logo-Evgenia-xx.avif"
                        alt="Logo"
                        height="65"
                        className="d-none d-md-block"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto linkList">
                        <li className="nav-item">
                            <Link className="nav-link montserrat text-black hover-no-underline text-decoration-none" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link montserrat text-black hover-no-underline text-decoration-none" to="">Examples</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link montserrat text-black hover-no-underline text-decoration-none" to="">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link montserrat text-black hover-no-underline text-decoration-none" to="">Testimonials</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link montserrat text-black hover-no-underline text-decoration-none" to="">FAQ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link montserrat text-black hover-no-underline text-decoration-none" to="">Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar