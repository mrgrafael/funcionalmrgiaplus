import React from 'react';

const LeadCard = ({ lead }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '250px' }}>
      <h3>{lead.nome}</h3>
      <p>Interesse: {lead.interesse}</p>
      <p>Consultora: {lead.consultora}</p>
    </div>
  );
};

export default LeadCard;