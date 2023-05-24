import { useEffect, useState } from "react";
import { STORAGE_NAME } from "../global";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/Card";

function Saved() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [saved, setSaved] = useState([]);

  const fetchOneEvent = (eventId) => {
    return new Promise((resolve) => {
      fetch(
        `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${eventId}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            resolve(result.record);
          },
          (error) => {
            setIsLoaded(true);
            setError(error.message);
          }
        );
    });
  };

  function deleteAllSaved() {
    if (STORAGE_NAME in localStorage) localStorage.removeItem(STORAGE_NAME);
    setSaved([]);
  }

  useEffect(() => {
    setIsLoaded(false);
    let storedSaved = localStorage[STORAGE_NAME];
    if (!storedSaved) {
      setIsLoaded(true);
    } else {
      storedSaved = JSON.parse(storedSaved);
      const promises = [];
      for (const key in storedSaved) {
        promises.push(fetchOneEvent(key));
      }
      Promise.all(promises).then((values) => {
        setIsLoaded(true);
        setSaved(values.filter((value) => value));
      });
    }
  }, []);

  return (
    <div>
      <h1 className="text-theme">Evènements enregistrés</h1>
      <p className="text-secondary">
        Retrouvez ici les évènements que vous avez enregistrés pendant votre
        navigation !
      </p>
      <hr />
      {saved.length === 0 && isLoaded && !error && (
        <p className="text-secondary fst-italic">
          Vous n'avez enregistré aucun évènement.
        </p>
      )}
      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      {!error &&
        isLoaded &&
        saved.map((item) => item && <Card key={item.id} content={item} />)}
      {!error && isLoaded && saved.length > 0 && (
        <div className="w-100 d-flex justify-items-center mb-3">
          <button
            className="btn btn-outline-danger m-auto"
            onClick={deleteAllSaved}
          >
            Tout supprimer
          </button>
        </div>
      )}
    </div>
  );
}

export default Saved;
