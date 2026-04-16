import { useState } from 'react';
import { ArrowLeft, Trash2, Edit2, Save, X } from 'lucide-react';
import { useContacts } from '../ContactContext';

export default function EditContacts({ onNavigate }) {
  const { contacts, deleteContact, updateContact } = useContacts();
  const [editingId, setEditingId] = useState(null);
  
  // Edit form state
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editKannada, setEditKannada] = useState('');

  const startEdit = (contact) => {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditPhone(contact.phone);
    setEditKannada(contact.kannadaName || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id) => {
    updateContact(id, {
      name: editName,
      phone: editPhone,
      kannadaName: editKannada
    });
    setEditingId(null);
  };

  return (
    <div className="page-overlay slide-in">
      <div className="back-header">
        <button className="icon-button" onClick={() => onNavigate('settings')}>
          <ArrowLeft />
        </button>
        <h2>ಸಂಪರ್ಕಗಳನ್ನು ಸಂಪಾದಿಸಿ (Edit)</h2>
      </div>

      {contacts.length === 0 ? (
        <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem'}}>No contacts to edit.</p>
      ) : (
        <div className="edit-list">
          {contacts.map(contact => (
            <div key={contact.id} className="edit-item">
              {editingId === contact.id ? (
                <div style={{width: '100%'}}>
                  <div className="form-group" style={{marginBottom: '10px'}}>
                    <input 
                      className="form-input" 
                      value={editName} 
                      onChange={e => setEditName(e.target.value)} 
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group" style={{marginBottom: '10px'}}>
                    <input 
                      className="form-input" 
                      value={editKannada} 
                      onChange={e => setEditKannada(e.target.value)} 
                      placeholder="Kannada Name"
                    />
                  </div>
                  <div className="form-group" style={{marginBottom: '10px'}}>
                    <input 
                      className="form-input" 
                      value={editPhone} 
                      onChange={e => setEditPhone(e.target.value)} 
                      placeholder="Phone"
                    />
                  </div>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn-primary" style={{marginTop: 0, flex: 1}} onClick={() => saveEdit(contact.id)}>
                      <Save size={20}/> ಉಳಿಸು
                    </button>
                    <button className="btn-icon danger" onClick={cancelEdit} style={{borderRadius: 'var(--radius-md)', padding: '0 20px', width: 'auto'}}>
                      <X />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="edit-info">
                    <div className="avatar">
                      {contact.photo ? (
                        <img src={contact.photo} alt={contact.name} style={{width: '100%', height:'100%', borderRadius: '50%', objectFit: 'cover'}} />
                      ) : (
                        contact.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div style={{fontWeight: 600, fontSize: '1.2rem'}}>{contact.name} {contact.kannadaName && `(${contact.kannadaName})`}</div>
                      <div style={{color: 'var(--text-secondary)'}}>{contact.phone}</div>
                    </div>
                  </div>
                  <div className="edit-actions">
                    <button className="btn-icon" onClick={() => startEdit(contact)}>
                      <Edit2 size={20} />
                    </button>
                    <button className="btn-icon danger" onClick={() => deleteContact(contact.id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
