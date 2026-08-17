'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target;
      if (!target) return;

      const cursorAttrTarget = target.closest('[data-cursor]');
      const interactiveTarget = target.closest('a, button, input, textarea, select, [role="button"], .circle-cta, .accordion-header, [onClick]');

      if (cursorAttrTarget) {
        setIsHovered(true);
        setHoverText(cursorAttrTarget.getAttribute('data-cursor') || 'TARGET');
      } else if (interactiveTarget) {
        setIsHovered(true);
        setHoverText('TARGET');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Smooth Lerp Animation Loop for Trailing HUD Reticle Ring
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Precision Arc Cyan Target Center Point */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: '#00d9ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 10px #00d9ff',
          transition: 'opacity 0.2s ease'
        }}
      />

      {/* HUD Targeting Reticle & Metadata Label */}
      <div
        ref={ringRef}
        className="hud-targeting-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? (hoverText ? '68px' : '40px') : '24px',
          height: isHovered ? (hoverText ? '68px' : '40px') : '24px',
          backgroundColor: isHovered
            ? (hoverText ? 'rgba(0, 217, 255, 0.95)' : 'rgba(0, 217, 255, 0.12)')
            : 'rgba(0, 217, 255, 0.04)',
          border: isHovered ? '1px solid #00d9ff' : '1px dashed rgba(0, 217, 255, 0.4)',
          borderRadius: hoverText ? '4px' : '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: hoverText ? '#050608' : '#00d9ff',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.6rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          boxShadow: isHovered ? '0 0 20px rgba(0, 217, 255, 0.4)' : 'none',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-radius 0.2s ease, color 0.2s ease',
          userSelect: 'none'
        }}
      >
        {hoverText}
      </div>
    </>
  );
}
