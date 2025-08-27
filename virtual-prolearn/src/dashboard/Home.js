import Side from "./Side"
import Dashnav from "./Dashnav"
const Home = () => {
    return (
        <div className="d-flex">
            <div className="d-none d-lg-block" >
                <Side />
            </div>

            <div className="homeimage-content flex-grow-1 d-flex flex-column py-5 home-b vh-100 ">
                <Dashnav />
                <div className="container-fluid mt-4 mt-10">
                    <div className="d-flex justify-content-between align-items-center mb-4 ">
                        <span className="fs-4 fw-bold roboto">Main Dashboard</span>
                        <span className=" roboto fs-4 fw-bold">0 / 250 Students</span>
                    </div>

                    <div className="d-flex flex-column flex-lg-row gap-3 mb-5 mx-2 px-2 ">
                        <img src="../../img/newSellCourse.5f24250a.png" className="home-1 " alt="Sell Course" />
                        <img src="../../img/newCreateCourse.0ab5d3f1.png" className="home-2 " alt="Create Course" />
                        <img src="../../img/newInstructionalVideo.bdba23b0.png" className="home-2" alt="Instructional Video" />
                    </div>

                    <div className="px-3">
                        <span className="fs-4 roboto fw-bold ">Recent Courses</span>
                        <div className="mt-2 home-content">
                            <span className="roboto fs-5 text-secondary fw-bold">
                                Your most recently created course will show up first. You can view,
                                edit, copy and delete your courses. Once a course is published, you
                                can invite your students to see it.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
