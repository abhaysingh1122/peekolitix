import React from 'react';
import './PerspectiveFilter.css';
import { Eye, Shield, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';

const PerspectiveFilter = ({ currentPerspective, setPerspective }) => {
  const { lang } = useLanguage();

  const perspectives = [
    { id: 'NEUTRAL', label: 'Neutral', fullLabel: 'Neutral Analysis', icon: Eye, colorClass: 'neutral' },
    { id: 'PRO_GOV', label: 'Pro-Gov', fullLabel: 'Pro-Gov Emphasis', icon: Shield, colorClass: 'pro' },
    { id: 'ANTI_GOV', label: 'Critical', fullLabel: 'Critical Review', icon: AlertTriangle, colorClass: 'anti' }
  ];

  return (
    <div className="perspective-filter">
      <span className="filter-label">{t('PERSPECTIVE:', lang)}</span>
      <div className="filter-buttons">
        {perspectives.map((p) => {
          const Icon = p.icon;
          const isActive = currentPerspective === p.id;
          return (
            <button
              key={p.id}
              className={`filter-btn ${isActive ? `active ${p.colorClass}` : ''}`}
              onClick={() => setPerspective(p.id)}
              title={p.fullLabel}
            >
              <Icon size={14} className="filter-icon" />
              <span className="btn-text">{t(p.label, lang)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PerspectiveFilter;
