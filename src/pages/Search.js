import { useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/Card";

function Search() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);
  const [noResult, setNoResult] = useState();
  const [val, setVal] = useState("");
  const click = () => {
    if (val.length > 0 && val !== " ") {
      setIsLoaded(false);
      fetch(
        `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?search=${val}&sort=title&limit=15`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setError(null);
            if ("error_code" in result) setError(result.message);
            setItems(result.records.map((item) => item.record));
            if (result.records.length === 0) {
              setNoResult(true);
            } else {
              setNoResult(null);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error.message);
          }
        );
    } else {
      setError("La recherche ne peut pas être vide!");
    }
  };
  const change = (event) => {
    setVal(event.target.value);
  };

  return (
    <div className="Search">
      <h1 className="text-theme">Effectuez une recherche</h1>
      <p className="text-secondary">
        Recherchez la sortie parisienne qui vous convient parmi la multitude
        d'évènements à venir !
      </p>
      <hr />
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher parmi les évènements..."
          aria-label="Rechercher parmi les évènements..."
          aria-describedby="button-addon"
          value={val}
          onChange={change}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon"
          onClick={click}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      {noResult && <p className="text-secondary fst-italic">Aucun résultat</p>}
      {!error &&
        isLoaded &&
        items.map((item) => <Card key={item.id} content={item} />)}
    </div>
  );
}

export default Search;
