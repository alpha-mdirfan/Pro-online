import Side from "./Side"
import Dashnav from "./Dashnav"
const Modules = () => {
    return (
        <div className="d-flex">
            <Side />
            <div className="homeimage-content flex-grow-1 d-flex flex-column pt-100 home-b vh-100">
                <Dashnav />
                <div className="d-flex flex-column  align-items-start mb-4 mt-10">
                    <span className="fs-4 fw-bold roboto">Build Modules</span>
                    <button
                        className="btn roboto mt-2 bg-purple text-white font-14 shadow px-4 py-2"
                    >
                        CREATE NEW COURSE
                    </button>
                </div>
                <div className="mt-2 home-content">
                    <span className="roboto fs-5 text-secondary fw-bold">
                        Your most recently created course will show up first. You can view, edit, copy and delete your courses. Once a course is published, you can invite your students to see it.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Modules