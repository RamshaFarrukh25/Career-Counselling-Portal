import Hero from "./Hero"
import BlogCards from "./BlogCards"
import Reviews from "./Reviews"
import Icon from "../assets/images/CareerGPT_Bot.gif"
import HomeCSS from "../assets/styles/Home.module.css"
import { Link } from "react-router-dom"
import {useSelector } from "react-redux"

export default function Home(){
    const {isLogin} = useSelector((store) => store.login)
    console.log(isLogin)
    return(
        <>
        <Hero />
        <BlogCards />
        <Reviews/>
        {isLogin == true && <Link 
          className={HomeCSS.openButton}
          to="careerGPT"
        >
            <img src={Icon} className={HomeCSS.botIcon}/>
        </Link>}
        {isLogin == null && <Link 
          className={HomeCSS.openButton}
          to="signup"
        >
            <img src={Icon} className={HomeCSS.botIcon}/>
        </Link>}
        </>
    )
}