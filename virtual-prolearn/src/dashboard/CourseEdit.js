import Side from "./Side"
import Dashnav from "./Dashnav"
import { useState, useEffect } from "react";
import { authFetch } from "../auth/Auth";
import { useNavigate } from "react-router-dom";
const CourseEdit = () => {
    // Form state
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); 
            setPreview(URL.createObjectURL(file)); 
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("info", info);
        formData.append("description", description);
        if (image) formData.append("image", image);

        await authFetch("http://localhost:8000/api/course/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: formData,
        });

        navigate("/build/courses");
    };

    return (
        <div className="d-flex">
            <Side />

            <div className="homeimage-content flex-grow-1 d-flex flex-column pt-100 home-b vh-100">
                {/* Navigation */}
                <Dashnav />

                {/* Editor Window */}
                    <div className="position-fixed top-0 start-0 w-100 h-100 bg-white p-4 overflow-auto shadow-lg zindex-1000">
                        <h3 className="fw-bold mb-3">Create New Course</h3>

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Course Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="form-control mb-3"
                            placeholder="Information"
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                        />

                        <textarea
                            className="form-control mb-3"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            type="file"
                            className="form-control mb-3"
                            onChange={handleImageUpload}
                        />
                        {preview && <img src={preview} alt="Preview" className="img-fluid mb-3 rounded" />}

                        <div className="d-flex gap-2">
                            <button className="btn btn-success" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                

            </div>
        </div>
    )
}

export default CourseEdit