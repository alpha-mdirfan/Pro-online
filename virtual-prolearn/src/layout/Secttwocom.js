const Secttwocom = ({ image, title, contents, more }) => {
    return (
        <div style={styles.box} className="d-flex flex-column align-items-center justify-content-center position-relative gap-3">
            <div >
                <img src={image} />
            </div>
            <div style={styles.boxone} className="text-center">
                <span style={styles.title} className="poppins fw-bold">{title}</span>
            </div>
            <div style={styles.boxtwo} className="d-flex flex-column align-items-center justify-content-center" >
                <span style={styles.contents} className="poppins">{contents}</span>
                <span style={styles.more} className="poppins text-decoration-underline text-left d-block">{more}</span>
            </div>
        </div>
    )
}

const styles = {
    box: {
        backgroundColor: "#E4E9FF",
        width: 470,
        height: 680,
        borderRadius: "30px",
        padding: 20,
    },
    title: {
        fontSize: "29px",
        color: "#1B356B",
        whiteSpace: "pre-line",
    },
    contents: {
        fontSize: "18px",
        lineHeight: 1.8,
        whiteSpace: "pre-line",
    },
    more: {
        fontSize: "18px",
        alignSelf: "flex-start", 
    },

}
export default Secttwocom