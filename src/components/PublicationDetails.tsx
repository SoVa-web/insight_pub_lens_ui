import React from 'react';
import { useParams } from 'react-router-dom';

const PublicationDetails: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Publication Details</h2>
      <p>Showing details for publication ID: {id}</p>
    </div>
  );
};

export default PublicationDetails;
