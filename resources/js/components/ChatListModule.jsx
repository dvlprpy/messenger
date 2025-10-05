import React from 'react';
import '../../css/ContactListModule.css';
import EmptyChatState from './EmptyChatState';

export default function ContactListModule({ chat_users_profile = [], last_message = [], onChatSelect }) {  

  const lastMessageMap = React.useMemo(() => {
    const map = {};
    (last_message || []).forEach(msg => {
      if (msg && typeof msg.sender_id !== 'undefined') map[msg.sender_id] = msg;
    });
    return map;
  }, [last_message]);

  const formatTime = (ts) => {
    if (!ts) return '';
    const safe = ts.includes('T') ? ts : ts.replace(' ', 'T');
    const d = new Date(safe);
    if (isNaN(d)) return '';
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const handleClick = (user) => {
    if (typeof onChatSelect === 'function') onChatSelect(user.chat_id, user);
    else console.log('Open chat_id:', user.chat_id, 'user:', user);
  };

  const isTrue = () => {
    setShowContactModule(true)
    console.log('isTrue is clicked');
    
  }

  return (
    <div className="contact-list ms-2 me-2">
      {
        chat_users_profile.length > 0 && last_message.length > 0 ? 
          <>
            {
              chat_users_profile.map(user => {
                const message = lastMessageMap[user.user_id];
                const time = message ? formatTime(message.last_message_time) : '';
                const unread = message && typeof message.unread_count === 'number' ? message.unread_count : 0;

                return (
                  <div
                    key={user.user_id}
                    className="chat-info row align-items-center py-2 border-bottom hover-bg"
                    style={{ cursor: 'pointer', transition: 'background-color 0.2s ease' }}
                    onClick={() => handleClick(user)}
                  >
                    {/* ستون آواتار */}
                    <div className="col-auto">
                      <img
                        src={user.user_avatar}
                        alt={user.user_name}
                        className="rounded-circle"
                        style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/Icon/avatar.svg'; }}
                      />
                    </div>

                    {/* ستون نام و پیام */}
                    <div className="col min-w-0">
                      <div className="fw-semibold text-truncate">{user.user_name}</div>
                      <div className="text-muted small text-truncate">
                        {message ? message.last_message : 'تاریخچه پاک شده'}
                      </div>
                    </div>

                    {/* ستون زمان و badge */}
                    <div className="col-auto text-end">
                      {unread > 0 && (
                        <span className="badge bg-info text-white fw-bold mt-1">{unread}</span>
                      )}
                      <div className="small text-muted">{time}</div>
                    </div>
                  </div>
                );
              })
            }
          </> : <>
            {
              <EmptyChatState />
            }
          </>
      }
    </div>
  );
}
