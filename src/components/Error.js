function Error({ err }) {
  return (
    <p className="rounded bg-danger text-white p-1 shadow shadow-sm">
      Erreur: {err}
    </p>
  );
}

export default Error;
