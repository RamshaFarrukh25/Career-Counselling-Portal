import BlogDetailsCSS from "../assets/styles/BlogDetail.module.css"
import BlogImage from "../assets/images/BlogDetail_Image.jpg"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch,useSelector} from "react-redux"
import {blogDetails} from "../features/blogCards/blogDetailsSlice"

export default function BlogDetail(){
    const params = useParams()
    const dispatch = useDispatch()
    const {blogDetailsData} = useSelector(state => state.blogDetails);

    useEffect(() => {
        dispatch(blogDetails(params.id))
     }, [])
    return (
       <>
       <main role="main" className= {BlogDetailsCSS.container}>
        <div className="row justify-content-center">
            <div className="col-md-8">
              
                <article className= {`${BlogDetailsCSS.article} mt-3`}>
                <h1 className={BlogDetailsCSS.mainHeading}>{blogDetailsData.title}</h1>
                    <p className="lead">
                    <h4 className= {BlogDetailsCSS.author}>By {blogDetailsData.author_name}</h4>
                    </p>
                    <hr className={BlogDetailsCSS.mainHR}/>
                    <p className={BlogDetailsCSS.date}>Posted on {blogDetailsData.created_at}</p>
                    <hr className={BlogDetailsCSS.mainHR}/>

                    <img className= {BlogDetailsCSS.BlogImageClass} src={BlogImage} alt="" />

                    <hr className={BlogDetailsCSS.mainHR}/>

<<<<<<< Updated upstream:CareerCounsellingPortal/src/pages/BlogDetail.jsx
                    <p className="lead">{blogDetailsData.description}</p>
=======
                    <pre className="lead">{blogDetailsData.description}</pre>
>>>>>>> Stashed changes:src/pages/BlogDetail.jsx
                    {/* <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati,
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
    ab quo voluptatem obcaecati?</p> */}
                </article>
            </div>

            
        </div>
    </main>
       </>
    )
}