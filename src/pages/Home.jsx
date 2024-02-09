import Hero from "./Hero"
import BlogCards from "./BlogCards"
import Reviews from "./Reviews"
import Icon from "../assets/images/CareerGPT_Bot.gif"
import HomeCSS from "../assets/styles/Home.module.css"
import { Link } from "react-router-dom"


export default function Home(){
    return(
        <>
        <Hero />
        <BlogCards />
        <Reviews/>
        <Link 
          className={HomeCSS.openButton}
          to="careerGPT"
        >
            <img src={Icon} className={HomeCSS.botIcon}/>

        </Link>
        </>
    )
}