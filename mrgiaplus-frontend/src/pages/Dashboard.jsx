import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Send,
  Upload,
  Play,
  Pause,
  X,
  Filter,
  Settings,
  Bell,
  BarChart,
  PhoneCall,
  Mail,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import jsPDF from "jspdf";

// For now, keep local in-memory data.
const initialData = [
  {
    id: "1",
    name: "Maria Virginal",
    cpf: "123.456.789-00",
    dataNascimento: "01/01/1980",
    idade: "43",
    siglaAposentadoria: "MV",
    telefone: "16981802817",
    cep: "12345-678",
    numero: "100",
    bairro: "Centro",
    rua: "Rua Principal",
    cidade: "São Paulo",
    banco: "PAN",
    agencia: "001",
    contaPoupanca: "1234-5",
    contaCorrente: "6789-0",
    beneficio: "Benefício Exemplo",
    especie: "Dinheiro",
    salario: "R$ 2000,00",
    convenio: "Convênio Exemplo",
    produto: "Produto Exemplo",
    parcela: "R$ 300,00",
    valorLiberado: "R$ 10.000,00",
    prazo: "12 meses",
    status: "Novo",
    email: "maria@email.com",
    date: new Date().toLocaleString(),
  },
];

const columns = [
  "Novo",
  "Analise Crivo",
  "Analise Bancaria",
  "Contrato Finalizado",
  "Contato Futuro",
];

export default function CRM() {
  const [crmData, setCrmData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expandedContacts, setExpandedContacts] = useState({});

  // States for margin (CPF) query
  const [showCpfSearchModal, setShowCpfSearchModal] = useState(false);
  const [cpfSearch, setCpfSearch] = useState("");
  const [marginContact, setMarginContact] = useState(null);

  // Controls the WhatsApp menu below columns
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);

  // Confirmation modal states for "Enviar Proposta"
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [contactToPropose, setContactToPropose] = useState(null);

  // Basic token-based user auth (placeholder)
  const [authToken, setAuthToken] = useState(null);

  const loginUser = async (username, password) => {
    alert('Login simulation: token set.');
    setAuthToken('fake-jwt-token');
  };
  const logoutUser = () => {
    setAuthToken(null);
  };

  // CSV/spreadsheet import
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Just a mock new contact.
    const newContact = {
      id: String(Date.now()),
      name: "João da Silva",
      cpf: "987.654.321-00",
      dataNascimento: "02/02/1990",
      idade: "33",
      siglaAposentadoria: "JS",
      telefone: "11987654321",
      cep: "98765-432",
      numero: "200",
      bairro: "Bairro Novo",
      rua: "Rua Secundária",
      cidade: "Rio de Janeiro",
      banco: "BRADESCO",
      agencia: "002",
      contaPoupanca: "4321-0",
      contaCorrente: "0987-6",
      beneficio: "Benefício Teste",
      especie: "Cheque",
      salario: "R$ 2500,00",
      convenio: "Convênio Teste",
      produto: "Produto Teste",
      parcela: "R$ 500,00",
      valorLiberado: "R$ 15.000,00",
      prazo: "24 meses",
      status: "Novo",
      email: "joao@email.com",
      date: new Date().toLocaleString(),
    };
    setCrmData((prev) => [...prev, newContact]);
    setShowImportModal(false);
  };

  const toggleContactOptions = (id) => {
    setExpandedContacts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleSaveContact = () => {
    setCrmData((prev) =>
      prev.map((c) => (c.id === selectedContact.id ? selectedContact : c))
    );
    setShowEditModal(false);
    setSelectedContact(null);
  };

  // PDF generation
  const generatePDF = (contact) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("CHECKLIST DE CONTRATOS 2025", 10, 10);

    doc.setFontSize(12);
    let cursorY = 20;

    doc.text(
      `Data: ${new Date().toLocaleDateString()}        ATENDENTE: `,
      10,
      cursorY
    );
    cursorY += 10;

    doc.text(`NOME: ${contact.name}`, 10, cursorY);
    cursorY += 10;
    doc.text(`CPF: ${contact.cpf}`, 10, cursorY);
    cursorY += 10;
    doc.text(
      `DATA DE NASCIMENTO: ${contact.dataNascimento}`,
      10,
      cursorY
    );
    cursorY += 10;
    doc.text(`IDADE: ${contact.idade}`, 10, cursorY);
    cursorY += 10;
    doc.text(
      `SIGLA AONDE Aposentou: ${contact.siglaAposentadoria || ""}`,
      10,
      cursorY
    );
    cursorY += 10;
    doc.text(`TELEFONE: ${contact.telefone}`, 10, cursorY);
    cursorY += 10;
    doc.text(`CEP: ${contact.cep}`, 10, cursorY);
    cursorY += 10;
    doc.text(`NUMERO: ${contact.numero}`, 10, cursorY);
    cursorY += 10;
    doc.text(`BAIRRO: ${contact.bairro}`, 10, cursorY);
    cursorY += 10;
    doc.text(`RUA: ${contact.rua}`, 10, cursorY);
    cursorY += 10;
    doc.text(`CIDADE: ${contact.cidade}`, 10, cursorY);
    cursorY += 10;

    doc.text(`BANCO: ${contact.banco}`, 10, cursorY);
    cursorY += 10;
    doc.text(`AGENCIA: ${contact.agencia}`, 10, cursorY);
    cursorY += 10;
    doc.text(`CONTA POUPANÇA: ${contact.contaPoupanca}`, 10, cursorY);
    cursorY += 10;
    doc.text(`CONTA CORRENTE: ${contact.contaCorrente}`, 10, cursorY);
    cursorY += 10;

    doc.text(`BENEFICIO: ${contact.beneficio}`, 10, cursorY);
    cursorY += 10;
    doc.text(`ESPÉCIE: ${contact.especie}`, 10, cursorY);
    cursorY += 10;
    doc.text(`SALÁRIO: ${contact.salario}`, 10, cursorY);
    cursorY += 10;
    doc.text(`CONVÊNIO: ${contact.convenio}`, 10, cursorY);
    cursorY += 10;

    doc.text(`PRODUTO: ${contact.produto}`, 10, cursorY);
    cursorY += 10;
    doc.text(`PARCELA: ${contact.parcela}`, 10, cursorY);
    cursorY += 10;
    doc.text(`VALOR LIBERADO: ${contact.valorLiberado}`, 10, cursorY);
    cursorY += 10;
    doc.text(`PRAZO: ${contact.prazo}`, 10, cursorY);
    cursorY += 10;

    doc.text("--- RELATO DA VENDA ---", 10, cursorY);
    cursorY += 10;
    doc.text(`Data do Registro: ${contact.date}`, 10, cursorY);
    cursorY += 10;

    doc.save(`Checklist_${contact.name}.pdf`);
  };

  const handleEnviarPropostaClick = (contact, e) => {
    e.stopPropagation();
    setContactToPropose(contact);
    setShowConfirmModal(true);
  };

  const confirmEnviarProposta = () => {
    if (!contactToPropose) return;

    setCrmData((prev) =>
      prev.map((c) => {
        if (c.id === contactToPropose.id) {
          return {
            ...c,
            status: "Analise Crivo",
            highlightColor: "#FFF9C4",
          };
        }
        return c;
      })
    );

    generatePDF(contactToPropose);

    setShowConfirmModal(false);
    setContactToPropose(null);
  };

  const cancelEnviarProposta = () => {
    setShowConfirmModal(false);
    setContactToPropose(null);
  };

  // contact actions
  const handleCall = (contact) => {
    alert(`Ligando para ${contact.name} (${contact.telefone})`);
  };

  const handleSendEmail = (contact) => {
    alert(`Enviando email para ${contact.name} (${contact.email})`);
  };

  const handleSendWhatsApp = (contact) => {
    alert(`Enviando WhatsApp para ${contact.name} (${contact.telefone})`);
  };

  const handleSendSMS = (contact) => {
    alert(`Enviando SMS para ${contact.name} (${contact.telefone})`);
  };

  const handlePushNotification = (contact) => {
    alert(`Enviando Notificação Push para ${contact.name}`);
  };

  const handleCpfSearch = () => {
    const found = crmData.find((contact) => contact.cpf === cpfSearch);
    if (found) {
      setMarginContact(found);
    } else {
      alert("CPF não encontrado");
      setMarginContact(null);
    }
  };

  const handleSettings = () => {
    alert("Recurso de Configurações em desenvolvimento");
  };

  const handleNotifications = () => {
    alert("Recurso de Notificações em desenvolvimento");
  };

  const handleIntegration = (service) => {
    alert(`Ativando integração com ${service}`);
  };

  const handleOpenWhatsApp = () => {
    setShowWhatsAppMenu((prev) => !prev);
  };

  // We'll store a new state for showing the Automação modal
  const [showAutomacaoModal, setShowAutomacaoModal] = useState(false);

  // We'll store some states for the automation logic
  const [automationMessage, setAutomationMessage] = useState("Olá, tudo bem?");
  const [automationInterval, setAutomationInterval] = useState(5); // in seconds
  const [automationProgress, setAutomationProgress] = useState(0);
  const [automationFailures, setAutomationFailures] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Handler to open the modal
  const handleAutomacaoMsg = () => {
    setShowAutomacaoModal(true);
  };

  // Simulate the sending in a useEffect
  useEffect(() => {
    let timer;
    if (isRunning && automationProgress < 100) {
      timer = setInterval(() => {
        setAutomationProgress((prev) => {
          const nextVal = prev + 5;
          if (nextVal >= 100) {
            // final
            return 100;
          }
          return nextVal;
        });
        // Randomly simulate failure
        if (Math.random() < 0.1) {
          setAutomationFailures((f) => f + 1);
        }
      }, automationInterval * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, automationInterval, automationProgress]);

  const handlePlay = () => {
    // start or resume
    setIsRunning(true);
  };

  const handlePause = () => {
    // pause
    setIsRunning(false);
  };

  const handleStop = () => {
    // stop => reset progress
    setIsRunning(false);
    setAutomationProgress(0);
    setAutomationFailures(0);
  };

  // parse currency
  const parseCurrency = (value) => {
    const cleaned = value.replace("R$", "").replace(/\./g, "").replace(",", ".");
    return parseFloat(cleaned);
  };

  const totalSales = crmData.reduce(
    (acc, contact) => acc + parseCurrency(contact.parcela),
    0
  );
  const averageSale = crmData.length ? totalSales / crmData.length : 0;
  const forecast = totalSales * 1.15;

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const newData = [...crmData];
    const sourceIndices = [];
    newData.forEach((card, index) => {
      if (card.status === source.droppableId) {
        sourceIndices.push(index);
      }
    });
    const sourceIndex = sourceIndices[source.index];
    const [movedCard] = newData.splice(sourceIndex, 1);

    if (source.droppableId === destination.droppableId) {
      const destinationIndices = [];
      newData.forEach((card, index) => {
        if (card.status === destination.droppableId) {
          destinationIndices.push(index);
        }
      });
      const destIndex = destinationIndices[destination.index] || newData.length;
      newData.splice(destIndex, 0, movedCard);
    } else {
      movedCard.status = destination.droppableId;
      if (movedCard.status !== "Analise Crivo") {
        movedCard.highlightColor = undefined;
      }
      const destinationIndices = [];
      newData.forEach((card, index) => {
        if (card.status === destination.droppableId) {
          destinationIndices.push(index);
        }
      });
      const destIndex = destinationIndices[destination.index] || newData.length;
      newData.splice(destIndex, 0, movedCard);
    }
    setCrmData(newData);
  };

  return (
    <>
      {/* Example Auth Buttons */}
      {!authToken && (
        <div className="p-2 bg-gray-200 flex gap-2 justify-end">
          <Button onClick={() => loginUser('admin','123456')}>Login</Button>
        </div>
      )}
      {authToken && (
        <div className="p-2 bg-gray-200 flex gap-2 justify-end">
          <span>Usuário logado!</span>
          <Button onClick={logoutUser}>Logout</Button>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-screen bg-gray-100">
          {/* Menu Lateral */}
          <aside className="w-64 bg-green-900 text-white p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">CRM</h1>
            <nav>
              <ul className="space-y-2">
                <li
                  className="p-2 cursor-pointer"
                  onClick={() => setShowImportModal(true)}
                >
                  <Upload /> Importar Leads
                </li>
                <li className="p-2 cursor-pointer" onClick={handleSettings}>
                  <Settings /> Configurações
                </li>
                <li className="p-2 cursor-pointer" onClick={handleNotifications}>
                  <Bell /> Notificações
                </li>
                <li
                  className="p-2 cursor-pointer"
                  onClick={() => setShowReportsModal(true)}
                >
                  <BarChart /> Relatórios & Métricas
                </li>
                <li
                  className="p-2 cursor-pointer"
                  onClick={() => setShowIntegrationsModal(true)}
                >
                  <Filter /> Integrações
                </li>
                <li
                  className="p-2 cursor-pointer"
                  onClick={() => setShowCpfSearchModal(true)}
                >
                  <Search /> Consulta de Margem
                </li>
                <li className="p-2 cursor-pointer" onClick={handleOpenWhatsApp}>
                  <Send /> WhatsApp
                </li>
                {/* NOVO RECURSO: Automação MSG => abre modal */}
                <li className="p-2 cursor-pointer" onClick={handleAutomacaoMsg}>
                  <Play /> Automação Msg
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <Button>
                <Search />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {columns.map((col) => (
                <Droppable droppableId={col} key={col}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-white p-4 rounded-lg shadow-md min-h-[400px]"
                    >
                      <h2 className="font-bold text-xl mb-4">{col}</h2>
                      {crmData
                        .filter(
                          (card) =>
                            card.status === col &&
                            card.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                        )
                        .map((card, idx) => {
                          const cardStyle = {
                            backgroundColor: card.highlightColor || "white",
                          };
                          return (
                            <Draggable key={card.id} draggableId={card.id} index={idx}>
                              {(provided) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="p-0 rounded-lg shadow-lg mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
                                  style={cardStyle}
                                  onClick={() => handleEditContact(card)}
                                >
                                  <CardContent className="p-4">
                                    <h3 className="font-bold text-2xl mb-2">{card.name}</h3>
                                    <p className="text-gray-700 mb-1">
                                      Valor Parcela: {card.parcela}
                                    </p>
                                    <p className="text-gray-700 mb-2">CPF: {card.cpf}</p>
                                    <Button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleContactOptions(card.id);
                                      }}
                                      className="bg-indigo-600 text-white w-full flex items-center justify-center mb-2"
                                    >
                                      Entrar em contato
                                    </Button>
                                    <Button
                                      onClick={(e) => handleEnviarPropostaClick(card, e)}
                                      className="bg-red-600 text-white w-full flex items-center justify-center mb-2"
                                    >
                                      Enviar Proposta ADM
                                    </Button>

                                    {expandedContacts[card.id] && (
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                        <Button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleCall(card);
                                          }}
                                          className="bg-green-600 text-white flex items-center justify-center gap-1"
                                        >
                                          <PhoneCall size={16} /> Ligar
                                        </Button>
                                        <Button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSendEmail(card);
                                          }}
                                          className="bg-blue-600 text-white flex items-center justify-center gap-1"
                                        >
                                          <Mail size={16} /> Email
                                        </Button>
                                        <Button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSendWhatsApp(card);
                                          }}
                                          className="bg-green-600 text-white flex items-center justify-center gap-1"
                                        >
                                          <Send size={16} /> WhatsApp
                                        </Button>
                                        <Button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSendSMS(card);
                                          }}
                                          className="bg-purple-600 text-white flex items-center justify-center gap-1"
                                        >
                                          <MessageCircle size={16} /> SMS
                                        </Button>
                                        <Button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handlePushNotification(card);
                                          }}
                                          className="bg-yellow-600 text-white flex items-center justify-center gap-1"
                                        >
                                          <Smartphone size={16} /> Push
                                        </Button>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>

            {showWhatsAppMenu && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-2">WhatsApp Web</h2>
                <p className="mb-4">Clique abaixo para abrir o WhatsApp Web em uma nova aba.</p>
                <Button
                  onClick={() => window.open("https://web.whatsapp.com", "_blank")}
                  className="mb-4"
                >
                  Abrir WhatsApp Web
                </Button>
                <Button onClick={() => setShowWhatsAppMenu(false)}>Fechar Menu</Button>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>

      {/* Confirmation modal for proposal */}
      {showConfirmModal && contactToPropose && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Enviar Proposta?</h2>
            <p className="mb-4">
              Deseja realmente enviar a Proposta ADM para {contactToPropose.name}?
            </p>
            <div className="flex justify-end gap-4">
              <Button onClick={confirmEnviarProposta} className="bg-green-600">
                Sim
              </Button>
              <Button onClick={cancelEnviarProposta} className="bg-red-600">
                Não
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Import Leads Modal */}
      {showImportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Importar Leads de Planilha</h2>
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={handleFileImport}
              className="w-full border p-2 rounded mb-4"
            />
            <Button onClick={() => setShowImportModal(false)}>Fechar</Button>
          </div>
        </div>
      )}

      {/* Integrations Modal */}
      {showIntegrationsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Integrações e Implantação</h2>
            <ul className="space-y-2">
              <li>
                <Button
                  onClick={() => handleIntegration("WhatsApp API")}
                  className="bg-blue-600 w-full text-left"
                >
                  <Plus /> WhatsApp API
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleIntegration("Email Service (SMTP)")}
                  className="bg-blue-600 w-full text-left"
                >
                  <Plus /> Email Service (SMTP)
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleIntegration("Google Calendar")}
                  className="bg-blue-600 w-full text-left"
                >
                  <Plus /> Google Calendar
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleIntegration("Slack Integration")}
                  className="bg-blue-600 w-full text-left"
                >
                  <Plus /> Slack Integration
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleIntegration("Zapier")}
                  className="bg-blue-600 w-full text-left"
                >
                  <Plus /> Zapier
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleIntegration("Chatbot (FB Messenger)")}
                  className="bg-blue-600 w-full text-left"
                >
                  <Plus /> Chatbot (FB Messenger)
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleIntegration("Bulk Messaging Service")}
                  className="bg-blue-600 w-full text-left"
                >
                  <Plus /> Bulk Messaging Service
                </Button>
              </li>
            </ul>
            <Button onClick={() => setShowIntegrationsModal(false)} className="mt-4">
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Reports & Metrics Modal */}
      {showReportsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Relatórios & Métricas de Vendas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Total de Vendas</h3>
                <p>R$ {totalSales.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Número de Clientes</h3>
                <p>{crmData.length}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Valor Médio por Venda</h3>
                <p>R$ {averageSale.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Previsão de Vendas Futuras</h3>
                <p>R$ {forecast.toFixed(2)}</p>
              </div>
            </div>
            <Button onClick={() => setShowReportsModal(false)} className="mt-4">
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* CPF (Margem) Modal */}
      {showCpfSearchModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Consulta de Margem</h2>
            <Input
              type="text"
              placeholder="Digite o CPF"
              value={cpfSearch}
              onChange={(e) => setCpfSearch(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <Button onClick={handleCpfSearch} className="mb-4">
              Pesquisar
            </Button>
            {marginContact && (
              <div className="p-4 bg-gray-100 rounded">
                <p>
                  <strong>Valor Liberado:</strong> {marginContact.valorLiberado}
                </p>
                <p>
                  <strong>Parcela:</strong> {marginContact.parcela}
                </p>
                <p>
                  <strong>Banco:</strong> {marginContact.banco}
                </p>
                <p>
                  <strong>Prazo:</strong> {marginContact.prazo}
                </p>
              </div>
            )}
            <Button onClick={() => setShowCpfSearchModal(false)} className="mt-4">
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {showEditModal && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
            <div className="flex flex-col gap-4">
              <label>Nome</label>
              <Input
                type="text"
                value={selectedContact.name || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, name: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>CPF</label>
              <Input
                type="text"
                value={selectedContact.cpf || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, cpf: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Data de Nascimento</label>
              <Input
                type="text"
                value={selectedContact.dataNascimento || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, dataNascimento: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Idade</label>
              <Input
                type="text"
                value={selectedContact.idade || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, idade: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Sigla Aonde Aposentou</label>
              <Input
                type="text"
                value={selectedContact.siglaAposentadoria || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, siglaAposentadoria: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Telefone</label>
              <Input
                type="text"
                value={selectedContact.telefone || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, telefone: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>CEP</label>
              <Input
                type="text"
                value={selectedContact.cep || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, cep: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Número</label>
              <Input
                type="text"
                value={selectedContact.numero || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, numero: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Bairro</label>
              <Input
                type="text"
                value={selectedContact.bairro || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, bairro: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Rua</label>
              <Input
                type="text"
                value={selectedContact.rua || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, rua: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Cidade</label>
              <Input
                type="text"
                value={selectedContact.cidade || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, cidade: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Banco</label>
              <Input
                type="text"
                value={selectedContact.banco || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, banco: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Agência</label>
              <Input
                type="text"
                value={selectedContact.agencia || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, agencia: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Conta Poupança</label>
              <Input
                type="text"
                value={selectedContact.contaPoupanca || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, contaPoupanca: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Conta Corrente</label>
              <Input
                type="text"
                value={selectedContact.contaCorrente || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, contaCorrente: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Benefício</label>
              <Input
                type="text"
                value={selectedContact.beneficio || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, beneficio: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Espécie</label>
              <Input
                type="text"
                value={selectedContact.especie || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, especie: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Salário</label>
              <Input
                type="text"
                value={selectedContact.salario || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, salario: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Convênio</label>
              <Input
                type="text"
                value={selectedContact.convenio || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, convenio: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Produto</label>
              <Input
                type="text"
                value={selectedContact.produto || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, produto: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Parcela</label>
              <Input
                type="text"
                value={selectedContact.parcela || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, parcela: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
              <label>Valor Liberado</label>
              <Input
                type="text"
                value={selectedContact.valorLiberado || ""}
                onChange={(e) =>
                  setSelectedContact({ ...selectedContact, valorLiberado: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <Button onClick={handleSaveContact} className="bg-green-600">
                Salvar
              </Button>
              <Button onClick={() => setShowEditModal(false)} className="bg-red-600">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Automacao Modal => disparo em massa */}
      {showAutomacaoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Disparo em Massa</h2>
            <label className="block mb-2">Mensagem Personalizada</label>
            <Input
              as="textarea"
              value={automationMessage}
              onChange={(e) => setAutomationMessage(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <label className="block mb-2">Intervalo de Envio (segundos)</label>
            <Input
              type="number"
              min="1"
              value={automationInterval}
              onChange={(e) => setAutomationInterval(Number(e.target.value))}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex gap-2 mb-4">
              <Button onClick={handlePlay} className="bg-green-600 flex items-center gap-1">
                <Play size={16} /> Play
              </Button>
              <Button onClick={handlePause} className="bg-yellow-600 flex items-center gap-1">
                <Pause size={16} /> Pause
              </Button>
              <Button onClick={handleStop} className="bg-red-600 flex items-center gap-1">
                <X size={16} /> Stop
              </Button>
            </div>

            <p className="mb-2">Progresso: {automationProgress}%</p>
            <div className="w-full h-4 bg-gray-200 rounded">
              <div
                className="h-4 bg-green-500 rounded"
                style={{ width: `${automationProgress}%` }}
              ></div>
            </div>

            <p className="mt-2">Falhas Simuladas: {automationFailures}</p>

            <div className="flex justify-end mt-4">
              <Button onClick={() => setShowAutomacaoModal(false)}>Fechar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { CardKanban } from "@/components/CardKanban";
import { consultarLeadsPendentes, moverCardParaColuna } from "@/utils/KanbanService";
import { enviarMensagem } from "@/utils/Mensageiro";
import { toast } from "sonner";

// 🔁 Distribuição circular com nomes reais
let indiceDistribuicao = 0;
const distribuirConsultora = (consultoras) => {
  const selecionada = consultoras[indiceDistribuicao % consultoras.length];
  indiceDistribuicao++;
  return selecionada;
};

// ⏱️ Notificação após 30 minutos
const iniciarTemporizador = (cliente, notificar) => {
  setTimeout(() => {
    if (!cliente.assumido) {
      notificar(`⚠️ Cliente ${cliente.nome} ainda não foi assumido após 30 minutos.`);
    }
  }, 30 * 60 * 1000);
};

const Dashboard = () => {
  const [leadsPendentes, setLeadsPendentes] = useState([]);
  const [consultoras] = useState(["Julia", "Maria Julia", "Bia", "Law"]);
  const [colunas, setColunas] = useState({
    Atendimento: [],
    Novo: [],
    Proposta: [],
    Finalizado: [],
  });

  const notificar = (msg) => toast.warning(msg);

  // 🚀 Carrega e distribui os leads com IA
  useEffect(() => {
    const processarLeads = async () => {
      const leads = await consultarLeadsPendentes(); // Simula API
      const atualizados = [];

      for (const cliente of leads) {
        const msg = `Olá ${cliente.nome}, sou da MRG IA Plus. Deseja simular seu consignado agora?`;
        await enviarMensagem(cliente.telefone, msg);

        const resposta = cliente.resposta?.toLowerCase() || "";
        const interessado = ["sim", "quero", "simular", "vamos"].some(p =>
          resposta.includes(p)
        );

        if (interessado) {
          const consultora = distribuirConsultora(consultoras);
          const clienteAtualizado = { ...cliente, status: "Novo", consultora, assumido: false };

          moverCardParaColuna("Novo", clienteAtualizado, setColunas);
          iniciarTemporizador(clienteAtualizado, notificar);
          atualizados.push(clienteAtualizado);
        }
      }

      setLeadsPendentes([]);
    };

    processarLeads();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {Object.entries(colunas).map(([nome, lista]) => (
        <div key={nome} className="bg-white rounded-xl shadow p-2 h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">{nome}</h2>
          {lista.map((card, idx) => (
            <CardKanban key={idx} nome={card.nome} telefone={card.telefone} consultora={card.consultora} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;


// TEST CASES
// "parseCurrency" basic test:
// console.log(parseCurrency("R$ 1.000,50")) => 1000.50
// Additional Test Cases:
// 1) If parseCurrency("R$ 200,00") => 200
// 2) If parseCurrency("R$ 3.500,20") => 3500.20
// 3) Filter by searchTerm => ensure it correctly filters ignoring case.
// 4) Drag and drop from "Novo" to "Analise Crivo" => highlight changes if confirmEnviarProposta.

