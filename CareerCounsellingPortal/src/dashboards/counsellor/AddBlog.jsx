import AddBlogCSS from "../../assets/styles/dashboards/counsellor_css/AddBlog.module.css"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit'
import JoditEditor from "jodit-react"
import React from "react"

export default function AddBlog(){
    const editor = React.useRef(null)
    const [content,setContent] = React.useState('')

    return (
        <>
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
                                name="blogTitle"
                                required
                                />
                            </div>
                            <h1 className={AddBlogCSS.heading}>Area of Field</h1>
                            <div className={AddBlogCSS.formHolder}>
                                <input
                                type="text"
                                className={AddBlogCSS.formControl}
                                placeholder="Area of Field"
                                name="field"
                                />
                            </div>
                            <h1 className={AddBlogCSS.heading}>Post Content</h1>
                            <div className={AddBlogCSS.editorContainer}>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                tabIndex={1}
                                onBlur={newContent => setContent(newContent)} 
                            />
                            </div>
                        </MDBCardBody>
                            <button className={AddBlogCSS.submitBtn}>
                                    <span>Add Blog</span>
                            </button>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}