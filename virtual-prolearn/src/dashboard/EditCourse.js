import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../auth/Auth";
const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");
    const [description, setDescription] = useState("");

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);

    // 👉 Load existing course
    useEffect(() => {
        const fetchCourse = async () => {
            const res = await authFetch(`http://localhost:8000/api/course/${id}/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setTitle(data.title);
                setInfo(data.info);
                setDescription(data.description);
                setExistingImage(data.image)
                // not setting image directly, just display preview if needed
            }
        };

        fetchCourse();
    }, [id]);

    // 👉 Save edits
    const handleSave = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("info", info);
        formData.append("description", description);
        if (image) formData.append("image", image);

        await authFetch(`http://localhost:8000/api/course/${id}/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: formData,
        });

        navigate("/build/courses"); // go back to course list page
    };

    return (
        <div className="container mt-5">
            <h2>Edit Course</h2>
            <input
                type="text"
                className="form-control mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                className="form-control mb-3"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="Info"
            />
            <textarea
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />

            {/* Show image preview */}
            <div className="mb-3">
                {(image || existingImage) && (
                    <div>
                        <p>Preview:</p>
                        <img
                            src={image ? URL.createObjectURL(image) : existingImage}
                            alt="Course"
                            className="img-thumbnail"
                            style={{ maxWidth: "200px" }}
                        />
                    </div>
                )}
            </div>
            
            <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default EditCourse;