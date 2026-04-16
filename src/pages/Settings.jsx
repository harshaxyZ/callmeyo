import { ArrowLeft, UserPlus, Users, Edit3 } from 'lucide-react';

export default function Settings({ onNavigate }) {
  return (
    <div className="page-overlay slide-in">
      <div className="back-header">
        <button className="icon-button" onClick={() => onNavigate('home')}>
          <ArrowLeft />
        </button>
        <h2>ಸೆಟ್ಟಿಂಗ್ಸ್ (Settings)</h2>
      </div>

      <div className="menu-list">
        <button className="menu-item" onClick={() => onNavigate('add')}>
          <UserPlus />
          ಹೊಸ ಸಂಪರ್ಕ ಸೇರಿಸಿ (Add New Contact)
        </button>
        
        <button className="menu-item" onClick={() => onNavigate('import')}>
          <Users />
          ಸಂಪರ್ಕಗಳನ್ನು ಆಮದು ಮಾಡಿ (Import)
        </button>
        
        <button className="menu-item" onClick={() => onNavigate('edit')}>
          <Edit3 />
          ಸಂಪರ್ಕಗಳನ್ನು ಸಂಪಾದಿಸಿ (Edit Contacts)
        </button>
      </div>
    </div>
  );
}
