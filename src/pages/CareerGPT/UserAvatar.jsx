import User from "../../assets/images/CareerGPT_User.png"
import "./styles/UserAvatar.css"

export default function UserAvatar(){
    return (
        <>
            <div>
                <img className="userAvatar" src={User} alt="User"/>
            </div>
        </>
    )
}