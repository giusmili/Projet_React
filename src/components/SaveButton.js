import { useEffect, useState } from "react";
import { STORAGE_NAME } from "../global";

function SaveButton({ id }) {
  const [iconClasses, setIconClasses] = useState("bi bi-bookmark");
  const [iconText, setIconText] = useState("Enregistrer");
  const [btnClasses, setBtnClasses] = useState("btn btn-outline-dark");

  function manageSaved() {
    let dataStore = localStorage[STORAGE_NAME];
    if (!dataStore) {
      const newSavedStorage = {};
      newSavedStorage[id] = id;
      localStorage[STORAGE_NAME] = JSON.stringify(newSavedStorage);
      setIconClasses("bi bi-bookmark-fill");
      setIconText("Enregistré");
      setBtnClasses("btn btn-outline-dark active");
    } else {
      dataStore = JSON.parse(dataStore);
      if (dataStore[id]) {
        delete dataStore[id];
        setIconClasses("bi bi-bookmark");
        setIconText("Enregistrer");
        setBtnClasses("btn btn-outline-dark");
      } else {
        dataStore[id] = id;
        setIconClasses("bi bi-bookmark-fill");
        setIconText("Enregistré");
        setBtnClasses("btn btn-outline-dark active");
      }
      localStorage[STORAGE_NAME] = JSON.stringify(dataStore);
    }
  }

  useEffect(() => {
    let dataStore = localStorage[STORAGE_NAME];
    if (dataStore) {
      dataStore = JSON.parse(dataStore);
      if (!dataStore[id]) {
        setIconClasses("bi bi-bookmark");
        setIconText("Enregistrer");
        setBtnClasses("btn btn-outline-dark");
      } else if (dataStore[id]) {
        setIconClasses("bi bi-bookmark-fill");
        setIconText("Enregistré");
        setBtnClasses("btn btn-outline-dark active");
      }
    }
  }, [id]);

  return (
    <button className={btnClasses} onClick={manageSaved}>
      <i className={iconClasses}></i> {iconText}
    </button>
  );
}

export default SaveButton;
