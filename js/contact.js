/**
 * AEI EXTRACTION INDUSTRIES PRIVATE LIMITED
 * Validated B2B Enquiry Composer (Transparent mailto: + WhatsApp + Clipboard) — js/contact.js
 * Pure Vanilla JavaScript (ES6+)
 *
 * NOTE: Per architectural integrity standards, this frontend form does NOT fake
 * backend email delivery. Upon validation, it launches the visitor's email client
 * with a structured RFQ payload, or opens WhatsApp / copies the brief.
 */

(function () {
  'use strict';

  const COMPANY_EMAIL = 'nilayagarwal01@gmail.com';
  const COMPANY_WHATSAPP = '917726975366';

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('aei-enquiry-form');
    if (!form) return;

    const productSelect = document.getElementById('enquiry-product');
    const feedbackBox = document.getElementById('form-feedback');
    const whatsappSubmitBtn = document.getElementById('send-via-whatsapp');
    const copyBriefBtn = document.getElementById('copy-enquiry-brief');

    // 1. Pre-populate Product Selection from URL Query (?product=...)
    const params = new URLSearchParams(window.location.search);
    const requestedProduct = params.get('product');
    if (requestedProduct && productSelect) {
      const options = Array.from(productSelect.options);
      const match = options.find(function (opt) {
        return opt.value.toLowerCase() === requestedProduct.toLowerCase();
      });
      if (match) {
        productSelect.value = match.value;
      }
    }

    // 2. Field Validation Helpers
    function setFieldError(inputEl, message) {
      const group = inputEl.closest('.form-group');
      const errorEl = group ? group.querySelector('.field-error') : null;
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      if (group) group.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
    }

    function clearFieldError(inputEl) {
      const group = inputEl.closest('.form-group');
      const errorEl = group ? group.querySelector('.field-error') : null;
      inputEl.classList.remove('is-invalid');
      inputEl.removeAttribute('aria-invalid');
      if (group) group.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
    }

    function validateField(inputEl) {
      const value = inputEl.value.trim();
      const name = inputEl.getAttribute('name');

      if (inputEl.hasAttribute('required') && !value) {
        setFieldError(inputEl, 'This field is required for business enquiries.');
        return false;
      }

      if (name === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(value)) {
          setFieldError(inputEl, 'Please enter a valid business email address.');
          return false;
        }
      }

      if (name === 'phone' && value) {
        const phoneRegex = /^[+\d][\d\s\-()]{6,20}$/;
        if (!phoneRegex.test(value)) {
          setFieldError(inputEl, 'Please enter a valid contact number with country/area code.');
          return false;
        }
      }

      if (name === 'message' && value && value.length < 15) {
        setFieldError(inputEl, 'Please include brief requirement details (minimum 15 characters).');
        return false;
      }

      clearFieldError(inputEl);
      return true;
    }

    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        validateField(input);
      });
      input.addEventListener('input', function () {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    function validateForm() {
      let isFormValid = true;
      let firstInvalid = null;

      inputs.forEach(function (input) {
        const valid = validateField(input);
        if (!valid) {
          isFormValid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
      }
      return isFormValid;
    }

    function buildEnquiryPayload() {
      const fullName = document.getElementById('enquiry-name').value.trim();
      const company = document.getElementById('enquiry-company').value.trim();
      const email = document.getElementById('enquiry-email').value.trim();
      const phone = document.getElementById('enquiry-phone').value.trim();
      const location = document.getElementById('enquiry-location').value.trim();
      const product = document.getElementById('enquiry-product').value.trim();
      const enquiryType = document.getElementById('enquiry-type').value.trim();
      const message = document.getElementById('enquiry-message').value.trim();

      const subject =
        'Business Enquiry: ' +
        product +
        ' (' +
        enquiryType +
        ') - ' +
        (company || fullName) +
        ' | AEI Extraction Industries';

      const bodyLines = [
        'Hello AEI Extraction Industries Private Limited Team,',
        '',
        'Please find our industrial enquiry details below:',
        '--------------------------------------------------',
        'Contact Name: ' + fullName,
        'Company / Organization: ' + (company || 'Not specified'),
        'Business Email: ' + email,
        'Phone / WhatsApp: ' + phone,
        'Destination / City & Country: ' + (location || 'Not specified'),
        'Product / Interest Area: ' + product,
        'Enquiry Category: ' + enquiryType,
        '--------------------------------------------------',
        'Requirement Details:',
        message,
        '--------------------------------------------------',
        'Generated via AEI Extraction Industries Corporate Website (Bengaluru, India)'
      ];

      return {
        subject: subject,
        body: bodyLines.join('\n')
      };
    }

    function showFeedback(htmlMessage) {
      if (!feedbackBox) return;
      feedbackBox.innerHTML = htmlMessage;
      feedbackBox.classList.add('is-visible');
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 3. Primary Submit -> Opens Visitor's Email Application (mailto:)
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateForm()) return;

      const payload = buildEnquiryPayload();
      const mailtoHref =
        'mailto:' +
        COMPANY_EMAIL +
        '?subject=' +
        encodeURIComponent(payload.subject) +
        '&body=' +
        encodeURIComponent(payload.body);

      showFeedback(
        '<strong>Your enquiry is ready.</strong> Send it from your email app, or copy the details and send them another way.'
      );

      window.location.href = mailtoHref;
    });

    // 4. Secondary Action -> Send Validated Enquiry via WhatsApp
    if (whatsappSubmitBtn) {
      whatsappSubmitBtn.addEventListener('click', function () {
        if (!validateForm()) return;
        const payload = buildEnquiryPayload();
        const waUrl =
          'https://wa.me/' +
          COMPANY_WHATSAPP +
          '?text=' +
          encodeURIComponent(payload.body);

        showFeedback(
          '<strong>Opening WhatsApp Business Chat:</strong> Redirecting to WhatsApp with your pre-populated industrial enquiry.'
        );
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }

    // 5. Utility Action -> Copy Formatted Enquiry Brief to Clipboard
    if (copyBriefBtn) {
      copyBriefBtn.addEventListener('click', function () {
        if (!validateForm()) return;
        const payload = buildEnquiryPayload();
        const fullText = 'Subject: ' + payload.subject + '\n\n' + payload.body;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(fullText).then(function () {
            showFeedback(
              '<strong>Enquiry Brief Copied:</strong> Your formatted business enquiry has been copied to your clipboard for pasting into any corporate webmail system.'
            );
          });
        }
      });
    }
  });
})();
