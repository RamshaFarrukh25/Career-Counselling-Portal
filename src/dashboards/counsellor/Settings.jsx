import SettingsCSS from "../../assets/styles/dashboards/counsellor_css/Settings.module.css"
import Loading from "../../assets/images/Loading.gif"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import React from 'react'
import { 
  handleChange,  
  matchPasswords,
  getCounsellorSettings,
  updateCounsellorSettings
} from "../../features/dashboards/counsellor/settingsSlice"


export default function Settings() {
   const params = useParams()
  const dispatch = useDispatch()
  const { settings, passwordMatch, isLoading } = useSelector((store) => store.settings)
  const [pic, setPic] = React.useState(null)
  const [picURL, setPicURL] = React.useState(null)
  const formData = new FormData()

  React.useEffect(() => {
    async function getSettings () {
        await dispatch(getCounsellorSettings())
    }
    getSettings()
  }, [])

  function handleImage(fileObj){
    setPicURL(URL.createObjectURL(fileObj))
    setPic(fileObj)
  }

  return (
    <div className={SettingsCSS.wrapper}>
        <div className={`${SettingsCSS.inner} container`}>
            <div className="row">
                <div className={`col-md-4 col-sm-12 ${SettingsCSS.form}`}>
                    {!picURL && <img src={`../../../career_counselling_portal/Counsellors/${settings.email}${settings.profilePic}`} className={`rounded-circle mb-3 ${SettingsCSS.avatarImage}`} alt="Avatar" />}
                    {picURL && <img src={picURL} className={`rounded-circle mb-3 ${SettingsCSS.avatarImage}`} alt="Avatar" />}
                    <input 
                        type="file" 
                        name="pic" 
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(event) => {
                            handleImage(event.target.files[0])
                        }}
                    />
                </div>
                
                <div className={`${SettingsCSS.form} col-md-8 col-sm-12`}>
                    <form
                     onSubmit={async (event) => { 
                        event.preventDefault()
                        if(passwordMatch === "passwordError"){
                            return
                        }
                        else {
                            formData.append('phoneNo', settings.phoneNo)
                            formData.append('profilePic', pic)
                            if(settings.password !== "")
                            {
                                formData.append('password', settings.password)
                            }
                            await dispatch(updateCounsellorSettings(formData))
                            window.location.reload()
                        }
                      }} 
                    >

                <div className={SettingsCSS.formHolder}>
                    <span>
                        <i className="fa-regular fa-envelope"></i>
                    </span>
                    <input
                        type="email"
                        className={SettingsCSS.formControl}
                        value={settings.email}
                        name="email"
                        placeholder="Email"
                        readOnly
                    />
                </div>

                <div className={SettingsCSS.formHolder}>
                    <span>
                        <i className="fa-solid fa-phone"></i>
                    </span>
                    <input
                        type="tel"
                        className={SettingsCSS.formControl}
                        placeholder="Phone Number"
                        pattern="\+\d{1,4}-\d{1,10}"
                        title="Enter a valid phone number in the format: +92-number (e.g., +92-123456789)"
                        name="phoneNo"
                        value={settings.phoneNo}
                        onChange={(event) => {
                            const enteredNumber = event.target.value.replace(/\+\d{1,4}-/, '');
                            const limitedNumber = enteredNumber.slice(0, 10);
                            dispatch(
                              handleChange({
                                name: event.target.name,
                                value: `+92-${limitedNumber}`,
                              })
                            )
                        }}
                    />
                </div>
                
                <div className={SettingsCSS.formHolder}>
                    <span>
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                        type="password"
                        className={`${SettingsCSS.formControl} ${SettingsCSS[passwordMatch]}`}
                        placeholder="Password"
                        name="password"
                        value={settings.password}
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
                        
                    />
                </div>

                <div className={SettingsCSS.formHolder}>
                    <span>
                        <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                        type="password"
                        className={`${SettingsCSS.formControl} ${SettingsCSS[passwordMatch]}`}
                        placeholder="Confirm Password"
                        value={settings.confirmPassword}
                        name="confirmPassword"
                        onChange={(event) =>
                            dispatch(
                                handleChange({
                                    name: event.target.name,
                                    value: event.target.value,
                                })
                            )
                        }
                        onKeyUp={(event) => dispatch(matchPasswords())}
                        
                    />
                </div>

                <button 
                    className={SettingsCSS.updateBtn}
                    disabled={isLoading && true}
                >
                    <span>Update Profile</span>
                </button>
                { isLoading && 
                    <div className={SettingsCSS.loadingDiv}>
                        <img src={Loading} className={SettingsCSS.loading} alt="loading"/>
                    </div>
                }
                {isLoading==false && <p className={SettingsCSS.success}>Settings Updated Successfully!</p>}
            </form>
            
            </div>
            </div>
        </div>
    </div>
  )
}
