export const InputUploadFile = () => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    // console.log(event.target.files);

    /* FORMA 1 */
    // const [file] = event.target.files || [];
    // console.log(file);

    /* FORMA 2 */
    const file = event.target.files?.[0] || {};
    console.log(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(event);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* se coloca el name con "file" porque es el mismo nombre que se espera recibir en el backend */}
      <label>
        <input
          type="file"
          accept=".csv"
          name="file"
          id="upload-file"
          onChange={handleInputChange}
        />
      </label>

      <button>Upload File</button>
    </form>
  );
};
