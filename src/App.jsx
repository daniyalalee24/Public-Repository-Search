import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [simulateError, setSimulateError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // If simulateError is true, purposely hit a non-existent endpoint to force an HTTP error.
      const endpoint = simulateError
        ? "https://api.github.com/this-endpoint-does-not-exist"
        : `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Public Repository Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub repositories..."
          className="search-input"
        />
        <button type="submit" disabled={isLoading} className="search-button">
          Search
        </button>

        <div className="error-toggle">
          <label>
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
            />
            Simulate API Error
          </label>
        </div>
      </form>

      <div className="results-container">
        {/* State 1: Loading */}
        {isLoading && (
          <div className="state-box loading-state">
            <span className="icon">⏳</span>
            <p>Searching for repositories... please wait.</p>
          </div>
        )}

        {/* State 2: Request Failed */}
        {error && !isLoading && (
          <div className="state-box error-state">
            <span className="icon">❌</span>
            <div>
              <strong>What failed:</strong> Failed to fetch repositories from
              GitHub.
              <br />
              <strong>What to do:</strong> Please check your internet
              connection, ensure "Simulate API Error" is unchecked, and try your
              search again.
              <br />
              <small>(Technical details: {error})</small>
            </div>
          </div>
        )}

        {/* State 3: Empty State (Successful request, 0 results) */}
        {results !== null && results.length === 0 && !isLoading && !error && (
          <div className="state-box empty-state">
            <span className="icon">📭</span>
            <p>
              Search successful, but no repositories matched{" "}
              <strong>"{query}"</strong>. Try using broader keywords.
            </p>
          </div>
        )}

        {/* Successful Search with Results */}
        {results !== null && results.length > 0 && !isLoading && !error && (
          <ul className="repo-list">
            {results.map((repo) => (
              <li key={repo.id} className="repo-item">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.full_name}
                </a>
                <p className="repo-desc">{repo.description}</p>
                <span className="repo-stars">⭐ {repo.stargazers_count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
