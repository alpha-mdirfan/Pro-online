import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch } from "../auth/Auth";

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const res = await authFetch(`http://localhost:8000/api/course/${id}/`);
            const data = await res.json();
            setCourse(data);
        };
        fetchCourse();
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return (
        <div className="container py-4">
            <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
                ← Go Back
            </button>

            <div className="card shadow d-flex flex-row">
                <div className="card-body">
                    <h3>{course.title}</h3>
                    <p>{course.info}</p>
                    <p className="text-muted">{course.description}</p>
                </div>
                {course.image && <img src={course.image} alt={course.title} className="card-img-top"
                    style={{ height: "200px", width: "386px", objectFit: "cover", }}
                />}
            </div>
        </div>
    );
};

export default CourseDetail;