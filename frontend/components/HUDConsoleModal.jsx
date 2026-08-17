'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, ShieldAlert, Cpu } from 'lucide-react';
import { hudAudio } from '../lib/hudAudio';

export default function HUDConsoleModal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: 'STARK INDUSTRIES OS // COMMAND TELEMETRY INTERFACE [V4.2.0]', type: 'system' },
    { text: 'Type "help" to list available system commands.', type: 'system' }
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    hudAudio.playClick();

    const newHistory = [...history, { text: `> ${input}`, type: 'cmd' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          text: `AVAILABLE COMMANDS:
  help       - Display command manual
  projects   - List all project case files
  skills     - Display technical stack telemetry
  contact    - Open communication channel coordinates
  status     - Check current system diagnostics
  clear      - Clear terminal screen
  exit       - Close system console`,
          type: 'output'
        });
        break;

      case 'projects':
        newHistory.push({
          text: `CASE FILES:
  01. NEURAL-SYNC AI RAG ENGINE [STATUS: ACTIVE]
  02. PRESCRIPTO HEALTHCARE PLATFORM [STATUS: ACTIVE]
  03. EV BATTERY HEALTH PREDICTOR [STATUS: COMPLETED]
  04. AUTONOMOUS CODE REVIEWER AGENT [STATUS: ACTIVE]`,
          type: 'output'
        });
        break;

      case 'skills':
        newHistory.push({
          text: `CORE TELEMETRY:
  LANGUAGES:   Python (90%), C++ (80%), JS/TS (88%), SQL, HTML/CSS
  FRAMEWORKS:  React, Next.js, Node.js, Express, PyTorch, LangChain
  DATA/VECTOR: MongoDB, PostgreSQL, Redis, Pinecone Vector DB
  CLOUD/TOOLS: AWS EC2/S3, Docker, Git, Linux, Postman`,
          type: 'output'
        });
        break;

      case 'contact':
        newHistory.push({
          text: `COMMUNICATION CHANNEL:
  EMAIL:   arjun.engineering@example.com
  LOC:     Pune, India (18.5204° N, 73.8567° E)
  STATUS:  AVAILABLE FOR SUMMER 2026 INTERNSHIPS & FULL-STACK ROLES`,
          type: 'output'
        });
        break;

      case 'status':
        newHistory.push({
          text: `SYSTEM DIAGNOSTICS:
  CORE_TEMP:    34°C
  MEMORY_USE:   42.8 MB / 1024 MB
  LATENCY:      12ms (PING EXCELLENT)
  ARC_REACTOR:  100% NOMINAL
  SECURITY:     LEVEL 5 CLEARED`,
          type: 'output'
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({
          text: `Command not recognized: "${cmd}". Type "help" for available commands.`,
          type: 'output'
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 6, 8, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="hud-panel hud-corner-brackets"
        style={{
          width: '100%',
          maxWidth: '780px',
          height: '500px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--accent-cyan)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 35px rgba(0, 217, 255, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Window Top Titlebar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.8rem 1.2rem',
            backgroundColor: 'var(--bg-panel)',
            borderBottom: '1px solid var(--border-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent-cyan)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={15} />
            <span style={{ fontWeight: 800, letterSpacing: '0.1em' }}>SYS_CONSOLE // STARK HUD TELEMETRY</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => { hudAudio.playClick(); onClose(); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Close Console"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Terminal History Container */}
        <div
          style={{
            flex: 1,
            padding: '1.2rem',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: '1.6',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap'
          }}
        >
          {history.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '0.6rem',
                color:
                  item.type === 'cmd'
                    ? 'var(--text-primary)'
                    : item.type === 'system'
                    ? 'var(--accent-cyan)'
                    : 'var(--text-secondary)'
              }}
            >
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Row */}
        <form
          onSubmit={handleCommand}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0.8rem 1.2rem',
            backgroundColor: 'var(--bg-panel)',
            borderTop: '1px solid var(--border-primary)'
          }}
        >
          <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. help, projects, skills, status)..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--accent-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}
          >
            EXECUTE
          </button>
        </form>
      </div>
    </div>
  );
}
