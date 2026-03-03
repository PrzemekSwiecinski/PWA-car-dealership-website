import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { Auto } from '../types/types';

interface CarCardProps {
  auto: Auto;
}

export const CarCard = ({ auto }: CarCardProps) => {
  const [showModal, setShowModal] = useState(false);
  
  const [isEngineExpanded, setIsEngineExpanded] = useState(false);
  const [isMileageExpanded, setIsMileageExpanded] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setIsEngineExpanded(false);
    setIsMileageExpanded(false);
  };

  return (
    <article className="car-card">
      
      {auto.zdjecieUrl ? (
        <img 
          src={auto.zdjecieUrl} 
          alt={`${auto.marka} ${auto.model}`} 
          className="car-image"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        <div className="car-image-placeholder">Brak zdjęcia</div>
      )}

      <div className="card-content">
        <div className="car-header">
          <div>
            <h2>{auto.marka} {auto.model}</h2>
            <span className="car-year">{auto.rocznik}</span>
          </div>
        </div>
        
        <p className="price-row">
          <strong>Cena:</strong> 
          <span className="price">{auto.cena.toLocaleString('pl-PL')} PLN</span>
        </p>

        <button 
          className="btn-buy" 
          onClick={() => setShowModal(true)}
        >
          Pokaż ogłoszenie
        </button>
      </div>

      {showModal && createPortal(
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btn" onClick={closeModal}>✕</button>
            
            <h2 className="modal-title">{auto.marka} {auto.model} ({auto.rocznik})</h2>
            
            {auto.zdjecieUrl && (
              <img 
                src={auto.zdjecieUrl} 
                alt="Podgląd" 
                style={{ width: '100%', borderRadius: '8px', marginBottom: '20px', maxHeight: '300px', objectFit: 'cover' }} 
              />
            )}

            <button 
              className={`accordion-btn ${isEngineExpanded ? 'active' : ''}`}
              onClick={() => setIsEngineExpanded(!isEngineExpanded)}
            >
              <span>Parametry Silnika</span>
              <span className="arrow">{isEngineExpanded ? '🔼' : '🔽'}</span>
            </button>
            
            {isEngineExpanded && (
              <div className="accordion-content">
                <div className="specs-grid">
                  <div className="spec-item">
                    <span>Moc</span> 
                    <strong>{auto.silnik.moc_km} KM</strong>
                  </div>
                  <div className="spec-item">
                    <span>Paliwo</span> 
                    <strong>{auto.silnik.rodzaj_paliwa}</strong>
                  </div>
                  <div className="spec-item">
                    <span>Pojemność</span> 
                    <strong>{auto.silnik.pojemnosc} L</strong>
                  </div>
                </div>
              </div>
            )}

            <button 
              className={`accordion-btn ${isMileageExpanded ? 'active' : ''}`}
              onClick={() => setIsMileageExpanded(!isMileageExpanded)}
            >
              <span>Example: Historia Przebiegu</span>
              <span className="arrow">{isMileageExpanded ? '🔼' : '🔽'}</span>
            </button>

            {isMileageExpanded && (
              <div className="accordion-content">
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <p style={{ fontSize: '1.2rem', margin: '0 0 10px 0' }}>
                    Stan licznika: <strong>{auto.przebieg.ile.toLocaleString('pl-PL')} km</strong>
                  </p>
                  
                  {auto.przebieg.czy_cofany ? (
                    <div className="badge warning" style={{width: '100%'}}>Cofnięty licznik</div>
                  ) : (
                    <div className="badge success" style={{width: '100%'}}>Przebieg zweryfikowany</div>
                  )}
                </div>
              </div>
            )}

            <p style={{ marginTop: '30px', lineHeight: '1.6', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              Zapraszamy do kontaktu telefonicznego w celu umówienia jazdy próbnej. 
              Auto dostępne od ręki w naszym salonie.
            </p>

            <button 
              className="btn-buy" 
              style={{ backgroundColor: '#10b981', marginTop: '10px' }}
              onClick={() => alert('Dzwonię do sprzedawcy...')}
            >
              Zadzwoń do nas
            </button>
          </div>
        </div>,
        document.body
      )}

    </article>
  );
};
