import { useState, useEffect } from "react";
import { authFetch } from "../auth/Auth";
const Imgup = () => {
    const [preview, setPreview] = useState(null); // start with null
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await authFetch("http://localhost:8000/api/me/");
                const data = await res.json();
                if (!res.ok) throw new Error("Failed to fetch user data");
                setFirstName(data.first_name);
                setLastName(data.last_name);
                if (data.avatar) setPreview(data.avatar); // existing avatar
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserData();
    }, []);

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie("csrftoken");

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to backend
        const formData = new FormData();
        formData.append("avatar", file); // 'avatar' is the field name your backend expects

        setUploading(true);
        setUploadError("");
        setUploadSuccess("");

        try {
            const res = await authFetch("http://localhost:8000/api/upload-avatar/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrftoken
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Upload failed");
            setUploadSuccess("Avatar uploaded successfully!");
        } catch (err) {
            setUploadError(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="d-flex flex-row justify-content-between px-2">
            <div className="d-flex flex-row align-items-center gap-3">
                <div className="img-size overflow-visible cursor-pointer p-2 text-center">
                    {/* Upload box */}
                    <div className="bord-img border-1 border-dotted border-secondary mx-auto d-flex align-items-center justify-content-center bg-white img-up img-size"
                        onClick={() => document.getElementById("imageUpload").click()}>
                        {preview ? (<img src={preview} alt="Preview" className="img-fluid object-fit-cover w-100 h-100" />)
                            : (<span className="text-secondary  ">+<br />Avatar Logo or Avatar</span>)}
                        {/* Hidden file input */}
                        <input type="file" accept="image/*" id="imageUpload" className="d-none" onChange={handleImageChange} />
                    </div>
                    {/* Label below the box */}
                </div>
                <div >
                    <p className="ml-5 roboto fs-5 fw-bold my-0"> {firstName + " " + lastName}</p>
                    <span className="roboto d-block cursor-pointer pb-5" onClick={() => document.getElementById("imageUpload").click()} >
                        <i class="bi bi-pencil font-14"></i>Add Logo or Avatar
                    </span>
                    {uploading && <p className="roboto text-info">Uploading...</p>}
                    {uploadError && <p className="roboto text-danger">{uploadError}</p>}
                    {uploadSuccess && <p className="roboto text-success">{uploadSuccess}</p>}
                </div>
            </div>
            <div>
                <button type="button" className="transact-his roboto font-14 fw-bold mt-2 bg-white shadow px-3">SEE ALL COURSES</button>
            </div>
        </div>
    );
};

export default Imgup;