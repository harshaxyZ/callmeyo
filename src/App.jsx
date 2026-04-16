import { useState } from 'react';
import { ContactProvider } from './ContactContext';
import Home from './pages/Home';
import Settings from './pages/Settings';
import AddContact from './pages/AddContact';
import ImportContacts from './pages/ImportContacts';
import EditContacts from './pages/EditContacts';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => setCurrentPage(page);

  return (
    <div className="app-container">
      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'settings' && <Settings onNavigate={navigate} />}
      {currentPage === 'add' && <AddContact onNavigate={navigate} />}
      {currentPage === 'import' && <ImportContacts onNavigate={navigate} />}
      {currentPage === 'edit' && <EditContacts onNavigate={navigate} />}
    </div>
  );
}

function App() {
  return (
    <ContactProvider>
      <AppContent />
    </ContactProvider>
  );
}

export default App;
