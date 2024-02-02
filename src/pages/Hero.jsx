import HeroCSS from "../assets/styles/Hero.module.css"
import heroImage from "../assets/images/Hero_main.png"
import robot from "../assets/images/Hero_robot.svg"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut} from "../features/login/loginSlice"

export default function Hero(){
    const {isLogin,role} = useSelector((store) => store.login)
    const dispatch = useDispatch()
    return (
        <div className={HeroCSS.hero}>
            <section className={`card ${HeroCSS.card} mt-5 `}>
                <div className={`row no-gutters ${HeroCSS.card__row}`}>
                    <div className={`col-md-6 ${HeroCSS.card__col}`}>
                    <div className={`card__image ${HeroCSS.cardImage} mt-5`}>
                        <img src={heroImage} alt="Career Guidance.pk" className={`img-fluid ${HeroCSS.card__image_img}`} />
                    </div>
                    </div>
                    <div className={`col-md-6 ${HeroCSS.card__col}`}>
                    <div className={`card__content ${HeroCSS.card__content}`}>
                        {isLogin== null && <Link to="signup" className={`btn ${HeroCSS.loginButton} `}>Login/Register</Link>}
                        <div className={` ${HeroCSS.BtnDiv} d-flex`}>
                           
                            {isLogin== true && role == 'A' && <Link to="admin" className={`btn ${HeroCSS.DashboardBtn}`}>Dashboard</Link>}
                            {isLogin== true && role == 'C' && <Link to="counsellor" className={`btn ${HeroCSS.DashboardBtn} `}>Dashboard</Link>}
                            {isLogin== true && role == 'B' && <Link to="counsellor" className={`btn ${HeroCSS.DashboardBtn} `}>Dashboard</Link>}
                            {isLogin== true && <Link to="." className={`btn  ${HeroCSS.DashboardBtn}
                             ${role=='U' ? HeroCSS.UserLogoutButton : ''}
                            `} onClick={(event)=>{
                            dispatch(logOut())
                            window.location.reload()
                            }}>Logout</Link>}
                           
                        </div>       
                        <h1 className={`card-title ${HeroCSS.cardTitle} mt-4`}>BotGuidedPathways</h1>
                        <p className={`card-text ${HeroCSS.cardText}`}>BotGuidedPathways is one of the kind career counseling system of Pakistan to facilitate youth and students in determining their career path and relevant education based on their personality.</p>
                        {isLogin== true && <Link to="careerGPT" className={`btn  ${HeroCSS.chatButton}`}>Chat with CareerGPT <span><img src={robot} className={`${HeroCSS.robot}  mb-2`}  /></span> </Link>}
                        {isLogin== false || isLogin == null && <Link to="signup" className={`btn  ${HeroCSS.chatButton}`}>Chat with CareerGPT <span><img src={robot} className={`${HeroCSS.robot}  mb-2`}  /></span> </Link>}                      
                    </div>
                    </div>
                </div>
            </section>
        </div>

    )
}