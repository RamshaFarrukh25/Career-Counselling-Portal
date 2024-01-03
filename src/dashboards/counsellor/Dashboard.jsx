import DashboardCSS from "../../assets/styles/dashboards/counsellor_css/Dashboard.module.css"
import Reviews from "../../assets/images/Counsellor_Reviews.gif"
import Blogs from "../../assets/images/Counsellor_Blogs.png"
import Unapproved from "../../assets/images/Counsellor_Unapproved.png"

export default function Dashboard(){
    return (
        <>
            <div className={` ${DashboardCSS.CardContainer}  container`}>
                <div className={`${DashboardCSS.alignMiddle}  row`}>
                    <div className={` ${DashboardCSS.column} col-md-6 col-lg-4 column`}>
                        <div className={`${DashboardCSS.card} ${DashboardCSS.gr1} `}>
                            <div className={DashboardCSS.txt}>
                                <img src={Reviews} className={DashboardCSS.reviewsImg}/>
                                <h1>Ratings Count: 50</h1>
                            </div>
                        </div>
                    </div>
                    <div className={` ${DashboardCSS.column} col-md-6 col-lg-4 column`}>
                        <div className={`${DashboardCSS.card} ${DashboardCSS.gr3} `}>
                            <div className={DashboardCSS.txt}>
                                <img src={Blogs} className={DashboardCSS.approvedblogsImg} />
                                <h1>Approved Blogs: 50</h1>
                            </div>
                        </div>
                    </div>
                    <div className={` ${DashboardCSS.column} col-md-6 col-lg-4 column`}>
                        <div className={`${DashboardCSS.card} ${DashboardCSS.gr2} `}>
                            <div className={DashboardCSS.txt}>
                                <img src={Unapproved} className={DashboardCSS.disapprovedblogsImg}/>
                                <h1>Unapproved Blogs: 50</h1>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}