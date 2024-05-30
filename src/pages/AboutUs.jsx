import AboutUsCSS from "../assets/styles/AboutUs.module.css"
import Image1 from "../assets/images/AboutUs_Image1.png"
import Gmail from "../assets/images/AboutUs_Gmail.png"
import Instagram from "../assets/images/AboutUs_Instagram.png"
import Twitter from "../assets/images/AboutUs_Twitter.png"
import Facebook from "../assets/images/AboutUs_Facebook.png"
import Team1 from "../assets/images/AboutUs_Team1.jpeg"
import Team2 from "../assets/images/AboutUs_Team2.jpeg"
import Team3 from "../assets/images/AboutUs_Team3.jpeg"
import Team4 from "../assets/images/AboutUs_Team4.jpeg"

export default function AboutUs(){
    return (
        <>
            <div className={`p-5 mt-5 ${AboutUsCSS.aboutContainer}`}>
                <div className="d-flex flex-row justify-content-center row">
                    <div className="col-md-6 m-auto">
                        <h1 className={AboutUsCSS.missionheading}>Our Mission</h1>
                        <p className={AboutUsCSS.missionDescription}>We are committed to offering comprehensive career guidance and counseling services through AI Chatbot technology. 
                        By embracing cutting-edge technology and collaborating with expert advisors, we aspire to facilitate informed decision-making, enabling individuals to navigate 
                        their career paths and achieve their professional aspirations.
                    </p> 
                    </div>
                    <div className={`col-md-6 ${AboutUsCSS.imageContainer}`}>
                        <img className={AboutUsCSS.missionImage} src={Image1} alt="AboutUs_Image" />
                    </div>
                </div>
            </div>

            {/* Our Team */}
            <div className={` mt-5 ${AboutUsCSS.headingDiv}`}>
                <h1 className={AboutUsCSS.mainHeading}>Our Team</h1>
            </div>

            <div className={`${AboutUsCSS.cardsContainer} container`}>
                <div className="row">
                    <div className={`col-sm-6 col-lg-3 ${AboutUsCSS.teamCards}`}>
                        <div className={AboutUsCSS.team}>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.frontFace}`}>
                                <img src={Team1} alt="TeamMember1" className={AboutUsCSS.profile} />
                                <div className={`mt-3 text-uppercase ${AboutUsCSS.name}`}>
                                    Ramsha Farrukh
                                </div>
                                <div className={AboutUsCSS.designation}>Team Leader</div>
                            </div>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.backFace}`}>
                                <span className={AboutUsCSS.iconsLeft}><i className="fa-solid fa-quote-left"></i></span>
                                <div className={AboutUsCSS.testimonial}>
                                Excels in management, ensuring smooth project execution through task division. A Full Stack development enthusiast, she combines leadership with technical expertise.
                                    <p className={AboutUsCSS.socialIcons}>
                                        <a href="#"><span className={AboutUsCSS.linkedIn}><i class="fa-brands fa-linkedin"></i></span></a>
                                        <a href="#"><span className={AboutUsCSS.gitHub}><i class="fa-brands fa-github"></i></span></a>
                                    </p>
                                </div>
                                <span className={AboutUsCSS.iconsRight}><i className="fa-solid fa-quote-right"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-6 col-lg-3 ${AboutUsCSS.teamCards}`}>
                        <div className={AboutUsCSS.team}>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.frontFace}`}>
                                <img src={Team2} alt="TeamMember1" className={AboutUsCSS.profile} />
                                <div className={`mt-3 text-uppercase ${AboutUsCSS.name}`}>
                                    Laiba Tariq
                                </div>
                                <div className={AboutUsCSS.designation}>Web Developer</div>
                            </div>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.backFace}`}>
                                <span className={AboutUsCSS.iconsLeft}><i className="fa-solid fa-quote-left"></i></span>
                                <div className={AboutUsCSS.testimonial}>
                                Passionate about coding conventions, excels in both front-end and back-end development. Stays relaxed under pressure, ensuring quality work.
                                    <p className={AboutUsCSS.socialIcons}>
                                        <a href="#"><span className={AboutUsCSS.linkedIn}><i class="fa-brands fa-linkedin"></i></span></a>
                                        <a href="#"><span className={AboutUsCSS.gitHub}><i class="fa-brands fa-github"></i></span></a>
                                    </p>
                                </div>
                                <span className={AboutUsCSS.iconsRight}><i className="fa-solid fa-quote-right"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-6 col-lg-3 ${AboutUsCSS.teamCards}`}>
                        <div className={AboutUsCSS.team}>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.frontFace}`}>
                                <img src={Team3} alt="TeamMember1" className={AboutUsCSS.profile} />
                                <div className={`mt-3 text-uppercase ${AboutUsCSS.name}`}>
                                    Mehak Nadeem
                                </div>
                                <div className={AboutUsCSS.designation}>Web Developer</div>
                            </div>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.backFace}`}>
                                <span className={AboutUsCSS.iconsLeft}><i className="fa-solid fa-quote-left"></i></span>
                                <div className={AboutUsCSS.testimonial}>
                                Enthusiastic about finding new tools to simplify workflows, a motivated backend development specialist who consistently delivers high-quality work.
                                    <p className={AboutUsCSS.socialIcons}>
                                        <a href="#"><span className={AboutUsCSS.linkedIn}><i class="fa-brands fa-linkedin"></i></span></a>
                                        <a href="#"><span className={AboutUsCSS.gitHub}><i class="fa-brands fa-github"></i></span></a>
                                    </p>
                                </div>
                                <span className={AboutUsCSS.iconsRight}><i className="fa-solid fa-quote-right"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-6 col-lg-3 ${AboutUsCSS.teamCards}`}>
                        <div className={AboutUsCSS.team}>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.frontFace}`}>
                                <img src={Team4} alt="TeamMember1" className={AboutUsCSS.profile} />
                                <div className={`mt-3 text-uppercase ${AboutUsCSS.name}`}>
                                    Hira Khan
                                </div>
                                <div className={AboutUsCSS.designation}>Web Developer</div>
                            </div>
                            <div className={`${AboutUsCSS.face} ${AboutUsCSS.backFace}`}>
                                <span className={AboutUsCSS.iconsLeft}><i className="fa-solid fa-quote-left"></i></span>
                                <div className={AboutUsCSS.testimonial}>
                                Expert in browser searching, excels at finding solutions to project challenges. Always eager to learn something new.
                                    <p className={AboutUsCSS.socialIcons}>
                                        <a href="#"><span className={AboutUsCSS.linkedIn}><i class="fa-brands fa-linkedin"></i></span></a>
                                        <a href="#"><span className={AboutUsCSS.gitHub}><i class="fa-brands fa-github"></i></span></a>
                                    </p>
                                </div>
                                <span className={AboutUsCSS.iconsRight}><i className="fa-solid fa-quote-right"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className={AboutUsCSS.headingDiv}>
                <h1 className={AboutUsCSS.mainHeading}>Get in touch with us</h1>
            </div>
            <div className={`${AboutUsCSS.contactContainer}`}>
                <div className="row">
                    <div className="col-md-12">
						<div className="text-center">
			        		<div className={AboutUsCSS.icons}>
                                <a href="#"><img src={Gmail} alt="Gmail_icon" /></a>
			        		</div>
				        </div>
                    </div>     
                </div>
                <div className="row">
                    <div className="col-md-12">
						<div className="text-center">
			        		<div className={AboutUsCSS.icons}>
                                <a href="#"><img src={Instagram} alt="Instagram_icon" /></a>
			        		</div>
				        </div>
                    </div>     
                </div>
                <div className="row">
                    <div className="col-md-12">
						<div className="text-center">
			        		<div className={AboutUsCSS.icons}>
                                <a href="#"><img src={Twitter} alt="Twitter_icon" /></a>
			        		</div>
				        </div>
                    </div>     
                </div>
                <div className="row">
                    <div className="col-md-12">
						<div className="text-center">
			        		<div className={AboutUsCSS.icons}>
                                <a href="#"><img src={Facebook} alt="Facebook_icon" /></a>
			        		</div>
				        </div>
                    </div>     
                </div>
            </div>
        </>
    )
}