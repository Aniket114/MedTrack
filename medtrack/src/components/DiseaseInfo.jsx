import React, { useEffect, useState } from "react";

const DiseaseInfo = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [data, setData] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/diseaseData.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const handleSearch = (q = query) => {
    const key = q.trim().toLowerCase();
    if (data && data[key]) setResult(data[key]);
    else setResult(null);
    setSuggestions([]); // hide suggestions after search
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matches = Object.keys(data).filter((disease) =>
      disease.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches.slice(0, 5)); // max 5 suggestions
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-900 pt-24 pb-12 px-6 md:px-12 text-gray-100 font-sans">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-12 drop-shadow-lg">
        🦠 Disease Info & Treatment
      </h2>

      {/* Search Box */}
      <div className="max-w-xl mx-auto mb-6 relative">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter disease (e.g. fever)"
            value={query}
            onChange={handleInputChange}
            className="flex-1 px-5 py-3 rounded-lg border border-green-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold px-6 rounded-lg transition"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white text-gray-800 border border-green-400 mt-1 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-green-100 capitalize"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Result or No Result */}
      {result ? (
        <div className="max-w-4xl mx-auto bg-green-800 bg-opacity-90 rounded-xl shadow-2xl p-10 space-y-10">
          <h3 className="text-3xl font-bold text-green-300 tracking-wide capitalize">
            {query.trim()}
          </h3>

          <p className="text-lg leading-relaxed text-gray-200">{result.description}</p>

          {/* Symptoms */}
          <section>
            <h4 className="text-xl font-semibold border-b border-green-400 pb-2 mb-4">Symptoms</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {result.symptoms?.map((symptom, i) => (
                <li key={i}>{symptom}</li>
              ))}
            </ul>
          </section>

          {/* Precautions */}
          <section>
            <h4 className="text-xl font-semibold border-b border-green-400 pb-2 mb-4">Precautions</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {result.precautions?.map((prec, i) => (
                <li key={i}>{prec}</li>
              ))}
            </ul>
          </section>

          {/* Medicines */}
          <section>
            <h4 className="text-xl font-semibold border-b border-green-400 pb-2 mb-8">Medicines</h4>
            {result.medicines?.map((med, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row bg-green-700 bg-opacity-70 rounded-lg p-6 mb-6 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex-shrink-0 md:mr-8 mb-6 md:mb-0 flex justify-center items-center">
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-32 h-32 object-contain rounded-lg border border-green-400"
                  />
                </div>
                <div className="text-gray-100 flex-1 space-y-4">
                  <h5 className="text-2xl font-semibold text-green-300">{med.name}</h5>
                  <div>
                    <p className="font-semibold">Dosage:</p>
                    <p>
                      <span className="font-medium">Adult:</span> {med.dosage.adult}
                      <br />
                      <span className="font-medium">Child:</span> {med.dosage.child}
                    </p>
                  </div>
                  <p><span className="font-semibold">Timing:</span> {med.timing}</p>
                  <p><span className="font-semibold">Instructions:</span> {med.instructions}</p>
                  <p><span className="font-semibold">Age Limit:</span> {med.ageLimit}</p>
                  <div>
                    <p className="font-semibold">Side Effects:</p>
                    <ul className="list-disc list-inside ml-5 text-gray-300">
                      {med.sideEffects?.map((side, idx) => (
                        <li key={idx}>{side}</li>
                      ))}
                    </ul>
                  </div>
                  <p><span className="font-semibold">Food Interaction:</span> {med.foodInteraction}</p>
                  <div>
                    <p className="font-semibold">Precautions:</p>
                    <ul className="list-disc list-inside ml-5 text-gray-300">
                      {med.precautions?.map((prec, idx) => (
                        <li key={idx}>{prec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : query ? (
        <p className="text-center text-red-400 font-semibold mt-6 text-lg">
          No result found for "<span className="italic">{query}</span>"
        </p>
      ) : null}
    </div>
  );
};

export default DiseaseInfo;
