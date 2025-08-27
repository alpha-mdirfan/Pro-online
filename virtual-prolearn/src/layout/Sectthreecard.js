const Sectthreecard = ({ image, title, contents }) => {
    return (
        <div className=" p-4 d-flex flex-column align-items-center justify-content-center bg-white gap-2 sect-three-box">
            <div>
                <img src={image} />
            </div>
            <div className="text-center poppins fw-bold">
                <span style={styles.title}>{title}</span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center montserrat text-center" >
                <span style={styles.contents}>{contents}</span>
            </div>
        </div>
    )
}

const styles = {
    title: {
        fontSize: "20px",
        whiteSpace: "pre-line",
    },
    contents: {
        fontSize: "14px",
        whiteSpace: "pre-line",
    },
}

export default Sectthreecard