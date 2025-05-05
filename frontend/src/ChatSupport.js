import React, { useState } from 'react';
import Button from './Button';

const ChatSupport = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    // Simuler une réponse automatique
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: "Merci pour votre message, un agent vous répondra bientôt." }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open ? (
        <div className="bg-surface p-4 rounded shadow-lg w-80">
          <div className="font-bold mb-2">Support en ligne</div>
          <div className="h-40 overflow-y-auto bg-background p-2 mb-2 rounded border">
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'bot' ? 'text-accent' : 'text-primary'}>{m.text}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="border rounded p-1 flex-1"
              placeholder="Votre message..."
              aria-label="Message support"
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <Button variant="primary" onClick={handleSend} aria-label="Envoyer message">Envoyer</Button>
            <Button variant="secondary" onClick={() => setOpen(false)} aria-label="Fermer chat">Fermer</Button>
          </div>
        </div>
      ) : (
        <Button variant="accent" onClick={() => setOpen(true)} aria-label="Ouvrir chat support">
          Chat support
        </Button>
      )}
    </div>
  );
};

export default ChatSupport;
