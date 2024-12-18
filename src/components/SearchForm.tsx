import React, { useState } from 'react';
import { Review, SearchResponse } from '../types.ts';

const SearchForm: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    keywords: ['', '', '', '', ''],
    keywordPriorities: ['low', 'low', 'low', 'low', 'low'],
    author: '',
    year: '',
  });

  const priorityMap = {
    low: 1,
    medium: 2,
    high: 3
  };
  const uiLinkDomain = process.env.REACT_APP_APP_UI_DOMAIN

  const [results, setResults] = useState<Review[]>(() => []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const keywords = [...searchParams.keywords];
      keywords[index] = value;
      setSearchParams({ ...searchParams, keywords });
    } else {
      setSearchParams({ ...searchParams, [name]: value });
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = e.target;
    const keywordPriorities = [...searchParams.keywordPriorities];
    keywordPriorities[index] = value;
    setSearchParams({ ...searchParams, keywordPriorities });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults: Review[] = results.slice(indexOfFirstResult, indexOfLastResult);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const apiUrl = process.env.REACT_APP_API_DOMAIN + 'publications/search';
    console.log({apiUrl})

    let keywords: {
        keyword: string,
        priority: number
    }[] 
    = searchParams.keywords
    .map((keyword: string, index: number) => ({
        keyword: keyword,
        priority: priorityMap[searchParams.keywordPriorities[index]] || 0 
    }))
    .filter(item => item.keyword !== "");

    const totalPriority = keywords.reduce((sum, item) => sum + item.priority, 0);

    keywords = keywords.map(k => {
        return {
        keyword: k.keyword,
        priority: k.priority/totalPriority
    }})

    const requestData = {
        keywords: keywords,
        numberOfResult: 0,
        author: searchParams.author,
        year: searchParams.year,
      }

    console.log({requestData})

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: SearchResponse = await response.json();
      console.log(data)
      setResults(data.reviews);
      setCurrentPage(1);
    } catch (error) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Блок пошуку */}
      <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ flex: 1 }}>
        <h2>Search Publications</h2>

        {[...Array(5)].map((_, index) => (
          <div key={index} className="mb-3 d-flex align-items-center">
            <div className="flex-grow-1">
              <label>Keyword {index + 1}</label>
              <input
                type="text"
                className="form-control keyword-input"
                value={searchParams.keywords[index]}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="ms-3">
              <label>Priority</label>
              <select
                className="form-select form-select-sm priority-select keyword-input"
                value={searchParams.keywordPriorities[index]}
                onChange={(e) => handlePriorityChange(e, index)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        ))}

        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={searchParams.author}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Year</label>
          <input
            type="number"
            name="year"
            className="form-control"
            value={searchParams.year}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Блок результатів */}
      <div
        className="p-4 border rounded ms-4 result-block"
      >
        <h2>Results</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {currentResults.length > 0 ? (
          currentResults.map((result, index) => (
            <div key={index} className="mb-4">
              <h5>{result.title}</h5>
              <p><strong>Keywords:</strong> {result.keywords}</p>
              <p><strong>Similarity Score:</strong> {result.value}</p>
              <p className="description"><strong>Description:</strong>  {result.abstract}...</p>
              <a href={`${uiLinkDomain}publication/${result.id}`}>View Details</a>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}

        {/* Пагінація */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * resultsPerPage >= results.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
