import { FaArrowRight } from 'react-icons/fa'
import Secttwocom from "./Secttwocom"
import Sectthreecard from './Sectthreecard'
import Navbar from '../layout/Navbar';
const carddata = [
    {
        image: "/img/card_1.avif",
        title: "Create Courses and\n Sell Your Talent",
        contents: "Your passion and talent are valuable. Make\n money selling courses online with this easy-\nto-use yet powerful online course platform.\n You don't even have to be a techie to build\n beautiful and engaging courses!",
        more: "Learn more",
    },
    {
        image: "/img/card_2.avif",
        title: "Enhance Your\n Coaching Experience",
        contents: "You have much more to share with your\n clients than what can fit into a one-hour\n coaching session. Supplement your sessions\n with articles, blogs, videos (custom or\n YouTube links), questionnaires, etc.",
        more: "Learn more",

    },
    {
        image: "/img/card_3.avif",
        title: "Deliver Content to\n Private Groups",
        contents: "Whether your group meets in-person or\n online, this platform gives you the ability to\n deliver content privately. Post discussion\n questions, meeting minutes, pictures and\n videos, important documents, etc..",
        more: "Learn more",
    },
    {
        image: "/img/card_4.avif",
        title: "Train Your\n Employees",
        contents: "In today’s fast-paced business environment,\n continuous learning and development are\n crucial for maintaining a competitive edge.\n This online teaching platform can streamline\n your employee training to be more effective\n and efficient.",
        more: "Learn more",
    },
]

const boxData = [
    {
        image: "/img/sect-three-card_1.avif",
        title: "Customization",
        contents: "Customize your e-learning platform with your logo. This white-label online platform that allows you to use your logo even with Starter tier which is free! ",
    },
    {
        image: "/img/sect-three-card_2.avif",
        title: "Discussion Forums",
        contents: "Boost your engagement with discussion forums that offer image uploads, direct responses, likes, and emoji reactions.",
    },
    {
        image: "/img/sect-three-card_3.avif",
        title: "Quizzes & Questionnaires",
        contents: "Create custom quizzes and questionnaires without having to use a third-party platform. It's all build in for you!",
    },
    {
        image: "/img/sect-three-card_4.avif",
        title: "Image Uploader",
        contents: "Use images to meet the needs of visual learners with a built in visual uploader. Enhance the overall design of your content, as well.",
    },
    {
        image: "/img/sect-three-card_5.avif",
        title: "Video Uploader",
        contents: "You can link videos from other platforms, like YouTube and Instagram, but you can also upload your own videos that you create.",
    },
    {
        image: "/img/sect-three-card_6.avif",
        title: "Handout Uploader",
        contents: "Easily upload PDFs or Word documents for your participants to download. Increase the amount of content you offer with this Handout Uploader.",
    },
    {
        image: "/img/sect-three-card_7.avif",
        title: "Student Management",
        contents: "Easily manage your student list. Invite, activate, or pause students with the touch of a button. Search for students with a quick and simple search bar.",
    },
    {
        image: "/img/sect-three-card_8.avif",
        title: "Bulk Uploads",
        contents: "Along with individual registrations, you can also upload a block of registrations with a CSV file. You'll have the option for the system to send an invite, as well.",
    },
    {
        image: "/img/sect-three-card_9.avif",
        title: "Track and Report",
        contents: "Need to track the amount of time your participants watch your uploaded videos? No problem! VPL allows you to track this with ease and accurasy.",
    },
    {
        image: "/img/sect-three-card_10.avif",
        title: "Marketing Tools",
        contents: "Generate interest in your courses by offering a link for users to sign up for free. Copy the link from VPL and paste directly into your social. media feed.",
    },
    {
        image: "/img/sect-three-card_11.avif",
        title: "Direct Payouts to You",
        contents: "If you're offering courses for a fee, you will automatically receive payments for your courses without having to manually request a payout.",
    },
    {
        image: "/img/sect-three-card_12.avif",
        title: "Free Customer Support",
        contents: "VPL is an amazingly intuitive platform but if you require assistance, we will be here to answer your questions at no additional charge.",
    },
]

const Homepage = () => {
    return (
        <div>
            <Navbar />
            {/*1. Online Learing platform */}
            <section className="backone w-100 d-flex align-items-center py-5">
                <div className="container">
                    <div className="row align-items-center gx-2">
                        {/* Left Text Content */}
                        <div className="col-lg-6 mb-4 mb-lg-0 pb-5">
                            <h1 className="sectone-title poppins">Online Learning Platform</h1>
                            <p className="sectone-desc mt-4 text-black poppins d-none d-sm-block">
                                Start delivering content in a matter of minutes but at a fraction of the cost. This all-in-one online course platform is filled with features to help you engage your clients, reach your members, train employees, or just provide a digital hub for all your content.
                            </p>
                            <a href="/register" className="sectone-btn text-white text-decoration-none w-auto text-19 d-inline-flex align-items-center ">
                                Try for FREE! <FaArrowRight className="ms-2" style={{ transform: 'scaleX(1.5)' }} />
                            </a>
                        </div>

                        {/* Right Image */}
                        <div className=" col-lg-6 d-none d-lg-block">
                            <img
                                src="../../img/Header VPL Illustration.avif"
                                alt="Illustration"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/*2. Reach Every Audience */}
            <section className="py-5">
                {/* Section Header */}
                <div className="text-center mb-5 secttwo">
                    <h1 class="poppins">Reach Every Audience</h1>
                    <p className="text-19 poppins mt-4 sec-des d-flex flex-row justify-content-center align-items-center">
                        The sky is the limit for how this easy-to-use course creation<br /> software can be used. Here are four main uses of Virtual Pro Learn:
                    </p>
                </div>
                {/* Cards Grid */}
                <div>
                    <div className='sect-two-card d-flex justify-content-center flex-wrap' >
                        {[...Array(Math.ceil(carddata.length / 2))].map((_, rowIndex) => (
                            <div key={rowIndex} style={{
                                display: "flex",
                                gap: "40px",
                                justifyContent: "center"
                            }}>
                                {carddata
                                    .slice(rowIndex * 2, rowIndex * 2 + 2)
                                    .map((card, index) => (
                                        <Secttwocom
                                            key={index}
                                            image={card.image}
                                            title={card.title}
                                            contents={card.contents}
                                            more={card.more}
                                        />
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* 3. All the features you */}
            <section>
                <div className='backthree py-5 position-relative mw-100 overflow-hidden'>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-6 text-center position-relative mt-4 mt-lg-0">
                                <img
                                    src='../../img/back_3.avif'
                                    alt="Background"
                                    className="img-fluid sectthreeback h-auto mw-100 d-none d-lg-block"
                                />
                            </div>
                            {/* Main White Card Content */}
                            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center sectthree bg-white  py-lg-10 ">
                                <h1 className="text-center fw-bold montserrat sectthreetitle">
                                    All the features you<br /> need, all in one place.
                                </h1>
                                <p className="mt-3 poppins">
                                    Virtual Pro Learn is a comprehensive online platform,<br />
                                    offering every feature (and more) of an expensive and<br />
                                    cumbersome Learning Management System (LMS). With<br />
                                    this all-in-one course platform, you won't have to<br />
                                    compromise anything!
                                </p>
                                <a href="#" className="sectthreebut d-inline-flex align-items-center mt-4 text-white text-decoration-none">
                                    Try for FREE! <FaArrowRight className="ms-2" style={{ transform: 'scaleX(1.5)' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='back-three-card'>
                        <div className='sect-two-card d-flex justify-content-center flex-wrap' >
                            {[...Array(Math.ceil(boxData.length / 3))].map((_, rowIndex) => (
                                <div key={rowIndex} style={{
                                    display: "flex",
                                    gap: "40px",
                                    justifyContent: "center"
                                }}>
                                    {boxData
                                        .slice(rowIndex * 3, rowIndex * 3 + 3)
                                        .map((box, index) => (
                                            <Sectthreecard
                                                key={index}
                                                image={box.image}
                                                title={box.title}
                                                contents={box.contents}
                                            />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* 4. This is the best platform to sell your online courses! */}
            <section>
                <div className='sect-four-back overflow-hidden'>
                    <div className='sect-four-font d-flex flex-column align-items-center justify-content-center px-sm-2'>
                        <h1 className='montserrat text-white m-0'>
                            This is the best platform to sell your online courses!
                        </h1>
                        <span className='poppins text-white'>
                            This e-learning platform allows you to create passive income through online courses. Your users will be captured by your ability to build out interactive online courses that are engaging, interesting, and entertaining.  Sell your online courses and be your own boss with VPL!
                        </span>
                        <h4 className='montserrat m-0 text-white'>Your expertise. Your platform. Your profit.</h4>
                    </div>
                </div>
            </section>
            {/* 5. Coming Soon */}
            <section>
                <div className='back-five d-flex flex-row align-items-center justify-content-center'>
                    <div className='sect-five d-flex flex-column align-items-center justify-content-center position-relative '>
                        <a href="" className="sect-five-btn text-white text-decoration-none text-center montserrat align-items-center justify-content-center d-inline-flex " >Coming Soon! <FaArrowRight style={{ marginLeft: '14px', transform: 'scaleX(1.5)' }} /> </a>
                        <div >
                            <img src="../../img/VPL Logo-Evgenia-xx.avif" style={{ width: "353px" }} />
                        </div>
                        <div className='sect-five-font bg-white'>
                            <div>
                                <span className='montserrat fw-bold'>Questions? Contact us.</span>
                            </div>
                            <div>
                                <div className='five-input-first d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-column justify-content-start'>
                                        <h5 className='montserrat fw-light'>First name</h5>
                                        <input type="text" placeholder="Enter your first name" className='p-2 d-flex flex-row five-input-name roboto' />
                                    </div>
                                    <div className='d-flex flex-column justify-content-start'>
                                        <h5 className='montserrat fw-light'>Email *</h5>
                                        <input type="text" placeholder="Enter your email" className=' p-2 five-input-name roboto' />
                                    </div>
                                </div>
                                <div className='five-input-second'>
                                    <h5 className='montserrat fw-light'>Subject</h5>
                                    <input type="text" placeholder="e.g.,Support" className='five-input-sub p-2 roboto' />
                                </div>
                                <div>
                                    <h5 className='montserrat fw-light'>Write a message</h5>
                                    <textarea placeholder="Enter text here" rows={3} className='five-input-message p-2 poppins text-gray' />
                                </div>
                            </div>
                            <div className='d-flex flex-row justify-content-center mt-2' >
                                <button className='five-send-button poppins text-white border-0'>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <sectoin>
                <div className='foot w-100' >
                    <div>
                        <div className='d-flex flex-column justify-content-start align-items-center homepage-foot' >
                            <span className='montserrat text-18 fw-light' >© by Virtual Pro Learn, LLC</span>
                        </div>
                    </div>
                </div>
            </sectoin>
        </div>
    )
}

export default Homepage