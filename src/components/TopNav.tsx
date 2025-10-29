import { useState, useEffect } from 'react';
import type { Theme } from '../types';

interface TopNavProps {
  themes: Theme[];
  selectedThemes: Theme[];
  onToggleTheme: (theme: Theme) => void;
}

const themeColors: Record<Theme, string> = {
  'onboarding': '#3b82f6',
  'integrations': '#10b981',
  'library': '#8b5cf6',
  'pricing': '#f59e0b',
  'ai-input': '#ef4444',
  'layout': '#06b6d4'
};

const themeLabels: Record<Theme, string> = {
  'onboarding': 'Onboarding',
  'integrations': 'Integrations',
  'library': 'Library',
  'pricing': 'Pricing',
  'ai-input': 'AI Input',
  'layout': 'Layout'
};

const TopNav: React.FC<TopNavProps> = ({ themes, selectedThemes, onToggleTheme }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav style={{ 
      backgroundColor: 'white', 
      borderBottom: '1px solid #e2e8f0', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50 
    }}>
      <div style={{ maxWidth: '100%', padding: isMobile ? '0 12px' : '0 24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          height: isMobile ? '56px' : '64px' 
        }}>
          {/* Left: Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              overflow: 'hidden'
            }}>
              <img 
                src="/logo.png" 
                alt="Logo" 
                style={{ 
                  width: '24px', 
                  height: '24px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  // Fallback to SVG if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.178 8.00001C16.412 6.23401 13.549 6.23401 11.784 8.00001L12 8.21601L12.216 8.00001C13.982 6.23401 16.845 6.23401 18.611 8.00001C20.377 9.76601 20.377 12.629 18.611 14.394C16.845 16.16 13.982 16.16 12.216 14.394L12 14.178L11.784 14.394C10.018 16.16 7.15497 16.16 5.38897 14.394C3.62297 12.628 3.62297 9.76601 5.38897 8.00001C7.15497 6.23401 10.018 6.23401 11.784 8.00001L12 8.21601L11.784 8.00001C10.018 6.23401 7.15497 6.23401 5.38897 8.00001C3.62297 9.76601 3.62297 12.629 5.38897 14.394C7.15497 16.16 10.018 16.16 11.784 14.394L12 14.178L12.216 14.394C13.982 16.16 16.845 16.16 18.611 14.394C20.377 12.628 20.377 9.76601 18.611 8.00001C16.845 6.23401 13.982 6.23401 12.216 8.00001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  `;
                }}
              />
            </div>
            <div>
              <h1 style={{ 
                fontSize: isMobile ? '16px' : '18px', 
                fontWeight: 'bold', 
                color: '#0f172a', 
                margin: 0 
              }}>
                {isMobile ? 'Q4 Kanban' : 'Q4 AI Design Kanban'}
              </h1>
              {!isMobile && (
                <p style={{ 
                  fontSize: '12px', 
                  color: '#64748b', 
                  margin: 0 
                }}>
                  Design Workflow Tracker
                </p>
              )}
            </div>
          </div>

          {/* Right: Share Button */}
          <button style={{ 
            padding: isMobile ? '6px 12px' : '8px 16px', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            borderRadius: '4px', 
            fontSize: isMobile ? '12px' : '14px', 
            fontWeight: '500', 
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            {isMobile ? 'Share' : 'Share Board'}
          </button>
        </div>
        
        {/* Theme Filter Pills */}
        <div style={{ 
          padding: isMobile ? '8px 12px' : '12px 24px', 
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: isMobile ? '6px' : '8px',
          flexWrap: 'wrap'
        }}>
          {themes.map(theme => (
            <button
              key={theme}
              onClick={() => onToggleTheme(theme)}
              style={{
                padding: isMobile ? '4px 8px' : '6px 12px',
                borderRadius: '16px',
                border: 'none',
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: selectedThemes.includes(theme) 
                  ? themeColors[theme] 
                  : '#f1f5f9',
                color: selectedThemes.includes(theme) 
                  ? 'white' 
                  : '#64748b',
                transition: 'all 0.2s'
              }}
            >
              {themeLabels[theme]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;


