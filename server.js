const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// SSE Connected clients
const sseClients = new Set();

function broadcastUpdate(data) {
  const message = `data: ${JSON.stringify({ type: 'update', data, timestamp: Date.now() })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(message);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// Watch data.json for changes made on computer disk
let fileWatchDebounce = null;
let ignoreNextWatch = false;

function setupFileWatcher() {
  try {
    fs.watch(DATA_FILE, (eventType) => {
      if (eventType === 'change') {
        if (ignoreNextWatch) {
          ignoreNextWatch = false;
          return;
        }
        clearTimeout(fileWatchDebounce);
        fileWatchDebounce = setTimeout(() => {
          console.log('[Auto-Update] data.json changed on computer, broadcasting to clients...');
          const freshData = loadData();
          broadcastUpdate(freshData);
        }, 150);
      }
    });
  } catch (err) {
    console.warn('[Watch Error]', err.message);
  }
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
      settings: {
        companyName: 'Lanka Super Grocery',
        phone: '0715971214',
        address: 'Colombo, Sri Lanka',
        currency: 'Rs.',
        taxRate: 0,
        footerText: 'Thank you for your business! Visit us again.',
        theme: 'light',
        receiptSize: '80mm',
        invoicePrefix: 'INV'
      },
      products: [
  {
    "id": "gr_rice_01",
    "name": "Keeri Samba Rice 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001001",
    "costPrice": 290,
    "sellingPrice": 340,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_rice_02",
    "name": "Keeri Samba Rice 5kg",
    "category": "Rice & Grains",
    "barcode": "4792001002",
    "costPrice": 1420,
    "sellingPrice": 1650,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_rice_03",
    "name": "White Raw Rice (Kekulu) 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001003",
    "costPrice": 195,
    "sellingPrice": 220,
    "stock": 60,
    "lowStockAlert": 10
  },
  {
    "id": "gr_rice_04",
    "name": "White Raw Rice (Kekulu) 5kg",
    "category": "Rice & Grains",
    "barcode": "4792001004",
    "costPrice": 950,
    "sellingPrice": 1080,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_rice_05",
    "name": "Red Raw Rice (Kekulu) 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001005",
    "costPrice": 190,
    "sellingPrice": 215,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_rice_06",
    "name": "Red Raw Rice (Kekulu) 5kg",
    "category": "Rice & Grains",
    "barcode": "4792001006",
    "costPrice": 930,
    "sellingPrice": 1050,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_rice_07",
    "name": "White Nadu Rice 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001007",
    "costPrice": 200,
    "sellingPrice": 230,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_rice_08",
    "name": "Red Nadu Rice 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001008",
    "costPrice": 205,
    "sellingPrice": 235,
    "stock": 35,
    "lowStockAlert": 10
  },
  {
    "id": "gr_rice_09",
    "name": "Samba Rice 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001009",
    "costPrice": 220,
    "sellingPrice": 250,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_rice_10",
    "name": "Basmati Rice 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001010",
    "costPrice": 450,
    "sellingPrice": 550,
    "stock": 30,
    "lowStockAlert": 5
  },
  {
    "id": "gr_rice_11",
    "name": "Suwandel Traditional Rice 1kg",
    "category": "Rice & Grains",
    "barcode": "4792001011",
    "costPrice": 420,
    "sellingPrice": 520,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_rice_12",
    "name": "Kurakkan Flour (Finger Millet) 500g",
    "category": "Flours & Grains",
    "barcode": "4792001012",
    "costPrice": 240,
    "sellingPrice": 310,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_rice_13",
    "name": "White Rice Flour (Haal Piti) 1kg",
    "category": "Flours & Grains",
    "barcode": "4792001013",
    "costPrice": 210,
    "sellingPrice": 260,
    "stock": 30,
    "lowStockAlert": 5
  },
  {
    "id": "gr_pulse_01",
    "name": "Red Dhal (Mysore Parippu) 1kg",
    "category": "Pulses & Essentials",
    "barcode": "4792002001",
    "costPrice": 295,
    "sellingPrice": 330,
    "stock": 80,
    "lowStockAlert": 15
  },
  {
    "id": "gr_pulse_02",
    "name": "Red Dhal (Mysore Parippu) 500g",
    "category": "Pulses & Essentials",
    "barcode": "4792002002",
    "costPrice": 150,
    "sellingPrice": 170,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_pulse_03",
    "name": "White Sugar 1kg",
    "category": "Sugar & Sweeteners",
    "barcode": "4792002003",
    "costPrice": 240,
    "sellingPrice": 275,
    "stock": 100,
    "lowStockAlert": 20
  },
  {
    "id": "gr_pulse_04",
    "name": "Brown Sugar 1kg",
    "category": "Sugar & Sweeteners",
    "barcode": "4792002004",
    "costPrice": 320,
    "sellingPrice": 380,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_pulse_05",
    "name": "Icing Sugar 500g",
    "category": "Sugar & Sweeteners",
    "barcode": "4792002005",
    "costPrice": 260,
    "sellingPrice": 330,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_pulse_06",
    "name": "Prima All Purpose Wheat Flour 1kg",
    "category": "Flours & Grains",
    "barcode": "4792002006",
    "costPrice": 180,
    "sellingPrice": 210,
    "stock": 60,
    "lowStockAlert": 15
  },
  {
    "id": "gr_pulse_07",
    "name": "Prima Special Self Raising Flour 1kg",
    "category": "Flours & Grains",
    "barcode": "4792002007",
    "costPrice": 230,
    "sellingPrice": 280,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_pulse_08",
    "name": "Table Salt Free Flowing 1kg",
    "category": "Pulses & Essentials",
    "barcode": "4792002008",
    "costPrice": 80,
    "sellingPrice": 110,
    "stock": 60,
    "lowStockAlert": 15
  },
  {
    "id": "gr_pulse_09",
    "name": "Crystal Sea Salt (Keta Lunu) 1kg",
    "category": "Pulses & Essentials",
    "barcode": "4792002009",
    "costPrice": 65,
    "sellingPrice": 90,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_pulse_10",
    "name": "Chickpeas (Kadala) 500g",
    "category": "Pulses & Essentials",
    "barcode": "4792002010",
    "costPrice": 240,
    "sellingPrice": 290,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_pulse_11",
    "name": "Green Gram (Mung Eta) 500g",
    "category": "Pulses & Essentials",
    "barcode": "4792002011",
    "costPrice": 280,
    "sellingPrice": 340,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_pulse_12",
    "name": "Cowpea (Kowpi) 500g",
    "category": "Pulses & Essentials",
    "barcode": "4792002012",
    "costPrice": 250,
    "sellingPrice": 310,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_pulse_13",
    "name": "Soya Meat Curry Flavor 90g",
    "category": "Pulses & Essentials",
    "barcode": "4792002013",
    "costPrice": 95,
    "sellingPrice": 125,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_pulse_14",
    "name": "Soya Meat Chicken Flavor 90g",
    "category": "Pulses & Essentials",
    "barcode": "4792002014",
    "costPrice": 95,
    "sellingPrice": 125,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_pulse_15",
    "name": "Soya Meat Mutton Flavor 90g",
    "category": "Pulses & Essentials",
    "barcode": "4792002015",
    "costPrice": 95,
    "sellingPrice": 125,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_pulse_16",
    "name": "Soya Meat Polos Flavor 90g",
    "category": "Pulses & Essentials",
    "barcode": "4792002016",
    "costPrice": 95,
    "sellingPrice": 125,
    "stock": 30,
    "lowStockAlert": 8
  },
  {
    "id": "gr_pulse_17",
    "name": "Sago Pearls (Saabu) 250g",
    "category": "Pulses & Essentials",
    "barcode": "4792002017",
    "costPrice": 140,
    "sellingPrice": 190,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_01",
    "name": "Anchor Full Cream Milk Powder 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003001",
    "costPrice": 980,
    "sellingPrice": 1080,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_dairy_02",
    "name": "Anchor Full Cream Milk Powder 1kg",
    "category": "Dairy & Milk",
    "barcode": "4792003002",
    "costPrice": 2410,
    "sellingPrice": 2650,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_dairy_03",
    "name": "Maliban Full Cream Milk Powder 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003003",
    "costPrice": 940,
    "sellingPrice": 1040,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_dairy_04",
    "name": "Pelwatte Full Cream Milk Powder 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003004",
    "costPrice": 920,
    "sellingPrice": 1020,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_dairy_05",
    "name": "Highland Full Cream Milk Powder 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003005",
    "costPrice": 930,
    "sellingPrice": 1030,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_dairy_06",
    "name": "Ratthi Full Cream Milk Powder 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003006",
    "costPrice": 950,
    "sellingPrice": 1050,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_07",
    "name": "Nestomalt Malted Drink 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003007",
    "costPrice": 690,
    "sellingPrice": 780,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_dairy_08",
    "name": "Milo Activ-Go Chocolate Drink 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003008",
    "costPrice": 780,
    "sellingPrice": 890,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_dairy_09",
    "name": "Viva Malted Food Drink 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003009",
    "costPrice": 680,
    "sellingPrice": 790,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_10",
    "name": "Horlicks Malted Drink 400g",
    "category": "Dairy & Milk",
    "barcode": "4792003010",
    "costPrice": 890,
    "sellingPrice": 1020,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_dairy_11",
    "name": "Highland Fresh Milk 1L",
    "category": "Dairy & Milk",
    "barcode": "4792003011",
    "costPrice": 420,
    "sellingPrice": 490,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_dairy_12",
    "name": "Kotmale Fresh Milk 1L",
    "category": "Dairy & Milk",
    "barcode": "4792003012",
    "costPrice": 410,
    "sellingPrice": 480,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_13",
    "name": "Highland Sweetened Fresh Milk 180ml",
    "category": "Dairy & Milk",
    "barcode": "4792003013",
    "costPrice": 110,
    "sellingPrice": 140,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_dairy_14",
    "name": "Kotmale Salted Butter 200g",
    "category": "Dairy & Milk",
    "barcode": "4792003014",
    "costPrice": 650,
    "sellingPrice": 780,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_15",
    "name": "Highland Salted Butter 200g",
    "category": "Dairy & Milk",
    "barcode": "4792003015",
    "costPrice": 660,
    "sellingPrice": 790,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_16",
    "name": "Astra Fat Spread 250g",
    "category": "Dairy & Milk",
    "barcode": "4792003016",
    "costPrice": 320,
    "sellingPrice": 390,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_dairy_17",
    "name": "Astra Fat Spread 500g",
    "category": "Dairy & Milk",
    "barcode": "4792003017",
    "costPrice": 610,
    "sellingPrice": 740,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_18",
    "name": "Kotmale Cheddar Cheese 200g",
    "category": "Dairy & Milk",
    "barcode": "4792003018",
    "costPrice": 820,
    "sellingPrice": 960,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_dairy_19",
    "name": "Happy Cow Cheese 8 Portions",
    "category": "Dairy & Milk",
    "barcode": "4792003019",
    "costPrice": 560,
    "sellingPrice": 670,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_dairy_20",
    "name": "Highland Curd (Meekiri) Clay Pot 1L",
    "category": "Dairy & Milk",
    "barcode": "4792003020",
    "costPrice": 450,
    "sellingPrice": 540,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_dairy_21",
    "name": "Highland Sweetened Yoghurt Cup",
    "category": "Dairy & Milk",
    "barcode": "4792003021",
    "costPrice": 65,
    "sellingPrice": 80,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_dairy_22",
    "name": "Kotmale Vanilla Yoghurt Cup",
    "category": "Dairy & Milk",
    "barcode": "4792003022",
    "costPrice": 65,
    "sellingPrice": 80,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_spice_01",
    "name": "Roasted Curry Powder (Thunapaha) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004001",
    "costPrice": 140,
    "sellingPrice": 180,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_spice_02",
    "name": "Roasted Curry Powder (Thunapaha) 250g",
    "category": "Spices & Curry",
    "barcode": "4792004002",
    "costPrice": 320,
    "sellingPrice": 410,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_03",
    "name": "Raw Curry Powder (Amu Thunapaha) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004003",
    "costPrice": 130,
    "sellingPrice": 170,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_spice_04",
    "name": "Raw Curry Powder (Amu Thunapaha) 250g",
    "category": "Spices & Curry",
    "barcode": "4792004004",
    "costPrice": 300,
    "sellingPrice": 390,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_05",
    "name": "Chilli Powder (Miris Kudu) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004005",
    "costPrice": 160,
    "sellingPrice": 210,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_spice_06",
    "name": "Chilli Powder (Miris Kudu) 250g",
    "category": "Spices & Curry",
    "barcode": "4792004006",
    "costPrice": 380,
    "sellingPrice": 490,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_07",
    "name": "Chilli Pieces (Keli Miris) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004007",
    "costPrice": 170,
    "sellingPrice": 220,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_spice_08",
    "name": "Chilli Pieces (Keli Miris) 250g",
    "category": "Spices & Curry",
    "barcode": "4792004008",
    "costPrice": 400,
    "sellingPrice": 510,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_09",
    "name": "Turmeric Powder (Kaha Kudu) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004009",
    "costPrice": 180,
    "sellingPrice": 240,
    "stock": 35,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_10",
    "name": "Black Pepper Powder (Gammiris) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004010",
    "costPrice": 260,
    "sellingPrice": 340,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_11",
    "name": "Black Pepper Seeds (Gammiris Eta) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004011",
    "costPrice": 250,
    "sellingPrice": 330,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_12",
    "name": "Mustard Seeds (Aba) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004012",
    "costPrice": 90,
    "sellingPrice": 130,
    "stock": 35,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_13",
    "name": "Cumin Seeds (Suduru) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004013",
    "costPrice": 190,
    "sellingPrice": 250,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_14",
    "name": "Sweet Cumin (Maduru) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004014",
    "costPrice": 160,
    "sellingPrice": 220,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_15",
    "name": "Fenugreek Seeds (Uluhal) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004015",
    "costPrice": 110,
    "sellingPrice": 150,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_16",
    "name": "Coriander Seeds (Koththamalli) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004016",
    "costPrice": 120,
    "sellingPrice": 160,
    "stock": 30,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_17",
    "name": "Cardamom (Enasal) 50g",
    "category": "Spices & Curry",
    "barcode": "4792004017",
    "costPrice": 620,
    "sellingPrice": 890,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_spice_18",
    "name": "Cloves (Karabu Nati) 50g",
    "category": "Spices & Curry",
    "barcode": "4792004018",
    "costPrice": 380,
    "sellingPrice": 520,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_spice_19",
    "name": "Cinnamon Sticks (Kurundu) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004019",
    "costPrice": 340,
    "sellingPrice": 460,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_20",
    "name": "Goraka Dried (Garcinia) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004020",
    "costPrice": 180,
    "sellingPrice": 250,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_21",
    "name": "Tamarind (Siyambala) 200g",
    "category": "Spices & Curry",
    "barcode": "4792004021",
    "costPrice": 160,
    "sellingPrice": 220,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_spice_22",
    "name": "Maldive Fish Chips (Umbalakada) 100g",
    "category": "Spices & Curry",
    "barcode": "4792004022",
    "costPrice": 520,
    "sellingPrice": 690,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_spice_23",
    "name": "Knorr Chicken Soup Cubes (Box of 12)",
    "category": "Spices & Curry",
    "barcode": "4792004023",
    "costPrice": 340,
    "sellingPrice": 420,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_24",
    "name": "Maggi Chicken Flavor Stock Cubes",
    "category": "Spices & Curry",
    "barcode": "4792004024",
    "costPrice": 320,
    "sellingPrice": 390,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_spice_25",
    "name": "Maggi Coconut Milk Powder 150g",
    "category": "Kitchen Essentials",
    "barcode": "4792004025",
    "costPrice": 280,
    "sellingPrice": 340,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_spice_26",
    "name": "Maggi Coconut Milk Powder 300g",
    "category": "Kitchen Essentials",
    "barcode": "4792004026",
    "costPrice": 520,
    "sellingPrice": 620,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_oil_01",
    "name": "Pure White Coconut Oil 500ml",
    "category": "Cooking Oils",
    "barcode": "4792005001",
    "costPrice": 340,
    "sellingPrice": 420,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_oil_02",
    "name": "Pure White Coconut Oil 1L Bottle",
    "category": "Cooking Oils",
    "barcode": "4792005002",
    "costPrice": 640,
    "sellingPrice": 780,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_oil_03",
    "name": "Fortune Vegetable Cooking Oil 1L",
    "category": "Cooking Oils",
    "barcode": "4792005003",
    "costPrice": 550,
    "sellingPrice": 670,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_oil_04",
    "name": "Fortune Vegetable Cooking Oil 2L",
    "category": "Cooking Oils",
    "barcode": "4792005004",
    "costPrice": 1080,
    "sellingPrice": 1290,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_oil_05",
    "name": "Marina Coconut Oil 1L Pouch",
    "category": "Cooking Oils",
    "barcode": "4792005005",
    "costPrice": 620,
    "sellingPrice": 750,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_oil_06",
    "name": "Pure Cow Ghee (Elagithela) 200ml",
    "category": "Cooking Oils",
    "barcode": "4792005006",
    "costPrice": 680,
    "sellingPrice": 840,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_tea_01",
    "name": "Watawala Tea 200g Pack",
    "category": "Tea & Coffee",
    "barcode": "4792006001",
    "costPrice": 380,
    "sellingPrice": 460,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_tea_02",
    "name": "Watawala Tea 400g Pack",
    "category": "Tea & Coffee",
    "barcode": "4792006002",
    "costPrice": 720,
    "sellingPrice": 860,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_tea_03",
    "name": "Dilmah Premium Ceylon Tea 200g",
    "category": "Tea & Coffee",
    "barcode": "4792006003",
    "costPrice": 440,
    "sellingPrice": 540,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_tea_04",
    "name": "Dilmah Green Tea (25 Tea Bags)",
    "category": "Tea & Coffee",
    "barcode": "4792006004",
    "costPrice": 490,
    "sellingPrice": 620,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_tea_05",
    "name": "Zesta BOPF Pure Ceylon Tea 200g",
    "category": "Tea & Coffee",
    "barcode": "4792006005",
    "costPrice": 410,
    "sellingPrice": 500,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_tea_06",
    "name": "Harischandra Pure Ground Coffee 200g",
    "category": "Tea & Coffee",
    "barcode": "4792006006",
    "costPrice": 390,
    "sellingPrice": 480,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_tea_07",
    "name": "Nescafe Classic Instant Coffee 50g Jar",
    "category": "Tea & Coffee",
    "barcode": "4792006007",
    "costPrice": 650,
    "sellingPrice": 780,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_tea_08",
    "name": "Nescafe 3-in-1 Coffee Mix (Pack of 5)",
    "category": "Tea & Coffee",
    "barcode": "4792006008",
    "costPrice": 380,
    "sellingPrice": 460,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_inst_01",
    "name": "Prima Stella Instant Noodles 400g",
    "category": "Instant Food",
    "barcode": "4792007001",
    "costPrice": 260,
    "sellingPrice": 320,
    "stock": 50,
    "lowStockAlert": 12
  },
  {
    "id": "gr_inst_02",
    "name": "Prima Kottu Mee Hot & Spicy 80g",
    "category": "Instant Food",
    "barcode": "4792007002",
    "costPrice": 110,
    "sellingPrice": 140,
    "stock": 60,
    "lowStockAlert": 15
  },
  {
    "id": "gr_inst_03",
    "name": "Maggi Chicken 2-Minute Noodles 73g",
    "category": "Instant Food",
    "barcode": "4792007003",
    "costPrice": 100,
    "sellingPrice": 130,
    "stock": 70,
    "lowStockAlert": 15
  },
  {
    "id": "gr_inst_04",
    "name": "Maggi Curry 2-Minute Noodles 73g",
    "category": "Instant Food",
    "barcode": "4792007004",
    "costPrice": 100,
    "sellingPrice": 130,
    "stock": 70,
    "lowStockAlert": 15
  },
  {
    "id": "gr_inst_05",
    "name": "Maggi Daiya Noodles 80g",
    "category": "Instant Food",
    "barcode": "4792007005",
    "costPrice": 120,
    "sellingPrice": 150,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_inst_06",
    "name": "Roza Elbow Macaroni Pasta 400g",
    "category": "Instant Food",
    "barcode": "4792007006",
    "costPrice": 250,
    "sellingPrice": 310,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_inst_07",
    "name": "Roza Spaghetti Pasta 400g",
    "category": "Instant Food",
    "barcode": "4792007007",
    "costPrice": 270,
    "sellingPrice": 330,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_inst_08",
    "name": "Canned Mackerel (Salmon) 425g Large",
    "category": "Canned Goods",
    "barcode": "4792007008",
    "costPrice": 480,
    "sellingPrice": 590,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_inst_09",
    "name": "Canned Mackerel (Salmon) 155g Small",
    "category": "Canned Goods",
    "barcode": "4792007009",
    "costPrice": 240,
    "sellingPrice": 300,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_inst_10",
    "name": "Canned Tuna Flakes in Oil 185g",
    "category": "Canned Goods",
    "barcode": "4792007010",
    "costPrice": 390,
    "sellingPrice": 490,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_inst_11",
    "name": "Kist Canned Baked Beans 400g",
    "category": "Canned Goods",
    "barcode": "4792007011",
    "costPrice": 350,
    "sellingPrice": 440,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_inst_12",
    "name": "Samaposha Pre-cooked Cereal 200g",
    "category": "Instant Food",
    "barcode": "4792007012",
    "costPrice": 180,
    "sellingPrice": 230,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_inst_13",
    "name": "Samaposha Pre-cooked Cereal 500g",
    "category": "Instant Food",
    "barcode": "4792007013",
    "costPrice": 410,
    "sellingPrice": 510,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_inst_14",
    "name": "Sera Canned Sweet Corn 400g",
    "category": "Canned Goods",
    "barcode": "4792007014",
    "costPrice": 320,
    "sellingPrice": 410,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_sauce_01",
    "name": "MD Tomato Sauce 400g",
    "category": "Sauces & Condiments",
    "barcode": "4792008001",
    "costPrice": 340,
    "sellingPrice": 420,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_sauce_02",
    "name": "MD Chilli Sauce 400g",
    "category": "Sauces & Condiments",
    "barcode": "4792008002",
    "costPrice": 320,
    "sellingPrice": 390,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_sauce_03",
    "name": "Kist Mixed Fruit Jam 500g Glass Jar",
    "category": "Sauces & Condiments",
    "barcode": "4792008003",
    "costPrice": 420,
    "sellingPrice": 530,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_sauce_04",
    "name": "Kist Strawberry Jam 500g",
    "category": "Sauces & Condiments",
    "barcode": "4792008004",
    "costPrice": 450,
    "sellingPrice": 560,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_sauce_05",
    "name": "MD Woodapple Jam 500g",
    "category": "Sauces & Condiments",
    "barcode": "4792008005",
    "costPrice": 390,
    "sellingPrice": 480,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_sauce_06",
    "name": "Edinborough Dark Soya Sauce 350ml",
    "category": "Sauces & Condiments",
    "barcode": "4792008006",
    "costPrice": 280,
    "sellingPrice": 360,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_sauce_07",
    "name": "Edinborough Artificial White Vinegar 350ml",
    "category": "Sauces & Condiments",
    "barcode": "4792008007",
    "costPrice": 110,
    "sellingPrice": 150,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_sauce_08",
    "name": "Kist Pure Kithul Treacle (Pani) 350ml",
    "category": "Sauces & Condiments",
    "barcode": "4792008008",
    "costPrice": 650,
    "sellingPrice": 820,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_sauce_09",
    "name": "Kist Real Mayonnaise 250g Jar",
    "category": "Sauces & Condiments",
    "barcode": "4792008009",
    "costPrice": 390,
    "sellingPrice": 490,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_bisc_01",
    "name": "Munchee Super Cream Cracker 500g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009001",
    "costPrice": 340,
    "sellingPrice": 410,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_bisc_02",
    "name": "Munchee Super Cream Cracker 125g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009002",
    "costPrice": 95,
    "sellingPrice": 120,
    "stock": 60,
    "lowStockAlert": 15
  },
  {
    "id": "gr_bisc_03",
    "name": "Munchee Chocolate Puff 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009003",
    "costPrice": 210,
    "sellingPrice": 260,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_bisc_04",
    "name": "Munchee Lemon Puff 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009004",
    "costPrice": 200,
    "sellingPrice": 250,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_bisc_05",
    "name": "Munchee Tikiri Marie 350g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009005",
    "costPrice": 230,
    "sellingPrice": 290,
    "stock": 50,
    "lowStockAlert": 10
  },
  {
    "id": "gr_bisc_06",
    "name": "Munchee Ginger Biscuits 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009006",
    "costPrice": 180,
    "sellingPrice": 230,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bisc_07",
    "name": "Munchee Hawaiian Cookies 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009007",
    "costPrice": 210,
    "sellingPrice": 260,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bisc_08",
    "name": "Munchee Nice Coconut Biscuits 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009008",
    "costPrice": 160,
    "sellingPrice": 200,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bisc_09",
    "name": "Maliban Gold Marie 300g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009009",
    "costPrice": 220,
    "sellingPrice": 280,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_bisc_10",
    "name": "Maliban Smart Cream Cracker 500g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009010",
    "costPrice": 340,
    "sellingPrice": 410,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_bisc_11",
    "name": "Maliban Lemon Puff 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009011",
    "costPrice": 200,
    "sellingPrice": 250,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bisc_12",
    "name": "Maliban Real Chocolate Cream 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009012",
    "costPrice": 210,
    "sellingPrice": 260,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bisc_13",
    "name": "Maliban Real Custard Cream 200g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009013",
    "costPrice": 200,
    "sellingPrice": 250,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bisc_14",
    "name": "Tiara Layer Cake Vanilla 180g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009014",
    "costPrice": 220,
    "sellingPrice": 280,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bisc_15",
    "name": "Tiara Swiss Roll Chocolate 150g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009015",
    "costPrice": 240,
    "sellingPrice": 310,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bisc_16",
    "name": "Roasted Salted Cashew Nuts 100g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009016",
    "costPrice": 550,
    "sellingPrice": 780,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bisc_17",
    "name": "Roasted Salted Peanuts (Rata Kaju) 100g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009017",
    "costPrice": 140,
    "sellingPrice": 190,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_bisc_18",
    "name": "Fried Cassava Chips Chilli 100g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009018",
    "costPrice": 150,
    "sellingPrice": 200,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bisc_19",
    "name": "Sri Lankan Spicy Mixture 100g",
    "category": "Biscuits & Bakery",
    "barcode": "4792009019",
    "costPrice": 120,
    "sellingPrice": 160,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_bev_01",
    "name": "Elephant House Cream Soda 1.5L",
    "category": "Beverages",
    "barcode": "4792010001",
    "costPrice": 310,
    "sellingPrice": 380,
    "stock": 30,
    "lowStockAlert": 8
  },
  {
    "id": "gr_bev_02",
    "name": "Elephant House Cream Soda 400ml",
    "category": "Beverages",
    "barcode": "4792010002",
    "costPrice": 110,
    "sellingPrice": 140,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_bev_03",
    "name": "Elephant House Necto 1.5L",
    "category": "Beverages",
    "barcode": "4792010003",
    "costPrice": 310,
    "sellingPrice": 380,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bev_04",
    "name": "Elephant House Ginger Beer (EGB) 1.5L",
    "category": "Beverages",
    "barcode": "4792010004",
    "costPrice": 320,
    "sellingPrice": 390,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bev_05",
    "name": "Elephant House EGB 400ml",
    "category": "Beverages",
    "barcode": "4792010005",
    "costPrice": 120,
    "sellingPrice": 150,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_bev_06",
    "name": "Coca-Cola 1.5L Bottle",
    "category": "Beverages",
    "barcode": "4792010006",
    "costPrice": 330,
    "sellingPrice": 400,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bev_07",
    "name": "Coca-Cola 400ml Pet Bottle",
    "category": "Beverages",
    "barcode": "4792010007",
    "costPrice": 130,
    "sellingPrice": 160,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_bev_08",
    "name": "Sprite 1.5L Bottle",
    "category": "Beverages",
    "barcode": "4792010008",
    "costPrice": 330,
    "sellingPrice": 400,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_bev_09",
    "name": "Fanta Orange 1.5L Bottle",
    "category": "Beverages",
    "barcode": "4792010009",
    "costPrice": 330,
    "sellingPrice": 400,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bev_10",
    "name": "Pepsi 1.5L Bottle",
    "category": "Beverages",
    "barcode": "4792010010",
    "costPrice": 310,
    "sellingPrice": 380,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bev_11",
    "name": "Sunquick Orange Fruit Cordial 330ml",
    "category": "Beverages",
    "barcode": "4792010011",
    "costPrice": 650,
    "sellingPrice": 790,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_bev_12",
    "name": "Sunquick Orange Fruit Cordial 840ml",
    "category": "Beverages",
    "barcode": "4792010012",
    "costPrice": 1420,
    "sellingPrice": 1680,
    "stock": 15,
    "lowStockAlert": 3
  },
  {
    "id": "gr_bev_13",
    "name": "Smak Mixed Fruit Nectar Drink 200ml",
    "category": "Beverages",
    "barcode": "4792010013",
    "costPrice": 90,
    "sellingPrice": 120,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_bev_14",
    "name": "Milo Ready-to-Drink Pack 180ml",
    "category": "Beverages",
    "barcode": "4792010014",
    "costPrice": 110,
    "sellingPrice": 140,
    "stock": 50,
    "lowStockAlert": 12
  },
  {
    "id": "gr_bev_15",
    "name": "Knuckles Pure Mineral Water 500ml",
    "category": "Beverages",
    "barcode": "4792010015",
    "costPrice": 50,
    "sellingPrice": 70,
    "stock": 60,
    "lowStockAlert": 15
  },
  {
    "id": "gr_bev_16",
    "name": "Knuckles Pure Mineral Water 1.5L",
    "category": "Beverages",
    "barcode": "4792010016",
    "costPrice": 90,
    "sellingPrice": 130,
    "stock": 50,
    "lowStockAlert": 12
  },
  {
    "id": "gr_bev_17",
    "name": "Knuckles Pure Mineral Water 5L Can",
    "category": "Beverages",
    "barcode": "4792010017",
    "costPrice": 240,
    "sellingPrice": 320,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_bev_18",
    "name": "Elephant House Plain Soda 400ml",
    "category": "Beverages",
    "barcode": "4792010018",
    "costPrice": 85,
    "sellingPrice": 110,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_clean_01",
    "name": "Sunlight Yellow Laundry Soap 110g",
    "category": "Household & Cleaning",
    "barcode": "4792011001",
    "costPrice": 110,
    "sellingPrice": 140,
    "stock": 80,
    "lowStockAlert": 20
  },
  {
    "id": "gr_clean_02",
    "name": "Sunlight Care Soap Bar 110g",
    "category": "Household & Cleaning",
    "barcode": "4792011002",
    "costPrice": 115,
    "sellingPrice": 145,
    "stock": 60,
    "lowStockAlert": 15
  },
  {
    "id": "gr_clean_03",
    "name": "Sunlight Lemon Detergent Powder 1kg",
    "category": "Household & Cleaning",
    "barcode": "4792011003",
    "costPrice": 460,
    "sellingPrice": 560,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_clean_04",
    "name": "Surf Excel Washing Powder 500g",
    "category": "Household & Cleaning",
    "barcode": "4792011004",
    "costPrice": 310,
    "sellingPrice": 380,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_clean_05",
    "name": "Surf Excel Washing Powder 1kg",
    "category": "Household & Cleaning",
    "barcode": "4792011005",
    "costPrice": 590,
    "sellingPrice": 720,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_clean_06",
    "name": "Diva Floral Detergent Powder 1kg",
    "category": "Household & Cleaning",
    "barcode": "4792011006",
    "costPrice": 410,
    "sellingPrice": 490,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_clean_07",
    "name": "Rin Advanced Detergent Bar 125g",
    "category": "Household & Cleaning",
    "barcode": "4792011007",
    "costPrice": 95,
    "sellingPrice": 120,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_clean_08",
    "name": "Comfort Fabric Conditioner 200ml",
    "category": "Household & Cleaning",
    "barcode": "4792011008",
    "costPrice": 280,
    "sellingPrice": 360,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_clean_09",
    "name": "Vim Dishwash Bar 100g",
    "category": "Household & Cleaning",
    "barcode": "4792011009",
    "costPrice": 75,
    "sellingPrice": 95,
    "stock": 70,
    "lowStockAlert": 15
  },
  {
    "id": "gr_clean_10",
    "name": "Vim Liquid Dishwash 500ml Bottle",
    "category": "Household & Cleaning",
    "barcode": "4792011010",
    "costPrice": 360,
    "sellingPrice": 450,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_clean_11",
    "name": "Harpic Power Plus Toilet Cleaner 500ml",
    "category": "Household & Cleaning",
    "barcode": "4792011011",
    "costPrice": 380,
    "sellingPrice": 470,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_clean_12",
    "name": "Lysol Floral Floor Cleaner 500ml",
    "category": "Household & Cleaning",
    "barcode": "4792011012",
    "costPrice": 390,
    "sellingPrice": 480,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_clean_13",
    "name": "Dettol Antiseptic Liquid 100ml",
    "category": "Household & Cleaning",
    "barcode": "4792011013",
    "costPrice": 260,
    "sellingPrice": 330,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_clean_14",
    "name": "Dettol Antiseptic Liquid 250ml",
    "category": "Household & Cleaning",
    "barcode": "4792011014",
    "costPrice": 580,
    "sellingPrice": 720,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_clean_15",
    "name": "Soorya Safety Matchbox (Pack of 10)",
    "category": "Household & Cleaning",
    "barcode": "4792011015",
    "costPrice": 160,
    "sellingPrice": 200,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_clean_16",
    "name": "Tortoise Mosquito Coils (Box of 10)",
    "category": "Household & Cleaning",
    "barcode": "4792011016",
    "costPrice": 140,
    "sellingPrice": 180,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_clean_17",
    "name": "Mortein Liquid Mosquito Vaporizer Refill",
    "category": "Household & Cleaning",
    "barcode": "4792011017",
    "costPrice": 380,
    "sellingPrice": 470,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_clean_18",
    "name": "Glade Room Air Freshener Spray 300ml",
    "category": "Household & Cleaning",
    "barcode": "4792011018",
    "costPrice": 560,
    "sellingPrice": 690,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_care_01",
    "name": "Lifebuoy Total Red Soap 100g",
    "category": "Personal Care",
    "barcode": "4792012001",
    "costPrice": 130,
    "sellingPrice": 160,
    "stock": 60,
    "lowStockAlert": 15
  },
  {
    "id": "gr_care_02",
    "name": "Kohomba Herbal Soap 90g",
    "category": "Personal Care",
    "barcode": "4792012002",
    "costPrice": 115,
    "sellingPrice": 145,
    "stock": 50,
    "lowStockAlert": 12
  },
  {
    "id": "gr_care_03",
    "name": "Dettol Original Brown Soap 100g",
    "category": "Personal Care",
    "barcode": "4792012003",
    "costPrice": 150,
    "sellingPrice": 185,
    "stock": 50,
    "lowStockAlert": 12
  },
  {
    "id": "gr_care_04",
    "name": "Dettol Cool Menthol Soap 100g",
    "category": "Personal Care",
    "barcode": "4792012004",
    "costPrice": 150,
    "sellingPrice": 185,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_care_05",
    "name": "Lux Velvet Touch Rose Soap 100g",
    "category": "Personal Care",
    "barcode": "4792012005",
    "costPrice": 140,
    "sellingPrice": 175,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_care_06",
    "name": "Dove White Beauty Cream Bar 100g",
    "category": "Personal Care",
    "barcode": "4792012006",
    "costPrice": 280,
    "sellingPrice": 360,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_care_07",
    "name": "Baby Cheramy Floral Baby Soap 100g",
    "category": "Personal Care",
    "barcode": "4792012007",
    "costPrice": 130,
    "sellingPrice": 160,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_care_08",
    "name": "Pears Pure & Gentle Baby Soap 100g",
    "category": "Personal Care",
    "barcode": "4792012008",
    "costPrice": 140,
    "sellingPrice": 175,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_care_09",
    "name": "Signal Strong Teeth Toothpaste 120g",
    "category": "Personal Care",
    "barcode": "4792012009",
    "costPrice": 180,
    "sellingPrice": 230,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_care_10",
    "name": "Signal Strong Teeth Toothpaste 160g",
    "category": "Personal Care",
    "barcode": "4792012010",
    "costPrice": 230,
    "sellingPrice": 290,
    "stock": 30,
    "lowStockAlert": 8
  },
  {
    "id": "gr_care_11",
    "name": "Clogard Fresh Breath Toothpaste 120g",
    "category": "Personal Care",
    "barcode": "4792012011",
    "costPrice": 175,
    "sellingPrice": 225,
    "stock": 45,
    "lowStockAlert": 10
  },
  {
    "id": "gr_care_12",
    "name": "Colgate Total Anti-Bacterial 120g",
    "category": "Personal Care",
    "barcode": "4792012012",
    "costPrice": 260,
    "sellingPrice": 340,
    "stock": 25,
    "lowStockAlert": 6
  },
  {
    "id": "gr_care_13",
    "name": "Signal Soft Action Adult Toothbrush",
    "category": "Personal Care",
    "barcode": "4792012013",
    "costPrice": 90,
    "sellingPrice": 120,
    "stock": 40,
    "lowStockAlert": 8
  },
  {
    "id": "gr_care_14",
    "name": "Sunsilk Black Shine Shampoo 180ml",
    "category": "Personal Care",
    "barcode": "4792012014",
    "costPrice": 390,
    "sellingPrice": 480,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_care_15",
    "name": "Lifebuoy Handwash Pump Liquid 200ml",
    "category": "Personal Care",
    "barcode": "4792012015",
    "costPrice": 340,
    "sellingPrice": 430,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_care_16",
    "name": "Glow & Lovely Face Cream 50g",
    "category": "Personal Care",
    "barcode": "4792012016",
    "costPrice": 290,
    "sellingPrice": 370,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_care_17",
    "name": "Vaseline Pure Petroleum Jelly 50g",
    "category": "Personal Care",
    "barcode": "4792012017",
    "costPrice": 190,
    "sellingPrice": 250,
    "stock": 30,
    "lowStockAlert": 6
  },
  {
    "id": "gr_care_18",
    "name": "Gillette Mach 3 Shaving Razor",
    "category": "Personal Care",
    "barcode": "4792012018",
    "costPrice": 420,
    "sellingPrice": 540,
    "stock": 15,
    "lowStockAlert": 4
  },
  {
    "id": "gr_baby_01",
    "name": "Baby Cheramy Baby Cologne 100ml",
    "category": "Baby Care",
    "barcode": "4792013001",
    "costPrice": 280,
    "sellingPrice": 350,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_baby_02",
    "name": "Baby Cheramy Baby Powder 200g",
    "category": "Baby Care",
    "barcode": "4792013002",
    "costPrice": 290,
    "sellingPrice": 360,
    "stock": 25,
    "lowStockAlert": 5
  },
  {
    "id": "gr_baby_03",
    "name": "Baby Cheramy Regular Baby Oil 100ml",
    "category": "Baby Care",
    "barcode": "4792013003",
    "costPrice": 320,
    "sellingPrice": 410,
    "stock": 20,
    "lowStockAlert": 4
  },
  {
    "id": "gr_baby_04",
    "name": "Velona Cuddles Baby Diapers (L - 10 pcs)",
    "category": "Baby Care",
    "barcode": "4792013004",
    "costPrice": 650,
    "sellingPrice": 790,
    "stock": 20,
    "lowStockAlert": 5
  },
  {
    "id": "gr_baby_05",
    "name": "Fems Dry Comfort Napkins (Pack of 10)",
    "category": "Personal Care",
    "barcode": "4792013005",
    "costPrice": 220,
    "sellingPrice": 280,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_baby_06",
    "name": "Eva Wings Cotton Sanitary Pads (10 pcs)",
    "category": "Personal Care",
    "barcode": "4792013006",
    "costPrice": 230,
    "sellingPrice": 290,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_stat_01",
    "name": "Atlas Chooty Blue Ballpoint Pen",
    "category": "Stationery & Batteries",
    "barcode": "4792014001",
    "costPrice": 35,
    "sellingPrice": 50,
    "stock": 100,
    "lowStockAlert": 25
  },
  {
    "id": "gr_stat_02",
    "name": "Atlas CR Exercise Single Rule Book 80p",
    "category": "Stationery & Batteries",
    "barcode": "4792014002",
    "costPrice": 180,
    "sellingPrice": 230,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_stat_03",
    "name": "Atlas CR Exercise Single Rule Book 120p",
    "category": "Stationery & Batteries",
    "barcode": "4792014003",
    "costPrice": 250,
    "sellingPrice": 320,
    "stock": 35,
    "lowStockAlert": 10
  },
  {
    "id": "gr_stat_04",
    "name": "Panasonic AA Carbon Zinc Batteries (Pair)",
    "category": "Stationery & Batteries",
    "barcode": "4792014004",
    "costPrice": 150,
    "sellingPrice": 200,
    "stock": 40,
    "lowStockAlert": 10
  },
  {
    "id": "gr_stat_05",
    "name": "Panasonic AAA Batteries (Pair)",
    "category": "Stationery & Batteries",
    "barcode": "4792014005",
    "costPrice": 150,
    "sellingPrice": 200,
    "stock": 35,
    "lowStockAlert": 8
  },
  {
    "id": "gr_stat_06",
    "name": "White Wax Lighting Candles (Pack of 6)",
    "category": "Stationery & Batteries",
    "barcode": "4792014006",
    "costPrice": 220,
    "sellingPrice": 280,
    "stock": 30,
    "lowStockAlert": 6
  }
],
      sales: [],
      stockLogs: [],
      invoiceCounter: 1001
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
    console.log('[Storage] Created new database file at:', DATA_FILE);
  }
}

function loadData() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage Error] Failed to read data.json:', err);
    return {};
  }
}

function saveData(data) {
  try {
    data.lastSaved = new Date().toISOString();
    ignoreNextWatch = true;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    broadcastUpdate(data);
    return true;
  } catch (err) {
    ignoreNextWatch = false;
    console.error('[Storage Error] Failed to write data.json:', err);
    return false;
  }
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = req.url.split('?')[0];

  // SSE REAL-TIME AUTO UPDATE STREAM
  if (req.method === 'GET' && urlPath === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('data: {"type":"connected"}\n\n');
    sseClients.add(res);

    // Keep-alive ping every 25s
    const pingInterval = setInterval(() => {
      try { res.write(':ping\n\n'); } catch (e) { clearInterval(pingInterval); }
    }, 25000);

    req.on('close', () => {
      clearInterval(pingInterval);
      sseClients.delete(res);
    });
    return;
  }

  // API ROUTE: GET DATA FROM COMPUTER FILE
  if (req.method === 'GET' && urlPath === '/api/data') {
    const data = loadData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data, filePath: DATA_FILE }));
    return;
  }

  // API ROUTE: SAVE DATA TO COMPUTER FILE
  if (req.method === 'POST' && urlPath === '/api/data') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const ok = saveData(payload);
        if (ok) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Saved to computer disk file successfully', filePath: DATA_FILE }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Could not write to file' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // API ROUTE: HEALTH CHECK
  if (req.method === 'GET' && urlPath === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', clients: sseClients.size, storageFile: DATA_FILE }));
    return;
  }

  // STATIC FILE SERVING
  let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

ensureDataFile();
setupFileWatcher();

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  SHORjs POS Offline Server Running with Real-Time Auto-Update!`);
  console.log(`  Local URL:   http://localhost:${PORT}`);
  console.log(`  Storage File: ${DATA_FILE}`);
  console.log(`  Auto-Update: Live SSE + File Watcher Active`);
  console.log(`=======================================================`);
});
