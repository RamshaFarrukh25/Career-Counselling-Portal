import BlogDetailsCSS from "../assets/styles/BlogDetail.module.css"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch,useSelector} from "react-redux"
import {blogDetails} from "../features/blogCards/blogDetailsSlice"

export default function BlogDetail(){
    const params = useParams()
    const dispatch = useDispatch()
    const {blogDetailsData} = useSelector(state => state.blogDetails);

    useEffect(() => {
        async function fetchDetail() {
            await dispatch(blogDetails(params.id))
        }
        fetchDetail()
     }, [])
    
    return (
       <>
       <main role="main" className= {BlogDetailsCSS.container}>
        <div className="row justify-content-center">
            <div className="col-md-8">
              
                <article className= {`${BlogDetailsCSS.article} mt-3`}>
                <h1 className={BlogDetailsCSS.mainHeading}><span className={`${BlogDetailsCSS.Blogtitle} me-2`}>Title:</span> {blogDetailsData.title}</h1>
                    <p className="lead"> </p>
                    <h4 className= {BlogDetailsCSS.mainHeading}><span className={`${BlogDetailsCSS.Blogtitle} me-2`}>Author:</span>
                        By {blogDetailsData.author_name}</h4>
                   
                    <hr className={BlogDetailsCSS.mainHR}/>
                    <p className={BlogDetailsCSS.date}>Posted on {blogDetailsData.created_at}</p>
                    <hr className={BlogDetailsCSS.mainHR}/>

                    <img className= {BlogDetailsCSS.BlogImageClass} src={`../../career_counselling_portal/Counsellors/${blogDetailsData.counsellor_email}/Blogs/${blogDetailsData.cover_image}`} alt="" />

                    <hr className={BlogDetailsCSS.mainHR}/>
                    <p className="lead" dangerouslySetInnerHTML={{ __html: blogDetailsData.description }}></p>
                   
                </article>
            </div>

            
        </div>
    </main>
       </>
    )
}