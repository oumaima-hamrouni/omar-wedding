import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Heart, MapPin, MessageCircle, Music, Pause, Play, Sparkles } from 'lucide-react';
import coupleImage from './assets/couple-caricature.png';
import './styles.css';

const weddingConfig = {
  couple: 'Bienvenu',
  tagline: 'Avec beaucoup de joie, nous vous invitons à partager avec nous un moment unique à l’occasion de notre dîner de mariage',
  dateLabel: '26 July 2026',
  timeLabel: 'à partir du 5:00 PM',
  locationLabel: 'Club équestre cersina',
  // You can replace this with the exact Google Maps link of the venue.
  mapsUrl: 'https://maps.app.goo.gl/tYo4AFKMwbh4LYRP7',
  // Replace with the real WhatsApp number. Format: country code + number, without + or spaces.
  whatsappNumber: '+216 55 328 575',
  targetDate: '2026-07-26T17:00:00+01:00',
};

function getTimeLeft(targetDate) {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  const total = Math.max(difference, 0);

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  const items = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: pad(timeLeft.hours) },
    { label: 'Minutes', value: pad(timeLeft.minutes) },
    { label: 'Secondes', value: pad(timeLeft.seconds) },
  ];

  return (
    <section className="countdown-card" aria-label="Countdown to the wedding day">
      <p className="section-kicker">COMPTE À REBOURS AVANT LE GRAND JOUR</p>
      <div className="countdown-grid">
        {items.map((item) => (
          <div className="countdown-item" key={item.label}>
            <span className="countdown-value">{item.value}</span>
            <span className="countdown-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      <span>♡</span>
      <span>♡</span>
      <span>♡</span>
      <span>♡</span>
      <span>♡</span>
    </div>
  );
}

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);

  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(
      `Hello Omar! Je confirem notre présence ${weddingConfig.dateLabel} à ${weddingConfig.locationLabel}. ❤️`
    );
    return `https://wa.me/${weddingConfig.whatsappNumber}?text=${message}`;
  }, []);

  return (
    <main className="page-shell">
      <FloatingHearts />

      <section className="invitation-card">
        <div className="top-bar">
         
        </div>

        <header className="hero-header">
          <Sparkles className="sparkle sparkle-left" size={22} />
          <h1>{weddingConfig.couple}</h1>
          <Heart className="heart-icon" size={22} />
          <p>{weddingConfig.tagline}</p>
          <Sparkles className="sparkle sparkle-right" size={22} />
        </header>

        <div className="image-frame">
          <img src={coupleImage} alt="Caricature wedding portrait of Aymen and Rania" />
        </div>

        <section className="message-section">
          <p className="main-message">VOTRE PRÉSENCE SERA UN BONHEUR PARTAGÉ</p>
        </section>

        <Countdown targetDate={weddingConfig.targetDate} />

        <section className="details-grid" aria-label="Wedding details">
          <article className="detail-card">
            <div className="icon-circle"><CalendarDays size={22} /></div>
            
            <p className="detail-main">{weddingConfig.dateLabel}</p>
            <p className="detail-sub">{weddingConfig.timeLabel}</p>
          </article>

          <article className="detail-card">
            <div className="icon-circle"><MapPin size={22} /></div>
            
            <p className="detail-main">{weddingConfig.locationLabel}</p>
            
          </article>
        </section>

        <div className="actions">
          <a className="primary-button" href={weddingConfig.mapsUrl} target="_blank" rel="noreferrer">
            VOIR LA POSITION <span></span>
          </a>
          <a className="secondary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Confirmation WhatsApp
          </a>
        </div>

        <footer className="footer-note">
          <span>♡</span>
          We can’t wait to celebrate with you!
          <span>♡</span>
        </footer>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
