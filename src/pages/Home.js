import { useEffect, useState } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/Card";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?limit=1&order_by=date_start desc, title desc"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result.records[0].record);
        },
        (error) => {
          setIsLoaded(true);
          setError(error.message);
        }
      );
  }, []);

  return (
    <div className="Home">
      <h1 className="text-theme">Bienvenue sur Paris Events</h1>
      <p className="text-secondary">
        L'application qui permet de rechercher en direct les prochains
        événements Parisiens !
      </p>
      <hr />
      <h2 className="fs-2">Actualité</h2>
      <p className="text-secondary fs-5">Dernier évènement ajouté:</p>
      {error && <Error err={error} />}
      {!isLoaded && <Loader />}
      {!error && isLoaded && <Card key={item.id} content={item} />}
    </div>
  );
}

export default Home;
