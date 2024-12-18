import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from '../types';

const PublicationDetails: React.FC = () => {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_DOMAIN + 'publications';
  const [publication, setPublication] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch publication with ID ${id}.`);
        }
        const data: Review = await response.json();
        console.log({data})
        setPublication(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPublication();
    }
  }, [id, apiUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!publication) {
    return <p>No publication found.</p>;
  }

  return (
    <div>
    <h2>Publication Details</h2>
    {publication.title && <p><strong>Title:</strong> {publication.title}</p>}
    {publication.abstract && <p><strong>Abstract:</strong> {publication.abstract}</p>}
    {publication.authors && <p><strong>Authors:</strong> {publication.authors}</p>}
    {publication.journal_ref && <p><strong>Journal Reference:</strong> {publication.journal_ref}</p>}
    {publication.keywords && publication.keywords.length > 0 && (
      <p><strong>Keywords:</strong> {publication.keywords.join(', ')}</p>
    )}
    {publication.doi && <p><strong>DOI:</strong> {publication.doi}</p>}
    {publication.link && (
      <p><strong>Source:</strong> <a href={publication.link} target="_blank" rel="noopener noreferrer">{publication.link}</a></p>
    )}
    {publication.year && <p><strong>Year:</strong> {publication.year}</p>}
  </div>
  
  );
};

export default PublicationDetails;
