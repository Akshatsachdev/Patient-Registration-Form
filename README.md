🩺📋 Patient Registration System

A full-stack web-based **Patient Registration System** built with **React, Node.js, Express, PostgreSQL, and Tailwind CSS**. It streamlines the process of registering new patients, retrieving existing records, and printing detailed patient slips — complete with age-based clinic unit assignments.

---

📌 Features

- 🆕 Register new patients with required details
- 🔁 Fetch existing patient data by contact number
- 🔐 Generates unique Patient ID using contact
- 🏥 Automatically assigns clinic units by age:
  - Age 0–14 → Unit 1
  - Age 15–40 → Random Unit 2/3/4
  - Age 41+ → Unit 5
- 🖨️ Generates printable patient slip on registration/fetch
- 📄 Fields include:
  - Name
  - Age
  - Gender
  - Contact Number
  - Email
  - Aadhar Number
  - Purpose of Visit (Dropdown)
- ⚡ Fast and responsive UI with Tailwind CSS
- 🌄 Clean background with blur effect

---

🧰 Tech Stack

| Frontend       | Backend        | Database     |
|----------------|----------------|--------------|
| React + Vite   | Node.js + Express | PostgreSQL |
| Tailwind CSS   | REST API       | pg module    |

---

🚀 Setup Instructions

1. Clone this repository
   ```bash
   git clone https://github.com/Akshatsachdev/Patient-Registration-Form.git
   cd Patient-Registration-Form
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Install backend dependencies
   ```bash
   cd ../server
   npm install
   node index.js
   ```

4. PostgreSQL Setup
   - Create a database: `PatientDB`
   - Make sure table creation is handled in `index.js` on server start.

---

🖼️ Preview

🧾 Patient Registration Form
![Form UI](https://your-link.com/form-preview.png)

📋 Patient Slip
![Patient Slip](https://your-link.com/slip-preview.png)

---

📄 Purpose of Visit Options

- Regular Checkup  
- Follow-up  
- Regular Investigation  
- Certification  

---

🚀 Future Enhancements

-🧾 Download Patient Slip as PDF for digital storage and sharing

-🔐 Add Admin/Reception Login with authentication & session management

-📂 Patient Visit History View for tracking return visits and treatments

-📊 Dashboard Analytics to monitor patient flow and unit-wise distribution

-📱 Mobile-Friendly Design for tablet use at reception counters

-🌐 Deploy with CI/CD for live updates and online access
---

## 🧑‍💻 Author

**Akshat** — _Designed and developed as part of a patient management module project._

---
