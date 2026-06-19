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

---



*Prepared by Ayesha Sarwar Khan | Developers Hub Corporation | June 2026*

