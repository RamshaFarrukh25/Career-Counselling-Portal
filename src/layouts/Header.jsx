import HeaderCSS from "../assets/styles/Header.module.css"
import { Link} from "react-router-dom"
import { handleModelChange,resetCount,ErrorMsg } from "../features/offerCounselling/offerCounsellingSlice"
import { useDispatch } from "react-redux"

export default function Header(){
   const dispatch = useDispatch()
  return (
    <header className={HeaderCSS.header}>
        <nav className={` ${HeaderCSS.navigation} navbar navbar-expand-lg`}>
            <div className="container-fluid d-flex flex-column">
                <div className="container-fluid d-flex align-items-center justify-content-center">
                    <Link className={`${HeaderCSS.navbarBrand} navbar-brand`} to=".">
                        <h1 className={`${HeaderCSS.logoHeading} mt-2`}> ▂▃▅▇█▓▒░ BotGuidedPathways ░▒▓█▇▅▃▂</h1>
                    </Link>
                    <button className={` ${HeaderCSS.navbbarToggler} navbar-toggler ms-auto`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>   

                <div className={` ${HeaderCSS.navbarCollapse} navbar-collapse collapse`} id="navbarNav">
                    <ul className={` ${HeaderCSS.navbarNav} navbar-nav ms-auto d-flex align-items-center`}>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link to="." className={`${HeaderCSS.navLink} nav-link`}  >Home</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link to="askCounsellor" className={`${HeaderCSS.navLink} nav-link`}  >Ask Counsellor</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link to="OfferCounselling" className={`${HeaderCSS.navLink} nav-link`}
                            onClick={(event)=>{
                                dispatch(handleModelChange())
                                dispatch(resetCount())
                                dispatch(ErrorMsg({
                                    msg:''
                                }))
                            }}
                            >Offer Counselling</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <Link className={`${HeaderCSS.navLink} nav-link`}  to="about">About Us</Link>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <a href="#blogCards" className={`${HeaderCSS.navLink} nav-link`}>Blogs</a>
                        </li>
                        <li className={`${HeaderCSS.navItem} nav-item`}>
                            <a href="#reviews" className={`${HeaderCSS.navLink} nav-link`}>Reviews</a>
                        </li>
                         
                    </ul>
                </div>
            </div>
        </nav>      
    </header>
  )
}
