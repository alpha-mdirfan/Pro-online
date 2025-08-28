import Side from "./Side"
import Dashnav from "./Dashnav"
import { useState, useEffect } from "react";
const Billing = () => {
    const [activePlan, setActivePlan] = useState(null);
    const [loadingPlan, setLoadingPlan] = useState(null);

    const fetchSubscription = async () => {
        const token = localStorage.getItem("access");
        if (!token) return;

        const res = await fetch("http://localhost:8000/api/profile/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setActivePlan(data.active_plan);
    };

    const handleGrowthSubscribe = async (priceId) => {
        setLoadingPlan(priceId);
        const token = localStorage.getItem("access");

        try {
            const response = await fetch("http://localhost:8000/api/create-growth-subscription/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: "magicsword4477@gmail.com", // replace with logged-in user’s email
                    priceId: priceId
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoadingPlan(null);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    return (
        <div className="d-flex">
            <Side />
            <div className="main-content p-4 w-100 home-b h-auto">
                <Dashnav />
                <div className="d-flex justify-content-between align-items-center mb-4 mt-10">
                    <span className="fs-4 fw-bold roboto">Our Billing Plans</span>
                    <button type="button" className="transact-his roboto fw-5">Transaction History</button>
                </div>
                <div>
                    <div className="d-flex justify-content-center">
                        <ul className="nav nav-pills mb-3 d-flex flex-row justify-content-center px-2 py-2 bg-bill w-auto mx-auto" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active roboto bord-bill " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Monthly</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link roboto bord-bill" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Yearly</button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                            <div className="row row-cols-1 row-cols-md-4 g-4 mt-1">
                                <div className="col">
                                    <div className="card h-100 border-0">
                                        <div className="card-body">
                                            <h5 className="card-title roboto">STARTER <span className="text-purple">- Free</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">Freedom to Create</p>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title roboto"><span className="fs-4 text-purple fw-bold">$0</span><span className="font-14 text-purple fw-bold">/MONTH</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">No Credit Card Required</p>
                                        </div>
                                        <div className="card-body py-0">
                                            {!activePlan && (
                                                <h5 className="card-title roboto text-purple fw-bold text-center">
                                                    <i className="bi bi-check-circle text-purple"></i> Your current plan
                                                </h5>
                                            )}
                                            <p className="card-text roboto fs-6 fw-bold mb-1">What's Included</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Easy to use, no code needed</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> All Creator Features Unlocked</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 250 Students Maximum</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Company Logo Branding</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Unlimited Discussion Forums</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Quizzes</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Image Uploader for Visual Layout</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Embed YouTube & Vimeo Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Video Uploader (300mb max per video)</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Audio Uploader</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Digital Downloads for Users</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Drag & Drop Module Organzier</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Full Student Management Access</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Tracking and Reporting of All Users</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Marketing Link to Attact New Users</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Automatic Payouts from Stripe</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 7% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 1 Course (published or unpublished)</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Free Customer Support</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Forever Access</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100 border-0">
                                        <div className="mt-3 px-3">
                                            <h5 className="roboto">GROWTH</h5>
                                            <p className="roboto text-secondary font-14 fw-bold">Growing Your Business</p>
                                        </div>
                                        <div className="mt-3 px-3">
                                            <h5 className="card-title roboto"><span className="fs-4 text-purple fw-bold">$29</span><span className="font-14 text-purple fw-bold">/MONTH</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">$278 Annually 20% Off</p>
                                        </div>
                                        {activePlan === "price_1RyjZ3JhPUBnWAMQiuPEWYth" ? ( 
                                            <h5 className="card-title roboto text-purple fw-bold text-center mt-3">
                                                <i className="bi bi-check-circle text-purple"></i> Your current plan
                                            </h5>
                                        ) : (
                                            <button
                                                type="button"
                                                className="transact-his roboto fw-5 mx-2 mt-2 bg-transparent"
                                                onClick={() => handleGrowthSubscribe("price_1RyjZ3JhPUBnWAMQiuPEWYth")} 
                                                disabled={loadingPlan === "price_1RyjZ3JhPUBnWAMQiuPEWYth"}
                                            >
                                                {loadingPlan === "price_1RyjZ3JhPUBnWAMQiuPEWYth" ? "Processing..." : "CHOOSE"}
                                            </button>
                                        )}
                                        <div className="mt-3 px-3">
                                            <p className="card-text roboto fs-6 fw-bold mb-1">Everything in the Starter Tier plus:</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Unlimited Students</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 1GB Per Upload Limit on Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Bulk User Uploads</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 6% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 2 Published (active) Course</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100 bg-light-purple border-0">
                                        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-light-dark py-2 px-5 fs-6 roboto">
                                            Most Popular
                                        </span>
                                        <div className="mt-3 px-3">
                                            <h5 className="roboto">MASTERY</h5>
                                            <p className="roboto text-secondary font-14 fw-bold">Mastering Your Courses</p>
                                        </div>
                                        <div className="mt-3 px-3">
                                            <h5 className="card-title roboto"><span className="fs-4 text-purple fw-bold">$79</span><span className="font-14 text-purple fw-bold">/MONTH</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">$758 Annually 20% Off</p>
                                        </div>
                                        {activePlan === "price_1RyjZUJhPUBnWAMQ2x8PeTyW" ? (
                                            <h5 className="card-title roboto text-purple fw-bold text-center mt-3">
                                                <i className="bi bi-check-circle text-purple"></i> Your current plan
                                            </h5>
                                        ) : (
                                            <button
                                                type="button"
                                                className="transact-his roboto fw-5 mx-2 mt-2 bg-transparent"
                                                onClick={() => handleGrowthSubscribe("price_1RyjZUJhPUBnWAMQ2x8PeTyW")} 
                                                disabled={loadingPlan === "price_1RyjZUJhPUBnWAMQ2x8PeTyW"}
                                            >
                                                {loadingPlan === "price_1RyjZUJhPUBnWAMQ2x8PeTyW" ? "Processing..." : "CHOOSE"}
                                            </button>
                                        )}
                                        <div className="mt-3 px-3">
                                            <p className="card-text roboto fs-6 fw-bold mb-1">Everything in the Growth Tier plus:</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 3GB Per Upload Limit on Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 3% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 10 Published (active) Course</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100 border-0">
                                        <div className="mt-3 px-3">
                                            <h5 className="roboto">Master Plus</h5>
                                            <p className="roboto text-secondary font-14 fw-bold">Excelling at Training</p>
                                        </div>
                                        <div className="mt-3 px-3">
                                            <h5 className="card-title roboto"><span className="fs-4 text-purple fw-bold">$129</span><span className="font-14 text-purple fw-bold">/MONTH</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">$1238 Annually 20% Off</p>
                                        </div>
                                        {activePlan === "price_1RyjZlJhPUBnWAMQl8BsyVEO" ? (
                                            <h5 className="card-title roboto text-purple fw-bold text-center mt-3">
                                                <i className="bi bi-check-circle text-purple"></i> Your current plan
                                            </h5>
                                        ) : (
                                            <button
                                                type="button"
                                                className="transact-his roboto fw-5 mx-2 mt-2 bg-transparent"
                                                onClick={() => handleGrowthSubscribe("price_1RyjZlJhPUBnWAMQl8BsyVEO")} 
                                                disabled={loadingPlan === "price_1RyjZlJhPUBnWAMQl8BsyVEO"}
                                            >
                                                {loadingPlan === "price_1RyjZlJhPUBnWAMQl8BsyVEO" ? "Processing..." : "CHOOSE"}
                                            </button>
                                        )}
                                        <div className="mt-3 px-3">
                                            <p className="card-text roboto fs-6 fw-bold mb-1">Everything in the Mastery Tier plus:</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 5GB Per Upload Limit on Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 0% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Unlimited Course</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 px-3">
                                <p className="roboto font-14 fw-bold">Important Notices</p>
                                <div className="d-flex flex-column w-75 g-2 ">
                                    <p className="roboto font-14 fw-bold">* Virtual Pro Learn uses Stripe for all transactions. All course purchases are subject to the Stripe transaction fee and the Virtual Pro Learn transaction fee associated with the subscription level. The Stripe transaction fee is based on the original course purchase price and is 2.9% + $.30 per transaction.</p>
                                    <p className="roboto font-14 fw-bold">* The Virtual Pro Learn transaction fee is calculated based on the original course purchase price. Payouts through Stripe for courses purchased through the Virtual Pro Learn website typically complete within three(3) business days. Payout times may vary depending on the subscribers country of origin or financial institution.</p>
                                    <p className="roboto font-14 fw-bold">* When upgrading your subscription, you will be immediately charged the difference between tiers less any applicable proration subscription rates from a previous subscription. plus tax if applicable. Downgrading may provide a credit that will be applied to your monthly subscription until the credit is depleted. Cancellation or downgrading to the free subscription does not provide a refund.You may be asked to reconfirm your credit card information with exception to downgrading to a free account or cancellation of a subscription.</p>
                                    <p className="roboto font-14 fw-bold">* Tracking for video viewing times and completion statistics only applies to videos that have been uploaded and are hosted on the Virtual Pro Learn website. Tracking is not eligible for videos using embedded code or videos that are linked externally to third-party websites. Any additional questions can be sent to support@virtualprolearn.us.</p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                            <div className="row row-cols-1 row-cols-md-4 g-4">
                                <div className="col">
                                    <div className="card h-100 border-0">
                                        <div className="card-body">
                                            <h5 className="card-title roboto">STARTER <span className="text-purple">- Free</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">Freedom to Create</p>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text roboto fs-6 fw-bold mb-1">What's Included</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Easy to use, no code needed</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> All Creator Features Unlocked</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 250 Students Maximum</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Company Logo Branding</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Unlimited Discussion Forums</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Quizzes</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Image Uploader for Visual Layout</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Embed YouTube & Vimeo Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Video Uploader (300mb max per video)</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Audio Uploader</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Digital Downloads for Users</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Drag & Drop Module Organzier</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Full Student Management Access</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Tracking and Reporting of All Users</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Marketing Link to Attact New Users</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Automatic Payouts from Stripe</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 7% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 1 Course (published or unpublished)</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Free Customer Support</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Forever Access</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100 border-0">
                                        <div className="mt-3 px-3">
                                            <h5 className="roboto">GROWTH</h5>
                                            <p className="roboto text-secondary font-14 fw-bold">Growing Your Business</p>
                                        </div>
                                        <div className="mt-3 px-3">
                                            <h5 className="card-title roboto"><span className="fs-4 text-purple fw-bold">$278 Annually 20% Off</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">$29/MONTH</p>
                                        </div>
                                        {activePlan === "price_1RyjesJhPUBnWAMQKbLP0pAb" ? (
                                            <h5 className="card-title roboto text-purple fw-bold text-center mt-3">
                                                <i className="bi bi-check-circle text-purple"></i> Your current plan
                                            </h5>
                                        ) : (
                                            <button
                                                type="button"
                                                className="transact-his roboto fw-5 mx-2 mt-2 bg-transparent"
                                                onClick={() => handleGrowthSubscribe("price_1RyjesJhPUBnWAMQKbLP0pAb")}
                                                disabled={loadingPlan === "price_1RyjesJhPUBnWAMQKbLP0pAb"}
                                            >
                                                {loadingPlan === "price_1RyjesJhPUBnWAMQKbLP0pAb" ? "Processing..." : "CHOOSE"}
                                            </button>
                                        )}
                                        <div className="mt-3 px-3">
                                            <p className="card-text roboto fs-6 fw-bold mb-1">Everything in the Starter Tier plus:</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Unlimited Students</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 1GB Per Upload Limit on Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Bulk User Uploads</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 6% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 2 Published (active) Course</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100 bg-light-purple border-0">
                                        <div className="mt-3 px-3">
                                            <h5 className="roboto">MASTERY</h5>
                                            <p className="roboto text-secondary font-14 fw-bold">Mastering Your Courses</p>
                                        </div>
                                        <div className="mt-3 px-3">
                                            <h5 className="card-title roboto"><span className="fs-4 text-purple fw-bold">$758 Annually 20% Off</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">$79/MONTH</p>
                                        </div>
                                        {activePlan === "price_1Ryjf9JhPUBnWAMQBVYCw2yX" ? (
                                            <h5 className="card-title roboto text-purple fw-bold text-center mt-3">
                                                <i className="bi bi-check-circle text-purple"></i> Your current plan
                                            </h5>
                                        ) : (
                                            <button
                                                type="button"
                                                className="transact-his roboto fw-5 mx-2 mt-2 bg-transparent"
                                                onClick={() => handleGrowthSubscribe("price_1Ryjf9JhPUBnWAMQBVYCw2yX")}
                                                disabled={loadingPlan === "price_1Ryjf9JhPUBnWAMQBVYCw2yX"}
                                            >
                                                {loadingPlan === "price_1Ryjf9JhPUBnWAMQBVYCw2yX" ? "Processing..." : "CHOOSE"}
                                            </button>
                                        )}
                                        <div className="mt-3 px-3">
                                            <p className="card-text roboto fs-6 fw-bold mb-1">Everything in the Growth Tier plus:</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 3GB Per Upload Limit on Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 3% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 10 Published (active) Course</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100 border-0">
                                        <div className="mt-3 px-3">
                                            <h5 className="roboto">Mastery Plus</h5>
                                            <p className="roboto text-secondary font-14 fw-bold">Excelling at Training</p>
                                        </div>
                                        <div className="mt-3 px-3">
                                            <h5 className="card-title roboto"><span className="fs-4 text-purple fw-bold">$1238 Annually 20% Off</span></h5>
                                            <p className="card-text roboto text-secondary font-14 fw-bold">$129/MONTH</p>
                                        </div>
                                        {activePlan === "price_1RyjfRJhPUBnWAMQ25WY0sMN" ? (
                                            <h5 className="card-title roboto text-purple fw-bold text-center mt-3">
                                                <i className="bi bi-check-circle text-purple"></i> Your current plan
                                            </h5>
                                        ) : (
                                            <button
                                                type="button"
                                                className="transact-his roboto fw-5 mx-2 mt-2 bg-transparent"
                                                onClick={() => handleGrowthSubscribe("price_1RyjfRJhPUBnWAMQ25WY0sMN")}
                                                disabled={loadingPlan === "price_1RyjfRJhPUBnWAMQ25WY0sMN"}
                                            >
                                                {loadingPlan === "price_1RyjfRJhPUBnWAMQ25WY0sMN" ? "Processing..." : "CHOOSE"}
                                            </button>
                                        )}
                                        <div className="mt-3 px-3">
                                            <p className="card-text roboto fs-6 fw-bold mb-1">Everything in the Mastery Tier plus:</p>
                                            <div className="card-text roboto text-secondary font-14 ">
                                                <ul className="p-0 list-unstyled">
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 5GB Per Upload Limit on Videos</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> 0% Transaction Fees</li>
                                                    <li><i className="bi bi-check-lg text-dark fs-6 "></i> Unlimited Course</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 px-3">
                                <p className="roboto font-14 fw-bold">Important Notices</p>
                                <div className="d-flex flex-column w-75 g-2 ">
                                    <p className="roboto font-14 fw-bold">* Virtual Pro Learn uses Stripe for all transactions. All course purchases are subject to the Stripe transaction fee and the Virtual Pro Learn transaction fee associated with the subscription level. The Stripe transaction fee is based on the original course purchase price and is 2.9% + $.30 per transaction.</p>
                                    <p className="roboto font-14 fw-bold">* The Virtual Pro Learn transaction fee is calculated based on the original course purchase price. Payouts through Stripe for courses purchased through the Virtual Pro Learn website typically complete within three(3) business days. Payout times may vary depending on the subscribers country of origin or financial institution.</p>
                                    <p className="roboto font-14 fw-bold">* When upgrading your subscription, you will be immediately charged the difference between tiers less any applicable proration subscription rates from a previous subscription. plus tax if applicable. Downgrading may provide a credit that will be applied to your monthly subscription until the credit is depleted. Cancellation or downgrading to the free subscription does not provide a refund.You may be asked to reconfirm your credit card information with exception to downgrading to a free account or cancellation of a subscription.</p>
                                    <p className="roboto font-14 fw-bold">* Tracking for video viewing times and completion statistics only applies to videos that have been uploaded and are hosted on the Virtual Pro Learn website. Tracking is not eligible for videos using embedded code or videos that are linked externally to third-party websites. Any additional questions can be sent to support@virtualprolearn.us.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing