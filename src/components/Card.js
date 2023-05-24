import "./Card.css";
import { Link } from "react-router-dom";
import SaveButton from "./SaveButton";

function Card({ content }) {
  function convertDate(dateStrStart, dateStrEnd) {
    const dateStart = new Date(dateStrStart);
    const dateEnd = new Date(dateStrEnd);
    const dayStart = dateStart.getDay();
    const dayEnd = dateEnd.getDay();
    const options1 = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const options2 = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    if (dayStart === dayEnd) {
      return `Le ${dateStart
        .toLocaleDateString("fr-FR", options1)
        .replace(" ", " à ")}`;
    } else if (dayStart + 1 === dayEnd) {
      return `Les ${dateStart.toLocaleString(
        "fr-FR",
        options2
      )} et ${dateEnd.toLocaleString("fr-FR", options2)}`;
    } else {
      return `Du ${dateStart.toLocaleString(
        "fr-FR",
        options2
      )} au ${dateEnd.toLocaleString("fr-FR", options2)}`;
    }
  }

  function truncateDesc(description, maxLength) {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    } else {
      return description;
    }
  }

  const formattedDate = convertDate(
    content.fields.date_start,
    content.fields.date_end
  );

  const truncatedDesc = truncateDesc(content.fields.lead_text, 200);

  return (
    <div className="card mb-3 w-100 mx-auto shadow shadow-sm bg-info bg-opacity-10">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={content.fields.cover_url}
            className={`img-fluid card-cover ${
              window.innerWidth < 768 ? "rounded-top" : "rounded-start"
            }`}
            alt={content.fields.cover_alt}
          />
        </div>
        <div className="col-md-8 my-auto">
          <div className="card-body">
            <h5 className="card-title fw-semibold">{content.fields.title}</h5>
            {content.fields.date_start && (
              <p className="card-subtitle mb-2 fw-semibold text-theme">
                {formattedDate}
              </p>
            )}
            <p className="card-text">{truncatedDesc}</p>
            <div className="d-flex flex-row">
              <Link
                to={`/event/${content.id}`}
                className="btn btn-info custom-info me-2 stretched-link"
              >
                Voir plus
              </Link>
              <div className="btn-over-stretched">
                <SaveButton id={content.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
