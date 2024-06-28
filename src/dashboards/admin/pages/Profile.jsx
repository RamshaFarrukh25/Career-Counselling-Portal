import ProfileCSS from "../../../assets/styles/dashboards/admin_css/Profile.module.css"
import Avatar from "../../../assets/images/Admin.jpg"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { 
  handleChange, 
  clearForm,
  matchPasswords,
  getAdminProfile,
  updateAdminProfile
} from "../../../features/dashboards/admin/profile/profileSlice"


export default function Profile() {
  const dispatch = useDispatch()
  const { profileForm, passwordMatch} = useSelector((store) => store.profile)

  useEffect(() => {
    return () => {
      dispatch(getAdminProfile())
    }
  }, [])

  return (
    <div className={ProfileCSS.wrapper}>
        <div className={`${ProfileCSS.inner} container`}>
            <div className="row">
                <div className={`col-md-4 col-sm-12 ${ProfileCSS.form}`}>
                    <img src={Avatar} className={`rounded-circle mb-3 ${ProfileCSS.avatarImage}`} alt="Avatar" />
                    <h5 className={`mb-2 text-center`}><strong>{profileForm.name}</strong></h5>
                    {/* <h5><span className={`badge bg-primary mx-4`}>Admin</span></h5> */}
                </div>

                <div className={`${ProfileCSS.form} col-md-8 col-sm-12`}>
                    <form
                     onSubmit={(event) => { 
                        event.preventDefault()
                        dispatch(updateAdminProfile({'profileForm' : profileForm}))
                        dispatch(clearForm())
                      }} 
                    >
                <div className={ProfileCSS.formHolder}>
                    <span>
                        <i className="fa-regular fa-user"></i>
                    </span>
                    <input
                        type="text"
                        className={ProfileCSS.formControl}
                        placeholder="Name"
                        name="name"
                        value={profileForm.name}
                        onChange={(event) =>
                            dispatch(
                              handleChange({
                                name: event.target.name,
                                value: event.target.value,
                              })
                            )
                        }
                        required
                    />
                </div>

                <div className={ProfileCSS.formHolder}>
                    <span>
                        <i className="fa-regular fa-envelope"></i>
                    </span>
                    <input
                        type="email"
                        className={ProfileCSS.formControl}
                        value={profileForm.email}
                        name="email"
                        placeholder="Email"
                        onChange={(event) =>
                            dispatch(
                              handleChange({
                                name: event.target.name,
                                value: event.target.value,
                              })
                            )
                        }
                        readOnly
                    />
                </div>
                
                <div className={ProfileCSS.formHolder}>
                    <span>
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                        type="password"
                        className={`${ProfileCSS.formControl} ${ProfileCSS[passwordMatch]}`}
                        placeholder="Password"
                        name="password"
                        value={profileForm.password}
                        onChange={(event) =>
                            dispatch(
                              handleChange({
                                name: event.target.name,
                                value: event.target.value,
                              })
                            )
                          }
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        required
                    />
                </div>

                <div className={ProfileCSS.formHolder}>
                    <span>
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                        type="password"
                        className={`${ProfileCSS.formControl} ${ProfileCSS[passwordMatch]}`}
                        placeholder="Confirm Password"
                        value={profileForm.confirmPassword}
                        name="confirmPassword"
                        onChange={(event) =>
                            dispatch(
                                handleChange({
                                    name: event.target.name,
                                    value: event.target.value,
                                })
                            )
                        }
                        onMouseOut={(event) => dispatch(matchPasswords())}
                        required
                    />
                </div>

                <button 
                    className={ProfileCSS.updateBtn}
                >
                    <span>Update Profile</span>
                </button>
            </form>
            </div>
            </div>
        </div>
    </div>
  )
}
