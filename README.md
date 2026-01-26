# 🛡️ HealthChain: Decentralized Health Data Privacy

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-363636.svg)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-green.svg)
![Ether.js](https://img.shields.io/badge/Library-Ethers.js-yellow.svg)

**HealthChain** is a Decentralized Application (DApp) that solves the problem of data ownership in the fitness and health industry. It allows users to store their health records securely and grant permission-based access to third parties (like doctors or coaches) without relying on a centralized server.

---

## 🧐 The Problem
**Meet Sarah.** Sarah is a fitness enthusiast who exercises daily. Her smartwatch records sensitive data: her heart rate, GPS routes, and sleep patterns.

Currently, this data is sent to the watch manufacturer's centralized servers.
* **The Risk:** Sarah has no control over who sees this data. If the manufacturer's server is hacked or if they sell the data, Sarah's privacy is compromised.
* **The Limitation:** She cannot easily share *just* her heart rate data with her doctor without giving away her login credentials or exporting clumsy files.

## 💡 The Solution
**HealthChain** returns control to Sarah using Blockchain technology.
1.  **Identity:** Sarah logs in with her Crypto Wallet (MetaMask). No central database holds her password.
2.  **Storage:** Heavy data is stored on decentralized networks (IPFS), ensuring no single point of failure.
3.  **Access Control:** A Smart Contract on the Ethereum blockchain acts as the gatekeeper. Only specific wallet addresses authorized by Sarah can retrieve the decryption keys/links to view her data.

---

## 🚀 Features

* **Wallet Authentication:** Secure login using MetaMask.
* **Immutable Records:** Once a record entry is created on the blockchain, the ownership cannot be spoofed.
* **Granular Access Control:** Users can grant specific access to other users (e.g., a Doctor's wallet address).
* **Privacy First:** Even if the data exists, it cannot be "viewed" via the application interface unless the blockchain verifies the viewer's permission.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Blockchain Interaction:** Ethers.js (v5.7).
* **Smart Contract:** Solidity (Ethereum).
* **Development Environment:** Remix IDE (for deployment), VS Code.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/healthchain.git](https://github.com/your-username/healthchain.git)
cd healthchain
