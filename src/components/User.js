import picture from "../assets/profile.png";
import "./User.scss";

export function User(props) {
  return (
    <div className="user">
      <img src={picture} alt="User" />
      <div className="name">{props.username}</div>
      <div className="title">{props.email}</div>
    </div>
  );
}
