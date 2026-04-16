import { Settings as SettingsIcon, User } from 'lucide-react';
import { useContacts } from '../ContactContext';

export default function Home({ onNavigate }) {
  const { contacts, loading } = useContacts();

  if (loading) return null;

  return (
    <div className="fade-in">
      <header className="header">
        <h1>ಕಾಲ್ (Call)</h1>
        <button className="icon-button" onClick={() => onNavigate('settings')}>
          <SettingsIcon />
        </button>
      </header>
      
      {contacts.length === 0 ? (
        <div className="empty-state">
          <User />
          <h2>No Contacts</h2>
          <p>Tap settings to add some</p>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact) => (
             /* `tel:${number}` makes it directly call the number when tapped */
            <a 
              key={contact.id} 
              href={`tel:${contact.phone}`} 
              className="contact-card"
            >
              <div className="avatar">
                {contact.photo ? (
                  <img src={contact.photo} alt={contact.name} style={{width: '100%', height:'100%', borderRadius: '50%', objectFit: 'cover'}} />
                ) : (
                  contact.name.charAt(0).toUpperCase()
                )}
              </div>
              {contact.kannadaName && (
                <div className="kannada-name-large">{contact.kannadaName}</div>
              )}
              <div className="contact-name">{contact.name}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
