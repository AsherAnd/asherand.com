import CoverImages from "../assets/images";

function ComicCover(props) {
  return (
    <>
      <div className="comic-cover shine"></div>
      <img
        src={
          props.theme === "dark"
            ? CoverImages.BackgroundColorDark
            : CoverImages.BackgroundColorLight
        }
        alt="background color"
        className="comic-cover bg-color"
      />
      <img
        src={CoverImages.Background}
        alt="background"
        className="comic-cover bg"
      />
      <img
        src={
          props.theme === "dark"
            ? CoverImages.AsherDark
            : CoverImages.AsherLight
        }
        alt="Portrait of Asher Andargachew"
        className="comic-cover asher"
      />
      <img
        src={CoverImages.ComicsCode}
        alt="comicscode"
        className="comic-cover comics-code"
      />
      <img
        src={CoverImages.Issue}
        alt="issue number"
        className="comic-cover issue-no"
      />
      <img
        src={CoverImages.Plastic}
        alt="plastic"
        className="comic-cover plastic"
      />
    </>
  );
}

export default ComicCover;
