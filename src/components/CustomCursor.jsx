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
    // Only active on fine pointer (mouse/trackpad) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Check hover target under current cursor position
      const target = e.target;
      if (!target) return;

      const cursorAttrTarget = target.closest('[data-cursor]');
      const interactiveTarget = target.closest('a, button, input, textarea, select, [role="button"], .circle-cta, .accordion-header, [onClick]');

      if (cursorAttrTarget) {
        setIsHovered(true);
        setHoverText(cursorAttrTarget.getAttribute('data-cursor') || '');
      } else if (interactiveTarget) {
        setIsHovered(true);
        setHoverText('');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Smooth Lerp Animation Loop for Follower Ring
    const render = () => {
      // Lerp ring position towards mouse position (factor ~ 0.18 for smooth organic trailing)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

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

  // Return null on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: hoverText ? 'transparent' : 'var(--accent-lime, #b8ff35)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, background-color 0.2s ease, width 0.2s ease, height 0.2s ease',
          boxShadow: '0 0 8px rgba(184, 255, 53, 0.8)'
        }}
      />

      {/* Fluid Trailing Outer Ring / Text Pill */}
      <div
        ref={ringRef}
        className="custom-cursor-follower"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? (hoverText ? '72px' : '44px') : '22px',
          height: isHovered ? (hoverText ? '72px' : '44px') : '22px',
          backgroundColor: isHovered
            ? (hoverText ? 'var(--accent-lime, #b8ff35)' : 'rgba(184, 255, 53, 0.15)')
            : 'rgba(184, 255, 53, 0.08)',
          border: isHovered
            ? (hoverText ? 'none' : '1.5px solid var(--accent-lime, #b8ff35)')
            : '1px solid rgba(184, 255, 53, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0b0b0b',
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          backdropFilter: isHovered && !hoverText ? 'blur(3px)' : 'none',
          boxShadow: isHovered
            ? (hoverText ? '0 10px 30px rgba(184, 255, 53, 0.4)' : '0 0 15px rgba(184, 255, 53, 0.25)')
            : 'none',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease',
          userSelect: 'none'
        }}
      >
        {hoverText}
      </div>
    </>
  );
}
