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

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const endpoint = simulateError
        ? "https://api.github.com/this-endpoint-does-not-exist"
        : `https://api.github.com/search/repositories?q=${encodeURIComponent(
            trimmedQuery,
          )}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`GitHub API returned HTTP ${response.status}`);
      }

      const data = await response.json();

      // Small delay so the loading state is reliably demonstrable.
      await new Promise((resolve) => setTimeout(resolve, 400));

      setResults(data.items || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="app-container">
      <h1>Public Repository Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <label htmlFor="repository-search" className="sr-only">
          Search GitHub repositories
        </label>

        <input
          id="repository-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub repositories..."
          className="search-input"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="search-button"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>

        <div className="error-toggle">
          <label>
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
              disabled={isLoading}
            />
            Simulate API Error
          </label>
        </div>
      </form>

      <div className="results-container" aria-live="polite">
        {/* State 1: Loading */}
        {isLoading && (
          <div className="state-box loading-state" role="status">
            <span className="icon" aria-hidden="true">
              ⏳
            </span>
            <p>Searching for repositories... please wait.</p>
          </div>
        )}

        {/* State 2: Request Failed */}
        {error && !isLoading && (
          <div className="state-box error-state" role="alert">
            <span className="icon" aria-hidden="true">
              ❌
            </span>

            <div>
              <strong>What failed:</strong> The request to GitHub failed.
              <br />
              <strong>What to do:</strong> Check your internet connection, make
              sure &quot;Simulate API Error&quot; is unchecked, and try the
              search again.
              <br />
              <small>Technical details: {error}</small>
            </div>
          </div>
        )}

        {/* State 3: Empty State — successful request with zero results */}
        {results !== null && results.length === 0 && !isLoading && !error && (
          <div className="state-box empty-state" role="status">
            <span className="icon" aria-hidden="true">
              📭
            </span>

            <p>
              Search successful, but no repositories matched{" "}
              <strong>&quot;{query.trim()}&quot;</strong>. Try using broader
              keywords.
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

                <p className="repo-desc">
                  {repo.description || "No description provided."}
                </p>

                <span className="repo-stars">⭐ {repo.stargazers_count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
