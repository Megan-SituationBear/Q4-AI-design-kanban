import React, { useState } from 'react';
import type { Member, Role } from '../types';

interface ShareModalProps {
  open: boolean;
  members: Member[];
  onClose: () => void;
  onSave: (members: Member[]) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ open, members, onClose, onSave }) => {
  const [draftMembers, setDraftMembers] = useState<Member[]>(members);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<Role>('viewer');

  React.useEffect(() => {
    setDraftMembers(members);
  }, [members]);

  if (!open) return null;

  const addMember = () => {
    const email = newEmail.trim();
    if (!email) return;
    const exists = draftMembers.some(m => m.email.toLowerCase() === email.toLowerCase());
    if (exists) return;
    setDraftMembers(prev => [
      ...prev,
      { id: `${Date.now()}`, email, role: newRole },
    ]);
    setNewEmail('');
    setNewRole('viewer');
  };

  const updateRole = (id: string, role: Role) => {
    setDraftMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));
  };

  const removeMember = (id: string) => {
    setDraftMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: 12, width: '100%', maxWidth: 640, padding: 24 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Share Board</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18, color: '#64748b', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Add people</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input 
              type="email" 
              placeholder="email@example.com" 
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              style={{ flex: 1, minWidth: 220, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6 }}
            />
            <select value={newRole} onChange={e => setNewRole(e.target.value as Role)} style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6 }}>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={addMember} style={{ padding: '8px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>Add</button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
          {draftMembers.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>No members yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {draftMembers.map(m => (
                <div key={m.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ flex: 1, color: '#0f172a', fontSize: 14 }}>{m.email}</div>
                  <select value={m.role} onChange={e => updateRole(m.id, e.target.value as Role)} style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: 6 }}>
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button onClick={() => removeMember(m.id)} style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: 6, background: 'white', color: '#ef4444', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <button onClick={onClose} style={{ padding: '8px 14px', border: '1px solid #cbd5e1', borderRadius: 6, background: 'white', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave(draftMembers)} style={{ padding: '8px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;


