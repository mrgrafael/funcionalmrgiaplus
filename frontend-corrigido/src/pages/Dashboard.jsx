import React, { useState, useEffect } from 'react';
import LeadCard from '../components/LeadCard';

const consultoras = ['Julia', 'Maria Julia', 'Bia', 'Law'];

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchedLeads = [
      { id: 1, nome: 'Carlos Silva', interesse: 'CONSIGNADO INSS' },
      { id: 2, nome: 'Ana Souza', interesse: 'CONSIGNADO GOV' },
      { id: 3, nome: 'Marcos Lima', interesse: 'FGTS' },
      { id: 4, nome: 'Fernanda Costa', interesse: 'CARTÃO DE CRÉDITO (DISPONIVEL PRESENCIALMENTE)' },
      { id: 5, nome: 'Bruna Vieira', interesse: 'CRÉDITO CLT' },
      { id: 6, nome: 'Diego Martins', interesse: 'CREFAZ' },
    ];

    const distribuido = fetchedLeads.map((lead, index) => ({
      ...lead,
      consultora: consultoras[index % consultoras.length],
    }));

    setLeads(distribuido);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard de Leads</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;