import { useEffect, useState } from "react";

type Country = {
  id?: number;
  name: string;
  divisionType?: string;
  subdivisionType?: string;
  codeType?: string;
  divisions?: Division[];
};

type Division = {
  name: string;
  subdivisions?: string[];
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [selectedDivision, setSelectedDivision] = useState<Division>();

  useEffect(() => {
    fetch("./src/assets/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        data.forEach((c: Country) => (c.id ? "" : console.log(c.name)));
        console.log();
      });
  }, []);

  const handleSelectCountry = (countryId: number) => {
    setSelectedCountry(countries.find((c) => c.id === countryId));
  };

  const handleSelectDivision = (division: string) => {
    setSelectedDivision(
      selectedCountry?.divisions?.find((d) => d.name === division)
    );
  };

  return (
    <>
      <div className="wrapper">
        <div className="form-input">
          <label>Country/Region</label>
          <select onChange={(e) => handleSelectCountry(Number(e.target.value))}>
            <option value=""></option>
            {countries.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCountry?.divisionType && (
          <div className="form-input">
            <label>{selectedCountry.divisionType}</label>
            {selectedCountry.divisions?.length ? (
              <select onChange={(e) => handleSelectDivision(e.target.value)}>
                <option value=""></option>
                {selectedCountry.divisions.map((d) => (
                  <option value={d.name} key={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            ) : (
              <input type="text" />
            )}
          </div>
        )}

        {selectedCountry?.subdivisionType && (
          <div className="form-input">
            <label>{selectedCountry.subdivisionType}</label>
            {selectedDivision?.subdivisions?.length ? (
              <select>
                <option value=""></option>
                {selectedDivision?.subdivisions?.map((s: string) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
            ) : (
              <input type="text" />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
