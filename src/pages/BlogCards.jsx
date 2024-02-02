import BlogCardsCSS from "../assets/styles/BlogCards.module.css"
import backgroundImage from "../assets/images/Blogs_BlogPic.jpg"
import { Link } from "react-router-dom"

export default function BlogCards(){
    return (
        <div id="blogCards" className={`${BlogCardsCSS.overAll} mt-5`}>
            <div className={`${BlogCardsCSS.mainHeading} text-center`}>
                <h1>Popular Blogs</h1>
            </div>
            <section className={BlogCardsCSS.cardsWrapper}>
                <div className={BlogCardsCSS.cardGridSpace}>
                    <Link 
                        className={BlogCardsCSS.card} 
                        href="#" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div>
                            <h1>Blog Title</h1>
                            <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
                            <div className={BlogCardsCSS.date}>Blog date</div>
                        </div>
                    </Link>
                </div>

                <div className={BlogCardsCSS.cardGridSpace}>
                    <Link
                        className={BlogCardsCSS.card} 
                        href="#" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div>
                            <h1>Blog Title</h1>
                            <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
                            <div className={BlogCardsCSS.date}>Blog date</div>
                        </div>
                    </Link>
                </div>

                <div className={BlogCardsCSS.cardGridSpace}>
                    <Link
                        className={BlogCardsCSS.card} 
                        href="#" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div>
                            <h1>Blog Title</h1>
                            <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
                            <div className={BlogCardsCSS.date}>Blog date</div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
  );
}