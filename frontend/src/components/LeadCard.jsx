import React from 'react';
import './LeadCard.css';

const LeadCard = ({ lead }) => (
  <div className="lead-card">
    <h3>{lead.nome}</h3>
    <p><strong>Interesse:</strong> {lead.interesse}</p>
    <p><strong>Consultora:</strong> {lead.consultora}</p>
  </div>
);

export default LeadCard;
