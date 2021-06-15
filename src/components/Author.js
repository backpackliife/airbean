import picture from "../assets/author.jpg";
import "./Author.scss";

export function Author() {
  return (
    <div className="author">
      <img src={picture} alt="Author" />
      <div className="name">Sofie Kihlström</div>
      <div className="title">VD & Grundare</div>
    </div>
  );
}
