import BotAvatar from "../../assets/images/CareerGPT_Bot.gif"
import "./styles/CareerGPTAvatar.css"

export default function CareerGPTAvatar(){
    return (
        <>
            <div className="avatarContainer">
                <img className="avatarRobot" src={BotAvatar} alt="Bot"/>
            </div>
        </>
    )
}