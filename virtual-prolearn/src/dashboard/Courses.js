import Side from "./Side"
import Dashnav from "./Dashnav"
import { FaEye, FaEdit, FaCopy, FaLink, FaUpload, FaTrash, } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { authFetch } from "../auth/Auth";
import { useState, useEffect } from "react";
const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        const res = await authFetch("http://localhost:8000/api/course/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        });
        const data = await res.json();
        setCourses(data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="d-flex">
            <Side />

            <div className="homeimage-content flex-grow-1 d-flex flex-column pt-100 home-b pb-100 ">
                {/* Navigation */}
                <Dashnav />

                <div className="d-flex flex-column align-items-start mb-4 mt-10">
                    <span className="fs-4 fw-bold roboto">Build Courses</span>
                    <button
                        className="btn roboto mt-2 bg-purple text-white font-14 shadow px-4 py-2"
                        onClick={() => navigate("/build/course/edit")}
                    >
                        CREATE NEW COURSE
                    </button>
                </div>

                <div className="mt-4 ">
                    {courses.length === 0 ? (
                        <div className="home-content">
                            <span className="roboto fs-5 text-secondary fw-bold">
                                Your most recently created course will show up first. You can view,
                                edit, copy and delete your courses. Once a course is published, you
                                can invite your students to see it.
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex flex-wrap gap-5">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="card shadow rounded-4 "
                                    style={{ width: "386px" }}
                                >
                                    {course.image && (
                                        <div className=" py-4 px-4 " >
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="card-img-top rounded-4"
                                                style={{ height: "200px", objectFit: "cover", }}
                                            />
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title roboto fw-bold">{course.title}</h5>
                                        <p className="card-text roboto text-secondary">{course.info}</p>
                                        <p className=" small roboto text-purple m-0">{course.description}</p>
                                    </div>
                                    {/* ✅ Action icons */}
                                    <div className=" d-flex px-4 pb-20">
                                        <div className="d-flex gap-2 ">
                                            <FaEye
                                                className="text-dark cursor-pointer"
                                                title="View"
                                                onClick={() => navigate(`/build/course/${course.id}`)}
                                            />
                                            <div className="border-start"/>
                                            <FaEdit
                                                className="text-dark cursor-pointer"
                                                title="Edit"
                                                onClick={() => navigate(`/edit/${course.id}`)}
                                            />
                                            <div className="border-start"/>
                                            <FaCopy
                                                className="text-dark cursor-pointer"
                                                title="Copy"
                                            // onClick={() => handleCopy(course)}
                                            />
                                            <div className="border-start"/>
                                            <FaLink
                                                className="text-dark cursor-pointer"
                                                title="Copy Link"
                                                onClick={() =>
                                                    navigator.clipboard.writeText(
                                                        `${window.location.origin}/course/${course.id}`
                                                    )
                                                }
                                            />
                                            <div className="border-start"/>
                                            <FaUpload
                                                className="text-dark cursor-pointer"
                                                title="Publish"
                                                onClick={() => alert("Publish feature not yet implemented")}
                                            />
                                            <div className="border-start"/>
                                            <FaTrash
                                                className="text-dark cursor-pointer"
                                                title="Delete"
                                            // onClick={() => handleDelete(course.id)}
                                            />
                                            <div className="border-start"/>
                                            <div className="text-dark d-flex flex-column align-items-start">
                                                <span style={{marginTop: "-5px"}}>{course.views || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div >
    )
}

export default Courses