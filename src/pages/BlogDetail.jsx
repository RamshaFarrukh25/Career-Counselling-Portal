import BlogDetailsCSS from "../assets/styles/BlogDetail.module.css"
import BlogImage from "../assets/images/BlogDetail_Image.jpg"
export default function BlogDetail(){
    return (
       <>
       <main role="main" className= {BlogDetailsCSS.container}>
        <div className="row justify-content-center">
            <div className="col-md-8">
              
                <article className= {`${BlogDetailsCSS.article} mt-3`}>
                <h1 className={BlogDetailsCSS.mainHeading}>Computer Science</h1>
                    <p className="lead">
                    <h4 className= {BlogDetailsCSS.author}> By Hira Asghar</h4>
                    </p>
                    <hr className={BlogDetailsCSS.mainHR}/>
                    <p className={BlogDetailsCSS.date}>Posted on January 1, 2023 at 12:00 PM</p>
                    <hr className={BlogDetailsCSS.mainHR}/>

                    <img className= {BlogDetailsCSS.BlogImageClass} src={BlogImage} alt="" />

                    <hr className={BlogDetailsCSS.mainHR}/>
                 
                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati,
                        aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos
                        magni recusandae laborum minus inventore?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum
                        quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat.
                        Temporibus, voluptatibus.</p>
                    <blockquote className="blockquote">
                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                            ante.</p>
                    </blockquote>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi,
                        ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima
                        ab quo voluptatem obcaecati?</p>
                    <hr className={BlogDetailsCSS.mainHR}/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi,
                        ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima
                        ab quo voluptatem obcaecati?</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi,
                        ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima
                        ab quo voluptatem obcaecati?</p>
                </article>
            </div>

            
        </div>
    </main>
       </>
    )
}