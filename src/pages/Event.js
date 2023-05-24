import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import SaveButton from "../components/SaveButton";
import "./Event.css";

function Event() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if ("error_code" in result) setError(result.message);
          setItem(result.record.fields);
        },
        (error) => {
          setIsLoaded(true);
          setError(error.message);
        }
      );
  }, [id]);

  return (
    <div className="row mb-4">
      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      <h1 className="text-theme">{item.title}</h1>
      <hr />
      <div className="col-12 col-md-8 col-lg-9">
        <div className="w-100 d-flex flex-column">
          {item.tags && (
            <p className="text-center fs-5 fw-semibold text-theme">
              {item.tags.join(" \u2014 ")}
            </p>
          )}
          {item.cover_url && (
            <img
              src={item.cover_url}
              className="mb-2 event-img rounded-2 mx-auto shadow"
              alt={item.cover_alt}
            />
          )}
        </div>
        {item.cover_credit && (
          <p className="fst-italic text-secondary text-center">
            Crédit : {item.cover_credit}
          </p>
        )}
        <p className="fs-5 fw-semibold">{item.lead_text}</p>
        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
      </div>
      <div className="col-12 col-md-4 col-lg-3 rounded-2 shadow bg-info bg-opacity-10">
        <div className="d-grid py-3">
          <SaveButton className="" id={id} />
        </div>
        {item.date_description && (
          <div>
            <p className="fs-5 fw-semibold mb-1">
              <i className="me-1 bi bi-calendar"></i>Quand ?
            </p>
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: item.date_description }}
            ></div>
          </div>
        )}
        {item.audience && (
          <div className="mb-3">
            <p className="fs-5 fw-semibold mb-1">
              <i className="me-1 bi bi-people"></i>Audience :
            </p>
            <p>{item.audience}</p>
          </div>
        )}
        <div>
          {item.price_type &&
            item.price_type === "payant" &&
            item.price_detail !== null && (
              <p className="fs-5 fw-semibold mb-1">
                <i className="me-1bi bi-currency-euro"></i>Tarif :
              </p>
            )}
          {item.price_type &&
            item.price_type === "payant" &&
            item.price_detail == null && (
              <p className="fs-5 fw-semibold mb-3">
                <i className="me-1bi bi-currency-euro"></i>Payant
              </p>
            )}
          {item.price_type && item.price_type === "gratuit" && (
            <p className="fs-5 fw-semibold mb-3">
              <i className="me-1 bi bi-currency-euro"></i>Gratuit
            </p>
          )}
          {item.price_detail && (
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: item.price_detail }}
            ></div>
          )}
        </div>
        {item.access_link && (
          <div className="mb-3">
            <p className="fs-5 fw-semibold mb-1">
              <i className="me-1 bi bi-ticket"></i>Réservation :
            </p>
            <a href={item.access_link} className="link-dark text-break mb-1">
              {item.access_link_text || item.access_link}
              <i className="ms-1 bi bi-box-arrow-up-right"></i>
            </a>
          </div>
        )}
        <div>
          <p className="fs-5 fw-semibold mb-1">
            <i className="me-1 bi bi-geo-alt"></i>Adresse :
          </p>
          <div className="mb-3">
            {item.address_url && (
              <p className="mb-1">
                {item.address_url}
                <br />
              </p>
            )}
            {item.address_name && (
              <p className="mb-1">
                {item.address_name}
                <br />
              </p>
            )}
            {item.address_street && (
              <p className="mb-1">
                {item.address_street}
                <br />
              </p>
            )}
            {item.address_zipcode && (
              <p className="mb-1">{item.address_zipcode}</p>
            )}
            {item.address_city && <p className="mb-1">{item.address_city}</p>}
          </div>
        </div>
        {item.transport && (
          <div>
            <p className="fs-5 fw-semibold mb-1">
              <i className="me-1 bi bi-bus-front"></i>Transports :
            </p>
            <div
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: item.transport }}
            ></div>
          </div>
        )}
        <div className="mb-3">
          <p className="fs-5 fw-semibold mb-1">
            <i className="me-1 bi bi-info-circle"></i>Plus d'infos :
          </p>
          {item.contact_facebook && (
            <p className="d-flex mb-1">
              <i className="me-1 bi bi-facebook"></i>
              <a href={item.contact_facebook} className="link-dark">
                Facebook<i className="ms-1 bi bi-box-arrow-up-right"></i>
              </a>
            </p>
          )}
          {item.contact_mail && (
            <p className="d-flex mb-1">
              <i className="me-1 bi bi-envelope-at"></i>
              <a
                href={`mailto:${item.contact_mail}`}
                className="link-dark text-break text-lowercase"
              >
                {item.contact_mail}
              </a>
            </p>
          )}
          {item.contact_phone && (
            <p className="d-flex mb-1">
              <i className="me-1 bi bi-telephone"></i>
              <a href={`tel:${item.contact_phone}`} className="link-dark">
                {item.contact_phone}
              </a>
            </p>
          )}
          {item.contact_twitter && (
            <p className="d-flex mb-1">
              <i className="me-1 bi bi-twitter"></i>
              <a href={item.contact_twitter} className="link-dark">
                Twitter<i className="ms-1 bi bi-box-arrow-up-right"></i>
              </a>
            </p>
          )}
          {item.contact_url && (
            <p className="d-flex mb-1">
              <i className="me-1 bi bi-globe"></i>
              <a href={item.contact_url} className="link-dark">
                Site web<i className="ms-1 bi bi-box-arrow-up-right"></i>
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Event;
