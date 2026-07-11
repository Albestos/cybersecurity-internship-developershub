# Cybersecurity Internship — Developers Hub Corporation

A 3-week cybersecurity internship project at Developers Hub Corporation covering 
vulnerability assessment, security implementation, and penetration testing on a 
Node.js/Express web application.

**Intern:** Ayesha Sarwar Khan
**Organization:** Developers Hub Corporation   
**Tools Used:** OWASP ZAP, Nmap, OpenSSL, Helmet.js, bcrypt, jsonwebtoken, Winston, Docker

---

## 📋 Project Overview

This repository documents the complete work completed across 3 weeks of a 
Cybersecurity Internship. The project followed a full security lifecycle:

- **Week 1** — Identify vulnerabilities through assessment and scanning
- **Week 2** — Implement code-level fixes and security controls
- **Week 3** — Verify fixes through penetration testing, add logging and HTTPS

The target applications were **DVWA** (Damn Vulnerable Web Application) for 
assessment, and **vulnerable-node** (NodeVulnerable), a deliberately insecure 
Node.js/Express e-commerce application, for implementation and testing.

---
## 📁 Repository Structure

├── README.md

│

├── Week1-DVWA-Assessment/

├── Week2-Security-Implementation/

│   └── vulnerable-node/

│       ├── app.js              **← final version (includes Week 3 Winston + HTTPS)**

│       ├── hashpasswords.js

│       ├── bin/

│       │   └── www            **← final version (includes Week 3 HTTPS config)**

│       ├── routes/

│       │   └── login.js

│       └── model/

│           ├── auth.js

│           └── products.js

│

└── Week3-PenTesting-Logging-HTTPS/



> **Note:** The code inside `Week2-Security-Implementation/vulnerable-node/` 
> is the final version of the project and contains all security changes 
> from both Week 2 and Week 3.



---


## 📄 Full Internship Report

A combined PDF report covering all 3 weeks — including vulnerability findings, 
code fixes, penetration testing results, and the final security checklist — 
is available here:

[View Complete Report (PDF)](Cybersecurity_Internship_Report_Ayesha_Sarwar_Khan.pdf)


---

## 📅 Week 1 — Security Assessment & Vulnerability Analysis

**Application Tested:** DVWA (Damn Vulnerable Web Application) via Docker  
**Tools:** OWASP ZAP, Browser DevTools  

### Vulnerabilities Found

| # | Vulnerability | Risk Level | Detection Method |
|---|---|---|---|
| 1 | Reflected Cross-Site Scripting (XSS) | HIGH | Manual Testing |
| 2 | Stored Cross-Site Scripting (XSS) | HIGH | Manual Testing |
| 3 | SQL Injection | HIGH | Manual Testing |
| 4 | Content Security Policy Header Not Set | MEDIUM | OWASP ZAP |
| 5 | Missing Anti-Clickjacking Header | MEDIUM | OWASP ZAP |
| 6 | Cookie No HttpOnly Flag | LOW | OWASP ZAP |
| 7 | Cookie Without SameSite Attribute | LOW | OWASP ZAP |
| 8 | In Page Banner Information Leak | LOW | OWASP ZAP |
| 9 | Server Leaks Version Information | LOW | OWASP ZAP |
| 10 | X-Content-Type-Options Header Missing | LOW | OWASP ZAP |

### Key Findings
- SQL Injection was confirmed using the payload `1' OR '1'='1`, which exposed 
  all database records and bypassed authentication
- Reflected XSS was confirmed by injecting a script tag into the name input 
  field, triggering an alert popup
- Stored XSS was confirmed via the guestbook form — the script persisted in 
  the database and fired for every visitor

---

## 📅 Week 2 — Security Implementation & Vulnerability Remediation

**Application:** vulnerable-node (NodeVulnerable) — Node.js/Express  
**Tools:** bcrypt, jsonwebtoken, helmet, validator, PostgreSQL  

### Security Fixes Implemented

| Fix | Vulnerability Addressed | Library Used | Status |
|---|---|---|---|
| Secure HTTP Headers | Missing CSP, X-Frame-Options, XSS headers | helmet@4 | ✅ Done |
| Input Validation | XSS, empty input attacks | validator | ✅ Done |
| Password Hashing | Plaintext password storage | bcrypt | ✅ Done |
| SQL Injection Prevention | SQL Injection in all DB queries | pg (parameterized) | ✅ Done |
| JWT Authentication | Weak/no token-based auth | jsonwebtoken | ✅ Done |

### Files Modified

| File | Changes Made |
|---|---|
| `app.js` | Added Helmet middleware, JWT secret configuration |
| `routes/login.js` | Added validator checks, JWT token generation |
| `model/auth.js` | Added bcrypt comparison, parameterized SQL query |
| `model/products.js` | All 4 queries converted to parameterized form |
| `hashpasswords.js` | One-time script to migrate plaintext passwords to bcrypt hashes |

### Packages Installed

```bash
npm install helmet@4
npm install validator
npm install bcrypt
npm install jsonwebtoken
npm install pg
```

---

## 📅 Week 3 — Advanced Security & Final Reporting

**Application:** vulnerable-node (NodeVulnerable)  
**Tools:** Nmap, Winston, OpenSSL  

### Tasks Completed

| Task | Tool Used | Status |
|---|---|---|
| Basic Penetration Testing | Nmap | ✅ Done |
| Security Logging Setup | Winston | ✅ Done |
| HTTPS Implementation | OpenSSL (self-signed cert) | ✅ Done |

### Penetration Testing Results (Nmap)

| Scan Type | Command | Result |
|---|---|---|
| Service/Version Detection | `nmap -sV 127.0.0.1` | Port 3000 open, Node.js/Express identified |
| Targeted Header Scan | `nmap -sV -p 3000 127.0.0.1` | All Week 2 Helmet.js security headers confirmed active |
| Vulnerability Scan | `nmap --script vuln -p 3000 127.0.0.1` | No critical vulnerabilities found |

### Winston Logging
Integrated Winston alongside the existing log4js logger. Outputs structured 
JSON logs to both console and `security.log`:
```json
{"level":"info","message":"Application started"}
```

### HTTPS Implementation
Generated a self-signed SSL certificate using OpenSSL and configured an HTTPS 
server on port 3443 running alongside the existing HTTP server on port 3000.

```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365
```

> **Note:** In production, a certificate from a trusted CA such as Let's Encrypt 
> would replace the self-signed certificate to avoid browser warnings.

---

## ✅ Final Security Checklist

| # | Best Practice | Status | Implementation |
|---|---|---|---|
| 1 | Validate all inputs | ✅ Done | validator library |
| 2 | Use HTTPS for data transmission | ✅ Done | Self-signed SSL, port 3443 |
| 3 | Hash and salt passwords | ✅ Done | bcrypt, salt factor 10 |
| 4 | Secure HTTP response headers | ✅ Done | Helmet.js middleware |
| 5 | SQL Injection prevention | ✅ Done | Parameterized queries |
| 6 | Logging and monitoring | ✅ Done | Winston + log4js |
| 7 | Token-based authentication | ✅ Done | JWT, 1hr expiry |
| 8 | Vulnerability scanning | ✅ Done | OWASP ZAP + Nmap |

---

## ⚙️ How to Run the Project

```bash
# Clone the repository
git clone https://github.com/Albestos/cybersecurity-internship-developershub

# Navigate to the vulnerable-node folder
cd Week2-Security-Implementation/vulnerable-node

# Install dependencies
npm install

# Set environment variable
set STAGE=LOCAL  # Windows
export STAGE=LOCAL  # Mac/Linux

# Start the application
npm start

# App runs on:
# HTTP  → http://localhost:3000
# HTTPS → https://localhost:3443
```
## 🎥 Video Explanation
[Click here to watch the video] https://drive.google.com/file/d/1b5esp1ptZhv7W4pF7lMzY_APQiEJV5z6/view?usp=sharing
---

# Week 4 — Advanced Threat Detection & Web Security Enhancements

This week focused on three areas: intrusion detection, API security hardening, and security headers/CSP. All tasks were implemented and verified with functional tests (not just configuration — actual attack simulations were run against each control).

---

## Task 1 — Intrusion Detection & Monitoring (Fail2Ban)

Configured Fail2Ban on the Kali Linux host to monitor SSH and automatically ban IPs after repeated failed login attempts.

**Configuration (`/etc/fail2ban/jail.local`):**
```ini
[DEFAULT]
ignoreself = true      # reverted to true after testing (was temporarily false for local test validation)
maxretry = 3

[sshd]
enabled  = true
port     = ssh
logpath  = %(sshd_log)s
backend  = %(sshd_backend)s
maxretry = 3
findtime = 10m
bantime  = 30m
```

**Verification:** Simulated brute-force login attempts against SSH. Fail2Ban correctly detected repeated failures and banned the offending IP (`127.0.0.1`) after the threshold was reached — confirmed via `fail2ban-client status sshd` showing `Total banned: 2`, `Currently banned: 1`.

Full write-up: `Task1_SSH_Fail2Ban_Documentation.docx`

---

## Task 2 — API Security Hardening

### 2.1 Rate Limiting (`express-rate-limit`)
- Global limiter: 100 requests / 15 min per IP (`app.js`)
- Strict login limiter: 5 attempts / 10 min per IP (`routes/login.js`), specifically targeting the brute-force-prone `/login/auth` endpoint

### 2.2 CORS
- Restricted to the application's own origin (`https://localhost:3443`) instead of being unset/open
- Credentials (session cookies) only accepted from the allowed origin

### 2.3 API Key Authentication
- New middleware (`middleware/apiKeyAuth.js`) protecting `/products/buy` — a sensitive transaction endpoint (order/payment data)
- Requests without a valid `x-api-key` header receive `401 Unauthorized`

### Bug fix (discovered during testing)
`routes/login.js` had no `.catch()` on the `auth()` promise, so any failed login crashed the entire server (unhandled promise rejection) — effectively a self-inflicted DoS. Fixed by adding proper error handling and redirecting to the login page with an error message instead.

**Verification:** All three controls tested via curl and live login attempts — rate limiter correctly blocks the 6th login attempt, CORS correctly refuses to reflect disallowed origins, API key middleware correctly returns 401 without a valid key.

Full write-up: `Task2_API_Security_Hardening_Documentation.docx`

---

## Task 3 — Security Headers & CSP Implementation

Replaced the app's implicit `helmet()` defaults with an explicit, documented Content Security Policy and HSTS configuration in `app.js`:

```js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    maxAge: 15552000,
    includeSubDomains: true,
    preload: false
  }
}));
```

### Fixes required to stay CSP-compliant
- Moved an inline `<script>` block (buy-form AJAX handler, purchase modal, grid layout init) from `views/layout.ejs` into a new external file `public/js/app-custom.js`, since the previous default CSP was already silently blocking it (`script-src 'self'` disallows inline scripts).
- Removed an external "fork me on GitHub" badge image that was being blocked by `img-src`, rather than widening the policy for a cosmetic element.

**Verification:**
- Headers confirmed via `curl -I` showing the explicit CSP and HSTS values.
- Live test: submitted a reflected XSS payload (`<script>alert('XSS')</script>`) through the product search field. The app reflects the input unescaped (a genuine XSS bug, flagged for Week 5 remediation), but the browser blocked the script from executing, confirming CSP is providing real defense-in-depth protection.

Full write-up: `Task3_Security_Headers_CSP_Documentation.docx`

---

## Known Issue Carried Forward to Week 5
The product search endpoint (`routes/products.js`) reflects user input into the page without output encoding, resulting in a reflected XSS vulnerability. It is currently mitigated in-browser by the CSP policy from Task 3, but the underlying code should be fixed with proper output encoding/escaping as part of Week 5's injection remediation work.

---

## Files Changed in Week 4
- `app.js` — rate limiter, CORS, explicit Helmet/CSP/HSTS config
- `routes/login.js` — login rate limiter, added `.catch()` bug fix
- `routes/products.js` — API key middleware on `/products/buy`
- `middleware/apiKeyAuth.js` — new file
- `config.js` — added `apiKey` config value
- `views/layout.ejs` — removed inline script (moved to external file), removed external image
- `public/js/app-custom.js` — new file (externalized JS)

---

# Week 5 — Ethical Hacking & Exploiting Vulnerabilities

## Environment Setup
Kali Linux (VirtualBox) was switched from NAT to a **Bridged Adapter** to reach the Windows host directly over the local network (both ended up on the `192.168.100.x` subnet). This was required for all scanning/testing tools below to reach the running app.

## 5.1 Reconnaissance
Ran `nmap` (port/service scan) and `nikto` (web server scan) against the running app from Kali.

- Confirmed Week 4's security headers, CORS policy, and rate limiting are all active and visible externally.
- Nikto flagged the session cookie (`connect.sid`) as missing the `Secure` flag — should be `true` since the app is HTTPS-only. **(open item, see below)**
- Nikto flagged a missing `Permissions-Policy` header and a deprecated `Expect-CT` header — minor, low-priority additions.
- Nikto's ~8,000 requests triggered the app's own rate limiter mid-scan — a good sign the Week 4 rate limiting is working, though it did cause a few checks to report false "missing header" results under throttled responses.

## 5.2 SQL Injection Testing
- Reviewed every query in `model/auth.js`, `model/products.js`, and `model/init_db.js` — all use parameterized queries (`$1`, `$2` placeholders via `pg`/`pg-promise`). No string-concatenated SQL anywhere in the codebase.
- Ran SQLMap against `/products/search` (`--level=3 --risk=2 --dbms=postgresql`). First run was contaminated by the rate limiter (1,111× `429` responses); rate limit was temporarily raised, a clean re-run completed all test techniques with no injectable parameters found, then the rate limit was reverted.
- **Conclusion:** the application is not vulnerable to SQL injection at the tested endpoint, backed by both code review and a clean tool-based scan.

## 5.3 CSRF Protection
Implemented `csurf` middleware, applied to the two state-changing form flows:
- **Login** (`routes/login.js`, `views/login.ejs`) — token rendered into a hidden `_csrf` field, validated on `POST /login/auth`.
- **Purchase** (`routes/products.js`, `views/product_detail.ejs`) — token rendered into the buy modal's hidden `_csrf` field, validated on `POST /products/buy`, picked up automatically by the existing jQuery `.serialize()` AJAX call.

Verified via a full, real end-to-end purchase through the browser UI, which also surfaced three additional pre-existing bugs (see below).

## 5.4 Bugs Found and Fixed During Week 5 Testing
Attempting a genuine end-to-end purchase (necessary to validate CSRF properly) surfaced three defects that no prior testing (Weeks 1–4) had exercised:

1. **API key vs. session conflict** — Week 4's `apiKeyAuth` middleware blocked the browser's own logged-in purchase requests with `401`, since the AJAX call never sends an `x-api-key` header. Fixed by allowing authenticated sessions to bypass the API key check, while still requiring a key for external/unauthenticated API access.
2. **Dangling purchase promise** — `routes/products.js`'s buy handler had no `.then()` on the purchase call; successful purchases hung forever with no response, while failed purchases incorrectly reported success. Fixed by adding proper `.then()`/`.catch()` handling.
3. **`check_logged()` not halting execution** — the auth-check helper issued a redirect but didn't stop the calling route, causing every protected route to also try rendering a second response on unauthenticated access, producing `ERR_HTTP_HEADERS_SENT` errors. Fixed by returning `true`/`false` from `check_logged()` and updating all five call sites in `routes/products.js` to respect it.

Full write-up: `Week5_Ethical_Hacking_Documentation.docx`

## Open Items Carried Forward to Week 6
- Reflected XSS in the product search handler (`routes/products.js`) — currently mitigated in-browser by CSP, but should be fixed with proper output encoding.
- Session cookie missing the `Secure` flag (`app.js`) — should be set to `true`.

## Files Changed in Week 5
- `app.js` — csurf middleware setup
- `routes/login.js` — CSRF protection on `/login` and `/login/auth`
- `routes/products.js` — CSRF protection on `/products/detail` and `/products/buy`; fixed dangling purchase promise; fixed all `check_logged()` call sites
- `routes/login_check.js` — `check_logged()` now returns a boolean and actually halts route execution
- `middleware/apiKeyAuth.js` — session-aware bypass so logged-in browser users aren't blocked
- `views/login.ejs` — hidden `_csrf` field
- `views/product_detail.ejs` — hidden `_csrf` field in the buy form

*Prepared by Ayesha Sarwar Khan | Developers Hub Corporation | June 2026*

