# Mosaic — Marketing Site

Static HTML/CSS site for mosaicscore.com

## Pages
- `index.html` — Homepage
- `science.html` — How It Works / Metrics Education
- `privacy.html` — Privacy Policy
- `css/style.css` — Shared styles

## Deploy to Vercel

1. Push this folder to a GitHub repo (or the Projects repo)
2. Go to vercel.com → New Project → Import the repo
3. Set the **Root Directory** to `mosaic-site/`
4. Deploy — Vercel auto-detects static HTML, no build step needed

## Connect Squarespace Domain

In Squarespace (Domains → mosaicscore.com → DNS Settings):

Add these records:
```
Type  Name   Value
A     @      76.76.21.21
CNAME www    cname.vercel-dns.com
```

Then in Vercel → Project → Settings → Domains → Add `mosaicscore.com` and `www.mosaicscore.com`

Propagation takes ~1 hour.

## Email Waitlist (Formspree)

1. Sign up free at formspree.io
2. Create a new form → copy the form ID (looks like `xpzgkqjb`)
3. In `index.html`, replace `YOUR_FORM_ID` in the form action URL:
   `https://formspree.io/f/YOUR_FORM_ID`

Free tier: 50 submissions/month. Upgrade if needed.

## Notes
- No build step, no dependencies, no frameworks
- All health data stays on device — no backend needed for the app
- Privacy policy email: update `privacy@mosaicscore.app` once email is configured
# Mosaic Site
