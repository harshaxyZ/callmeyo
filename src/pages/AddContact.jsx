import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { useContacts } from '../ContactContext';

export default function AddContact({ onNavigate }) {
  const { addContact } = useContacts();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [kannadaName, setKannadaName] = useState('');
  const [photo, setPhoto] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !phone) return alert('Name and Phone are required!');
    
    addContact({ name, phone, kannadaName, photo });
    onNavigate('home');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-overlay slide-in">
      <div className="back-header">
        <button className="icon-button" onClick={() => onNavigate('settings')}>
          <ArrowLeft />
        </button>
        <h2>ಹೊಸ ಸಂಪರ್ಕ (New Contact)</h2>
      </div>

      <div className="image-upload-wrapper">
        <div className="image-preview" onClick={() => fileInputRef.current.click()}>
          {photo ? (
            <img src={photo} alt="Preview" />
          ) : (
            <Camera />
          )}
        </div>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden-input" 
          ref={fileInputRef}
          onChange={handlePhotoUpload}
        />
        <p style={{marginTop: '8px', color: 'var(--text-secondary)'}}>ಪ್ಲಿಕ ಮಾಡಿ (Tap to add photo)</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label">ಹೆಸರು (Name)</label>
          <input 
            type="text" 
            className="form-input" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">ಕನ್ನಡದಲ್ಲಿ ಹೆಸರು (Kannada Name) *Optional</label>
          <input 
            type="text" 
            className="form-input" 
            value={kannadaName}
            onChange={(e) => setKannadaName(e.target.value)}
            placeholder="ಜಾನ್"
          />
        </div>

        <div className="form-group">
          <label className="form-label">ಫೋನ್ ಸಂಖ್ಯೆ (Phone Number)</label>
          <input 
            type="tel" 
            className="form-input" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>

        <button type="submit" className="btn-primary">
          <Check /> ಉಳಿಸು (Save)
        </button>
      </form>
    </div>
  );
}
