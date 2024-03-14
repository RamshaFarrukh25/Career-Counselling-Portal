import AddBlogCSS from "../../assets/styles/dashboards/counsellor_css/AddBlog.module.css"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit'
import JoditEditor from "jodit-react"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getBlogDetails, handleChange, setDescription,addBlogData, editBlogData, clearForm, showErrorMsg } from "../../features/dashboards/counsellor/addBlogSlice"
import { useParams } from "react-router-dom"


export default function AddBlog() {
    const params = useParams()
    const editor = React.useRef(null)
    const dispatch = useDispatch()
    const {addBlog, errorMsg,user_email} = useSelector((store) => store.addBlog)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formData = new FormData()

    const handleAddBlog = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(addBlog.description, "text/html");
            const textContent = htmlDoc.body.innerHTML;
            dispatch(setDescription({ 'description': textContent }))
            formData.append('addBlogData', JSON.stringify(addBlog))
            formData.append('cover_image', coverImage)
            if(!params.id) {
                await dispatch(addBlogData(formData))
            } else {
                formData.append('blogId', params.id)
                await dispatch(editBlogData(formData))
            }
        } catch (error) {
            console.error("Error adding blog:", error);
            setIsSubmitting(false);
        }
    }

    const [coverImage, setCoverImage] = React.useState(null)
    const [coverImageURL, setCoverImageURL] = React.useState(null)

    function handleImage(fileObj){
        setCoverImageURL(URL.createObjectURL(fileObj))
        setCoverImage(fileObj)
    }

    useEffect(() => {
        return () => {
            dispatch(clearForm())
        }
    }, [dispatch, params.id])

    useEffect(() => {
        if(params.id){
            async function fetchDetail() {
                await dispatch(getBlogDetails(params.id))
            }
            fetchDetail()
        }
    }, [params.id])

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    if(errorMsg === ""){
                        handleAddBlog();
                    }
                }}
            >
                <MDBContainer>
                    <MDBRow>
                        <MDBCol lg="12">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <h1 className={AddBlogCSS.heading}>Blog Title</h1>
                                    <div className={AddBlogCSS.formHolder}>
                                        <input
                                            type="text"
                                            className={AddBlogCSS.formControl}
                                            placeholder="Blog Title"
                                            name="title"
                                            value={addBlog.title}
                                            onChange={(event) => {
                                                dispatch(handleChange({
                                                    name: event.target.name,
                                                    value: event.target.value
                                                }))
                                            }}
                                            required
                                        />
                                    </div>

                                    <h1 className={AddBlogCSS.heading}>Area of Field</h1>
                                    <div className={AddBlogCSS.formHolder}>
                                        <input
                                            type="text"
                                            className={AddBlogCSS.formControl}
                                            placeholder="Area of Field"
                                            name="area_of_field"
                                            value={addBlog.area_of_field}
                                            onChange={(event) => {
                                                dispatch(handleChange({
                                                    name: event.target.name,
                                                    value: event.target.value
                                                }))
                                            }}
                                            required
                                        />
                                    </div>

                                    <h1 className={AddBlogCSS.heading}>Cover Image</h1>
                                    <div className={AddBlogCSS.formHolder}>
                                        <input
                                            type="file"
                                            className={AddBlogCSS.formControl}
                                            name="cover_image"
                                            onChange={(event) => {
                                                handleImage(event.target.files[0])
                                            }}
                                        />
                                    </div>
                                    {coverImageURL && 
                                        <div className={AddBlogCSS.coverImageDiv}>
                                            <img src={coverImageURL} className={AddBlogCSS.coverImage} alt="cover_image"/>
                                        </div>
                                    }
                                    {!coverImageURL && params.id &&
                                        <div className={AddBlogCSS.coverImageDiv}>
                                            <img src={`../../../career_counselling_portal/Counsellors/${user_email}/Blogs${addBlog.cover_image}`}
                                                className={AddBlogCSS.coverImage} 
                                                alt="cover_image"
                                            />
                                        </div>
                                    }
                                    <h1 className={AddBlogCSS.heading}>Post Content</h1>
                                    <div className={AddBlogCSS.editorContainer}>
                                        <JoditEditor
                                            ref={editor}
                                            value={addBlog.description}
                                            tabIndex={1}
                                            onBlur={(newContent) => {
                                                dispatch(handleChange({ name: "description", value: newContent }));
                                            }}
                                        />
                                    </div>
                                </MDBCardBody>
                                {!params.id && 
                                <button className={AddBlogCSS.submitBtn} disabled={isSubmitting}
                                    onClick={(event) => {
                                        if(!params.id  && !coverImage){
                                            dispatch(showErrorMsg({
                                                error: "Please fill all the required details"
                                            }))
                                        } else {
                                            dispatch(showErrorMsg({
                                                error: ""
                                            }))
                                        }
                                    }}
                                >
                                    <span>Add Blog</span>
                                </button>}
                                {params.id && <button className={AddBlogCSS.submitBtn} disabled={isSubmitting}>
                                    <span>Edit Blog</span>
                                </button>}
                                {isSubmitting && <div className={`mt-2 text-center mb-3 ${AddBlogCSS.successMsg}`}>Saved Successfully</div>}
                                {errorMsg != "" && <p className={`mt-2 text-center mb-3 ${AddBlogCSS.errorMsg}`}>{errorMsg}</p>}
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>

        </>
    )
}
