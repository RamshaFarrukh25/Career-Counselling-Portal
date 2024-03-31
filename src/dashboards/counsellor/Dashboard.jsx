import DashboardCSS from "../../assets/styles/dashboards/counsellor_css/Dashboard.module.css"
import Reviews from "../../assets/images/Counsellor_Reviews.gif"
import Blogs from "../../assets/images/Counsellor_Blogs.png"
import Pending from "../../assets/images/Counsellor_pending.gif"
import { useDispatch, useSelector } from "react-redux"
import React from 'react'
import {getCounsellorCardsData} from "../../features/dashboards/counsellor/dashboardSlice"

export default function Dashboard(){
    const dispatch = useDispatch()
    const {approvedBlogs, pendingApprovalBlogs, averageRating} = useSelector((store) => store.counsellorDashboard)

    React.useEffect(() => {
        async function getCards() {
            await dispatch(getCounsellorCardsData())
        }
        getCards()
    }, [])
  
    return (
        <>
            <div className={` ${DashboardCSS.CardContainer}  container`}>
                <div className={`${DashboardCSS.alignMiddle}  row`}>
                    <div className={` ${DashboardCSS.column} col-md-6 col-lg-4 column`}>
                        <div className={`${DashboardCSS.card} ${DashboardCSS.gr1} `}>
                            <div className={DashboardCSS.txt}>
                                <img src={Reviews} className={DashboardCSS.reviewsImg}/>
                                <h1>Ratings Count: {averageRating}</h1>
                            </div>
                        </div>
                    </div>
                    <div className={` ${DashboardCSS.column} col-md-6 col-lg-4 column`}>
                        <div className={`${DashboardCSS.card} ${DashboardCSS.gr3} `}>
                            <div className={DashboardCSS.txt}>
                                <img src={Blogs} className={DashboardCSS.approvedblogsImg} />
                                <h1>Approved Blogs: {approvedBlogs}</h1>
                            </div>
                        </div>
                    </div>
                    <div className={` ${DashboardCSS.column} col-md-6 col-lg-4 column`}>
                        <div className={`${DashboardCSS.card} ${DashboardCSS.gr2} `}>
                            <div className={DashboardCSS.txt}>
                                <img src={Pending} className={DashboardCSS.disapprovedblogsImg}/>
                                <h1>Blogs Approval Pending: {pendingApprovalBlogs}</h1>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}