interface Props {
  setSelectedCity: (city: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  setErrorMessage: (message: string) => void;
  errorMessage: string | null;
}

const FilterForm = ({
  inputRef,
  errorMessage,
  setErrorMessage,
  setSelectedCity,
}: Props) => {
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      setSelectedCity(inputValue);
    }
  };

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  }

  return (
    <form className="filter" onSubmit={handleFilter}>
      <div className="filter-box">
        <input
          type="text"
          className="filter-cities"
          ref={inputRef}
          name="cityInput"
          placeholder="Madrid, Barcelona,....."
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </form>
  );
};

export default FilterForm;
