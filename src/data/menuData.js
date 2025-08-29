// const menuData = [
//     {
//         name: "Patel Juice Centre",
//         tagline: "Where every bite and sip is a celebration of taste, tradition, and twist!",
//         categories: [
//             {
//                 name: "Milkshake",
//                 items: [
//                     { id: "pj1", name: "Cold coffee", price: 100 },
//                     { id: "pj2", name: "Orieo", price: 120 },
//                     { id: "pj3", name: "Kit kat", price: 120 },
//                     { id: "pj4", name: "Chocolate", price: 100 },
//                     { id: "pj5", name: "Avacado + Honey", price: 180 },
//                 ],
//             },
//             {
//                 name: "Falooda",
//                 items: [
//                     { id: "pj6", name: "Royal Falooda", price: 100 },
//                     { id: "pj7", name: "Kesar Falooda", price: 100 },
//                     { id: "pj8", name: "Patel Special Falooda", price: 130 },
//                     { id: "pj9", name: "Rabdi Falooda", price: 140 },
//                     { id: "pj10", name: "Chocolate Falooda", price: 120 },
//                 ],
//             },
//             {
//                 name: "Blossom with vanilla Ice-cream",
//                 items: [
//                     { id: "pj11", name: "Strawberry Blossom", price: 180 },
//                     { id: "pj12", name: "Kit kat Blossom", price: 150 },
//                     { id: "pj13", name: "Chocolate Blossom", price: 140 },
//                     { id: "pj14", name: "Mango Blossom", price: 200 },
//                     { id: "pj15", name: "Sitafal Blossom", price: 180 },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "B.E Bytes",
//         tagline: "Bite-sized happiness, served hot & fresh!",
//         categories: [
//             {
//                 name: "Pav Items",
//                 items: [
//                     { id: "be1", name: "Masala Vadapav", price: 40, jain: true, description: "Special" },
//                     { id: "be2", name: "Pav Sandwich (1/2 pieces)", price: 50, description: "Also available as full for ₹90" },
//                     { id: "be3", name: "Peri peri Paneer pav", price: 90, jain: true },
//                     { id: "be4", name: "Thecha Vadapav", price: 50, jain: true },
//                     { id: "be5", name: "Masala Khari", price: 100, jain: true, description: "Special" },
//                 ],
//             },
//             {
//                 name: "Bagel",
//                 items: [
//                     { id: "be6", name: "The OG Bagel", price: 120, jain: true, description: "Half size. Full size: ₹230" },
//                     {
//                         id: "be7",
//                         name: "B.E Bytes Special Bagel",
//                         price: 120,
//                         jain: true,
//                         description: "Half size. Full size: ₹230",
//                     },
//                     { id: "be8", name: "Paneer Tikka Bagel", price: 120, jain: true, description: "Half size. Full size: ₹230" },
//                     { id: "be9", name: "Peri Peri Bagel", price: 100, jain: true, description: "Half size. Full size: ₹190" },
//                     { id: "be10", name: "Chocolate Bagel", price: 100, description: "Half size. Full size: ₹190" },
//                 ],
//             },
//             {
//                 name: "Bites",
//                 items: [
//                     { id: "be11", name: "Classic Dough Balls", price: 100, jain: true, description: "Special" },
//                     { id: "be12", name: "Peri peri Dough Balls", price: 100, jain: true },
//                     { id: "be13", name: "Nutella Dough Balls", price: 100 },
//                     { id: "be14", name: "Churro Dough Balls", price: 100 },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "Ramanandi - Bajra Pizza",
//         tagline: "Tradition meets innovation – guilt-free pizza joy!",
//         categories: [
//             {
//                 name: "Bhakri Pizza (Wheat)",
//                 items: [
//                     { id: "rp1", name: "Vegetable Bhakri Pizza", price: 170, jain: true, description: "Without cheese: ₹140" },
//                     { id: "rp2", name: "Margherita Bhakri Pizza", price: 190, jain: true },
//                     { id: "rp3", name: "Only Cheese Pizza", price: 190, jain: true },
//                     { id: "rp4", name: "Only Corn Pizza", price: 170, jain: true, description: "Without cheese: ₹140" },
//                     { id: "rp5", name: "Masala Paneer Pizza", price: 220, jain: true, description: "Without cheese: ₹190" },
//                 ],
//             },
//             {
//                 name: "Bajri/Jawar Pizza",
//                 items: [
//                     { id: "rp6", name: "Vegetable B/J Pizza", price: 190, jain: true, description: "Without cheese: ₹160" },
//                     { id: "rp7", name: "Only Cheese B/J Pizza", price: 210, jain: true },
//                     { id: "rp8", name: "Margherita B/J Pizza", price: 210, jain: true },
//                     { id: "rp9", name: "Only Corn B/J Pizza", price: 190, jain: true, description: "Without cheese: ₹160" },
//                     { id: "rp10", name: "Masala Paneer B/J Pizza", price: 240, jain: true, description: "Without cheese: ₹210" },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "House of Sushi",
//         tagline: "Roll with us to Japan & Vietnam!",
//         categories: [
//             {
//                 name: "Sushi",
//                 items: [
//                     { id: "hs1", name: "California Sushi (4PC)", price: 180, description: "8PC: ₹300" },
//                     { id: "hs2", name: "Avocado Sushi (4PC)", price: 210, description: "8PC: ₹330" },
//                     { id: "hs3", name: "Exotic Sushi (4PC)", price: 180, description: "8PC: ₹300" },
//                     { id: "hs4", name: "Asparagus Sushi (4PC)", price: 210, description: "8PC: ₹330" },
//                     { id: "hs5", name: "Edamame Sushi (4PC)", price: 210, description: "8PC: ₹330" },
//                 ],
//             },
//             {
//                 name: "Vietnamese Roll",
//                 items: [
//                     { id: "hs6", name: "Exotic Roll", price: 200 },
//                     { id: "hs7", name: "Avocado Roll", price: 220 },
//                     { id: "hs8", name: "Paneer Roll", price: 210 },
//                     { id: "hs9", name: "Avocado Jalapeno Roll", price: 230 },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "Priya Foods",
//         tagline: "Your Comfort food!",
//         categories: [
//             {
//                 name: "Comfort Food",
//                 items: [
//                     { id: "pf1", name: "Vadapav", price: 20, jain: true, description: "Jain: ₹25" },
//                     { id: "pf2", name: "Samosa pav", price: 25, jain: true },
//                     { id: "pf3", name: "Idli chatni (2pc)", price: 30 },
//                     { id: "pf4", name: "Medu Vada (2pc)", price: 45 },
//                     { id: "pf5", name: "Single Vada", price: 17 },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "Cafe Jethwa Food Corner",
//         tagline: "Snacks with swag!",
//         categories: [
//             {
//                 name: "Tornato (Potato) Twisters",
//                 items: [
//                     { id: "cj1", name: "Maggic Masala Twister", price: 120 },
//                     { id: "cj2", name: "Peri Peri Twister", price: 120 },
//                     { id: "cj3", name: "Tandoori Twister", price: 120 },
//                     { id: "cj4", name: "Cheese Twister", price: 120 },
//                     { id: "cj5", name: "Salsa Twister", price: 120 },
//                 ],
//             },
//             {
//                 name: "Masala Fries",
//                 items: [
//                     { id: "cj6", name: "Chilly garlic Masala Fries", price: 160 },
//                     { id: "cj7", name: "Cheese Jalapeno Fries", price: 160 },
//                     { id: "cj8", name: "Barbeque Masala Fries", price: 160 },
//                     { id: "cj9", name: "Chilly cheese Masala Fries", price: 180 },
//                     { id: "cj10", name: "Chipotle Masala Fries", price: 160 },
//                 ],
//             },
//             {
//                 name: "Jain Fries",
//                 items: [
//                     { id: "cj11", name: "Plain Fries", price: 120 },
//                     { id: "cj12", name: "Cheese Fries", price: 150 },
//                     { id: "cj13", name: "BBQ Fries", price: 150 },
//                     { id: "cj14", name: "Chilly Fries", price: 150 },
//                     { id: "cj15", name: "Mayo Fries", price: 150 },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "Norchi",
//         tagline: "Bowls. Rolls. Starters. All souls.",
//         categories: [
//             {
//                 name: "Bowls",
//                 items: [
//                     { id: "no1", name: "Paneer Butter Masala & Jeera Rice", price: 220, jain: true },
//                     { id: "no2", name: "Veg Manchurian & Fried Rice", price: 205, jain: true },
//                     { id: "no3", name: "Paneer Chilli & Hakka Noodles", price: 230, jain: true },
//                     { id: "no4", name: "Veg Makhani & Jeera Rice", price: 205, jain: true },
//                     { id: "no5", name: "Veg Kadhai & Jeera Rice", price: 205, jain: true },
//                 ],
//             },
//             {
//                 name: "Starters",
//                 items: [
//                     { id: "no6", name: "Paneer Chilli", price: 200, jain: true },
//                     { id: "no7", name: "Veg Crispy", price: 190, jain: true },
//                     { id: "no8", name: "Cheesy Corn Triangles", price: 180 },
//                     { id: "no9", name: "Mushroom Chilli", price: 200 },
//                     { id: "no10", name: "Veg Manchurian", price: 190, jain: true },
//                 ],
//             },
//         ],
//     },
// ]

// export default menuData



//  const menuData = [
//     {
//         name: "Patel Juice Centre",
//         tagline: "Where every bite and sip is a celebration of taste, tradition, and twist!",
//         categories: [
//             {
//                 name: "Milkshake",
//                 items: [
//                     { id: "pj1", name: "Cold Coffee", price: 100 },
//                     { id: "pj2", name: "Orieo", price: 120 },
//                     { id: "pj3", name: "Kit Kat", price: 120 },
//                     { id: "pj4", name: "Chocolate", price: 100 },
//                     { id: "pj5", name: "Avocado + Honey", price: 180 }
//                 ]
//             },
//             {
//                 name: "Falooda",
//                 items: [
//                     { id: "pj6", name: "Royal Falooda", price: 100 },
//                     { id: "pj7", name: "Kesar Falooda", price: 100 },
//                     { id: "pj8", name: "Patel Special Falooda", price: 130 },
//                     { id: "pj9", name: "Rabdi Falooda", price: 140 },
//                     { id: "pj10", name: "Chocolate Falooda", price: 120 }
//                 ]
//             },
//             {
//                 name: "Blossom with Vanilla Ice-cream",
//                 items: [
//                     { id: "pj11", name: "Strawberry Blossom", price: 180 },
//                     { id: "pj12", name: "Kit Kat Blossom", price: 150 },
//                     { id: "pj13", name: "Chocolate Blossom", price: 140 },
//                     { id: "pj14", name: "Mango Blossom", price: 200 },
//                     { id: "pj15", name: "Sitafal Blossom", price: 180 }
//                 ]
//             }
//         ]
//     },
//     {
//         name: "B.E Bytes",
//         tagline: "Bite-sized happiness, served hot & fresh!",
//         categories: [
//             {
//                 name: "Pav Items",
//                 items: [
//                     { id: "be1", name: "Masala Vadapav", price: 40, jain: true },
//                     { id: "be2", name: "Pav Sandwich", price: { half: 50, full: 90 } },
//                     { id: "be3", name: "Peri Peri Paneer Pav", price: 90, jain: true },
//                     { id: "be4", name: "Thecha Vadapav", price: 50, jain: true },
//                     { id: "be5", name: "Masala Khari", price: 100, jain: true }
//                 ]
//             },
//             {
//                 name: "Bagel",
//                 items: [
//                     { id: "be6", name: "The OG Bagel", price: { half: 120, full: 230 }, jain: true },
//                     { id: "be7", name: "B.E Bytes Special Bagel", price: { half: 120, full: 230 }, jain: true },
//                     { id: "be8", name: "Paneer Tikka Bagel", price: { half: 120, full: 230 }, jain: true },
//                     { id: "be9", name: "Peri Peri Bagel", price: { half: 100, full: 190 } },
//                     { id: "be10", name: "Chocolate Bagel", price: { half: 100, full: 190 } }
//                 ]
//             },
//             {
//                 name: "Bites",
//                 items: [
//                     { id: "be11", name: "Classic Dough Balls", price: 100, jain: true },
//                     { id: "be12", name: "Peri Peri Dough Balls", price: 100, jain: true },
//                     { id: "be13", name: "Nutella Dough Balls", price: 100 },
//                     { id: "be14", name: "Churro Dough Balls", price: 100 }
//                 ]
//             }
//         ]
//     }
// ];

// export default menuData;

// const menuData = [
//     {
//       name: "Patel Juice Centre",
//       tagline: "Where every bite and sip is a celebration of taste, tradition, and twist!",
//       categories: [
//         {
//           name: "Milkshake",
//           items: [
//             { id: "pj1", name: "Cold Coffee", price: 100 },
//             { id: "pj2", name: "Orieo", price: 120 },
//             { id: "pj3", name: "Kit Kat", price: 120 },
//             { id: "pj4", name: "Chocolate", price: 100 },
//             { id: "pj5", name: "Avocado + Honey", price: 180 }
//           ]
//         },
//         {
//           name: "Falooda",
//           items: [
//             { id: "pj6", name: "Royal Falooda", price: 100 },
//             { id: "pj7", name: "Kesar Falooda", price: 100 },
//             { id: "pj8", name: "Patel Special Falooda", price: 130 },
//             { id: "pj9", name: "Rabdi Falooda", price: 140 },
//             { id: "pj10", name: "Chocolate Falooda", price: 120 }
//           ]
//         },
//         {
//           name: "Blossom with Vanilla Ice-cream",
//           items: [
//             { id: "pj11", name: "Strawberry Blossom", price: 180 },
//             { id: "pj12", name: "Kit Kat Blossom", price: 150 },
//             { id: "pj13", name: "Chocolate Blossom", price: 140 },
//             { id: "pj14", name: "Mango Blossom", price: 200 },
//             { id: "pj15", name: "Sitafal Blossom", price: 180 }
//           ]
//         }
//       ]
//     },
//     {
//       name: "B.E Bytes",
//       tagline: "Bite-sized happiness, served hot & fresh!",
//       categories: [
//         {
//           name: "Pav Items",
//           items: [
//             { id: "be1", name: "Masala Vadapav", price: 40, jain: true },
//             { id: "be2", name: "Pav Sandwich", price: { half: 50, full: 90 } },
//             { id: "be3", name: "Peri Peri Paneer Pav", price: 90, jain: true },
//             { id: "be4", name: "Thecha Vadapav", price: 50, jain: true },
//             { id: "be5", name: "Masala Khari", price: 100, jain: true }
//           ]
//         },
//         {
//           name: "Bagel",
//           items: [
//             { id: "be6", name: "The OG Bagel", price: { half: 120, full: 230 }, jain: true },
//             { id: "be7", name: "B.E Bytes Special Bagel", price: { half: 120, full: 230 }, jain: true },
//             { id: "be8", name: "Paneer Tikka Bagel", price: { half: 120, full: 230 }, jain: true },
//             { id: "be9", name: "Peri Peri Bagel", price: { half: 100, full: 190 } },
//             { id: "be10", name: "Chocolate Bagel", price: { half: 100, full: 190 } }
//           ]
//         },
//         {
//           name: "Bites",
//           items: [
//             { id: "be11", name: "Classic Dough Balls", price: 100, jain: true },
//             { id: "be12", name: "Peri Peri Dough Balls", price: 100, jain: true },
//             { id: "be13", name: "Nutella Dough Balls", price: 100 },
//             { id: "be14", name: "Churro Dough Balls", price: 100 }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Sai Krupa Amritsar Kulcha",
//       tagline: "Kulchas with soul, straight from Amritsar!",
//       categories: [
//         {
//           name: "Kulcha",
//           items: [
//             { id: "sk1", name: "Aloo Kulcha", price: 60 },
//             { id: "sk2", name: "Paneer Kulcha", price: 80 },
//             { id: "sk3", name: "Paneer Onion Kulcha", price: 90 },
//             { id: "sk4", name: "Mixed Lays Kulcha", price: 100 },
//             { id: "sk5", name: "Only cheese Kulcha", price: 120 }
//           ]
//         },
//         {
//           name: "Jain Special",
//           items: [
//             { id: "sk6", name: "Paneer Kulcha", price: 80 },
//             { id: "sk7", name: "Mixed Jain Kulcha", price: 100 },
//             { id: "sk8", name: "Paneer Cheese kulcha", price: 100 },
//             { id: "sk9", name: "Gobi/ cauliflower Kulcha", price: 80 }
//           ]
//         },
//         {
//           name: "Cheese Kulcha",
//           items: [
//             { id: "sk10", name: "Aloo Cheese Kulcha", price: 100 },
//             { id: "sk11", name: "Paneer Cheese Kulcha", price: 100 },
//             { id: "sk12", name: "Mixed Veg Cheese Kulcha", price: 120 },
//             { id: "sk13", name: "Lays Mixed cheese Kulcha", price: 120 },
//             { id: "sk14", name: "Aloo Onion Cheese Kulcha", price: 100 }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Ramanandi - Bajra Pizza",
//       tagline: "Tradition meets innovation – guilt-free pizza joy!",
//       categories: [
//         {
//           name: "Bhakri Pizza(Wheat)",
//           items: [
//             { id: "rp1", name: "Vegetable Bhakri Pizza", price: { reg: 170, jain: 170, wc: 140 } },
//             { id: "rp2", name: "Margherita Bhakri Pizza", price: { reg: 190, jain: 190 } },
//             { id: "rp3", name: "Only Cheese Pizza", price: { reg: 190, jain: 190 } },
//             { id: "rp4", name: "Only Corn Pizza", price: { reg: 170, jain: 170, wc: 140 } },
//             { id: "rp5", name: "Masala Paneer Pizza", price: { reg: 220, jain: 220, wc: 190 } }
//           ]
//         },
//         {
//           name: "Bajri/ Jawar Pizza",
//           items: [
//             { id: "rp6", name: "Vegetable B/J Pizza", price: { reg: 190, jain: 190, wc: 160 } },
//             { id: "rp7", name: "Only Cheese B/J Pizza", price: { reg: 210, jain: 210 } },
//             { id: "rp8", name: "Margherita B/J Pizza", price: { reg: 210, jain: 210 } },
//             { id: "rp9", name: "Only Corn B/J Pizza", price: { reg: 190, jain: 190, wc: 160 } },
//             { id: "rp10", name: "Masala Paneer B/J Pizza", price: { reg: 240, jain: 240, wc: 210 } }
//           ]
//         }
//       ]
//     },
//     {
//       name: "House of Sushi",
//       tagline: "Roll with us to Japan & Vietnam!",
//       categories: [
//         {
//           name: "Sushi",
//           items: [
//             { id: "hs1", name: "California Sushi", price: { "4pc": 180, "8pc": 300 } },
//             { id: "hs2", name: "Avocado Sushi", price: { "4pc": 210, "8pc": 330 } },
//             { id: "hs3", name: "Exotic Sushi", price: { "4pc": 180, "8pc": 300 } },
//             { id: "hs4", name: "Asparagus Sushi", price: { "4pc": 210, "8pc": 330 } },
//             { id: "hs5", name: "Edamame Sushi", price: { "4pc": 20, "8pc": 330 } }
//           ]
//         },
//         {
//           name: "Vietnamese Roll",
//           items: [
//             { id: "hs6", name: "Exotic Roll", price: 200 },
//             { id: "hs7", name: "Avocado Roll", price: 220 },
//             { id: "hs8", name: "Paneer Roll", price: 210 },
//             { id: "hs9", name: "Avocado Jalapeno Roll", price: 230 }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Priya Foods",
//       tagline: "Your Comfort food!",
//       categories: [
//         {
//           name: "Snacks",
//           items: [
//             { id: "pf1", name: "Vadapav - JA", price: { regular: 20, jain: 25 } },
//             { id: "pf2", name: "Samosa pav - JA", price: 25 },
//             { id: "pf3", name: "Idli chatni (2pc)", price: 30 },
//             { id: "pf4", name: "Medu Vada (2pc)", price: 45 },
//             { id: "pf5", name: "Single Vada", price: 17 }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Cafe Jethwa Food Corner",
//       tagline: "Snacks with swag!",
//       categories: [
//         {
//           name: "Tornato (Potato) Twisters",
//           items: [
//             { id: "cjf1", name: "Maggic Masala Twister", price: 120 },
//             { id: "cjf2", name: "Peri Peri Twister", price: 120 },
//             { id: "cjf3", name: "Tandoori Twister", price: 120 },
//             { id: "cjf4", name: "Cheese Twister", price: 120 },
//             { id: "cjf5", name: "Salsa Twister", price: 120 }
//           ]
//         },
//         {
//           name: "Masala Fries",
//           items: [
//             { id: "cjf6", name: "Chilly garlic Masala Fries", price: 160 },
//             { id: "cjf7", name: "Cheese Jalapeno Fries", price: 160 },
//             { id: "cjf8", name: "Barbeque Masala Fries", price: 160 },
//             { id: "cjf9", name: "Chilly cheese Masala Fries", price: 180 },
//             { id: "cjf10", name: "Chipotle Masala Fries", price: 160 }
//           ]
//         },
//         {
//           name: "Jain Fries",
//           items: [
//             { id: "cjf11", name: "Plain Fries", price: 120 },
//             { id: "cjf12", name: "Cheese Fries", price: 150 },
//             { id: "cjf13", name: "BBQ Fries", price: 150 },
//             { id: "cjf14", name: "Chilly Fries", price: 150 },
//             { id: "cjf15", name: "Mayo Fries", price: 150 }
//           ]
//         },
//         {
//           name: "Wedges",
//           items: [
//             { id: "cjf16", name: "Plain Wedges", price: 110 },
//             { id: "cjf17", name: "Salsa Wedges", price: 140 },
//             { id: "cjf18", name: "Peri Peri Wedges", price: 140 },
//             { id: "cjf19", name: "Barbeque Wedges", price: 140 },
//             { id: "cjf20", name: "Mayo Chilly Wedges", price: 160 }
//           ]
//         },
//         {
//           name: "Burger",
//           items: [
//             { id: "cjf21", name: "Aloo Tikki Burger", price: 90 },
//             { id: "cjf22", name: "Cheese Grill Samosa Burger", price: 150 },
//             { id: "cjf23", name: "Tandoori Aloo Tikki Burger", price: 140 },
//             { id: "cjf24", name: "Paneer Vegetable Burger", price: 180 },
//             { id: "cjf25", name: "Cheese Vegetable Burger", price: 150 }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Norchi",
//       tagline: "Bowls. Rolls. Starters. All souls.",
//       categories: [
//         {
//           name: "Bowls",
//           items: [
//             { id: "n1", name: "Paneer Butter Masala & Jeera Rice", price: 220, jain: true },
//             { id: "n2", name: "Veg Manchurian & Fried Rice", price: 205, jain: true },
//             { id: "n3", name: "Paneer Chilli & Hakka Noodles", price: 230, jain: true },
//             { id: "n4", name: "Veg Makhani & Jeera Rice", price: 205, jain: true },
//             { id: "n5", name: "Veg Kadhai & Jeera Rice", price: 205, jain: true }
//           ]
//         },
//         {
//           name: "Starters",
//           items: [
//             { id: "n6", name: "Paneer Chilli", price: 200, jain: true },
//             { id: "n7", name: "Veg Crispy", price: 190, jain: true },
//             { id: "n8", name: "Cheesy Corn Triangles", price: 180 },
//             { id: "n9", name: "Mushroom Chilli", price: 200 },
//             { id: "n10", name: "Veg Manchurian", price: 190, jain: true }
//           ]
//         },
//         {
//           name: "Rolls",
//           items: [
//             { id: "n11", name: "Paneer Butter Masala Roll", price: 200, jain: true },
//             { id: "n12", name: "Veg Crispy Roll", price: 200, jain: true },
//             { id: "n13", name: "Paneer Chilli Roll", price: 200, jain: true },
//             { id: "n14", name: "Paneer Kolhapuri Roll", price: 200, jain: true },
//             { id: "n15", name: "Veg Manchurian Roll", price: 200, jain: true }
//           ]
//         },
//         {
//           name: "Indian Sabzi",
//           items: [
//             { id: "n16", name: "Veg Kolhapuri", price: 200, jain: true },
//             { id: "n17", name: "Veg Kadhai", price: 200, jain: true },
//             { id: "n18", name: "Veg Makhani", price: 200, jain: true },
//             { id: "n19", name: "Paneer Tikka Masala", price: 220, jain: true },
//             { id: "n20", name: "Paneer Makhani", price: 220, jain: true }
//           ]
//         },
//         {
//           name: "Indian Bread",
//           items: [
//             { id: "n21", name: "Plain Rumali Roti", price: 80 },
//             { id: "n22", name: "Butter Rumali Roti", price: 90 },
//             { id: "n23", name: "Plain/ Butter Paratha", price: { plain: 60, butter: 70 } },
//             { id: "n24", name: "Tawa Plain/ Butter Roti", price: { plain: 30, butter: 40 } }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Green Chatni Food",
//       tagline: "Wholesome Indian flavors, served with love and green goodness!",
//       categories: [
//         {
//           name: "Combo 3CP",
//           items: [
//             { id: "gcf1", name: "Dal Makhani with Jeera rice", price: 180 },
//             { id: "gcf2", name: "Dal Tadka With steamed Rice", price: 180 },
//             { id: "gcf3", name: "Paneer Makhanvala with 2 Kulcha", price: 240 },
//             { id: "gcf4", name: "Chole Masala + 3 chapati", price: 240 },
//             { id: "gcf5", name: "Veg chilli milli with 2 butter Naan", price: 240 }
//           ]
//         },
//         {
//           name: "Green Chatni 5CP Thali",
//           items: [
//             { id: "gcf6", name: "Punjabi Thali", price: 300 },
//             { id: "gcf7", name: "Jain Thali", price: 300 },
//             { id: "gcf8", name: "Maharashtrian Thali", price: 300 },
//             { id: "gcf9", name: "Special Thali", price: 300 },
//             { id: "gcf10", name: "Dal Makhani Thali", price: 300 }
//           ]
//         },
//         {
//           name: "Indian Bread Basket",
//           items: [
//             { id: "gcf11", name: "Butter Roti", price: 60 },
//             { id: "gcf12", name: "Plain Roti", price: 50 },
//             { id: "gcf13", name: "Butter Naan", price: 70 },
//             { id: "gcf14", name: "Plain Naan", price: 60 },
//             { id: "gcf15", name: "Tandoori Paratha", price: 80 },
//             { id: "gcf16", name: "Kulcha", price: 70 }
//           ]
//         },
//         {
//           name: "Rice & Dal",
//           items: [
//             { id: "gcf17", name: "Jeera Rice", price: 120 },
//             { id: "gcf18", name: "Steamed Rice", price: 110 },
//             { id: "gcf19", name: "Dal Makhani", price: 140 },
//             { id: "gcf20", name: "Dal Tadka", price: 130 },
//             { id: "gcf21", name: "Khichdi (with ghee)", price: 150 }
//           ]
//         }
//       ]
//     },
//     {
//       name: "Seven Spices Fast Food",
//       tagline: "Spice up your cravings — the sizzling way!",
//       categories: [
//         {
//           name: "Paneer Tikka",
//           items: [
//             { id: "ssf1", name: "Tandoori Paneer Tikka", price: { half: 170, full: 310 } },
//             { id: "ssf2", name: "Peri-peri Paneer Tikka", price: { half: 190, full: 350 } },
//             { id: "ssf3", name: "Schezwan Paneer Tikka", price: { half: 160, full: 290 } },
//             { id: "ssf4", name: "Masala Paneer Tikka", price: { half: 150, full: 270 } },
//             { id: "ssf5", name: "Paneer Tikka (Dry)", price: { half: 150, full: 260 } }
//           ]
//         },
//         {
//           name: "Paneer Roll",
//           items: [
//             { id: "ssf6", name: "Peri-peri Paneer Roll", price: { half: 220, full: 240 } },
//             { id: "ssf7", name: "Italian Paneer Roll", price: { half: 240, full: 260 } },
//             { id: "ssf8", name: "Garlic Paneer Roll", price: { half: 190, full: 210 } },
//             { id: "ssf9", name: "Lemon Paneer Tikka Roll", price: { half: 170, full: 190 } },
//             { id: "ssf10", name: "Angara Paneer Tikka Roll", price: { half: 190, full: 210 } }
//           ]
//         },
//         {
//           name: "Soya Chaap",
//           items: [
//             { id: "ssf11", name: "Malai Chaap (White)", price: { half: 170, full: 320 } },
//             { id: "ssf12", name: "Afghani Chaap (White)", price: { half: 170, full: 320 } },
//             { id: "ssf13", name: "Peri-peri Chaap", price: { half: 180, full: 340 } },
//             { id: "ssf14", name: "Achari Chaap", price: { half: 150, full: 280 } },
//             { id: "ssf15", name: "Masala Chaap", price: { half: 140, full: 260 } }
//           ]
//         }
//       ]
//     }
//   ];

//   export default menuData


const menuData = [
    {
        name: "Patel Juice Centre",
        tagline: "Where every bite and sip is a celebration of taste, tradition, and twist!",
        jain: false,
        availableAfter: "00:00", // Always open
        jain: true,
        availableAfter: "22:00", // Opens at 10 PM
        categories: [
            {
                name: "Milkshake",
                items: [
                    { id: "pj1", name: "Cold Coffee", price: 100 },
                    { id: "pj2", name: "Orieo", price: 120 },
                    { id: "pj3", name: "Kit Kat", price: 120 },
                    { id: "pj4", name: "Chocolate", price: 100 },
                    { id: "pj5", name: "Avocado + Honey", price: 180 }
                ]
            },
            {
                name: "Falooda",
                items: [
                    { id: "pj6", name: "Royal Falooda", price: 100 },
                    { id: "pj7", name: "Kesar Falooda", price: 100 },
                    { id: "pj8", name: "Patel Special Falooda", price: 130 },
                    { id: "pj9", name: "Rabdi Falooda", price: 140 },
                    { id: "pj10", name: "Chocolate Falooda", price: 120 }
                ]
            },
            {
                name: "Blossom with Vanilla Ice-cream",
                items: [
                    { id: "pj11", name: "Strawberry Blossom", price: 180 },
                    { id: "pj12", name: "Kit Kat Blossom", price: 150 },
                    { id: "pj13", name: "Chocolate Blossom", price: 140 },
                    { id: "pj14", name: "Mango Blossom", price: 200 },
                    { id: "pj15", name: "Sitafal Blossom", price: 180 }
                ]
            }
        ]
    },
    {
        name: "B.E Bytes",
        tagline: "Bite-sized happiness, served hot & fresh!",
        jain: true,
        availableAfter: "17:00", // Opens at 5 PM
        categories: [
            {
                name: "Pav Items",
                items: [
                    { id: "be1", name: "Masala Vadapav", price: 40, jain: true },
                    { id: "be2", name: "Pav Sandwich", price: { half: 50, full: 90 } },
                    { id: "be3", name: "Peri Peri Paneer Pav", price: 90, jain: true },
                    { id: "be4", name: "Thecha Vadapav", price: 50, jain: true },
                    { id: "be5", name: "Masala Khari", price: 100, jain: true }
                ]
            },
            {
                name: "Bagel",
                items: [
                    { id: "be6", name: "The OG Bagel", price: { half: 120, full: 230 }, jain: true },
                    { id: "be7", name: "B.E Bytes Special Bagel", price: { half: 120, full: 230 }, jain: true },
                    { id: "be8", name: "Paneer Tikka Bagel", price: { half: 120, full: 230 }, jain: true },
                    { id: "be9", name: "Peri Peri Bagel", price: { half: 100, full: 190 } },
                    { id: "be10", name: "Chocolate Bagel", price: { half: 100, full: 190 } }
                ]
            },
            {
                name: "Bites",
                items: [
                    { id: "be11", name: "Classic Dough Balls", price: 100, jain: true },
                    { id: "be12", name: "Peri Peri Dough Balls", price: 100, jain: true },
                    { id: "be13", name: "Nutella Dough Balls", price: 100 },
                    { id: "be14", name: "Churro Dough Balls", price: 100 }
                ]
            }
        ]
    },
    {
        name: "Sai Krupa Amritsar Kulcha",
        tagline: "Kulchas with soul, straight from Amritsar!",
        jain: true,
        availableAfter: "21:00", // Opens at 5 PM
        categories: [
            {
                name: "Kulcha",
                items: [
                    { id: "sk1", name: "Aloo Kulcha", price: 60 },
                    { id: "sk2", name: "Paneer Kulcha", price: 80 },
                    { id: "sk3", name: "Paneer Onion Kulcha", price: 90 },
                    { id: "sk4", name: "Mixed Lays Kulcha", price: 100 },
                    { id: "sk5", name: "Only cheese Kulcha", price: 120 }
                ]
            },
            {
                name: "Jain Special",
                items: [
                    { id: "sk6", name: "Paneer Kulcha", price: 80 },
                    { id: "sk7", name: "Mixed Jain Kulcha", price: 100 },
                    { id: "sk8", name: "Paneer Cheese kulcha", price: 100 },
                    { id: "sk9", name: "Gobi/ cauliflower Kulcha", price: 80 }
                ]
            },
            {
                name: "Cheese Kulcha",
                items: [
                    { id: "sk10", name: "Aloo Cheese Kulcha", price: 100 },
                    { id: "sk11", name: "Paneer Cheese Kulcha", price: 100 },
                    { id: "sk12", name: "Mixed Veg Cheese Kulcha", price: 120 },
                    { id: "sk13", name: "Lays Mixed cheese Kulcha", price: 120 },
                    { id: "sk14", name: "Aloo Onion Cheese Kulcha", price: 100 }
                ]
            }
        ]
    },
    {
        name: "Ramanandi - Bajra Pizza",
        tagline: "Tradition meets innovation – guilt-free pizza joy!",
        jain: true,
        availableAfter: "17:00", // Opens at 5 PM
        categories: [
            {
                name: "Bhakri Pizza(Wheat)",
                items: [
                    { id: "rp1", name: "Vegetable Bhakri Pizza", price: { reg: 170, jain: 170, wc: 140 } },
                    { id: "rp2", name: "Margherita Bhakri Pizza", price: { reg: 190, jain: 190 } },
                    { id: "rp3", name: "Only Cheese Pizza", price: { reg: 190, jain: 190 } },
                    { id: "rp4", name: "Only Corn Pizza", price: { reg: 170, jain: 170, wc: 140 } },
                    { id: "rp5", name: "Masala Paneer Pizza", price: { reg: 220, jain: 220, wc: 190 } }
                ]
            },
            {
                name: "Bajri/ Jawar Pizza",
                items: [
                    { id: "rp6", name: "Vegetable B/J Pizza", price: { reg: 190, jain: 190, wc: 160 } },
                    { id: "rp7", name: "Only Cheese B/J Pizza", price: { reg: 210, jain: 210 } },
                    { id: "rp8", name: "Margherita B/J Pizza", price: { reg: 210, jain: 210 } },
                    { id: "rp9", name: "Only Corn B/J Pizza", price: { reg: 190, jain: 190, wc: 160 } },
                    { id: "rp10", name: "Masala Paneer B/J Pizza", price: { reg: 240, jain: 240, wc: 210 } }
                ]
            }
        ]
    },
    {
        name: "House of Sushi",
        tagline: "Roll with us to Japan & Vietnam!",
        jain: true,
        availableAfter: "17:00", // Opens at 5 PM
        categories: [
            {
                name: "Sushi",
                items: [
                    { id: "hs1", name: "California Sushi", price: { "4pc": 180, "8pc": 300 } },
                    { id: "hs2", name: "Avocado Sushi", price: { "4pc": 210, "8pc": 330 } },
                    { id: "hs3", name: "Exotic Sushi", price: { "4pc": 180, "8pc": 300 } },
                    { id: "hs4", name: "Asparagus Sushi", price: { "4pc": 210, "8pc": 330 } },
                    { id: "hs5", name: "Edamame Sushi", price: { "4pc": 20, "8pc": 330 } }
                ]
            },
            {
                name: "Vietnamese Roll",
                items: [
                    { id: "hs6", name: "Exotic Roll", price: 200 },
                    { id: "hs7", name: "Avocado Roll", price: 220 },
                    { id: "hs8", name: "Paneer Roll", price: 210 },
                    { id: "hs9", name: "Avocado Jalapeno Roll", price: 230 }
                ]
            }
        ]
    },
    {
        name: "Priya Foods",
        tagline: "Your Comfort food!",
        categories: [
            {
                name: "Snacks",
                items: [
                    { id: "pf1", name: "Vadapav - JA", price: { regular: 20, jain: 25 } },
                    { id: "pf2", name: "Samosa pav - JA", price: 25 },
                    { id: "pf3", name: "Idli chatni (2pc)", price: 30 },
                    { id: "pf4", name: "Medu Vada (2pc)", price: 45 },
                    { id: "pf5", name: "Single Vada", price: 17 }
                ]
            }
        ]
    },
    {
        name: "Cafe Jethwa Food Corner",
        tagline: "Snacks with swag!",
        categories: [
            {
                name: "Tornato (Potato) Twisters",
                items: [
                    { id: "cjf1", name: "Maggic Masala Twister", price: 120 },
                    { id: "cjf2", name: "Peri Peri Twister", price: 120 },
                    { id: "cjf3", name: "Tandoori Twister", price: 120 },
                    { id: "cjf4", name: "Cheese Twister", price: 120 },
                    { id: "cjf5", name: "Salsa Twister", price: 120 }
                ]
            },
            {
                name: "Masala Fries",
                items: [
                    { id: "cjf6", name: "Chilly garlic Masala Fries", price: 160 },
                    { id: "cjf7", name: "Cheese Jalapeno Fries", price: 160 },
                    { id: "cjf8", name: "Barbeque Masala Fries", price: 160 },
                    { id: "cjf9", name: "Chilly cheese Masala Fries", price: 180 },
                    { id: "cjf10", name: "Chipotle Masala Fries", price: 160 }
                ]
            },
            {
                name: "Jain Fries",
                items: [
                    { id: "cjf11", name: "Plain Fries", price: 120 },
                    { id: "cjf12", name: "Cheese Fries", price: 150 },
                    { id: "cjf13", name: "BBQ Fries", price: 150 },
                    { id: "cjf14", name: "Chilly Fries", price: 150 },
                    { id: "cjf15", name: "Mayo Fries", price: 150 }
                ]
            },
            {
                name: "Wedges",
                items: [
                    { id: "cjf16", name: "Plain Wedges", price: 110 },
                    { id: "cjf17", name: "Salsa Wedges", price: 140 },
                    { id: "cjf18", name: "Peri Peri Wedges", price: 140 },
                    { id: "cjf19", name: "Barbeque Wedges", price: 140 },
                    { id: "cjf20", name: "Mayo Chilly Wedges", price: 160 }
                ]
            },
            {
                name: "Burger",
                items: [
                    { id: "cjf21", name: "Aloo Tikki Burger", price: 90 },
                    { id: "cjf22", name: "Cheese Grill Samosa Burger", price: 150 },
                    { id: "cjf23", name: "Tandoori Aloo Tikki Burger", price: 140 },
                    { id: "cjf24", name: "Paneer Vegetable Burger", price: 180 },
                    { id: "cjf25", name: "Cheese Vegetable Burger", price: 150 }
                ]
            }
        ]
    },
    {
        name: "Norchi",
        tagline: "Bowls. Rolls. Starters. All souls.",
        categories: [
            {
                name: "Bowls",
                items: [
                    { id: "n1", name: "Paneer Butter Masala & Jeera Rice", price: 220, jain: true },
                    { id: "n2", name: "Veg Manchurian & Fried Rice", price: 205, jain: true },
                    { id: "n3", name: "Paneer Chilli & Hakka Noodles", price: 230, jain: true },
                    { id: "n4", name: "Veg Makhani & Jeera Rice", price: 205, jain: true },
                    { id: "n5", name: "Veg Kadhai & Jeera Rice", price: 205, jain: true }
                ]
            },
            {
                name: "Starters",
                items: [
                    { id: "n6", name: "Paneer Chilli", price: 200, jain: true },
                    { id: "n7", name: "Veg Crispy", price: 190, jain: true },
                    { id: "n8", name: "Cheesy Corn Triangles", price: 180 },
                    { id: "n9", name: "Mushroom Chilli", price: 200 },
                    { id: "n10", name: "Veg Manchurian", price: 190, jain: true }
                ]
            },
            {
                name: "Rolls",
                items: [
                    { id: "n11", name: "Paneer Butter Masala Roll", price: 200, jain: true },
                    { id: "n12", name: "Veg Crispy Roll", price: 200, jain: true },
                    { id: "n13", name: "Paneer Chilli Roll", price: 200, jain: true },
                    { id: "n14", name: "Paneer Kolhapuri Roll", price: 200, jain: true },
                    { id: "n15", name: "Veg Manchurian Roll", price: 200, jain: true }
                ]
            },
            {
                name: "Indian Sabzi",
                items: [
                    { id: "n16", name: "Veg Kolhapuri", price: 200, jain: true },
                    { id: "n17", name: "Veg Kadhai", price: 200, jain: true },
                    { id: "n18", name: "Veg Makhani", price: 200, jain: true },
                    { id: "n19", name: "Paneer Tikka Masala", price: 220, jain: true },
                    { id: "n20", name: "Paneer Makhani", price: 220, jain: true }
                ]
            },
            {
                name: "Indian Bread",
                items: [
                    { id: "n21", name: "Plain Rumali Roti", price: 80 },
                    { id: "n22", name: "Butter Rumali Roti", price: 90 },
                    { id: "n23", name: "Plain/ Butter Paratha", price: { plain: 60, butter: 70 } },
                    { id: "n24", name: "Tawa Plain/ Butter Roti", price: { plain: 30, butter: 40 } }
                ]
            }
        ]
    },
    {
        name: "Green Chatni Food",
        tagline: "Wholesome Indian flavors, served with love and green goodness!",
        categories: [
            {
                name: "Combo 3CP",
                items: [
                    { id: "gcf1", name: "Dal Makhani with Jeera rice", price: 180 },
                    { id: "gcf2", name: "Dal Tadka With steamed Rice", price: 180 },
                    { id: "gcf3", name: "Paneer Makhanvala with 2 Kulcha", price: 240 },
                    { id: "gcf4", name: "Chole Masala + 3 chapati", price: 240 },
                    { id: "gcf5", name: "Veg chilli milli with 2 butter Naan", price: 240 }
                ]
            },
            {
                name: "Green Chatni 5CP Thali",
                items: [
                    { id: "gcf6", name: "Punjabi Thali", price: 300 },
                    { id: "gcf7", name: "Jain Thali", price: 300 },
                    { id: "gcf8", name: "Maharashtrian Thali", price: 300 },
                    { id: "gcf9", name: "Special Thali", price: 300 },
                    { id: "gcf10", name: "Dal Makhani Thali", price: 300 }
                ]
            },
            {
                name: "Indian Bread Basket",
                items: [
                    { id: "gcf11", name: "Butter Roti", price: 60 },
                    { id: "gcf12", name: "Plain Roti", price: 50 },
                    { id: "gcf13", name: "Butter Naan", price: 70 },
                    { id: "gcf14", name: "Plain Naan", price: 60 },
                    { id: "gcf15", name: "Tandoori Paratha", price: 80 },
                    { id: "gcf16", name: "Kulcha", price: 70 }
                ]
            },
            {
                name: "Rice & Dal",
                items: [
                    { id: "gcf17", name: "Jeera Rice", price: 120 },
                    { id: "gcf18", name: "Steamed Rice", price: 110 },
                    { id: "gcf19", name: "Dal Makhani", price: 140 },
                    { id: "gcf20", name: "Dal Tadka", price: 130 },
                    { id: "gcf21", name: "Khichdi (with ghee)", price: 150 }
                ]
            }
        ]
    },
    {
        name: "Seven Spices Fast Food",
        tagline: "Spice up your cravings — the sizzling way!",
        categories: [
            {
                name: "Paneer Tikka",
                items: [
                    { id: "ssf1", name: "Tandoori Paneer Tikka", price: { half: 170, full: 310 } },
                    { id: "ssf2", name: "Peri-peri Paneer Tikka", price: { half: 190, full: 350 } },
                    { id: "ssf3", name: "Schezwan Paneer Tikka", price: { half: 160, full: 290 } },
                    { id: "ssf4", name: "Masala Paneer Tikka", price: { half: 150, full: 270 } },
                    { id: "ssf5", name: "Paneer Tikka (Dry)", price: { half: 150, full: 260 } }
                ]
            },
            {
                name: "Paneer Roll",
                items: [
                    { id: "ssf6", name: "Peri-peri Paneer Roll", price: { half: 220, full: 240 } },
                    { id: "ssf7", name: "Italian Paneer Roll", price: { half: 240, full: 260 } },
                    { id: "ssf8", name: "Garlic Paneer Roll", price: { half: 190, full: 210 } },
                    { id: "ssf9", name: "Lemon Paneer Tikka Roll", price: { half: 170, full: 190 } },
                    { id: "ssf10", name: "Angara Paneer Tikka Roll", price: { half: 190, full: 210 } }
                ]
            },
            {
                name: "Soya Chaap",
                items: [
                    { id: "ssf11", name: "Malai Chaap (White)", price: { half: 170, full: 320 } },
                    { id: "ssf12", name: "Afghani Chaap (White)", price: { half: 170, full: 320 } },
                    { id: "ssf13", name: "Peri-peri Chaap", price: { half: 180, full: 340 } },
                    { id: "ssf14", name: "Achari Chaap", price: { half: 150, full: 280 } },
                    { id: "ssf15", name: "Masala Chaap", price: { half: 140, full: 260 } }
                ]
            }
        ]
    },
    {
        name: "Panishkar tasteaurant",
        tagline: "Traditional Indian flavors with a modern twist!",
        categories: [
            {
                name: "Snacks",
                items: [
                    { id: "pt1", name: "Sweet Sheera", price: 70 },
                    { id: "pt2", name: "Ulta VadaPav", price: 35 },
                    { id: "pt3", name: "Vadapav (2 PC)", price: 60 },
                    { id: "pt4", name: "Sp.Misal Pav(2 Pav)", price: 110 },
                    { id: "pt5", name: "Kothimbir wadi", price: 100 }
                ]
            },
            {
                name: "Jain items",
                items: [
                    { id: "pt6", name: "Jain Vadapav(2pc)(banana)", price: 60 },
                    { id: "pt7", name: "Jain MisalPav", price: 110 },
                    { id: "pt8", name: "Jain Kothmir wadi", price: 100 },
                    { id: "pt9", name: "Jain Sabudana Wada", price: 100 },
                    { id: "pt10", name: "Jain Farali Misal", price: 100 }
                ]
            },
            {
                name: "Cold Beverages",
                items: [
                    { id: "pt11", name: "Piyush", price: 60 },
                    { id: "pt12", name: "Lassi", price: 50 },
                    { id: "pt13", name: "Mango Lassi", price: 75 },
                    { id: "pt14", name: "Solkadhi", price: 40 },
                    { id: "pt15", name: "Masala Chaas", price: 30 }
                ]
            }
        ]
    },
    {
        name: "Dilkush Dabeli Center",
        tagline: "Authentic, spicy Dabelis that hit the spot!",
        categories: [
            {
                name: "Dabeli",
                items: [
                    { id: "ddc1", name: "Butter Dabeli", price: 20 }
                ]
            }
        ]
    },
    {
        name: "Sai Swad dosa Centre",
        tagline: "Crispy, flavorful dosas to delight your taste buds!",
        categories: [
            {
                name: "Dosa",
                items: [
                    { id: "sd1", name: "Sada Dosa", price: 80 },
                    { id: "sd2", name: "Masala Dosa", price: 100 },
                    { id: "sd3", name: "Mysore Masala Dosa", price: 170 },
                    { id: "sd4", name: "Onion Uttappa", price: 170 },
                    { id: "sd5", name: "Kerala Masala Dosa", price: 190 }
                ]
            }
        ]
    },
    {
        name: "Cheese On Fire",
        tagline: "Melt-in-your-mouth cheese with a smoky kick!",
        categories: [
            {
                name: "Fire Items",
                items: [
                    { id: "cof1", name: "Pizza Shots", price: 150 },
                    { id: "cof2", name: "Fearless", price: 180 },
                    { id: "cof3", name: "The Warning Punch", price: 180 },
                    { id: "cof4", name: "Monacan", price: 150 },
                    { id: "cof5", name: "P3- Theory", price: 200 }
                ]
            },
            {
                name: "Pizza",
                items: [
                    { id: "cof6", name: "Farmer Pizza", price: { half: 150, medium: 190, full: 230 } },
                    { id: "cof7", name: "PP Pizza", price: { half: 200, medium: 250, full: 300 } },
                    { id: "cof8", name: "Pasta Pizza", price: { medium: 300, full: 350 } },
                    { id: "cof9", name: "Cheese Burst Pizza", price: { half: 200, medium: 250, full: 300 } },
                    { id: "cof10", name: "Margherita Pizza", price: { medium: 300, full: 350 } }
                ]
            }
        ]
    },
    {
        name: "Momos Magic",
        tagline: "Steamy, delicious momos with magic in every bite!",
        categories: [
            {
                name: "Steam Momos",
                items: [
                    { id: "mm1", name: "Veg Steamed", price: 100, jain: true },
                    { id: "mm2", name: "Achari Steamed", price: 120 },
                    { id: "mm3", name: "Veg peri Peri Steamed", price: 120 },
                    { id: "mm4", name: "Cheese Corn Steamed", price: 130, jain: true },
                    { id: "mm5", name: "Paneer Steamed", price: 140, jain: true }
                ]
            },
            {
                name: "Kurkure Fries Momos",
                items: [
                    { id: "mm6", name: "Veg Kurkure Fried", price: 70, jain: true },
                    { id: "mm7", name: "Achari Kurkure Fried", price: 35 },
                    { id: "mm8", name: "Veg peri peri Kurkure Freid", price: 60 },
                    { id: "mm9", name: "Cheese Corn Kurkure Fried", price: 110, jain: true },
                    { id: "mm10", name: "Paneer Kurkure Fried", price: 100, jain: true }
                ]
            },
            {
                name: "Fried Momos",
                items: [
                    { id: "mm11", name: "Veg Fried", price: 120, jain: true },
                    { id: "mm12", name: "Achari Fried", price: 130 },
                    { id: "mm13", name: "Veg peri Peri Fried", price: 140 },
                    { id: "mm14", name: "Cheese Corn Fried", price: 150, jain: true },
                    { id: "mm15", name: "Paneer Fried", price: 140, jain: true }
                ]
            }
        ]
    },
    {
        name: "Mocktails on Fire",
        tagline: "Refreshing mocktails with a fiery twist!",
        categories: [
            {
                name: "Boba Pooping perals",
                items: [
                    { id: "mof1", name: "Chocolate", price: { WaterBase: 100, SodaBase: 120, MilkBase: 150 } },
                    { id: "mof2", name: "Lychee", price: { WaterBase: 100, SodaBase: 120, MilkBase: 150 } },
                    { id: "mof3", name: "Strawberry", price: { WaterBase: 100, SodaBase: 120, MilkBase: 150 } },
                    { id: "mof4", name: "Coffee", price: { WaterBase: 100, SodaBase: 120, MilkBase: 150 } },
                    { id: "mof5", name: "Green Apple", price: { WaterBase: 100, SodaBase: 120, MilkBase: 150 } }
                ]
            },
            {
                name: "Coconut Shake",
                items: [
                    { id: "mof6", name: "Coconut Tadgola", price: 180 },
                    { id: "mof7", name: "Coconut Punch", price: 180 },
                    { id: "mof8", name: "Coconut Khajur", price: 200 },
                    { id: "mof9", name: "Coconut Sitafal", price: 200 },
                    { id: "mof10", name: "Coconut Litchi", price: 180 }
                ]
            },
            {
                name: "Red Bull Base",
                items: [
                    { id: "mof11", name: "Mojito", price: 180 },
                    { id: "mof12", name: "Red Kiwi", price: 180 },
                    { id: "mof13", name: "Strawberry Wings", price: 180 },
                    { id: "mof14", name: "Passion Mojito", price: 200 }
                ]
            }
        ]
    },
    {
        name: "Chinese on Fire",
        tagline: "Fiery, spicy Chinese dishes that pack a punch!",
        categories: [
            {
                name: "Rice",
                items: [
                    { id: "co1", name: "Fried Rice", price: { half: 100, full: 150 } },
                    { id: "co2", name: "Chilly Rice", price: { half: 170, full: 250 } },
                    { id: "co3", name: "Triple Schezwan Rice", price: { half: 150, full: 230 } },
                    { id: "co4", name: "Hong Kong Rice", price: { half: 170, full: 220 } },
                    { id: "co5", name: "Singapore Rice", price: { half: 170, full: 220 } }
                ]
            },
            {
                name: "Soup",
                items: [
                    { id: "co6", name: "Manchaow Soup", price: 100 },
                    { id: "co7", name: "Hot & Sour Soup", price: 120 },
                    { id: "co8", name: "Schezwan Soup", price: 120 },
                    { id: "co9", name: "Lemon Coriander Soup", price: 120 },
                    { id: "co10", name: "Paneer Manchow", price: 130 }
                ]
            },
            {
                name: "Noodles",
                items: [
                    { id: "co11", name: "Fried Noodles", price: { half: 100, full: 150 } },
                    { id: "co12", name: "Chilly Noodels", price: { half: 170, full: 250 } },
                    { id: "co13", name: "Triple Schezwan Noodles", price: { half: 150, full: 230 } },
                    { id: "co14", name: "Hong Kong Noodles", price: { half: 170, full: 220 } },
                    { id: "co15", name: "Burnt Garlic Noodles", price: { half: 120, full: 180 } }
                ]
            }
        ]
    },
{
        name: "Cool Refreshments",
        tagline: "Smoothies, milkshakes, coffee & juices to refresh your day!",
        categories: [
            {
                name: "Smoothies",
                items: [
                    { id: "cr1", name: "Mango Smoothies", price: 100 },
                    { id: "cr2", name: "Chocolate Smoothies", price: 100 },
                    { id: "cr3", name: "Mint & Vanilla Smoothies", price: 120 },
                    { id: "cr4", name: "Walk Like an Egyptian Smoothies", price: 120 },
                    { id: "cr5", name: "Strawberry Smoothies", price: 100 }
                ]
            },
            {
                name: "MilkShake",
                items: [
                    { id: "cr6", name: "Banana Bonkers MilkShake", price: 80 },
                    { id: "cr7", name: "Chiku MilkShake", price: 90 },
                    { id: "cr8", name: "Mango MilkShake", price: 90 },
                    { id: "cr9", name: "Oreo Magic MilkShake", price: 110 },
                    { id: "cr10", name: "Cadbury MilkShake", price: 110 },
                    { id: "cr11", name: "5 star MilkShake", price: 110 }
                ]
            },
            {
                name: "Cold Coffee",
                items: [
                    { id: "cr12", name: "Rock Coffee", price: 50 },
                    { id: "cr13", name: "MUD Coffee", price: 130 },
                    { id: "cr14", name: "Oreo Coffee", price: 110 },
                    { id: "cr15", name: "Cream & Cappuccino Coffee", price: 120 },
                    { id: "cr16", name: "Chocolate Coffee", price: 100 }
                ]
            },
            {
                name: "Juice",
                items: [
                    { id: "cr17", name: "Fresh Lime", price: 40 },
                    { id: "cr18", name: "Watermelon", price: 50 },
                    { id: "cr19", name: "Mosambi", price: 50 },
                    { id: "cr20", name: "Orange", price: 60 },
                    { id: "cr21", name: "Masala Lime", price: 40 },
                    { id: "cr22", name: "Ginger Lime", price: 40 }
                ]
            }
        ]
    },

{
        name: "S.K Pizza Corner",
        tagline: "Your local pizza passion — fresh, flavorful, fun!",
        timing: "10.00 AM - 11.00 PM",
        categories: [
            {
                name: "Pizza",
                items: [
                    { id: "sk1", name: "Cheese Margherita", price: { small: 80, medium: 110 } },
                    { id: "sk2", name: "Mix Veg", price: { small: 110, medium: 150 } },
                    { id: "sk3", name: "Spicy Paneer", price: { small: 130, medium: 170 } },
                    { id: "sk4", name: "Sweet & Spicy Paneer", price: { small: 130, medium: 170 } },
                    { id: "sk5", name: "Veg Italian", price: { small: 140, medium: 180 } }
                ]
            },
            {
                name: "Salad",
                items: [
                    { id: "sk6", name: "Veg. Green Salad", price: 70 },
                    { id: "sk7", name: "Potato Salad", price: 70 },
                    { id: "sk8", name: "Coleslaw Salad", price: 80 },
                    { id: "sk9", name: "Corn. Pineapple Salad", price: 80 },
                    { id: "sk10", name: "Veg. Caesar Salad", price: 120 },
                    { id: "sk11", name: "Caesar Salad Hot", price: 120 }
                ]
            },
            {
                name: "Pasta",
                items: [
                    {
                        id: "sk12",
                        name: "Penne & Fusilli",
                        price: 175,
                        description:
                            "Pasta Red Sauce or White Sauce, Fresh Basil, Vegetables & Cheese, With 2Pcs Garlic Bread"
                    }
                ]
            }
        ]
    },
    {
  name: "Sandipani Mess",
  tagline: "Meals that feel like maa made ‘em!",
  timing: "Full menu changes weekly — message us for updates!",
  contact: "+91 8097021356",
  categories: [
    {
      name: "Info",
      items: [
        {
          id: "sm1",
          name: "Weekly Menu",
          price: "Available on request",
          description: "The food timetable changes every week. Just send 'Hi' to +91 8097021356 to get the latest menu."
        },
        {
          id: "sm2",
          name: "Full Menu Access",
          price: "Request Only",
          description: "Complete menu is available on request. Thank you for dining with us! Good food, good mood — only at MyEzz."
        }
      ]
    }
  ]
},

{
  name: "Hungrill",
  tagline: "Where every bite and sip is a celebration of taste, tradition, and twist!",
  timing: "2.00 PM - 12.00 AM",
  categories: [
    {
      name: "Toast / Grill Sandwich",
      items: [
        { id: "hg1", name: "Veg Toast Sandwich", price: 70 },
        { id: "hg2", name: "Potato Toast", price: 70 },
        { id: "hg3", name: "Veg Masala Toast", price: 70 },
        { id: "hg4", name: "Veg Cheese Toast", price: 120 },
        { id: "hg5", name: "Veg Grill", price: 120 },
        { id: "hg6", name: "Masala Grill", price: 120 },
        { id: "hg7", name: "Veg Cheese Grill", price: 160 }
      ]
    },
    {
      name: "Time Pass",
      items: [
        { id: "hg8", name: "Bun Maska", price: 25 },
        { id: "hg9", name: "Tutti Fruity Bun Maska", price: 30 },
        { id: "hg10", name: "Samosa Grill Pav", price: 40 },
        { id: "hg11", name: "Lays Pav", price: 40 },
        { id: "hg12", name: "Garlic Bread", price: 40 }
      ]
    },
    {
      name: "Panini Grill",
      items: [
        { id: "hg13", name: "Peri Peri Grill Panini", price: 140 },
        { id: "hg14", name: "Tandoori Paneer Grill Panini", price: 150 },
        { id: "hg15", name: "Samosa Veg Cheese Grilled Sandwich", price: 190 },
        { id: "hg16", name: "Malwani Grill Panini", price: 140 },
        { id: "hg17", name: "Mexican Grill Panini", price: 140 }
      ]
    }
  ]
},

{
  name: "Shri Veggie Adda",
  tagline: "We Serve Healthy, Fresh And Quality Food.",
  timing: "1.00 PM - 12.00 AM",
  categories: [
    {
      name: "Paneer In Tandoor",
      items: [
        { id: "sva1", name: "Paneer Tikka", price: 120 },
        { id: "sva2", name: "Malai Paneer", price: 130 },
        { id: "sva3", name: "Peri - Peri Paneer Tikka", price: 140 },
        { id: "sva4", name: "Afgani Paneer Tikka", price: 150 },
        { id: "sva5", name: "Hariyali Paneer Tikka", price: 140 }
      ]
    },
    {
      name: "Soya Chap in Tandoor",
      items: [
        { id: "sva6", name: "Chap Tikka", price: 130 },
        { id: "sva7", name: "Malai Chap Tikka", price: 130 },
        { id: "sva8", name: "Peri-Peri Chap Tikka", price: 130 },
        { id: "sva9", name: "Afgani Chap Tikka", price: 140 },
        { id: "sva10", name: "Chap Paneer Tikka", price: 200 }
      ]
    },
    {
      name: "Healthy & Tasty Wraps",
      items: [
        { id: "sva11", name: "Veg Wrap", price: 60 },
        { id: "sva12", name: "Veg Cheese Wrap", price: 70 },
        { id: "sva13", name: "Veg Schezwan Wrap", price: 80 },
        { id: "sva14", name: "Veg Schezwan Cheese Wrap", price: 120 },
        { id: "sva15", name: "Paneer Tika Wrap", price: 130 }
      ]
    },
    {
      name: "Healthy Wraps",
      items: [
        { id: "sva16", name: "Malai Paneer Tikka Wrap", price: 140 },
        { id: "sva17", name: "Cheese Malai Paneer Tikka Wrap", price: 170 },
        { id: "sva18", name: "Schezwan Manchurian Wrap", price: 130 },
        { id: "sva19", name: "Cheese Manchurian Wrap", price: 130 },
        { id: "sva20", name: "Veg Noodles Wrap", price: 100 },
        { id: "sva21", name: "Manchurian Noodles Wrap", price: 120 }
      ]
    },
    {
      name: "Jain Healthy Wraps",
      items: [
        { id: "sva22", name: "Veg Jain Wrap", price: 90 },
        { id: "sva23", name: "Veg Jain Cheese Wrap", price: 120 },
        { id: "sva24", name: "Jain Falajel Wrap", price: 100 },
        { id: "sva25", name: "Jain Cheese Falajel Wrap", price: 130 },
        { id: "sva26", name: "Jain Manchurian Wrap", price: 100 },
        { id: "sva27", name: "Jain Cheese Manchurian Wrap", price: 130 },
        { id: "sva28", name: "Jain Noodles Wrap", price: 100 },
        { id: "sva29", name: "Jain Paneer Noodles Wrap", price: 150 }
      ]
    }
  ]
},

{
  name: "The Tasty Table Fast Food Centre",
  tagline: "We Serve Healthy, Fresh And Quality Food.",
  timing: "12.00 PM - 12.00 AM",
  categories: [
    {
      name: "Sandwiches",
      items: [
        { id: "ttt1", name: "Veg Sandwich", price: 60 },
        { id: "ttt2", name: "Veg Toast Sandwich", price: 70 },
        { id: "ttt3", name: "Samosa Toast Sandwich", price: 80 },
        { id: "ttt4", name: "Veg Cheese Toast", price: 120 },
        { id: "ttt5", name: "Samosa Cheese Toast", price: 140 }
      ]
    },
    {
      name: "Pizza",
      items: [
        { id: "ttt6", name: "Cheese Pizza", price: 150 },
        { id: "ttt7", name: "Paneer Pasta Pizza", price: 200 },
        { id: "ttt8", name: "Veg. Cheese Pizza", price: 170 },
        { id: "ttt9", name: "Pahadi Pizza", price: 200 },
        { id: "ttt10", name: "Paneer Tandoori Pizza", price: 230 }
      ]
    },
    {
      name: "T3's Pastas & Bread",
      items: [
        { id: "ttt11", name: "White Sauce Pasta", price: 230 },
        { id: "ttt12", name: "Arrabiata Pasta", price: 230 },
        { id: "ttt13", name: "Pink Sauce Pasta", price: 250 },
        { id: "ttt14", name: "Corn Garlic Bread", price: 170 },
        { id: "ttt15", name: "Cheese Garlic Bread", price: 240 },
        { id: "ttt16", name: "Paneer Tikka Garlic Bread", price: 190 },
        { id: "ttt17", name: "Paneer Chilli Garlic Bread", price: 160 },
        { id: "ttt18", name: "Chilli Cheese Garlic Bread", price: 190 }
      ]
    },
    {
      name: "Samosa",
      items: [
        { id: "ttt19", name: "A1 Samosa", price: 20 },
        { id: "ttt20", name: "A1 Samosa Pav", price: 30 },
        { id: "ttt21", name: "A1 Cheese Samosa Pav", price: 50 }
      ]
    },
    {
      name: "Juices & Falooda",
      items: [
        { id: "ttt22", name: "Mosambi Juice", price: 80 },
        { id: "ttt23", name: "Watermelon Juice", price: 60 },
        { id: "ttt24", name: "Sitafal Falooda", price: 190 },
        { id: "ttt25", name: "Rose Falooda", price: 190 },
        { id: "ttt26", name: "Butterscotch Falooda", price: 190 },
        { id: "ttt27", name: "Mango Falooda", price: 190 },
        { id: "ttt28", name: "Thandai Falooda", price: 190 }
      ]
    }
  ]
},
{
  name: "Maharshtra Shashan",
  tagline: "We Serve Healthy, Fresh And Quality Food.",
  categories: [
    {
      name: "Frankie",
      items: [
        { id: "ms1", name: "Veg Amul Frankie", price: 30 },
        { id: "ms2", name: "Veg Amul Cheese Frankie", price: 40 },
        { id: "ms3", name: "Veg Amul Sezwan Frankie", price: 40 },
        { id: "ms4", name: "Amul Mayonish Frankie", price: 40 },
        { id: "ms5", name: "Veg Noodles Frankie", price: 50 },
        { id: "ms6", name: "Veg Amul Sezwan Cheese Frankie", price: 50 },
        { id: "ms7", name: "Veg Amul Sezwan Manchurian Frankie", price: 50 },
        { id: "ms8", name: "Veg Noodles Cheese Frankie", price: 50 },
        { id: "ms9", name: "Veg Noodles Sezwan Frankie", price: 50 },
        { id: "ms10", name: "Amul Paneer Frankie", price: 60 }
      ]
    },
    {
      name: "Dabeli",
      items: [
        { id: "ms11", name: "Amul Dabeli", price: 20 },
        { id: "ms12", name: "Amul Cheese Dabeli", price: 20 }
      ]
    },
    {
      name: "Pav Items",
      items: [
        { id: "ms13", name: "Cheese Samosa Pav", price: 35 },
        { id: "ms14", name: "Samosa Cheese Grill Schezwan Pav", price: 50 },
        { id: "ms15", name: "Samosa Pav", price: 22 },
        { id: "ms16", name: "Gurukurpa A-1 Samosa", price: 18 }
      ]
    }
  ]
},
{
  name: "Panishkar Tasteaurant",
  tagline: "Authentic Maharashtrian bites — rooted in flavor!",
  timing: "8.00 AM - 10.00 PM",
  categories: [
    {
      name: "Snacks",
      items: [
        { id: "pt1", name: "Sweet Sheera", price: 70 },
        { id: "pt2", name: "Ulta VadaPav", price: 35 },
        { id: "pt3", name: "Vadapav (2 PC)", price: 60 },
        { id: "pt4", name: "Sp. Misal Pav (2 Pav)", price: 110 },
        { id: "pt5", name: "Kothimbir Wadi", price: 100 }
      ]
    },
    {
      name: "Jain Items",
      items: [
        { id: "pt6", name: "Jain Vadapav (2pc) (banana)", price: 60 },
        { id: "pt7", name: "Jain Misal Pav", price: 110 },
        { id: "pt8", name: "Jain Kothmir Wadi", price: 100 },
        { id: "pt9", name: "Jain Sabudana Wada", price: 100 },
        { id: "pt10", name: "Jain Farali Misal", price: 100 }
      ]
    },
    {
      name: "Cold Beverages",
      items: [
        { id: "pt11", name: "Piyush", price: 60 },
        { id: "pt12", name: "Lassi", price: 50 },
        { id: "pt13", name: "Mango Lassi", price: 75 },
        { id: "pt14", name: "Solkadhi", price: 40 },
        { id: "pt15", name: "Masala Chaas", price: 30 }
      ]
    }
  ]
},
{
  name: "Uncles Corner",
  tagline: "Street food classics — grilled to perfection!",
  timing: "11.00 AM - 8.00 PM",
  categories: [
    {
      name: "Samosa & Grilled Pav",
      items: [
        { id: "uc1", name: "Grilled Samosa Pav", price: 40 },
        { id: "uc2", name: "Cheese Grilled Samosa Pav", price: 55 },
        { id: "uc3", name: "Grilled Lays Pav", price: 35 },
        { id: "uc4", name: "Cheese Grilled Lays Pav", price: 50 }
      ]
    },
    {
      name: "Sandwich",
      items: [
        { id: "uc5", name: "Veg Sandwich", price: 55 },
        { id: "uc6", name: "Grilled Veg Sandwich", price: 65 },
        { id: "uc7", name: "Veg Lays Sandwich", price: 65 },
        { id: "uc8", name: "Potato Sandwich", price: 50 },
        { id: "uc9", name: "Veg Samosa Sandwich", price: 75 }
      ]
    },
    {
      name: "Cheese Sandwich",
      items: [
        { id: "uc10", name: "Cheese Veg Sandwich", price: 70 },
        { id: "uc11", name: "Cheese Grilled Veg Sandwich", price: 85 },
        { id: "uc12", name: "Cheese Veg Lays Sandwich", price: 80 },
        { id: "uc13", name: "Cheese Veg Samosa Sandwich", price: 90 },
        { id: "uc14", name: "Cheese Veg Samosa Lays Sandwich", price: 100 }
      ]
    }
  ]
}

];
export default menuData