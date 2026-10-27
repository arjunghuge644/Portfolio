/**
 * Automated Test Suite for Core Portfolio Interactions
 * Validates Navigation, Scroll Spy, Mobile Drawer, Dual-Mode Switcher,
 * Modal / Lightbox, Focus Trap, Escape Dismissal, External Links,
 * Toast Notifications, and Contact Form Validation & Submission Integrity.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

// Read index.html fixture into JSDOM environment
const htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Portfolio Core Interactions & Accessibility Test Suite', () => {
  let mainModule;

  beforeEach(async () => {
    // Reset document body
    document.documentElement.innerHTML = htmlContent;

    // Reset window.scrollY
    window.scrollY = 0;

    // Mock window.scrollTo
    window.scrollTo = vi.fn((opts) => {
      window.scrollY = typeof opts === 'object' ? opts.top : opts;
    });

    // Mock fetch for submission testing
    global.fetch = vi.fn();

    // Import fresh module
    vi.resetModules();
    mainModule = await import('../src/main.js');
    mainModule.init();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /* --------------------------------------------------------------------------
     1. Header Navigation & Active Links
     -------------------------------------------------------------------------- */
  describe('Header Navigation & Scroll Spy', () => {
    it('initializes with Home nav-item marked active with aria-current="page"', () => {
      const navHome = document.getElementById('navHome');
      expect(navHome.classList.contains('active')).toBe(true);
      expect(navHome.getAttribute('aria-current')).toBe('page');
    });

    it('has an accessible skip-to-content link targeting #main', () => {
      const skipLink = document.querySelector('.skip-link');
      expect(skipLink).not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main');
      const mainEl = document.getElementById('main');
      expect(mainEl).not.toBeNull();
      expect(mainEl.getAttribute('tabindex')).toBe('-1');
    });

    it('updates scroll spy and header sticky classes on scroll', () => {
      const header = document.getElementById('header');
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
      expect(header.classList.contains('scrolled')).toBe(true);

      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
      expect(header.classList.contains('scrolled')).toBe(false);
    });

    it('toggles back-to-top button visibility and tabindex based on scroll depth', () => {
      const backToTopBtn = document.getElementById('backToTopBtn');
      expect(backToTopBtn.classList.contains('visible')).toBe(false);
      expect(backToTopBtn.getAttribute('tabindex')).toBe('-1');

      // Scroll past 500px threshold
      window.scrollY = 650;
      window.dispatchEvent(new Event('scroll'));
      expect(backToTopBtn.classList.contains('visible')).toBe(true);
      expect(backToTopBtn.getAttribute('tabindex')).toBe('0');
      expect(backToTopBtn.getAttribute('aria-hidden')).toBe('false');

      // Scroll back up
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
      expect(backToTopBtn.classList.contains('visible')).toBe(false);
      expect(backToTopBtn.getAttribute('tabindex')).toBe('-1');
    });

    it('smoothly scrolls to top and focuses main content on back-to-top click', () => {
      const backToTopBtn = document.getElementById('backToTopBtn');
      const mainEl = document.getElementById('main');
      const focusSpy = vi.spyOn(mainEl, 'focus');

      backToTopBtn.click();
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  /* --------------------------------------------------------------------------
     2. Mobile Drawer Navigation & ARIA State
     -------------------------------------------------------------------------- */
  describe('Mobile Drawer Navigation', () => {
    it('toggles mobile drawer open and synchronizes ARIA expanded attributes', () => {
      const toggle = document.getElementById('mobileMenuToggle');
      const drawer = document.getElementById('mobileDrawer');

      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(drawer.classList.contains('open')).toBe(false);
      expect(drawer.getAttribute('aria-hidden')).toBe('true');

      // Open drawer
      toggle.click();
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      expect(toggle.classList.contains('active')).toBe(true);
      expect(drawer.classList.contains('open')).toBe(true);
      expect(drawer.getAttribute('aria-hidden')).toBe('false');

      // Close drawer
      toggle.click();
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(drawer.classList.contains('open')).toBe(false);
      expect(drawer.getAttribute('aria-hidden')).toBe('true');
    });

    it('dismisses mobile drawer on Escape key and returns focus to menu toggle', () => {
      const toggle = document.getElementById('mobileMenuToggle');
      const drawer = document.getElementById('mobileDrawer');

      toggle.click();
      expect(drawer.classList.contains('open')).toBe(true);

      const toggleFocusSpy = vi.spyOn(toggle, 'focus');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(drawer.classList.contains('open')).toBe(false);
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(toggleFocusSpy).toHaveBeenCalled();
    });

    it('closes mobile drawer when a mobile navigation link is clicked', () => {
      const toggle = document.getElementById('mobileMenuToggle');
      const drawer = document.getElementById('mobileDrawer');
      const firstLink = drawer.querySelector('.mobile-nav-link');

      toggle.click();
      expect(drawer.classList.contains('open')).toBe(true);

      firstLink.click();
      expect(drawer.classList.contains('open')).toBe(false);
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });
  });

  /* --------------------------------------------------------------------------
     3. Dual-Mode Switcher (Arjun Live Mode vs. Figma Sample Mode)
     -------------------------------------------------------------------------- */
  describe('Dual-Mode Switching', () => {
    it('starts in Arjun Live Mode by default', () => {
      expect(mainModule.getCurrentMode()).toBe('arjun');
      const heroGreeting = document.getElementById('heroGreeting');
      expect(heroGreeting.textContent).toContain('Hey, I am Arjun');

      const toggleBtn = document.getElementById('modeToggleBtn');
      expect(toggleBtn.getAttribute('aria-checked')).toBe('true');
      expect(toggleBtn.classList.contains('arjun-active')).toBe(true);
    });

    it('switches to Figma View and updates DOM content and ARIA state', () => {
      const toggleBtn = document.getElementById('modeToggleBtn');
      toggleBtn.click();

      expect(mainModule.getCurrentMode()).toBe('figma');
      expect(toggleBtn.getAttribute('aria-checked')).toBe('false');
      expect(toggleBtn.classList.contains('arjun-active')).toBe(false);

      const heroGreeting = document.getElementById('heroGreeting');
      expect(heroGreeting.textContent).toContain('Hey, I am John');

      // Renders 3 Figma projects
      const cards = document.querySelectorAll('.portfolio-card');
      expect(cards.length).toBe(3);

      // Social button changes to Dribbble
      const socialBtn = document.getElementById('portfolioSocialBtn');
      expect(socialBtn.href).toBe('https://dribbble.com/');
    });

    it('switches back to Arjun View when clicked again', () => {
      const toggleBtn = document.getElementById('modeToggleBtn');
      toggleBtn.click(); // to figma
      toggleBtn.click(); // back to arjun

      expect(mainModule.getCurrentMode()).toBe('arjun');
      expect(toggleBtn.getAttribute('aria-checked')).toBe('true');

      const heroGreeting = document.getElementById('heroGreeting');
      expect(heroGreeting.textContent).toContain('Hey, I am Arjun');

      // Renders 6 Arjun projects
      const cards = document.querySelectorAll('.portfolio-card');
      expect(cards.length).toBe(6);

      // Social button is GitHub
      const socialBtn = document.getElementById('portfolioSocialBtn');
      expect(socialBtn.href).toBe('https://github.com/arjunghuge644');
    });
  });

  /* --------------------------------------------------------------------------
     4. Project Modal / Lightbox, Focus Trap & Escape Dismissal
     -------------------------------------------------------------------------- */
  describe('Project Modal / Lightbox & Focus Management', () => {
    it('opens project modal on card media click with correct project information', () => {
      const modal = document.getElementById('projectModal');
      const firstCardMedia = document.querySelector('.portfolio-card .portfolio-media');

      expect(modal.classList.contains('open')).toBe(false);
      expect(modal.getAttribute('aria-hidden')).toBe('true');

      firstCardMedia.click();

      expect(modal.classList.contains('open')).toBe(true);
      expect(modal.getAttribute('aria-hidden')).toBe('false');
      expect(modal.getAttribute('aria-modal')).toBe('true');

      const modalTitle = document.getElementById('modalTitle');
      expect(modalTitle.textContent).toBe('CAREERPULSE');
    });

    it('opens project modal on keyboard Enter key on card title trigger', () => {
      const modal = document.getElementById('projectModal');
      const firstCardTitle = document.querySelector('.portfolio-card .portfolio-name');

      firstCardTitle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(modal.classList.contains('open')).toBe(true);
      expect(document.getElementById('modalTitle').textContent).toBe('CAREERPULSE');
    });

    it('dismisses modal on Escape key and restores focus to triggering element', () => {
      const modal = document.getElementById('projectModal');
      const firstCardTitle = document.querySelector('.portfolio-card .portfolio-name');

      firstCardTitle.focus();
      firstCardTitle.click();
      expect(modal.classList.contains('open')).toBe(true);

      const restoreFocusSpy = vi.spyOn(firstCardTitle, 'focus');

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(modal.classList.contains('open')).toBe(false);
      expect(modal.getAttribute('aria-hidden')).toBe('true');
      expect(restoreFocusSpy).toHaveBeenCalled();
    });

    it('dismisses modal on close button click and backdrop click', () => {
      const modal = document.getElementById('projectModal');
      const closeBtn = document.getElementById('modalCloseBtn');
      const backdrop = document.getElementById('modalBackdrop');
      const firstCard = document.querySelector('.portfolio-card .portfolio-media');

      // Test close button
      firstCard.click();
      expect(modal.classList.contains('open')).toBe(true);
      closeBtn.click();
      expect(modal.classList.contains('open')).toBe(false);

      // Test backdrop click
      firstCard.click();
      expect(modal.classList.contains('open')).toBe(true);
      backdrop.click();
      expect(modal.classList.contains('open')).toBe(false);
    });

    it('traps focus inside the modal when pressing Tab on the last element', () => {
      const modal = document.getElementById('projectModal');
      const firstCard = document.querySelector('.portfolio-card .portfolio-media');
      firstCard.click();

      const focusableEls = modal.querySelectorAll('button:not([disabled]), [href]');
      const firstFocusable = focusableEls[0]; // closeBtn
      const lastFocusable = focusableEls[focusableEls.length - 1]; // Close Preview button

      // Place focus on last element and simulate Tab key
      lastFocusable.focus();
      const firstFocusSpy = vi.spyOn(firstFocusable, 'focus');

      modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true }));
      expect(firstFocusSpy).toHaveBeenCalled();
    });

    it('traps focus inside the modal when pressing Shift+Tab on the first element', () => {
      const modal = document.getElementById('projectModal');
      const firstCard = document.querySelector('.portfolio-card .portfolio-media');
      firstCard.click();

      const focusableEls = modal.querySelectorAll('button:not([disabled]), [href]');
      const firstFocusable = focusableEls[0];
      const lastFocusable = focusableEls[focusableEls.length - 1];

      firstFocusable.focus();
      const lastFocusSpy = vi.spyOn(lastFocusable, 'focus');

      modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));
      expect(lastFocusSpy).toHaveBeenCalled();
    });
  });

  /* --------------------------------------------------------------------------
     5. External Links Verification
     -------------------------------------------------------------------------- */
  describe('External Links & Advertising Actions', () => {
    it('verifies portfolio-link is not prevented and opens the external repository in new tab', () => {
      const firstCardLink = document.querySelector('.portfolio-card .portfolio-link');
      expect(firstCardLink.getAttribute('target')).toBe('_blank');
      expect(firstCardLink.getAttribute('rel')).toBe('noopener noreferrer');
      expect(firstCardLink.href).toBe('https://github.com/arjunghuge644/CareerPulse');

      // Dispatching a click event does NOT prevent default
      const clickEvent = new MouseEvent('click', { cancelable: true });
      firstCardLink.dispatchEvent(clickEvent);
      expect(clickEvent.defaultPrevented).toBe(false);
    });

    it('verifies verified social links in footer have secure target and rel attributes', () => {
      const githubLink = document.getElementById('footerGithubLink');
      const linkedinLink = document.getElementById('footerLinkedinLink');

      expect(githubLink.href).toBe('https://github.com/arjunghuge644');
      expect(githubLink.getAttribute('target')).toBe('_blank');
      expect(githubLink.getAttribute('rel')).toBe('noopener noreferrer');

      expect(linkedinLink.href).toBe('https://in.linkedin.com/in/arjun-ghuge-18903a2b8');
      expect(linkedinLink.getAttribute('target')).toBe('_blank');
      expect(linkedinLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('opens legal notices via modal for footer legal buttons', () => {
      const privacyBtn = document.getElementById('legalPrivacyBtn');
      const modal = document.getElementById('projectModal');

      privacyBtn.click();
      expect(modal.classList.contains('open')).toBe(true);
      expect(document.getElementById('modalTitle').textContent).toContain('Privacy Policy');

      mainModule.closeProjectModal();
      expect(modal.classList.contains('open')).toBe(false);
    });
  });

  /* --------------------------------------------------------------------------
     6. Toast Messages
     -------------------------------------------------------------------------- */
  describe('Toast Notifications', () => {
    it('displays toast with correct styling class and icon for different types', () => {
      const toast = document.getElementById('toastNotification');
      const icon = document.getElementById('toastIcon');

      // Error toast
      mainModule.showToast('Validation failed', 'error');
      expect(toast.classList.contains('show')).toBe(true);
      expect(toast.classList.contains('toast-error')).toBe(true);
      expect(icon.textContent).toBe('!');

      // Success toast
      mainModule.showToast('Sent successfully', 'success');
      expect(toast.classList.contains('toast-success')).toBe(true);
      expect(icon.textContent).toBe('✓');

      // Info toast
      mainModule.showToast('Info notice', 'info');
      expect(toast.classList.contains('toast-info')).toBe(true);
      expect(icon.textContent).toBe('ℹ');
    });

    it('hides toast when dismiss close button is clicked', () => {
      const toast = document.getElementById('toastNotification');
      const closeBtn = document.getElementById('toastCloseBtn');

      mainModule.showToast('Sample message', 'info');
      expect(toast.classList.contains('show')).toBe(true);

      closeBtn.click();
      expect(toast.classList.contains('show')).toBe(false);
    });
  });

  /* --------------------------------------------------------------------------
     7. Contact Form Validation & Honest Submission Integrity
     -------------------------------------------------------------------------- */
  describe('Contact Form Validation & Submission Behavior', () => {
    it('fails validation when required fields are missing or invalid', () => {
      const invalidData = {
        firstName: '',
        lastName: '',
        email: 'not-an-email',
        phone: '123',
        topic: '',
        message: 'short',
        terms: false
      };

      const result = mainModule.validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.firstName).toBeDefined();
      expect(result.errors.lastName).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.phone).toBeDefined();
      expect(result.errors.topic).toBeDefined();
      expect(result.errors.message).toBeDefined();
      expect(result.errors.terms).toBeDefined();
    });

    it('passes validation when all fields meet formatting requirements', () => {
      const validData = {
        firstName: 'Jane',
        lastName: 'Developer',
        email: 'jane@example.com',
        phone: '+1 (555) 234-5678',
        topic: 'Job opportunity',
        message: 'I would like to discuss an engineering collaboration opportunity.',
        terms: true
      };

      const result = mainModule.validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('validates topic dropdown and rejects missing or unlisted topics', () => {
      expect(mainModule.ALLOWED_TOPICS).toEqual([
        'Job opportunity',
        'Freelance project',
        'Technical collaboration',
        'AI / research discussion',
        'General inquiry'
      ]);

      const missingTopic = mainModule.validateContactForm({
        firstName: 'Jane',
        lastName: 'Developer',
        email: 'jane@example.com',
        topic: '',
        message: 'Valid message exceeding minimum length threshold.',
        terms: true
      });
      expect(missingTopic.isValid).toBe(false);
      expect(missingTopic.errors.topic).toContain('select a topic');

      const invalidTopic = mainModule.validateContactForm({
        firstName: 'Jane',
        lastName: 'Developer',
        email: 'jane@example.com',
        topic: 'Invalid Category Not In List',
        message: 'Valid message exceeding minimum length threshold.',
        terms: true
      });
      expect(invalidTopic.isValid).toBe(false);
      expect(invalidTopic.errors.topic).toContain('valid topic');

      const validTopic = mainModule.validateContactForm({
        firstName: 'Jane',
        lastName: 'Developer',
        email: 'jane@example.com',
        topic: 'Technical collaboration',
        message: 'Valid message exceeding minimum length threshold.',
        terms: true
      });
      expect(validTopic.errors.topic).toBeUndefined();
    });

    it('validates message length for both short and excessively long messages', () => {
      const shortMsg = mainModule.validateContactForm({
        firstName: 'Jane',
        lastName: 'Developer',
        email: 'jane@example.com',
        topic: 'Freelance project',
        message: 'Too short',
        terms: true
      });
      expect(shortMsg.isValid).toBe(false);
      expect(shortMsg.errors.message).toContain('at least 10 characters');

      const longMsg = mainModule.validateContactForm({
        firstName: 'Jane',
        lastName: 'Developer',
        email: 'jane@example.com',
        topic: 'Freelance project',
        message: 'A'.repeat(2505),
        terms: true
      });
      expect(longMsg.isValid).toBe(false);
      expect(longMsg.errors.message).toContain('cannot exceed 2,500 characters');

      const validMsg = mainModule.validateContactForm({
        firstName: 'Jane',
        lastName: 'Developer',
        email: 'jane@example.com',
        topic: 'Freelance project',
        message: 'This is a perfectly sized inquiry regarding full-stack development architecture.',
        terms: true
      });
      expect(validMsg.errors.message).toBeUndefined();
    });

    it('highlights invalid input fields in the DOM and focuses the first invalid field on submit', async () => {
      const form = document.getElementById('contactForm');
      const firstNameInput = document.getElementById('firstName');
      const firstNameFocusSpy = vi.spyOn(firstNameInput, 'focus');

      // Submit empty form
      form.dispatchEvent(new Event('submit', { cancelable: true }));

      const firstNameGroup = document.getElementById('group-firstName');
      expect(firstNameGroup.classList.contains('has-error')).toBe(true);
      expect(firstNameInput.getAttribute('aria-invalid')).toBe('true');
      expect(document.getElementById('firstNameError').textContent).toContain('first name');
      expect(firstNameFocusSpy).toHaveBeenCalled();
    });

    it('HONEST STATE: does not display success when no remote service is configured, launches mailto fallback', async () => {
      // Ensure no remote service endpoint is configured
      delete window.PORTFOLIO_CONTACT_ENDPOINT;

      // Fill in valid details
      document.getElementById('firstName').value = 'Alex';
      document.getElementById('lastName').value = 'Recruiter';
      document.getElementById('email').value = 'alex@techrecruiting.io';
      document.getElementById('topic').value = 'Job opportunity';
      document.getElementById('message').value = 'We have an immediate senior engineering opening at our team in Pune.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');
      const formStatus = document.getElementById('formStatusNotice');

      await mainModule.handleContactSubmit(new Event('submit'));

      // Crucial requirement: Must NOT show success toast!
      expect(toast.classList.contains('toast-success')).toBe(false);
      expect(toast.textContent).not.toContain('sent successfully');

      // Must display polished visitor-facing info state
      expect(toast.classList.contains('toast-info')).toBe(true);
      expect(toast.textContent).toContain('Opening your email client to send your message directly to Arjun');

      // Status notice provides direct fallback link without technical configuration jargon
      expect(formStatus.classList.contains('show')).toBe(true);
      expect(formStatus.textContent).toContain('Direct Email Delivery');
      expect(formStatus.innerHTML).not.toContain('VITE_CONTACT_FORM_ENDPOINT');
      expect(formStatus.innerHTML).toContain('mailto:arjunghuge644@gmail.com');
      // Values preserved
      expect(document.getElementById('email').value).toBe('alex@techrecruiting.io');
    });

    it('SUCCESS ONLY WITH CONFIRMED SERVICE: displays success toast when configured endpoint returns HTTP 200 and resets form', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      document.getElementById('firstName').value = 'Jordan';
      document.getElementById('lastName').value = 'Lee';
      document.getElementById('email').value = 'jordan@cloudscale.net';
      document.getElementById('topic').value = 'AI / research discussion';
      document.getElementById('message').value = 'Loved your Wi-Fi CSI human sensing research and would love to connect.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');

      await mainModule.handleContactSubmit(new Event('submit'));

      // Verified fetch call with structured payload including honeypot and clean fields
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.formspree.io/f/mock-endpoint',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
          body: expect.stringContaining('"topic":"AI / research discussion"')
        })
      );

      // Confirms success and form reset on verified success
      expect(toast.classList.contains('toast-success')).toBe(true);
      expect(toast.textContent).toContain('Thank you, Jordan! Your message has been sent successfully.');
      expect(document.getElementById('firstName').value).toBe('');
      expect(document.getElementById('message').value).toBe('');
    });

    it('preserves user form data and displays error notice when configured endpoint fails with server error', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal provider server error' })
      });

      document.getElementById('firstName').value = 'Morgan';
      document.getElementById('lastName').value = 'Taylor';
      document.getElementById('email').value = 'morgan@enterprise.org';
      document.getElementById('topic').value = 'Freelance project';
      document.getElementById('message').value = 'Checking if you are available for consulting on a React architecture.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');

      await mainModule.handleContactSubmit(new Event('submit'));

      expect(toast.classList.contains('toast-error')).toBe(true);
      expect(toast.textContent).toContain('Submission delivery issue');

      // Form data MUST be preserved on failure!
      expect(document.getElementById('firstName').value).toBe('Morgan');
      expect(document.getElementById('message').value).toBe('Checking if you are available for consulting on a React architecture.');
    });

    it('handles request timeout gracefully and preserves form data', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';

      const abortError = new Error('The user aborted a request.');
      abortError.name = 'AbortError';
      global.fetch = vi.fn().mockRejectedValue(abortError);

      document.getElementById('firstName').value = 'Taylor';
      document.getElementById('lastName').value = 'Swift';
      document.getElementById('email').value = 'taylor@example.com';
      document.getElementById('topic').value = 'General inquiry';
      document.getElementById('message').value = 'Inquiring about your software engineering roadmap for 2027.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');
      const formStatus = document.getElementById('formStatusNotice');

      await mainModule.handleContactSubmit(new Event('submit'));

      expect(toast.classList.contains('toast-error')).toBe(true);
      expect(toast.textContent).toContain('timed out');
      expect(formStatus.textContent).toContain('timed out');

      // User data preserved
      expect(document.getElementById('message').value).toBe('Inquiring about your software engineering roadmap for 2027.');
    });

    it('handles offline network state with a helpful connection error notice and preserves form data', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';

      // Simulate offline navigator
      const originalOnLine = navigator.onLine;
      Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });

      document.getElementById('firstName').value = 'Sam';
      document.getElementById('lastName').value = 'Offline';
      document.getElementById('email').value = 'sam@offline.com';
      document.getElementById('topic').value = 'Technical collaboration';
      document.getElementById('message').value = 'Testing offline network error handling behavior in unit test.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');

      await mainModule.handleContactSubmit(new Event('submit'));

      expect(toast.classList.contains('toast-error')).toBe(true);
      expect(toast.textContent).toContain('offline');

      // Restored onLine property
      Object.defineProperty(navigator, 'onLine', { value: originalOnLine, configurable: true });
    });

    it('prevents duplicate submissions when a request is pending (double-click protection)', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';

      let resolveFetch;
      const slowFetchPromise = new Promise(resolve => {
        resolveFetch = resolve;
      });

      global.fetch = vi.fn().mockImplementation(() => slowFetchPromise);

      document.getElementById('firstName').value = 'Fast';
      document.getElementById('lastName').value = 'Clicker';
      document.getElementById('email').value = 'fast@clicker.com';
      document.getElementById('topic').value = 'Job opportunity';
      document.getElementById('message').value = 'Testing rapid double-click submission debounce protection.';
      document.getElementById('terms').checked = true;

      // Submit first time
      const submit1 = mainModule.handleContactSubmit(new Event('submit'));

      // Submit second time immediately while pending
      const submit2 = mainModule.handleContactSubmit(new Event('submit'));

      // Ensure fetch was only called ONCE
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Resolve the request
      resolveFetch({ ok: true, status: 200, json: async () => ({ success: true }) });
      await Promise.all([submit1, submit2]);
    });

    it('silently discards spam submissions when honeypot field is filled without making an external request', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';
      global.fetch = vi.fn();

      const honeypot = document.getElementById('formHoneypot');
      honeypot.value = 'I am a spam bot filling all hidden inputs';

      document.getElementById('firstName').value = 'Spam';
      document.getElementById('lastName').value = 'Bot';
      document.getElementById('email').value = 'bot@spam.com';
      document.getElementById('topic').value = 'Job opportunity';
      document.getElementById('message').value = 'Buy generic cryptocurrency tokens at low price!';
      document.getElementById('terms').checked = true;

      await mainModule.handleContactSubmit(new Event('submit'));

      // Must NOT call fetch
      expect(global.fetch).not.toHaveBeenCalled();

      // Reset honeypot for subsequent tests
      honeypot.value = '';
    });

    it('never stores submitted personal information in localStorage or sessionStorage', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      localStorage.clear();
      sessionStorage.clear();

      document.getElementById('firstName').value = 'Privacy';
      document.getElementById('lastName').value = 'User';
      document.getElementById('email').value = 'privacy@personal.io';
      document.getElementById('topic').value = 'General inquiry';
      document.getElementById('message').value = 'Testing privacy storage compliance in browser storage.';
      document.getElementById('terms').checked = true;

      await mainModule.handleContactSubmit(new Event('submit'));

      // Check localStorage and sessionStorage
      expect(localStorage.getItem('email')).toBeNull();
      expect(localStorage.getItem('firstName')).toBeNull();
      expect(localStorage.getItem('message')).toBeNull();
      expect(sessionStorage.getItem('email')).toBeNull();
      expect(sessionStorage.getItem('firstName')).toBeNull();
      expect(sessionStorage.getItem('message')).toBeNull();
    });
  });

  /* --------------------------------------------------------------------------
     8. Beyond the Code Section, Navigation, Content & Dual-Mode
     -------------------------------------------------------------------------- */
  describe('Beyond the Code Section, Navigation & Content Integrity', () => {
    it('renames navigation items and updates anchors to #beyond-the-code across header, mobile drawer and footer', () => {
      const desktopNav = document.getElementById('navBeyond');
      expect(desktopNav).not.toBeNull();
      expect(desktopNav.textContent.trim()).toBe('Beyond the Code');
      expect(desktopNav.getAttribute('href')).toBe('#beyond-the-code');

      const mobileNav = document.querySelector('.mobile-nav-link[href="#beyond-the-code"]');
      expect(mobileNav).not.toBeNull();
      expect(mobileNav.textContent.trim()).toBe('Beyond the Code');

      const footerNav = document.querySelector('.footer-nav a[href="#beyond-the-code"]');
      expect(footerNav).not.toBeNull();
      expect(footerNav.textContent.trim()).toBe('Beyond the Code');

      // Verify no obsolete #testimonials nav links remain
      expect(document.querySelector('a[href="#testimonials"]')).toBeNull();
    });

    it('renders the section container with correct id, heading, and introductory text', () => {
      const section = document.getElementById('beyond-the-code');
      expect(section).not.toBeNull();
      expect(section.classList.contains('section-beyond')).toBe(true);

      const title = document.getElementById('beyondTitle');
      expect(title).not.toBeNull();
      expect(title.textContent.trim()).toBe('Beyond the Code');

      const subtitle = document.getElementById('beyondSubtitle');
      expect(subtitle).not.toBeNull();
      expect(subtitle.textContent).toBe('The tools I use, the projects I build, and the principles that guide my engineering journey.');
    });

    it('contains all four distinct cards with semantic headings and required descriptions', () => {
      const grid = document.getElementById('beyondGrid');
      expect(grid).not.toBeNull();

      const cards = grid.querySelectorAll('.beyond-card');
      expect(cards.length).toBe(4);

      const titles = Array.from(cards).map(card => card.querySelector('.beyond-card-title').textContent.trim());
      expect(titles).toContain('Building in Public');
      expect(titles).toContain('My Developer Toolkit');
      expect(titles).toContain('Beyond Programming');
      expect(titles).toContain('My Engineering Philosophy');

      // Card 1 Description
      const desc1 = cards[0].querySelector('.beyond-card-desc').textContent;
      expect(desc1).toBe('Explore my repositories, development activity, and open-source contributions.');

      // Card 2 Description
      const desc2 = cards[1].querySelector('.beyond-card-desc').textContent;
      expect(desc2).toBe('The languages, frameworks, databases, AI tools, and development environment I use to build software.');

      // Card 3 Description
      const desc3 = cards[2].querySelector('.beyond-card-desc').textContent;
      expect(desc3).toBe('Exploring new technologies, learning through experimentation, and collaborating on engineering and community activities.');

      // Card 4 Description
      const desc4 = cards[3].querySelector('.beyond-card-desc').textContent;
      expect(desc4).toBe('I believe in understanding the problem, designing maintainable systems, validating solutions, and improving continuously.');
    });

    it('verifies Card 1 (Building in Public) links to verified GitHub and real repositories securely', () => {
      const publicCard = document.getElementById('beyondGrid').children[0];

      const profileLink = publicCard.querySelector('.beyond-profile-btn');
      expect(profileLink).not.toBeNull();
      expect(profileLink.getAttribute('href')).toBe('https://github.com/arjunghuge644');
      expect(profileLink.getAttribute('target')).toBe('_blank');
      expect(profileLink.getAttribute('rel')).toBe('noopener noreferrer');

      const repoLinks = Array.from(publicCard.querySelectorAll('.beyond-repo-item'));
      expect(repoLinks.length).toBe(3);

      const repoUrls = repoLinks.map(l => l.getAttribute('href'));
      expect(repoUrls).toContain('https://github.com/arjunghuge644/CareerPulse');
      expect(repoUrls).toContain('https://github.com/arjunghuge644/prescripto');
      expect(repoUrls).toContain('https://www.deployed.site');

      const deployedCard = repoLinks.find(l => l.getAttribute('href') === 'https://www.deployed.site');
      expect(deployedCard).not.toBeNull();
      expect(deployedCard.querySelector('.repo-name').textContent.trim()).toBe('deployed.site');
      expect(deployedCard.querySelector('.repo-badge').textContent.trim()).toBe('Live Platform');
      expect(deployedCard.querySelector('.repo-desc').textContent).toBe(
        'A developer showcase platform for publishing and discovering deployed projects, featuring deployment status badges and project discovery.'
      );
      expect(deployedCard.querySelector('.repo-action-link').textContent).toContain('View Platform');

      repoLinks.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });

    it('verifies Card 2 (My Developer Toolkit) contains categorized, verified technologies', () => {
      const toolkitCard = document.getElementById('beyondGrid').children[1];
      const categories = Array.from(toolkitCard.querySelectorAll('.toolkit-group-title')).map(el => el.textContent.trim());

      expect(categories).toContain('Languages & Frameworks');
      expect(categories).toContain('Databases & Caching');
      expect(categories).toContain('AI & ML Engineering');
      expect(categories).toContain('DevOps & Tools');

      const pillTexts = Array.from(toolkitCard.querySelectorAll('.toolkit-pill')).map(p => p.textContent.trim());
      expect(pillTexts).toContain('Python');
      expect(pillTexts).toContain('Node.js');
      expect(pillTexts).toContain('FastAPI');
      expect(pillTexts).toContain('MongoDB');
      expect(pillTexts).toContain('PostgreSQL');
      expect(pillTexts).toContain('Docker');
    });

    it('verifies technology tiles contain local SVG logos and accessible labels', () => {
      const toolkitCard = document.getElementById('beyondGrid').children[1];
      const tiles = Array.from(toolkitCard.querySelectorAll('.toolkit-tile'));
      expect(tiles.length).toBeGreaterThanOrEqual(20);

      tiles.forEach(tile => {
        const icon = tile.querySelector('.toolkit-tile-icon');
        const label = tile.querySelector('.toolkit-tile-label');

        expect(icon).not.toBeNull();
        expect(label).not.toBeNull();
        expect(label.textContent.trim().length).toBeGreaterThan(0);

        // Check image attributes
        const src = icon.getAttribute('src');
        expect(src).toMatch(/^\/assets\/tech\/[a-z0-9\-.]+\.svg$/);
        expect(icon.getAttribute('alt')).toBe('');
        expect(icon.getAttribute('aria-hidden')).toBe('true');

        // Check physical file exists on disk
        const localPath = path.resolve(__dirname, '../public', src.replace(/^\//, ''));
        expect(fs.existsSync(localPath)).toBe(true);
      });
    });

    it('verifies technology tiles in Figma View also resolve to valid local SVG assets', () => {
      // Toggle to Figma View
      const toggleBtn = document.getElementById('modeToggleBtn');
      toggleBtn.click();

      const toolkitCard = document.getElementById('beyondGrid').children[1];
      const tiles = Array.from(toolkitCard.querySelectorAll('.toolkit-tile'));
      expect(tiles.length).toBeGreaterThan(0);

      const labels = tiles.map(t => t.querySelector('.toolkit-tile-label').textContent.trim());
      expect(labels).toContain('Figma');
      expect(labels).toContain('HTML5');

      tiles.forEach(tile => {
        const icon = tile.querySelector('.toolkit-tile-icon');
        if (icon) {
          const src = icon.getAttribute('src');
          expect(src).toMatch(/^\/assets\/tech\/[a-z0-9\-.]+\.svg$/);
          const localPath = path.resolve(__dirname, '../public', src.replace(/^\//, ''));
          expect(fs.existsSync(localPath)).toBe(true);
        }
      });
    });

    it('verifies technology categories render as horizontal carousels with accessible controls', () => {
      const scrollByMock = vi.fn();
      Element.prototype.scrollBy = scrollByMock;

      const toolkitCard = document.getElementById('beyondGrid').children[1];
      const groups = toolkitCard.querySelectorAll('.toolkit-group');
      expect(groups.length).toBe(4);

      groups.forEach((group) => {
        const carousel = group.querySelector('.toolkit-carousel');
        const prevBtn = group.querySelector('.toolkit-nav-prev');
        const nextBtn = group.querySelector('.toolkit-nav-next');
        const header = group.querySelector('.toolkit-group-header');
        const title = group.querySelector('.toolkit-group-title');

        expect(carousel).not.toBeNull();
        expect(prevBtn).not.toBeNull();
        expect(nextBtn).not.toBeNull();
        expect(header).not.toBeNull();
        expect(title).not.toBeNull();

        // Accessibility attributes
        expect(carousel.getAttribute('role')).toBe('region');
        expect(carousel.getAttribute('tabindex')).toBe('0');
        expect(carousel.getAttribute('aria-label')).toBeTruthy();
        expect(prevBtn.getAttribute('aria-label')).toBeTruthy();
        expect(nextBtn.getAttribute('aria-label')).toBeTruthy();

        // Next button click
        nextBtn.disabled = false;
        nextBtn.click();
        expect(scrollByMock).toHaveBeenCalledWith(expect.objectContaining({ left: 188 }));

        // Prev button click
        prevBtn.disabled = false;
        prevBtn.click();
        expect(scrollByMock).toHaveBeenCalledWith(expect.objectContaining({ left: -188 }));

        // Keyboard arrow navigation
        const leftKeyEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
        carousel.dispatchEvent(leftKeyEvent);
        expect(scrollByMock).toHaveBeenCalledWith(expect.objectContaining({ left: -94 }));

        const rightKeyEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
        carousel.dispatchEvent(rightKeyEvent);
        expect(scrollByMock).toHaveBeenCalledWith(expect.objectContaining({ left: 94 }));
      });
    });

    it('verifies Card 3 (Beyond Programming) features authentic college and research activities', () => {
      const beyondCard = document.getElementById('beyondGrid').children[2];
      const titles = Array.from(beyondCard.querySelectorAll('.activity-title')).map(el => el.textContent.trim());

      expect(titles).toContain('NSS Design Co-Head');
      expect(titles).toContain('IDEA FORGE — 2nd Prize Winner');
      expect(titles).toContain('Hardware & Signal Sensing Research');
      expect(titles).toContain('Cohort Mentorship & Peer Code Reviews');
    });

    it('verifies Card 4 (My Engineering Philosophy) presents the three required principles', () => {
      const philosophyCard = document.getElementById('beyondGrid').children[3];
      const headings = Array.from(philosophyCard.querySelectorAll('.principle-heading')).map(el => el.textContent.trim());

      expect(headings).toContain('Clarity before complexity.');
      expect(headings).toContain('Reliability through testing.');
      expect(headings).toContain('Continuous learning and improvement.');
    });

    it('preserves Beyond the Code in dual-mode switching and NEVER renders fictional testimonials', () => {
      const modeBtn = document.getElementById('modeToggleBtn');

      // Default Arjun Mode
      expect(document.getElementById('beyondTitle').textContent).toBe('Beyond the Code');
      expect(document.getElementById('beyondGrid').querySelectorAll('.beyond-card').length).toBe(4);
      expect(document.body.textContent).not.toContain('Dianne Russell');
      expect(document.body.textContent).not.toContain('Starbucks');
      expect(document.body.textContent).not.toContain('Customer testimonials');

      // Switch to Figma View
      modeBtn.click();
      expect(document.getElementById('beyondTitle').textContent).toBe('Beyond the Code');
      expect(document.getElementById('beyondGrid').querySelectorAll('.beyond-card').length).toBe(4);
      // Fictional client testimonials must not appear in Figma preview
      expect(document.body.textContent).not.toContain('Dianne Russell');
      expect(document.body.textContent).not.toContain('Customer testimonials');

      // Switch back to Arjun View
      modeBtn.click();
      expect(document.getElementById('beyondTitle').textContent).toBe('Beyond the Code');
      const publicCardAfter = document.getElementById('beyondGrid').children[0];
      const profileLinkAfter = publicCardAfter.querySelector('.beyond-profile-btn');
      expect(profileLinkAfter.getAttribute('href')).toBe('https://github.com/arjunghuge644');
      expect(document.body.textContent).not.toContain('Dianne Russell');
      expect(document.body.textContent).not.toContain('Customer testimonials');
    });

    it('verifies infinite auto-scrolling marquee structure, loop calculation, and duplicate accessibility hiding', () => {
      const toolkitCard = document.getElementById('beyondGrid').children[1];
      const tracks = Array.from(toolkitCard.querySelectorAll('.toolkit-track'));
      expect(tracks.length).toBe(4);

      const expectedDirections = ['left', 'right', 'left', 'right'];
      tracks.forEach((track, idx) => {
        // Direction and duration
        expect(track.getAttribute('data-direction')).toBe(expectedDirections[idx]);
        const style = track.getAttribute('style') || '';
        expect(style).toContain('--duration:');
        expect(style).toContain('--loop-dist:');

        // Check primary and duplicate groups
        const primaryGroup = track.querySelector('.toolkit-track-group.toolkit-track-primary');
        const duplicateGroup = track.querySelector('.toolkit-track-group.toolkit-track-duplicate');

        expect(primaryGroup).not.toBeNull();
        expect(duplicateGroup).not.toBeNull();

        // Duplicate group must be hidden from screen readers
        expect(duplicateGroup.getAttribute('aria-hidden')).toBe('true');

        // All duplicate tiles must be decorative
        const dupTiles = duplicateGroup.querySelectorAll('.toolkit-tile');
        dupTiles.forEach(tile => {
          expect(tile.getAttribute('aria-hidden')).toBe('true');
          expect(tile.getAttribute('tabindex')).toBe('-1');
        });
      });
    });

    it('verifies hover and focus pauses the auto-scrolling carousel via is-paused class', () => {
      const carousel = document.querySelector('.toolkit-carousel');
      expect(carousel).not.toBeNull();

      expect(carousel.classList.contains('is-paused')).toBe(false);

      // Pointer enter / leave
      carousel.dispatchEvent(new Event('pointerenter'));
      expect(carousel.classList.contains('is-paused')).toBe(true);

      carousel.dispatchEvent(new Event('pointerleave'));
      expect(carousel.classList.contains('is-paused')).toBe(false);

      // Focus in / out
      carousel.dispatchEvent(new Event('focusin'));
      expect(carousel.classList.contains('is-paused')).toBe(true);

      carousel.dispatchEvent(new Event('focusout'));
      expect(carousel.classList.contains('is-paused')).toBe(false);
    });

    it('verifies parent grid balanced layout and GitHub profile button structure', () => {
      const grid = document.getElementById('beyondGrid');
      expect(grid).not.toBeNull();

      const cards = grid.querySelectorAll('.beyond-card');
      expect(cards.length).toBe(4);

      const publicCard = cards[0];
      const toolkitCard = cards[1];

      expect(publicCard.querySelector('#cardTitlePublic')).not.toBeNull();
      expect(toolkitCard.querySelector('#cardTitleToolkit')).not.toBeNull();

      const githubProfile = publicCard.querySelector('.beyond-github-profile');
      expect(githubProfile).not.toBeNull();
      const profileInfo = githubProfile.querySelector('.profile-info');
      expect(profileInfo).not.toBeNull();
      const profileBtn = githubProfile.querySelector('.beyond-profile-btn');
      expect(profileBtn).not.toBeNull();
      expect(profileBtn.getAttribute('href')).toBe('https://github.com/arjunghuge644');
    });

    it('verifies seamless infinite loop persistence in Figma View', () => {
      const modeBtn = document.getElementById('modeToggleBtn');
      // Switch to Figma
      modeBtn.click();

      const toolkitCard = document.getElementById('beyondGrid').children[1];
      const tracks = Array.from(toolkitCard.querySelectorAll('.toolkit-track'));
      expect(tracks.length).toBe(4);

      const expectedDirections = ['left', 'right', 'left', 'right'];
      tracks.forEach((track, idx) => {
        expect(track.getAttribute('data-direction')).toBe(expectedDirections[idx]);
        const style = track.getAttribute('style') || '';
        expect(style).toContain('--loop-dist:');

        const primaryGroup = track.querySelector('.toolkit-track-group.toolkit-track-primary');
        const duplicateGroup = track.querySelector('.toolkit-track-group.toolkit-track-duplicate');
        expect(primaryGroup).not.toBeNull();
        expect(duplicateGroup).not.toBeNull();
        expect(duplicateGroup.getAttribute('aria-hidden')).toBe('true');
      });

      // Switch back to Arjun View
      modeBtn.click();
    });
  });
});
