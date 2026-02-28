/**
 * Mosaic — Preview Password Gate
 * Change PREVIEW_PASSWORD below to whatever you want to share.
 * Remove the <script> tags from all pages when you go public.
 */

(function () {
  const PREVIEW_PASSWORD = 'mobuddy1@'; // ← change this
  const COOKIE_NAME      = 'mosaic_preview';
  const COOKIE_DAYS      = 7;

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  function removeLock() {
    const overlay = document.getElementById('mosaic-lock');
    if (overlay) overlay.remove();
  }

  // Already unlocked
  if (getCookie(COOKIE_NAME) === 'unlocked') return;

  // Inject overlay
  const overlay = document.createElement('div');
  overlay.id = 'mosaic-lock';
  overlay.innerHTML = `
    <style>
      #mosaic-lock {
        position: fixed; inset: 0; z-index: 9999;
        background: #0a0e1a;
        display: flex; align-items: center; justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      #mosaic-lock .lock-card {
        background: #111827;
        border: 1px solid #1e2d40;
        border-radius: 20px;
        padding: 40px 40px 36px;
        width: 100%;
        max-width: 380px;
        text-align: center;
      }
      #mosaic-lock .lock-logo {
        font-size: 22px;
        font-weight: 700;
        color: #fff;
        letter-spacing: -0.02em;
        margin-bottom: 6px;
      }
      #mosaic-lock .lock-logo span { color: #00c6ff; }
      #mosaic-lock .lock-label {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #6b7a99;
        margin-bottom: 28px;
      }
      #mosaic-lock input[type="password"] {
        width: 100%;
        background: #0d1525;
        border: 1px solid #1e2d40;
        border-radius: 10px;
        padding: 14px 16px;
        font-size: 15px;
        color: #fff;
        font-family: inherit;
        outline: none;
        text-align: center;
        letter-spacing: 0.2em;
        margin-bottom: 12px;
        transition: border-color 0.2s;
        box-sizing: border-box;
      }
      #mosaic-lock input[type="password"]:focus { border-color: #00c6ff; }
      #mosaic-lock input[type="password"]::placeholder { letter-spacing: normal; color: #6b7a99; }
      #mosaic-lock button {
        width: 100%;
        background: #00c6ff;
        color: #0a0e1a;
        border: none;
        border-radius: 10px;
        padding: 14px;
        font-size: 15px;
        font-weight: 600;
        font-family: inherit;
        cursor: pointer;
        transition: opacity 0.2s;
      }
      #mosaic-lock button:hover { opacity: 0.85; }
      #mosaic-lock .lock-error {
        color: #ff5252;
        font-size: 13px;
        margin-top: 12px;
        min-height: 18px;
      }
    </style>
    <div class="lock-card">
      <div class="lock-logo">Mosaic<span>.</span></div>
      <div class="lock-label">Preview Access</div>
      <input type="password" id="mosaic-pw-input" placeholder="Enter password" autocomplete="off">
      <button id="mosaic-pw-btn">Continue</button>
      <div class="lock-error" id="mosaic-pw-error"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  function attempt() {
    const val = document.getElementById('mosaic-pw-input').value;
    if (val === PREVIEW_PASSWORD) {
      setCookie(COOKIE_NAME, 'unlocked', COOKIE_DAYS);
      removeLock();
    } else {
      const err = document.getElementById('mosaic-pw-error');
      err.textContent = 'Incorrect password.';
      document.getElementById('mosaic-pw-input').value = '';
      document.getElementById('mosaic-pw-input').focus();
    }
  }

  document.getElementById('mosaic-pw-btn').addEventListener('click', attempt);
  document.getElementById('mosaic-pw-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') attempt();
    document.getElementById('mosaic-pw-error').textContent = '';
  });

  // Focus input
  setTimeout(function () {
    const input = document.getElementById('mosaic-pw-input');
    if (input) input.focus();
  }, 100);
})();
