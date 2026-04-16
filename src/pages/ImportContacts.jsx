import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Download } from 'lucide-react';
import { useContacts } from '../ContactContext';

// Some mock contacts for demonstration if native API is absent
const MOCK_CONTACTS = [
  { id: '1', name: 'Ravi Kumar', kannadaName: 'ರವಿ ಕುಮಾರ್', phone: '9876543210' },
  { id: '2', name: 'Lakshmi', kannadaName: 'ಲಕ್ಷ್ಮಿ', phone: '9123456780' },
  { id: '3', name: 'Doctor', kannadaName: 'ಡಾಕ್ಟರ್', phone: '9988776655' }
];

export default function ImportContacts({ onNavigate }) {
  const { addMultipleContacts, contacts: existingContacts } = useContacts();
  const [isNativeSupported, setIsNativeSupported] = useState(
    'contacts' in navigator && 'ContactsManager' in window
  );
  
  const [availableContacts, setAvailableContacts] = useState(
    isNativeSupported ? [] : MOCK_CONTACTS
  );
  
  const [selectedIds, setSelectedIds] = useState([]);

  const handleNativeImport = async () => {
    try {
      const props = ['name', 'tel', 'icon'];
      const opts = { multiple: true };
      const contacts = await navigator.contacts.select(props, opts);
      
      const formatted = contacts.map(c => ({
        name: c.name?.[0] || 'Unknown',
        phone: c.tel?.[0] || '',
        kannadaName: '', // Usually not provided by native picker, user can edit later
        photo: c.icon?.[0] ? URL.createObjectURL(c.icon[0]) : null
      })).filter(c => c.phone);
      
      addMultipleContacts(formatted);
      onNavigate('home');
    } catch (ex) {
      console.error('Contact selection failed', ex);
      alert('Native import failed. Using fallback.');
      setIsNativeSupported(false);
      setAvailableContacts(MOCK_CONTACTS);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleManualImport = () => {
    const toImport = availableContacts.filter(c => selectedIds.includes(c.id)).map(c => ({
      name: c.name,
      phone: c.phone,
      kannadaName: c.kannadaName || '',
      photo: c.photo || null
    }));
    addMultipleContacts(toImport);
    onNavigate('home');
  };

  return (
    <div className="page-overlay slide-in">
      <div className="back-header">
        <button className="icon-button" onClick={() => onNavigate('settings')}>
          <ArrowLeft />
        </button>
        <h2>ಆಮದು ಮಾಡಿಕೊಳ್ಳಿ (Import)</h2>
      </div>

      {isNativeSupported ? (
        <div className="empty-state">
           <Download size={64} style={{color: 'var(--accent-color)', marginBottom: '16px'}} />
           <p style={{marginBottom: '24px'}}>Your phone supports native contact importing.</p>
           <button className="btn-primary" onClick={handleNativeImport}>
             ಫೋನ್‌ನಿಂದ ಆಮದು ಮಾಡಿ (Open Contacts)
           </button>
        </div>
      ) : (
        <>
          <p style={{marginBottom: '16px', color: 'var(--text-secondary)'}}>
            (ಡಿವೈಸ್ ಬೆಂಬಲವಿಲ್ಲ, ಉದಾಹರಣೆ ಸಂಪರ್ಕಗಳು / Device API not supported, showing sample list)
          </p>
          <div className="import-list">
            {availableContacts.map(contact => (
              <div 
                key={contact.id} 
                className={`import-item ${selectedIds.includes(contact.id) ? 'selected' : ''}`}
                onClick={() => toggleSelect(contact.id)}
              >
                <div className="checkbox">
                  {selectedIds.includes(contact.id) && <CheckCircle size={18} />}
                </div>
                <div className="import-details">
                  <div className="import-name">{contact.name} {contact.kannadaName && `(${contact.kannadaName})`}</div>
                  <div className="import-number">{contact.phone}</div>
                </div>
              </div>
            ))}
          </div>

          {selectedIds.length > 0 && (
            <button className="btn-primary" onClick={handleManualImport}>
              ಆಮದು ಮಾಡಿ (Import Selected)
            </button>
          )}
        </>
      )}
    </div>
  );
}
