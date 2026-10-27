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
        topic: 'Full-Stack Web',
        message: 'I would like to discuss an engineering collaboration opportunity.',
        terms: true
      };

      const result = mainModule.validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
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
      document.getElementById('topic').value = 'Backend & APIs';
      document.getElementById('message').value = 'We have an immediate senior engineering opening at our team in Pune.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');
      const formStatus = document.getElementById('formStatusNotice');

      await mainModule.handleContactSubmit(new Event('submit'));

      // Crucial requirement: Must NOT show success toast!
      expect(toast.classList.contains('toast-success')).toBe(false);
      expect(toast.textContent).not.toContain('sent successfully');

      // Must display honest user-facing info state
      expect(toast.classList.contains('toast-info')).toBe(true);
      expect(toast.textContent).toContain('No remote submission API configured');

      // Status notice provides direct fallback link
      expect(formStatus.classList.contains('show')).toBe(true);
      expect(formStatus.innerHTML).toContain('mailto:arjunghuge644@gmail.com');
    });

    it('SUCCESS ONLY WITH CONFIRMED SERVICE: displays success toast when configured endpoint returns HTTP 200', async () => {
      // Configure mock endpoint
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: true })
      });

      document.getElementById('firstName').value = 'Jordan';
      document.getElementById('lastName').value = 'Lee';
      document.getElementById('email').value = 'jordan@cloudscale.net';
      document.getElementById('topic').value = 'AI & ML';
      document.getElementById('message').value = 'Loved your Wi-Fi CSI human sensing research and would love to connect.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');

      await mainModule.handleContactSubmit(new Event('submit'));

      // Verified fetch call
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.formspree.io/f/mock-endpoint',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' })
        })
      );

      // Now confirms success
      expect(toast.classList.contains('toast-success')).toBe(true);
      expect(toast.textContent).toContain('Thank you, Jordan! Your message has been sent successfully.');
    });

    it('displays error notice when configured endpoint fails with server error', async () => {
      window.PORTFOLIO_CONTACT_ENDPOINT = 'https://api.formspree.io/f/mock-endpoint';

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      });

      document.getElementById('firstName').value = 'Morgan';
      document.getElementById('lastName').value = 'Taylor';
      document.getElementById('email').value = 'morgan@enterprise.org';
      document.getElementById('topic').value = 'Full-Stack Web';
      document.getElementById('message').value = 'Checking if you are available for consulting on a React architecture.';
      document.getElementById('terms').checked = true;

      const toast = document.getElementById('toastNotification');

      await mainModule.handleContactSubmit(new Event('submit'));

      expect(toast.classList.contains('toast-error')).toBe(true);
      expect(toast.textContent).toContain('Failed to connect to the configured submission service');
    });
  });
});
