import React, { useState, useEffect } from 'react';
import ChatBot from './components/ChatBot';
import LeadCard from './components/LeadCard';
import './styles/dashboard.css';

const consultoras = ['Julia', 'Maria Julia', 'Bia', 'Law'];

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const fetchedLeads = [
      { id: 1, nome: 'Carlos Silva', interesse: 'CONSIGNADO INSS' },
      { id: 2, nome: 'Ana Souza', interesse: 'CONSIGNADO GOV' },
      { id: 3, nome: 'Marcos Lima', interesse: 'FGTS' },
      { id: 4, nome: 'Fernanda Costa', interesse: 'CARTÃO DE CRÉDITO (DISPONIVEL PRESENCIALMENTE)' },
      { id: 5, nome: 'Bruna Vieira', interesse: 'CRÉDITO CLT' },
      { id: 6, nome: 'Diego Martins', interesse: 'CREFAZ' },
    ];

    const leadsDistribuidos = fetchedLeads.map((lead, index) => ({
      ...lead,
      consultora: consultoras[index % consultoras.length],
    }));

    setLeads(leadsDistribuidos);
  }, []);

  const toggleChat = () => setChatOpen(!chatOpen);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard de Leads</h1>
        <button onClick={toggleChat}>
          {chatOpen ? 'Fechar Chat' : 'Abrir Chat'}
        </button>
      </header>

      {chatOpen && <ChatBot />}

      <div className="leads-grid">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
