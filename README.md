# Modern POS & Inventory Management System

A modern, offline-first Point of Sale (POS) and Inventory Management web application tailored for Sri Lankan retail and grocery stores, featuring real-time file synchronization and a sleek dashboard UI inspired by Coursie.

## ✨ Features

- **Offline-First Local Storage**: All inventory, sales records, stock logs, and settings persist directly to a local JSON file (`data.json`) on your computer.
- **Real-Time Auto-Update (SSE)**: Built-in Node.js lightweight server with Server-Sent Events (SSE) and file watcher debouncing for instant two-way synchronization between disk and UI.
- **Preloaded Sri Lankan Grocery Master Catalog**: Includes 200+ essential grocery items categorized into 18 categories (Rice, Flours, Pulses, Dairy, Spices, Oils, Biscuits, Household, Personal Care, Baby Care, etc.) with barcodes, cost prices, and retail selling prices in Sri Lankan Rupees (LKR).
- **POS Billing & Thermal Receipt Printing**:
  - Quick barcode scanner & instant text search.
  - Cash / Card payment modes with quick cash tender chips.
  - Automatic invoice number generation.
  - Thermal receipt printing format (supports 58mm, 80mm receipt printers and standard A4).
- **Smart Inventory & Stock Control**:
  - Automatic stock reduction on sale checkout.
  - Restocking (`+ Stock`) modal with supplier notes and cost tracking.
  - Low stock warning pills and inventory health percentage gauge.
- **Dashboard Analytics**:
  - KPI summary cards (Total Revenue, Gross Profit, Total Orders, Low Stock Alerts).
  - Shift time tracker with live clock.
  - Weekly sales capsule bar chart and recent transactions log.
- **One-Click Windows Launcher**: Double-click `Start_POS.bat` to launch the server and open the app in your default browser.

---

## 🚀 Quick Start

### 1. Requirements
- [Node.js](https://nodejs.org/) (v16 or higher)

### 2. Launching the App
Simply double-click the `Start_POS.bat` file in the project directory, or run from terminal:

```bash
# Start server
node server.js
```

Then navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
├── data.json        # Local JSON database (products, sales, stock logs, settings)
├── index.html       # Coursie-styled POS & Inventory single-page application
├── server.js        # Pure Node.js HTTP & SSE auto-sync server
├── Start_POS.bat    # Windows 1-click launcher
├── .gitignore       # Git ignore rules
└── README.md        # Documentation
```

---

## 🛒 Included Categories (200+ Items)
- Rice & Grains (Keeri Samba, Nadu, Red Raw, Basmati, etc.)
- Pulses & Grains (Dhal, Chickpeas, Green Gram, Cowpea, Soya Meat)
- Flours (Wheat, Kurakkan, Atta, Rice flour)
- Dairy & Milk (Anchor, Maliban, Pelwatte, Highland, Kotmale)
- Spices & Curry Powders (Chilli, Curry, Turmeric, Pepper, Cinnamon, etc.)
- Cooking Oils & Kitchen Essentials (Coconut oil, Sunflower oil, Salt, Maldive fish)
- Tea & Coffee (Dilmah, Watawala, Lipton, Harischandra)
- Instant Foods & Canned Goods (Noodles, Samaposha, Canned fish)
- Biscuits & Bakery (Munchee, Maliban)
- Beverages, Household & Cleaning, Personal Care, Baby Care & Stationery

---

## 📄 License
MIT License
