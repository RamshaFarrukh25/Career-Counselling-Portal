import HeroCSS from "../assets/styles/Hero.module.css"
import heroImage from "../assets/images/Hero_main.png"
import robot from "../assets/images/Hero_robot.svg"

export default function Hero(){
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
                        <button className={`btn  ${HeroCSS.loginButton} `}>Login/Register</button>
                        <h1 className={`card-title ${HeroCSS.cardTitle} mt-4`}>BotGuided Pathways</h1>
                        <p className={`card-text ${HeroCSS.cardText}`}>BotGuidedPathways is one of the kind career counseling system of Pakistan to facilitate youth and students in determining their career path and relevant education based on their personality.</p>
                        <button className={`btn  ${HeroCSS.chatButton}`}>Chat with CareerGPT <span><img src={robot} className={`${HeroCSS.robot}  mb-2`}  /></span> </button>                   
                    </div>
                    </div>
                </div>
            </section>
        </div>

    )
}