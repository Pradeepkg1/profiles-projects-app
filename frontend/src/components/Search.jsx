import React, { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search projects by skill"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  );
}

export default Search;