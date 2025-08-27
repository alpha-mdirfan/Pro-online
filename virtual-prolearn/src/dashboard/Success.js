import { useNavigate  } from "react-router-dom"
const Success = () => {
    const navigate = useNavigate()
    const GotoBilling = () => {
        navigate("/billing")
    }
    return (
        <div className="d-flex flex-row justify-content-center align-items-center my-auto">
            <div className=" back-three-card  ">
                <img src="../../img/logo.21564628.svg" className="signup-img" />
                <h1 className=" roboto fw-bold ">Your payment succeded !</h1>
                <button className="btn roboto mt-2 bg-purple text-white fs-5 shadow px-4 py-2" onClick={GotoBilling} >
                    Go to Billing
                </button>
            </div>
        </div>
    )
}

export default Success