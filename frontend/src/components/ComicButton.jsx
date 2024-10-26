import "../styles/components/comicbtn.css"

export default function ComicButton(props) {
    return (
        <div className="comic-btn">
            <button className="btn" onClick={props.onClick}>Get in touch</button>
        </div>
    );
  }
  