import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import { useNavigate } from "react-router-dom";
// --- SVG ICONS ---
const SunIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-yellow-500 ${className}`}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 ${className}`}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const StarIcon = ({filled = true}) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const HomeIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V16a1 1 0 01-.293.707l-2 2A1 1 0 0112 18v-1.586l-3.707-3.707A1 1 0 018 12V6a1 1 0 01-.293-.707L7 4H4a1 1 0 01-1-1z" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

//--Restaurant List--//
const restaurantData = [
  { name: "Patel Juice Centre", distance: 1.2, cuisines: ["Beverages","Non-Jain"], rating: 4.2, reviews: 1250, time: "25-30", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755895645330-qq2u7eyebo-1755895642484_i5db00_screenshot_2025-08-2.png", offer: "Fresh Juice", tags: ["Pure Veg"], operating_hours: "12:30 PM - 12:00 AM" },
  { name: "BE Bytes", distance: 1.2, cuisines: ["Non-Jain","Jain"], rating: 4.2, reviews: 1250, time: "25-30", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755897266181-y9qdcu4jom-1755897261379_xih865_screenshot_2025-08-2.png", offer: "20% OFF", tags: ["Pure Veg", "Jain"], operating_hours: "5:00 PM - 11:00 PM" },
  { name: "Ramanandi Pizza", distance: 1.5, cuisines: ["Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755895245660-oq6po7fzegk-1755895242769_7f0us3_screenshot_2025-08-2.png", offer: "Healthy Pizza", tags: ["Pure Veg", "Jain"], operating_hours: "5:30 PM - 11:30 PM" },
  { name: "House of Sushi", distance: 1.8, cuisines: ["Non-Jain"], rating: 4.7, reviews: 456, time: "30-35", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755895047529-4y55icdw9dm-1755895044352_3c20aj_screenshot_2025-08-2.png", offer: "Sushi Special", tags: ["Pure Veg"], operating_hours: "4:30 PM - 12:30 AM" },
  { name: "Priya Foods", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755967552470-eepyzuoq3ok-1755967550136_uh38t9_screenshot_2025-08-2.png", offer: "South Special", tags: ["Pure Veg", "Jain"], operating_hours: "12:00 PM - 8:00 PM" },
  { name: "Cafe Jethwa", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896696134-jaos24jzwt-1755896696639_3oinel_cafe_jhetwa.webp", offer: "Burger Special", tags: ["Pure Veg"], operating_hours: "3:30 PM - 12:00 AM" },
  { name: "Norchi", distance: 1.5, cuisines: ["Non-Jain","Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896769129-f2b4gv9jouu-1755896769958_w8xzf7_norchi.webp", offer: "Bowl Special", tags: ["Pure Veg", "Jain"], operating_hours: "12:00 PM - 1:00 AM" },
  { name: "Green Chatni Food", distance: 1.5, cuisines: ["Non-Jain","Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896032426-pdnyuevp18-1755896029141_2lrv8a_screenshot_2025-08-2.png", offer: "Thali Special", tags: ["Pure Veg", "Jain"], operating_hours: "11:00 AM - 3:00 PM & 7:00 PM - 11:00 PM" },
  { name: "Sai Krupa Amritsar Kulcha", distance: 1.5, cuisines: ["Non-Jain", "Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896638027-lq36fl1reu-1755896638345_sp4v19_sai_amritsar.webp", offer: "Kulcha Special", tags: ["Pure Veg", "Jain"], operating_hours: "12:00 PM - 10:30 PM" },
  { name: "Hungrill", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755895407874-lx8turec028-1755895405373_pwke1m_screenshot_2025-08-2.png", offer: "Grill Special", tags: ["Pure Veg"], operating_hours: "2:00 PM - 12:00 AM" },
  { name: "Shree Veggie Adda", distance: 1.5, cuisines: ["Non-Jain","Jain"], rating: 4.6, reviews: 1500, time: "20-25", price: 180, image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896267775-ck9hev3y3cv-1755896264923_z0tldz_screenshot_2025-08-2.png", offer: "Wrap Special", tags: ["Pure Veg", "Jain"], operating_hours: "1:00 PM - 12:00 AM" },
  { name: "Tasty Table Fast Food", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896412981-13pqv741h8gc-1755896410270_3816y3_screenshot_2025-08-2.png", offer: "Combo Special", tags: ["Pure Veg"], operating_hours: "12:00 PM - 12:00 AM" },
  { name: "Maharashtra Shashan", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755967474303-8lzl5yzy3zc-1755967470582_z8bjcp_screenshot_2025-08-2.png", offer: "Frankie Special", tags: ["Pure Veg"], operating_hours: "1:00 PM - 12:00 AM" },
  { name: "Panishkar Tastearaunt", distance: 3.2, cuisines: ["Maharashtrian", "Jain"], rating: 4.3, reviews: 980, time: "25-30", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755895156171-raymcdxas7r-1755895153279_sxb6yi_screenshot_2025-08-2.png", offer: "Combo Offer", tags: ["Jain"], operating_hours: "1:00 PM - 12:00 AM" },
  { name: "Dilkhush Dabeli Centre", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896715383-80mw8vrcv84-1755896716549_vlofwv_dilkush.jpeg", offer: "Dabeli Special", tags: ["Pure Veg"], operating_hours: "5:00 PM - 11:00 PM" },
  { name: "Cheese on Fire", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896661911-0cg4twwpjd1p-1755896662494_fuqc5i_cheese_on_fire.webp", offer: "Fire Special", tags: ["Pure Veg"], operating_hours: "12:30 PM - 12:30 AM" },
  { name: "Magic Momos", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896743463-7tpmwsdj748-1755896744446_9d01m2_momos_mgic.webp", offer: "Momo Special", tags: ["Pure Veg"], operating_hours: "12:00 PM - 12:00 AM" },
  { name: "Mocktails on Fire", distance: 1.5, cuisines: ["Beverages", "Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896728798-kaqi5vk2xhj-1755896729685_ww2fhh_mocktails.webp", offer: "Mocktail Special", tags: ["Pure Veg"], operating_hours: "11:00 AM - 11:00 PM" },
  { name: "Uncles Corner", distance: 1.5, cuisines: ["Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896218263-b4nlxb15sq-1755896215689_u7omyq_screenshot_2025-08-2.png", offer: "Sandwich Special", tags: ["Pure Veg"], operating_hours: "11:00 AM - 8:00 PM" },
  { name: "Smootheory", distance: 1.5, cuisines: ["Beverages","Non-Jain"], rating: 4.6, reviews: 1500, time: "20-25", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755896873401-ea65fq82wb-1755896874535_z9819f_smooth.webp", offer: "Smoothie Special", tags: ["Pure Veg"], operating_hours: "10:00 AM - 11:00 PM" },
  { name: "SK Pizza Corner", distance: 2.1, cuisines: ["North Indian","Non-Jain"], rating: 4.5, reviews: 890, time: "35-40", image: "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1755894071789-hubgy8gqkdi-1755894061118_6fiz8r_skpizza.png", offer: "Free Delivery", tags: ["Pure Veg"], operating_hours: "10:00 AM - 11:00 PM" },
  { name: "House of Delicious", distance: 2.0, cuisines: ["Fast Food", "Pizza","Jain"], rating: 4.5, reviews: 950, time: "20-25",  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPWCWaCblsD8fNHr4nUFVIYwADmh6azLUM9g&s", offer: "10% DISCOUNT!", tags: ["Pure Veg"], operating_hours: "11:00 AM - 11:30 PM"},
  { name: "The Art Cafe", distance: 2.8, cuisines: ["Cafe", "Fast Food", "Italian", "Jain"], rating: 4.4, reviews: 980, time: "25-30", image: "https://content.jdmagicbox.com/v2/comp/mumbai/g3/022pxx22.xx22.231108080504.z3g3/catalogue/the-art-cafe-chembur-west-mumbai-fast-food-hfeh5w3bwa-250.jpg", offer: "Free Delivery in Tilak Nagar", tags: ["Pure Veg", "Jain"], operating_hours: "11:00 AM - 1:00 AM"},
];
//--Restraunt Menu Data--//
const menuData = {
    //--BE Bytes--//
    "BE Bytes": [
  { name: "Masala Vada Pav", price: 40, isVeg: true },
  { name: "Cheese Masala Vada Pav", price: 60, isVeg: true },
  { name: "Masala Samosa Pav", price: 60, isVeg: true },
  { name: "Cheese Masala Samosa Pav", price: 80, isVeg: true },
  { name: "Pav Sandwich (Half) (JAIN)", price: 50, isVeg: true },
  { name: "Pav Sandwich (Full) (JAIN)", price: 90, isVeg: true },
  { name: "Masala Pav (Half)", price: 50, isVeg: true },
  { name: "Masala Pav (Full)", price: 90, isVeg: true },
  { name: "Thecha Vada Pav (JAIN)", price: 50, isVeg: true },
  { name: "Thecha Pav", price: 50, isVeg: true },
  { name: "Chakna Pav", price: 60, isVeg: true },
  { name: "Korean Cream Cheese Pav", price: 90, isVeg: true },
  { name: "Peri Peri Paneer Pav (JAIN)", price: 90, isVeg: true },
  { name: "Masala Khari (JAIN)", price: 100, isVeg: true },
  { name: "Tawa Vada Fry", price: 120, isVeg: true },

  { name: "The OG Bagel (Half) (JAIN)", price: 120, isVeg: true },
  { name: "The OG Bagel (Full) (JAIN)", price: 230, isVeg: true },
  { name: "B.E. Bytes Special Bagel (Half) (JAIN)", price: 120, isVeg: true },
  { name: "B.E. Bytes Special Bagel (Full) (JAIN)", price: 230, isVeg: true },
  { name: "Avocado Cream Cheese Bagel (Half)", price: 140, isVeg: true },
  { name: "Avocado Cream Cheese Bagel (Full)", price: 270, isVeg: true },
  { name: "Jalapeno Corn Cheese Bagel (Half)", price: 120, isVeg: true },
  { name: "Jalapeno Corn Cheese Bagel (Full)", price: 230, isVeg: true },
  { name: "Italian Bagel (Half)", price: 120, isVeg: true },
  { name: "Italian Bagel (Full)", price: 230, isVeg: true },
  { name: "Paneer Tikka Bagel (Half) (JAIN)", price: 120, isVeg: true },
  { name: "Paneer Tikka Bagel (Full) (JAIN)", price: 230, isVeg: true },
  { name: "Pesto Bagel (Half)", price: 120, isVeg: true },
  { name: "Pesto Bagel (Full)", price: 230, isVeg: true },
  { name: "Peri Peri Bagel (Half) (JAIN)", price: 120, isVeg: true },
  { name: "Peri Peri Bagel (Full) (JAIN)", price: 230, isVeg: true },
  { name: "Chocolate Bagel", price: 100, isVeg: true },
  { name: "Peanut Butter & Jam Bagel (Half)", price: 100, isVeg: true },
  { name: "Peanut Butter & Jam Bagel (Full)", price: 190, isVeg: true },

  { name: "Plain Dip", price: null, isVeg: true },
  { name: "Pesto Dip", price: null, isVeg: true },
  { name: "Peri Peri Dip", price: null, isVeg: true },
  { name: "Classic Dough Balls (JAIN)", price: 100, isVeg: true },
  { name: "Peri Peri Dough Balls (JAIN)", price: 100, isVeg: true },
  { name: "Nutella Dough Balls", price: 100, isVeg: true },
  { name: "Churro Dough Balls", price: 100, isVeg: true },

  { name: "Mexican Wrap", price: 180, isVeg: true },
  { name: "Aloo Babycorn Tikka Wrap", price: 180, isVeg: true },
  { name: "Paneer Tikka Wrap", price: 180, isVeg: true },
  { name: "Pesto Cottage Cheese Wrap", price: 180, isVeg: true },

  { name: "Peach Ice Tea", price: 50, isVeg: true },
  { name: "Lemon Ice Tea", price: 50, isVeg: true },
  { name: "Blueberry Ice Tea", price: 50, isVeg: true },
  { name: "Cold Coffee", price: 60, isVeg: true },
  { name: "Double Chocolate Brownie", price: 70, isVeg: true },
  { name: "Walnut Chocolate Brownie", price: 70, isVeg: true },
  { name: "Brownie Sundae", price: 120, isVeg: true }
],

//--SK Pizza Corner--//

    "SK Pizza Corner": [
  { name: "Jain Mix Veg Pizza (Small)", price: 110, isVeg: true },
  { name: "Jain Mix Veg Pizza (Medium)", price: 150, isVeg: true },
  { name: "Jain Spicy Paneer Pizza (Small)", price: 130, isVeg: true },
  { name: "Jain Spicy Paneer Pizza (Medium)", price: 170, isVeg: true },

  { name: "Jain Cheese Bread (4 pcs)", price: 90, isVeg: true },

  { name: "Veg Jain Burger", price: 80, isVeg: true },
  { name: "Veg Jain Cheese Burger", price: 90, isVeg: true },

  { name: "Jain Bruschetta - Cheese + Tomato + Corn + Basil (4 pcs)", price: 125, isVeg: true },

  { name: "Cheese Margherita Pizza (Small)", price: 80, isVeg: true },
  { name: "Cheese Margherita Pizza (Medium)", price: 110, isVeg: true },
  { name: "Mix Veg Pizza (Small)", price: 110, isVeg: true },
  { name: "Mix Veg Pizza (Medium)", price: 150, isVeg: true },
  { name: "Spicy Paneer Pizza (Small)", price: 130, isVeg: true },
  { name: "Spicy Paneer Pizza (Medium)", price: 170, isVeg: true },
  { name: "Cheese Mayonnaise Pizza (Small)", price: 130, isVeg: true },
  { name: "Cheese Mayonnaise Pizza (Medium)", price: 170, isVeg: true },
  { name: "Sweet & Spicy Pizza (Small)", price: 130, isVeg: true },
  { name: "Sweet & Spicy Pizza (Medium)", price: 170, isVeg: true },
  { name: "Veg Italian Pizza (Small)", price: 140, isVeg: true },
  { name: "Veg Italian Pizza (Medium)", price: 180, isVeg: true },
  { name: "Veg Schezwan Pizza (Small)", price: 160, isVeg: true },
  { name: "Veg Schezwan Pizza (Medium)", price: 210, isVeg: true },
  { name: "Barbeque Pizza (Small)", price: 160, isVeg: true },
  { name: "Barbeque Pizza (Medium)", price: 210, isVeg: true },
  { name: "Veg Exotic Pizza (Small)", price: 160, isVeg: true },
  { name: "Veg Exotic Pizza (Medium)", price: 210, isVeg: true },
  { name: "Veg Cheesy Cheese Pizza (Small)", price: 160, isVeg: true },
  { name: "Veg Cheesy Cheese Pizza (Medium)", price: 210, isVeg: true },
  { name: "SPL Veg Supreme Pizza (Small)", price: 160, isVeg: true },
  { name: "SPL Veg Supreme Pizza (Medium)", price: 210, isVeg: true },
  { name: "Pizzatta", price: 170, isVeg: true },

  { name: "Extra Cheese (Small)", price: 40, isVeg: true },
  { name: "Extra Cheese (Medium)", price: 60, isVeg: true },

  { name: "Plain Garlic Bread (4 pcs)", price: 60, isVeg: true },
  { name: "Cheese Garlic Bread (4 pcs)", price: 90, isVeg: true },
  { name: "Spicy Cheese Garlic Bread (4 pcs)", price: 100, isVeg: true },
  { name: "Garlic Bread Stick with Cheese Dip", price: 100, isVeg: true },

  { name: "Veg Burger", price: 70, isVeg: true },
  { name: "Veg Cheese Burger", price: 80, isVeg: true },
  { name: "Veg Chilly Cheese Burger", price: 90, isVeg: true },
  { name: "Tandoori Mayo Burger", price: 90, isVeg: true },
  { name: "Tandoori Cheese Mayo Burger", price: 100, isVeg: true },
  { name: "Schezwan Cheese Burger", price: 100, isVeg: true },

  { name: "Patties (2 pcs)", price: 60, isVeg: true },
  { name: "French Fries", price: 90, isVeg: true },
  { name: "Peri Peri Fries", price: 100, isVeg: true },
  { name: "Schezwan Fries", price: 120, isVeg: true },
  { name: "Barbeque Fries", price: 120, isVeg: true },
  { name: "Cheesy Cheese Fries", price: 135, isVeg: true },
  { name: "Peri Peri Cheesy Cheese Fries", price: 145, isVeg: true },

  { name: "Veg Green Salad", price: 70, isVeg: true },
  { name: "Potato Salad", price: 70, isVeg: true },
  { name: "Coleslaw Salad", price: 80, isVeg: true },
  { name: "Corn Pineapple Salad", price: 80, isVeg: true },
  { name: "Veg Caesar Salad", price: 120, isVeg: true },
  { name: "Caesar Salad Hot", price: 120, isVeg: true },

  { name: "Pasta (Penne & Fusilli)", price: 175, isVeg: true },

  { name: "Bruschetta - Cheese + Onion + Capsicum (4 pcs)", price: 125, isVeg: true },
  { name: "Bruschetta - Cheese + Onion + Spicy Paneer (4 pcs)", price: 125, isVeg: true },
  { name: "Bruschetta - Cheese + Jalapeno + Black Olives (4 pcs)", price: 125, isVeg: true },

  { name: "Bread Butter", price: 20, isVeg: true },
  { name: "Bread Butter Toast", price: 30, isVeg: true },
  { name: "Bread Butter with Jam", price: 30, isVeg: true },
  { name: "Bread Butter with Jam Toast", price: 40, isVeg: true },
  { name: "Veg Sandwich", price: 45, isVeg: true },
  { name: "Veg Toast Sandwich", price: 55, isVeg: true },
  { name: "Veg Cheese Sandwich", price: 55, isVeg: true },
  { name: "Veg Cheese Toast Sandwich", price: 65, isVeg: true },
  { name: "Veg Masala Toast Sandwich", price: 75, isVeg: true },
  { name: "Veg Cheese Masala Toast Sandwich", price: 85, isVeg: true },
  { name: "Chilly Cheese Toast Sandwich", price: 85, isVeg: true },
  { name: "Coleslaw Salad Cheese Sandwich", price: 90, isVeg: true },
  { name: "Veg Grill Sandwich", price: 100, isVeg: true },
  { name: "Veg Cheese Grill Sandwich", price: 130, isVeg: true },
  { name: "Chilly Cheese Grill Sandwich", price: 130, isVeg: true },
  { name: "Cheese Peppercorn Sandwich", price: 140, isVeg: true },
  { name: "Panini Grill Cheese Sandwich", price: 140, isVeg: true }
],

"The Art Cafe": [
    // Tea Time Bites
    { "name": "Bun Maska", "price": 20, "isVeg": true },
    { "name": "Bun Maska (Grilled)", "price": 50, "isVeg": true },
    { "name": "Bread Butter", "price": 20, "isVeg": true },
    { "name": "Bread Butter (Grilled)", "price": 30, "isVeg": true },
    { "name": "Bread Butter Jam", "price": 20, "isVeg": true },
    { "name": "Bread Butter Jam (Grilled)", "price": 50, "isVeg": true },
    { "name": "Nutella Bread", "price": 40, "isVeg": true },
    { "name": "Nutella Bread (Grilled)", "price": 50, "isVeg": true },
    { "name": "Garlic Bun (Grilled)", "price": 50, "isVeg": true },

    // Pakoda
    { "name": "Aloo Pakoda", "price": 70, "isVeg": true },
    { "name": "Onion Pakoda", "price": 80, "isVeg": true },
    { "name": "Onion Corn Pakoda", "price": 90, "isVeg": true },
    { "name": "Capsicum Corn Pakoda", "price": 100, "isVeg": true },
    { "name": "Corn Pakoda", "price": 110, "isVeg": true },
    { "name": "Paneer Pakoda", "price": 170, "isVeg": true },

    // Fries
    { "name": "Plain Fries", "price": 70, "isVeg": true },
    { "name": "Cheesy Fries", "price": 90, "isVeg": true },
    { "name": "Peri Peri Fries", "price": 100, "isVeg": true },
    { "name": "Peri Peri Cheese Fries", "price": 120, "isVeg": true },
    { "name": "Fries with Cheesy Poper", "price": 110, "isVeg": true },
    { "name": "THE ART CAFÉ Special Fries", "price": 150, "isVeg": true },

    // Maggi
    { "name": "Ghar Wali Maggi", "price": 50, "isVeg": true },
    { "name": "Masala Maggi", "price": 40, "isVeg": true },
    { "name": "Masala Maggi (Cheese)", "price": 60, "isVeg": true },
    { "name": "Schezwan Maggi", "price": 55, "isVeg": true },
    { "name": "Schezwan Maggi (Cheese)", "price": 75, "isVeg": true },
    { "name": "Veg Masala Maggi", "price": 50, "isVeg": true },
    { "name": "Veg Masala Maggi (Cheese)", "price": 70, "isVeg": true },
    { "name": "Hot & Spicy Maggi", "price": 45, "isVeg": true },
    { "name": "Hot & Spicy Maggi (Cheese)", "price": 65, "isVeg": true },
    { "name": "Hot Garlic Maggi", "price": 50, "isVeg": true },
    { "name": "Hot Garlic Maggi (Cheese)", "price": 70, "isVeg": true },
    { "name": "Veg Peri Peri Maggi", "price": 60, "isVeg": true },
    { "name": "Veg Peri Peri Maggi (Cheese)", "price": 80, "isVeg": true },
    { "name": "Butter Maggi", "price": 50, "isVeg": true },
    { "name": "Chilli Cheese Maggi", "price": 70, "isVeg": true },
    { "name": "Corn Cheese Maggi", "price": 75, "isVeg": true },
    { "name": "Paneer Masala Maggi", "price": 70, "isVeg": true },
    { "name": "Paneer Masala Maggi (Cheese)", "price": 90, "isVeg": true },
    { "name": "Onion Tomato Maggi", "price": 50, "isVeg": true },
    { "name": "Onion Tomato Maggi (Cheese)", "price": 70, "isVeg": true },
    { "name": "Lemon Tadka Maggi", "price": 50, "isVeg": true },
    { "name": "Jain Maggi", "price": 50, "isVeg": true },
    { "name": "Jain Maggi (Cheese)", "price": 70, "isVeg": true },

    // Sandwiches
    { "name": "Potato Sandwich (Regular)", "price": 40, "isVeg": true },
    { "name": "Potato Sandwich (Grilled)", "price": 60, "isVeg": true },
    { "name": "Potato Sandwich (Cheese)", "price": 80, "isVeg": true },
    { "name": "Vegetable Sandwich (Regular)", "price": 60, "isVeg": true },
    { "name": "Vegetable Sandwich (Grilled)", "price": 70, "isVeg": true },
    { "name": "Vegetable Sandwich (Cheese)", "price": 90, "isVeg": true },
    { "name": "Potato Capsicum Sandwich (Regular)", "price": 90, "isVeg": true },
    { "name": "Potato Capsicum Sandwich (Grilled)", "price": 100, "isVeg": true },
    { "name": "Potato Capsicum Sandwich (Cheese)", "price": 110, "isVeg": true },
    { "name": "Paneer Capsicum Sandwich (Regular)", "price": 100, "isVeg": true },
    { "name": "Paneer Capsicum Sandwich (Cheese)", "price": 130, "isVeg": true },
    { "name": "Cheese Chilly Toast", "price": 130, "isVeg": true },
    { "name": "Corn Cheese Chilli Toast", "price": 130, "isVeg": true },
    { "name": "Chocolate Sandwich", "price": 120, "isVeg": true },
    { "name": "Garlic Mayo Sandwich (Regular)", "price": 100, "isVeg": true },
    { "name": "Garlic Mayo Sandwich (Cheese)", "price": 130, "isVeg": true },
    { "name": "Paneer Potato Masala Sandwich (Regular)", "price": 120, "isVeg": true },
    { "name": "Paneer Potato Masala Sandwich (Cheese)", "price": 140, "isVeg": true },
    { "name": "Club Sandwich (Regular)", "price": 110, "isVeg": true },
    { "name": "Club Sandwich (Cheese)", "price": 140, "isVeg": true },
    { "name": "Pahadi Sandwich (Regular)", "price": 120, "isVeg": true },
    { "name": "Pahadi Sandwich (Cheese)", "price": 150, "isVeg": true },
    { "name": "Mayo Sandwich (Regular)", "price": 150, "isVeg": true },
    { "name": "Mayo Sandwich (Cheese)", "price": 160, "isVeg": true },
    { "name": "Tandoori Sandwich (Regular)", "price": 120, "isVeg": true },
    { "name": "Tandoori Sandwich (Cheese)", "price": 150, "isVeg": true },
    { "name": "Thousand Island Sandwich (Cheese)", "price": 170, "isVeg": true },
    { "name": "Chipotle Sandwich (Cheese)", "price": 160, "isVeg": true },
    { "name": "THE ART CAFÉ Special Sandwich (Grilled)", "price": 150, "isVeg": true },
    
    // Burger
    { "name": "Classic Burger", "price": 60, "isVeg": true },
    { "name": "Jalapino Burger", "price": 90, "isVeg": true },
    { "name": "Peri Peri Burger", "price": 100, "isVeg": true },
    { "name": "Fiery to Hell Burger", "price": 100, "isVeg": true },
    { "name": "Crunchy Burger", "price": 110, "isVeg": true },
    { "name": "Tandoori Burger", "price": 110, "isVeg": true },

    // Pizza
    { "name": "Margarita Pizza", "price": 110, "isVeg": true },
    { "name": "Margarita Pizza (Double Cheese)", "price": 140, "isVeg": true },
    { "name": "Sweet Corn Pizza", "price": 110, "isVeg": true },
    { "name": "Sweet Corn Pizza (Double Cheese)", "price": 140, "isVeg": true },
    { "name": "Onion Pizza", "price": 110, "isVeg": true },
    { "name": "Onion Pizza (Double Cheese)", "price": 140, "isVeg": true },
    { "name": "Tomato Pizza", "price": 110, "isVeg": true },
    { "name": "Tomato Pizza (Double Cheese)", "price": 140, "isVeg": true },
    { "name": "Onion Corn Pizza", "price": 120, "isVeg": true },
    { "name": "Paneer Tikka Pizza", "price": 150, "isVeg": true },
    { "name": "Paneer Tikka Pizza (Double Cheese)", "price": 180, "isVeg": true },
    { "name": "BBQ Paneer Pizza", "price": 150, "isVeg": true },
    { "name": "BBQ Paneer Pizza (Double Cheese)", "price": 180, "isVeg": true },
    { "name": "Spice to Hell Pizza", "price": 150, "isVeg": true },
    { "name": "Spice to Hell Pizza (Double Cheese)", "price": 180, "isVeg": true },
    { "name": "Farm Fresh Pizza", "price": 150, "isVeg": true },
    { "name": "Farm Fresh Pizza (Double Cheese)", "price": 180, "isVeg": true },
    { "name": "Peri Peri Paneer Tikka Pizza", "price": 170, "isVeg": true },
    { "name": "Peri Peri Paneer Tikka Pizza (Double Cheese)", "price": 200, "isVeg": true },
    { "name": "Tandoori Pizza", "price": 170, "isVeg": true },
    { "name": "Tandoori Pizza (Double Cheese)", "price": 200, "isVeg": true },

    // Jain Pizza
    { "name": "Cheese Tomato Pizza (Jain)", "price": 200, "isVeg": true },
    { "name": "Cheese Corn Pizza (Jain)", "price": 220, "isVeg": true },
    { "name": "Cheese Paneer Pizza (Jain)", "price": 250, "isVeg": true },
    { "name": "Cheese Chilli Pizza (Jain)", "price": 250, "isVeg": true },
    { "name": "Paneer & Capsicum Pizza (Jain)", "price": 250, "isVeg": true },
    { "name": "Paneer & Corn Pizza (Jain)", "price": 250, "isVeg": true },
    { "name": "Cheese Chilli Capsicum Pizza (Jain)", "price": 250, "isVeg": true },

    // Kullad Pizza
    { "name": "Kullad Pizza", "price": 140, "isVeg": true },
    { "name": "Kullad Pizza (Double Cheese)", "price": 170, "isVeg": true },
    { "name": "Tandoori Kullad Pizza", "price": 170, "isVeg": true },
    { "name": "Paneer Tikka Kullad Pizza", "price": 150, "isVeg": true },
    { "name": "Paneer Tikka Kullad Pizza (Double Cheese)", "price": 180, "isVeg": true },

    // Pasta & Spaghetti
    { "name": "Alfredo Pasta", "price": 160, "isVeg": true },
    { "name": "Alfredo Pasta (Jain)", "price": 190, "isVeg": true },
    { "name": "Arabita Pasta", "price": 160, "isVeg": true },
    { "name": "Arabita Pasta (Jain)", "price": 190, "isVeg": true },
    { "name": "Pink Sauce Pasta", "price": 160, "isVeg": true },
    { "name": "Pink Sauce Pasta (Jain)", "price": 190, "isVeg": true },
    { "name": "Basil Pesto Pasta", "price": 180, "isVeg": true },
    { "name": "Basil Pesto Pasta (Jain)", "price": 200, "isVeg": true },
    { "name": "Alfredo Spaghetti", "price": 180, "isVeg": true },
    { "name": "Alfredo Spaghetti (Jain)", "price": 200, "isVeg": true },
    { "name": "Arabita Spaghetti", "price": 180, "isVeg": true },
    { "name": "Arabita Spaghetti (Jain)", "price": 200, "isVeg": true },
    { "name": "Pink Sauce Spaghetti", "price": 180, "isVeg": true },
    { "name": "Pink Sauce Spaghetti (Jain)", "price": 200, "isVeg": true },
    { "name": "Basil Pesto Spaghetti", "price": 200, "isVeg": true },
    { "name": "Basil Pesto Spaghetti (Jain)", "price": 220, "isVeg": true },

    // Chinese
    { "name": "Veg Noodles", "price": 90, "isVeg": true },
    { "name": "Veg Manchurian Noodles", "price": 110, "isVeg": true },
    { "name": "Veg Schezwan Noodles", "price": 120, "isVeg": true },
    { "name": "Veg Manchurian Schezwan Noodles", "price": 150, "isVeg": true },
    { "name": "Veg Butter Noodles", "price": 160, "isVeg": true },
    { "name": "Spicy Korean Ramen", "price": 200, "isVeg": true },
    { "name": "Cheese Korean Ramen", "price": 220, "isVeg": true },
    { "name": "Veg Sikkim Momos", "price": 70, "isVeg": true },
    { "name": "Veg Schezwan Momos", "price": 100, "isVeg": true },
    { "name": "Veg Cheese Momos", "price": 110, "isVeg": true },
    { "name": "Paneer Momos", "price": 110, "isVeg": true },
    { "name": "Peri Peri Momos", "price": 110, "isVeg": true },

    // More Bites
    { "name": "Paneer Bhurji (Half)", "price": 110, "isVeg": true },
    { "name": "Paneer Bhurji (Full)", "price": 200, "isVeg": true },
    { "name": "Plain Garlic Bread", "price": 60, "isVeg": true },
    { "name": "Cheesy Lava Garlic Bread", "price": 90, "isVeg": true },
    { "name": "Supreme Garlic Bread", "price": 110, "isVeg": true },
    { "name": "Cheesy Nachos", "price": 70, "isVeg": true },
    { "name": "Art Special Nachos", "price": 100, "isVeg": true },
    
    // Waffles & Desserts
    { "name": "White Fantasy Waffle Stick", "price": 70, "isVeg": true },
    { "name": "Dark Chocolate Waffle Stick", "price": 70, "isVeg": true },
    { "name": "Oreo Chocolate Waffle Stick", "price": 80, "isVeg": true },
    { "name": "KitKat Waffle Stick", "price": 80, "isVeg": true },
    { "name": "Naughty Nutella Waffle Stick", "price": 80, "isVeg": true },
    { "name": "Black & White Waffle Stick", "price": 80, "isVeg": true },
    { "name": "Coffee Bite Waffle Stick", "price": 80, "isVeg": true },
    { "name": "Oreo Dark Chocolate Jaw Twister", "price": 150, "isVeg": true },
    { "name": "Naughty Nutella Jaw Twister", "price": 150, "isVeg": true },
    { "name": "Double Delight Belgian Jaw Twister", "price": 150, "isVeg": true },
    { "name": "Triple Delight Belgian Jaw Twister", "price": 170, "isVeg": true },
    { "name": "Oreo Kitkat Party Jaw Twister", "price": 170, "isVeg": true },
    { "name": "White Fantasy Pocket Waffle", "price": 100, "isVeg": true },
    { "name": "Dark Chocolate Pocket Waffle", "price": 100, "isVeg": true },
    { "name": "Oreo Chocolate Delight Pocket Waffle", "price": 120, "isVeg": true },
    { "name": "Crunchy Kitkat Pocket Waffle", "price": 120, "isVeg": true },
    { "name": "Naughty Nutella Pocket Waffle", "price": 120, "isVeg": true },
    { "name": "Black & White Pocket Waffle", "price": 120, "isVeg": true },
    { "name": "Coffee Bite Pocket Waffle", "price": 130, "isVeg": true },
    { "name": "Oreo Kitkat Pocket Waffle", "price": 130, "isVeg": true },
    { "name": "Black and White Waffle Pizza", "price": 200, "isVeg": true },
    { "name": "Four Fantasy Waffle Pizza", "price": 220, "isVeg": true },
    { "name": "Oreo Kitkat Party Waffle Pizza", "price": 250, "isVeg": true },
    { "name": "Naughty Nutella Waffle Pizza", "price": 240, "isVeg": true },
    { "name": "Four Flavours Chocolate Waffle Pizza", "price": 250, "isVeg": true },

    // Beverages
    { "name": "Elaichi Tea", "price": 15, "isVeg": true },
    { "name": "Masala Tea", "price": 20, "isVeg": true },
    { "name": "Lemongrass Tea", "price": 20, "isVeg": true },
    { "name": "Ginger Tea", "price": 20, "isVeg": true },
    { "name": "Ginger Lemongrass Tea", "price": 25, "isVeg": true },
    { "name": "Ginger Cardamom Tea", "price": 25, "isVeg": true },
    { "name": "Chocolate Tea", "price": 25, "isVeg": true },
    { "name": "Cinnamon Tea", "price": 25, "isVeg": true },
    { "name": "Cloves Tea", "price": 25, "isVeg": true },
    { "name": "Mint Tea", "price": 25, "isVeg": true },
    { "name": "Lemon Black Tea", "price": 25, "isVeg": true },
    { "name": "Pineapple Black Tea", "price": 25, "isVeg": true },
    { "name": "Black Currant Black Tea", "price": 25, "isVeg": true },
    { "name": "Litchi Black Tea", "price": 25, "isVeg": true },
    { "name": "Guava Black Tea", "price": 25, "isVeg": true },
    { "name": "Kiwi Black Tea", "price": 25, "isVeg": true },
    { "name": "Kesari Ukala (Hot)", "price": 25, "isVeg": true },
    { "name": "Filter Coffee (Hot)", "price": 25, "isVeg": true },
    { "name": "Nescafe (Hot)", "price": 40, "isVeg": true },
    { "name": "Cold Coffee", "price": 60, "isVeg": true },
    { "name": "Hazelnut Coffee (Hot)", "price": 60, "isVeg": true },
    { "name": "Hazelnut Coffee (Cold)", "price": 100, "isVeg": true },
    { "name": "Irish Coffee (Hot)", "price": 60, "isVeg": true },
    { "name": "Irish Coffee (Cold)", "price": 100, "isVeg": true },
    { "name": "Chocolate Cookie Coffee (Hot)", "price": 60, "isVeg": true },
    { "name": "Chocolate Cookie Coffee (Cold)", "price": 100, "isVeg": true },
    { "name": "Espresso (Hot)", "price": 60, "isVeg": true },
    { "name": "Cappuccino (Hot)", "price": 70, "isVeg": true },
    { "name": "Caramel Coffee (Hot)", "price": 60, "isVeg": true },
    { "name": "Caramel Coffee (Cold)", "price": 100, "isVeg": true },
    { "name": "Vanilla Coffee (Cold)", "price": 100, "isVeg": true },
    { "name": "Tiramisu Coffee (Hot)", "price": 60, "isVeg": true },
    { "name": "Tiramisu Coffee (Cold)", "price": 100, "isVeg": true },
    { "name": "Cinnamon Coffee (Hot)", "price": 60, "isVeg": true },
    { "name": "Cinnamon Coffee (Cold)", "price": 100, "isVeg": true },
    { "name": "Thick Hot Chocolate", "price": 60, "isVeg": true },
    { "name": "Thick Hot Chocolate with Brownie", "price": 110, "isVeg": true },
    { "name": "Classic Chocolate (Hot)", "price": 50, "isVeg": true },
    { "name": "Classic Chocolate (Cold)", "price": 80, "isVeg": true },
    { "name": "Hazelnut Chocolate (Hot)", "price": 60, "isVeg": true },
    { "name": "Hazelnut Chocolate (Cold)", "price": 90, "isVeg": true },
    { "name": "Caramel Chocolate (Hot)", "price": 60, "isVeg": true },
    { "name": "Caramel Chocolate (Cold)", "price": 90, "isVeg": true },
    { "name": "Vanilla Chocolate (Hot)", "price": 60, "isVeg": true },
    { "name": "Vanilla Chocolate (Cold)", "price": 90, "isVeg": true },
    { "name": "Tiramisu Chocolate (Hot)", "price": 60, "isVeg": true },
    { "name": "Tiramisu Chocolate (Cold)", "price": 90, "isVeg": true },
    { "name": "Irish Chocolate (Hot)", "price": 60, "isVeg": true },
    { "name": "Irish Chocolate (Cold)", "price": 90, "isVeg": true },
    { "name": "Cinnamon Chocolate (Hot)", "price": 60, "isVeg": true },
    { "name": "Cinnamon Chocolate (Cold)", "price": 90, "isVeg": true },
    { "name": "Boost (Hot)", "price": 50, "isVeg": true },
    { "name": "Boost (Cold)", "price": 80, "isVeg": true },
    { "name": "Bournvita (Hot)", "price": 50, "isVeg": true },
    { "name": "Bournvita (Cold)", "price": 80, "isVeg": true },

    // Shakes & Mojitos
    { "name": "Strawberry Milk Shake", "price": 100, "isVeg": true },
    { "name": "Blueberry Milk Shake", "price": 100, "isVeg": true },
    { "name": "Mango Milk Shake", "price": 100, "isVeg": true },
    { "name": "Litchi Milk Shake", "price": 100, "isVeg": true },
    { "name": "Black Current Milk Shake", "price": 100, "isVeg": true },
    { "name": "Guava Milk Shake", "price": 100, "isVeg": true },
    { "name": "Orange Milk Shake", "price": 100, "isVeg": true },
    { "name": "Kiwi Milk Shake", "price": 100, "isVeg": true },
    { "name": "Oreo Shake", "price": 100, "isVeg": true },
    { "name": "Kitkat Shake", "price": 100, "isVeg": true },
    { "name": "Nutella Shake", "price": 130, "isVeg": true },
    { "name": "Oreo Nutella Shake", "price": 140, "isVeg": true },
    { "name": "Kitkat Nutella Shake", "price": 140, "isVeg": true },
    { "name": "Lemon Peach Ice Tea", "price": 65, "isVeg": true },
    { "name": "Mint Ice Tea", "price": 65, "isVeg": true },
    { "name": "Passion Fruit Ice Tea", "price": 65, "isVeg": true },
    { "name": "Raspberry Ice Tea", "price": 65, "isVeg": true },
    { "name": "Green Apple Ice Tea", "price": 65, "isVeg": true },
    { "name": "Strawberry Ice Tea", "price": 65, "isVeg": true },
    { "name": "Kala Khatta Ice Tea", "price": 65, "isVeg": true },
    { "name": "Kachhi Keri Ice Tea", "price": 65, "isVeg": true },
    { "name": "Mango Ice Tea", "price": 65, "isVeg": true },
    { "name": "Guava Ice Tea", "price": 65, "isVeg": true },
    { "name": "Lichi Ice Tea", "price": 65, "isVeg": true },
    { "name": "Black Current Ice Tea", "price": 65, "isVeg": true },
    { "name": "Kiwi Ice Tea", "price": 65, "isVeg": true },
    { "name": "Jeera Ice Tea", "price": 65, "isVeg": true },
    { "name": "Classic Mojito", "price": 70, "isVeg": true },
    { "name": "Passion Fruit Mojito", "price": 80, "isVeg": true },
    { "name": "Green Apple Mojito", "price": 70, "isVeg": true },
    { "name": "Blue Lagoon Mojito", "price": 70, "isVeg": true },
    { "name": "Strawberry Mojito", "price": 70, "isVeg": true },
    { "name": "Kala Khatta Mojito", "price": 60, "isVeg": true },
    { "name": "Kachhi Keri Mojito", "price": 70, "isVeg": true },
    { "name": "Mango Mojito", "price": 70, "isVeg": true },
    { "name": "Guava Mojito", "price": 70, "isVeg": true },
    { "name": "Litchi Mojito", "price": 70, "isVeg": true },
    { "name": "Black Current Mojito", "price": 70, "isVeg": true },
    { "name": "Kiwi Mojito", "price": 70, "isVeg": true },
    { "name": "Jeera Mojito", "price": 70, "isVeg": true },
    { "name": "Fresh Lemon Soda", "price": 60, "isVeg": true },
    { "name": "Fresh Lemon Water", "price": 40, "isVeg": true },

    // Boba Tea
    { "name": "Chocolate Hazelnut Boba Shake", "price": 150, "isVeg": true },
    { "name": "Chocolate Oreo Boba", "price": 150, "isVeg": true },
    { "name": "Chocolate Kitkat Boba", "price": 150, "isVeg": true },
    { "name": "Chocolate Nutella Boba", "price": 170, "isVeg": true },
    { "name": "Blueberry Boba Shake", "price": 150, "isVeg": true },
    { "name": "Blackcurrent Boba Shake", "price": 150, "isVeg": true },
    { "name": "Green Apple Boba", "price": 130, "isVeg": true },
    { "name": "Lemon Boba", "price": 120, "isVeg": true },
    { "name": "Passion Fruit Boba", "price": 160, "isVeg": true },
    { "name": "Mango Boba Shake", "price": 150, "isVeg": true }
],

//--House of Delicious--//
"House of Delicious": [
    { "name": "Classic Fries", "price": 130, "isVeg": true },
    { "name": "Cheese Fries", "price": 150, "isVeg": true },
    { "name": "Peri Peri Fries", "price": 140, "isVeg": true },
    { "name": "Peri Peri Cheese Fries", "price": 160, "isVeg": true },
    { "name": "Tandoori Fries", "price": 150, "isVeg": true },
    { "name": "Tandoori Cheese Fries", "price": 170, "isVeg": true },
    { "name": "Mexican Cheese Fries", "price": 180, "isVeg": true },
    { "name": "Veg. Sandwich (J)", "price": 90, "isVeg": true },
    { "name": "Veg. Toast Sandwich", "price": 120, "isVeg": true },
    { "name": "Veg. Cheese Sandwich", "price": 140, "isVeg": true },
    { "name": "Veg Mayo Toast Sandwich", "price": 140, "isVeg": true },
    { "name": "Cheese Chilly Toast Sandwich", "price": 150, "isVeg": true },
    { "name": "Veg. Cheese Toast Sandwich", "price": 150, "isVeg": true },
    { "name": "Veg. Paneer Toast Sandwich", "price": 170, "isVeg": true },
    { "name": "Veg. Paneer Cheese Toast Sandwich", "price": 190, "isVeg": true },
    { "name": "Veg. Corn & Cheese Toast Sandwich", "price": 170, "isVeg": true },
    { "name": "Masala Maggie", "price": 90, "isVeg": true },
    { "name": "Cheese masala Maggie", "price": 120, "isVeg": true },
    { "name": "Vegetable Masala Maggie", "price": 130, "isVeg": true },
    { "name": "Vegetable cheese masala Maggie", "price": 150, "isVeg": true },
    { "name": "Schezwan Maggie", "price": 120, "isVeg": true },
    { "name": "Schezwan Cheese Maggie", "price": 150, "isVeg": true },
    { "name": "Peri Peri Maggie", "price": 130, "isVeg": true },
    { "name": "Peri Peri Cheese Maggie", "price": 150, "isVeg": true },
    { "name": "Tandoori Maggie", "price": 130, "isVeg": true },
    { "name": "Tandoori Cheese Maggie", "price": 150, "isVeg": true },
    { "name": "Veg. Grill Sandwich", "price": 180, "isVeg": true },
    { "name": "Veg. Grill Cheese Sandwich", "price": 230, "isVeg": true },
    { "name": "Veg. Cheese Chilly Grill Sandwich", "price": 260, "isVeg": true },
    { "name": "Veg. Paneer Grill Sandwich", "price": 280, "isVeg": true },
    { "name": "Veg. Paneer Cheese Grill Sandwich", "price": 300, "isVeg": true },
    { "name": "Veg. Corn & Cheese Grill Sandwich", "price": 280, "isVeg": true },
    { "name": "Chocolate Sandwich", "price": 150, "isVeg": true },
    { "name": "Chocolate Cheese Sandwich", "price": 170, "isVeg": true },
    { "name": "Nutella Chocolate Sandwich", "price": 180, "isVeg": true },
    { "name": "Nutella Cheese Chocolate Sandwich", "price": 200, "isVeg": true },
    { "name": "Coleslaw Panini (J)", "price": 200, "isVeg": true },
    { "name": "Gughra Panini (J)", "price": 200, "isVeg": true },
    { "name": "Mexican Panini (J)", "price": 200, "isVeg": true },
    { "name": "Tandoori Panini", "price": 200, "isVeg": true },
    { "name": "Peri Peri Panini (J)", "price": 200, "isVeg": true },
    { "name": "Veg. Regular Burger", "price": 85, "isVeg": true },
    { "name": "Veg. Schezwan Burger", "price": 95, "isVeg": true },
    { "name": "Veg. Mayo Burger", "price": 95, "isVeg": true },
    { "name": "Veg. Tandoori Burger", "price": 100, "isVeg": true },
    { "name": "Veg. Cheese Burger", "price": 95, "isVeg": true },
    { "name": "Veg. Schezwan Cheese Burger", "price": 105, "isVeg": true },
    { "name": "Veg. Mayo Cheese Burger", "price": 105, "isVeg": true },
    { "name": "Veg. Tandoori Cheese Burger", "price": 105, "isVeg": true },
    { "name": "Veg. Paneer Burger", "price": 110, "isVeg": true },
    { "name": "Veg. Paneer Cheese Burger", "price": 120, "isVeg": true },
    { "name": "Veg. Paneer Schezwan Burger", "price": 120, "isVeg": true },
    { "name": "Veg. Paneer Mayo Burger", "price": 120, "isVeg": true },
    { "name": "Veg. Paneer Mayo Cheese Burger", "price": 130, "isVeg": true },
    { "name": "Veg. Paneer Schezwan Cheese Burger", "price": 130, "isVeg": true },
    { "name": "Veg. Paneer Tandoori Cheese Burger", "price": 130, "isVeg": true },
    { "name": "Classic Cheese Garlic Bread (6 Pcs)", "price": 180, "isVeg": true },
    { "name": "Cheese Burst Garlic Bread", "price": 230, "isVeg": true },
    { "name": "Cheese Chilly Garlic Bread", "price": 250, "isVeg": true },
    { "name": "Tandoori Panner Garlic Bread", "price": 250, "isVeg": true },
    { "name": "Peri Peri Panner Garlic Bread", "price": 250, "isVeg": true },
    { "name": "HOD Special Garlic bread", "price": 300, "isVeg": true },
    { "name": "Veg Burger Combo", "price": 225, "isVeg": true, "description": "Veg/Mayo/Tandoori Burger + Classic Fries + Cold Drink" },
    { "name": "Cheese Burger Combo", "price": 245, "isVeg": true, "description": "Cheese/Mayo Cheese/Tandoori Cheese Burger + Cheese Fries + Cold Drink" },
    { "name": "Paneer Burger Combo", "price": 260, "isVeg": true, "description": "Paneer/Paneer Cheese/Paneer Tandoori Cheese Burger + Cheese Fries + Cold Drink" },
    { "name": "Margherita Pizza (J) (6 In)", "price": 200, "isVeg": true },
    { "name": "Margherita Pizza (J) (8 In)", "price": 220, "isVeg": true },
    { "name": "Onion & Capsicum Pizza (6 In)", "price": 220, "isVeg": true },
    { "name": "Onion & Capsicum Pizza (8 In)", "price": 240, "isVeg": true },
    { "name": "Veg. Supreme Pizza (J) (6 In)", "price": 230, "isVeg": true },
    { "name": "Veg. Supreme Pizza (J) (8 In)", "price": 250, "isVeg": true },
    { "name": "Peri Peri Paneer Pizza (J) (6 In)", "price": 270, "isVeg": true },
    { "name": "Peri Peri Paneer Pizza (J) (8 In)", "price": 290, "isVeg": true },
    { "name": "Tandoori Paneer Pizza (6 In)", "price": 270, "isVeg": true },
    { "name": "Tandoori Paneer Pizza (8 In)", "price": 290, "isVeg": true },
    { "name": "Red Hot Paneer Pizza (6 In)", "price": 270, "isVeg": true },
    { "name": "Red Hot Paneer Pizza (8 In)", "price": 290, "isVeg": true },
    { "name": "Mexican Delight Pizza (J) (6 In)", "price": 280, "isVeg": true },
    { "name": "Mexican Delight Pizza (J) (8 In)", "price": 300, "isVeg": true },
    { "name": "Paneer Makhni Pizza (6 In)", "price": 290, "isVeg": true },
    { "name": "Paneer Makhni Pizza (8 In)", "price": 310, "isVeg": true },
    { "name": "Exotic Farmhouse Pizza (J) (6 In)", "price": 330, "isVeg": true },
    { "name": "Exotic Farmhouse Pizza (J) (8 In)", "price": 350, "isVeg": true },
    { "name": "Coleslaw Slider (J)", "price": 100, "isVeg": true },
    { "name": "Tandoori Slider", "price": 120, "isVeg": true },
    { "name": "Peri Peri Slider (J)", "price": 130, "isVeg": true },
    { "name": "Schezwan Slider", "price": 140, "isVeg": true },
    { "name": "Mexican Slider (J)", "price": 150, "isVeg": true },
    { "name": "White Sauce Pasta (J)", "price": 250, "isVeg": true },
    { "name": "Pink Sauce Pasta (J)", "price": 250, "isVeg": true },
    { "name": "Red Sauce Pasta (J)", "price": 250, "isVeg": true },
    { "name": "Cold Coffee Shake", "price": 150, "isVeg": true },
    { "name": "Hazelnut Coffee Shake", "price": 170, "isVeg": true },
    { "name": "Cold Coco Shake", "price": 170, "isVeg": true },
    { "name": "Coco Moco Shake", "price": 180, "isVeg": true },
    { "name": "Cookie & Crem (Oreo) Shake", "price": 190, "isVeg": true },
    { "name": "Kit Kat Kick Shake", "price": 200, "isVeg": true },
    { "name": "Naughty Nutella Shake", "price": 220, "isVeg": true },
    { "name": "Simply Momos (Steam)", "price": 130, "isVeg": true },
    { "name": "Simply Momos (Fried)", "price": 150, "isVeg": true },
    { "name": "Chilly Momos (Steam)", "price": 140, "isVeg": true },
    { "name": "Chilly Momos (Fried)", "price": 160, "isVeg": true },
    { "name": "Peri Peri Paneer Momos (Steam)", "price": 150, "isVeg": true },
    { "name": "Peri Peri Paneer Momos (Fried)", "price": 170, "isVeg": true },
    { "name": "Tandoori Momos (Steam)", "price": 150, "isVeg": true },
    { "name": "Tandoori Momos (Fried)", "price": 170, "isVeg": true },
    { "name": "Cheese Momos (Steam)", "price": 150, "isVeg": true },
    { "name": "Cheese Momos (Fried)", "price": 170, "isVeg": true },
    { "name": "Cheese Corn Momos (Steam)", "price": 160, "isVeg": true },
    { "name": "Cheese Corn Momos (Fried)", "price": 180, "isVeg": true },
    { "name": "Paneer Tikka Momos (Steam)", "price": 160, "isVeg": true },
    { "name": "Paneer Tikka Momos (Fried)", "price": 180, "isVeg": true },
    { "name": "Jain Veg Momos (Steam)", "price": 140, "isVeg": true },
    { "name": "Jain Veg Momos (Fried)", "price": 150, "isVeg": true },
    { "name": "Jain Paneer Momos (Steam)", "price": 150, "isVeg": true },
    { "name": "Jain Paneer Momos (Fried)", "price": 170, "isVeg": true },
    { "name": "Kurkure Momos", "price": 180, "isVeg": true },
    { "name": "Creamy Veg. Nachos", "price": 220, "isVeg": true },
    { "name": "Creamy Veg. Cheese Nachos", "price": 250, "isVeg": true },
    { "name": "Creamy Veg. Peri Peri Cheese Nachos", "price": 280, "isVeg": true },
    { "name": "Creamy Veg. Tandoori Cheese Nachos", "price": 300, "isVeg": true },
    { "name": "Green Mint Mojito", "price": 200, "isVeg": true },
    { "name": "Blue Lemon Mojito", "price": 200, "isVeg": true },
    { "name": "Green Apple Mojito", "price": 200, "isVeg": true },
    { "name": "Kiwi Bubble Mojito", "price": 240, "isVeg": true },
    { "name": "Green Apple Bubble Mojito", "price": 240, "isVeg": true },
    { "name": "Litchi Bubble Mojito", "price": 240, "isVeg": true },
    { "name": "Peach Bubble Mojito", "price": 240, "isVeg": true },
    { "name": "Strawberry Bubble Mojito", "price": 240, "isVeg": true },
    { "name": "Pine Apple Bubble Mojito", "price": 240, "isVeg": true },
    { "name": "Strawberry Cheese Cake", "price": 160, "isVeg": true },
    { "name": "Blueberry Cheese Cake", "price": 170, "isVeg": true },
    { "name": "Oreo Cheese Cake", "price": 180, "isVeg": true },
    { "name": "Nutella Cheese Cake", "price": 200, "isVeg": true },
    { "name": "COFFEE CHOCOLATE BOWL", "price": 250, "isVeg": true },
    { "name": "TRIPLE CHOCOLATE BOWL", "price": 270, "isVeg": true },
    { "name": "OREO CHOCOLATE BOWL", "price": 280, "isVeg": true },
    { "name": "KITKAT CHOCOLATE BOWL", "price": 300, "isVeg": true },
    { "name": "NUTELLA CHOCOLATE BOWL", "price": 320, "isVeg": true },
    { "name": "Pull Up Cake", "price": 250, "isVeg": true }
],

//--Radhe Dhokla--//

    "Radhe Dhokla": [
  { name: "Pure Jain Pavbhaji (Oil)", price: 135, isVeg: true },
  { name: "Punjabi Thali", price: 159, isVeg: true },
  { name: "Radhe Special Thali", price: 179, isVeg: true },

  { name: "Jain Dhokla (Plate)", price: 40, isVeg: true },
  { name: "Jain Dhokla (1 kg)", price: 260, isVeg: true },
  { name: "Garlic Dhokla", price: 260, isVeg: true },
  { name: "Khatta Mitha Dhokla", price: 260, isVeg: true },
  { name: "Jeera Dhokla", price: 280, isVeg: true },
  { name: "Butter Dhokla", price: 300, isVeg: true },
  { name: "Cheese Butter Dhokla", price: 320, isVeg: true },
  { name: "Vegetable Dhokla", price: 400, isVeg: true },
  { name: "Schezwan Tawa Dhokla", price: 300, isVeg: true },
  { name: "Italian Dhokla", price: 360, isVeg: true },
  { name: "Green Garlic Dhokla", price: 360, isVeg: true },

  { name: "Oil Locho (Plate)", price: 50, isVeg: true },
  { name: "Oil Locho (1 kg)", price: 300, isVeg: true },
  { name: "Butter Locho (Plate)", price: 60, isVeg: true },
  { name: "Butter Locho (1 kg)", price: 340, isVeg: true },
  { name: "Cheese Butter Locho (Plate)", price: 80, isVeg: true },
  { name: "Cheese Butter Locho (1 kg)", price: 400, isVeg: true },

  { name: "Nylon Idada (Plate)", price: 40, isVeg: true },
  { name: "Nylon Idada (1 kg)", price: 200, isVeg: true },
  { name: "Oil Masala Idada (Plate)", price: 40, isVeg: true },
  { name: "Oil Masala Idada (1 kg)", price: 260, isVeg: true },
  { name: "Vagharela Idada (Plate)", price: 50, isVeg: true },
  { name: "Vagharela Idada (1 kg)", price: 260, isVeg: true },
  { name: "Butter Masala Idada (Plate)", price: 60, isVeg: true },
  { name: "Butter Masala Idada (1 kg)", price: 320, isVeg: true },
  { name: "Cheese Masala Idada (Plate)", price: 70, isVeg: true },
  { name: "Cheese Masala Idada (1 kg)", price: 380, isVeg: true },

  { name: "Kacha Patra (Plate)", price: 50, isVeg: true },
  { name: "Kacha Patra (1 kg)", price: 280, isVeg: true },
  { name: "Vagharela Patra", price: 340, isVeg: true },
  { name: "Green Garlic Patra", price: 380, isVeg: true },

  { name: "Sev Khamani (Plate)", price: 50, isVeg: true },
  { name: "Sev Khamani (1 kg)", price: 340, isVeg: true },
  { name: "Patudi (Khandvi) (Plate)", price: 40, isVeg: true },
  { name: "Patudi (Khandvi) (1 kg)", price: 260, isVeg: true },

  { name: "Dal Samosa (Fry)", price: 80, isVeg: true },
  { name: "Cheese Paneer Samosa (Plate)", price: 50, isVeg: true },
  { name: "Cheese Paneer Samosa (1 kg)", price: 580, isVeg: true },
  { name: "Pattice", price: 50, isVeg: true },
  { name: "Jalebi (Kesar Ghee) (Plate)", price: 70, isVeg: true },
  { name: "Jalebi (Kesar Ghee) (1 kg)", price: 480, isVeg: true },
  { name: "Fafda", price: 50, isVeg: true },

  { name: "Chinese & Punjabi Sabji (All Sabjis)", price: null, isVeg: true },
  { name: "Pulao & Biryani (All Types)", price: null, isVeg: true }
],
    //--House of Sushi--//

   "House of Sushi": [
  { name: "Exotic Sushi (4 pcs)", price: 180, isVeg: true },
  { name: "Exotic Sushi (8 pcs)", price: 300, isVeg: true },

  { name: "Paneer Sushi (Small)", price: 180, isVeg: true },
  { name: "Paneer Sushi (Large)", price: 280, isVeg: true },

  { name: "Asparagus Sushi (Small)", price: 210, isVeg: true },
  { name: "Asparagus Sushi (Large)", price: 330, isVeg: true },

  { name: "Edamame Sushi (Small)", price: 200, isVeg: true },
  { name: "Edamame Sushi (Large)", price: 330, isVeg: true },

  { name: "Avocado Sushi (Small)", price: 210, isVeg: true },
  { name: "Avocado Sushi (Large)", price: 330, isVeg: true },

  { name: "Dragon Sushi (Small)", price: 280, isVeg: true },
  { name: "Dragon Sushi (Large)", price: 380, isVeg: true },

  { name: "Crispy Tempura Sushi (Small)", price: 210, isVeg: true },
  { name: "Crispy Tempura Sushi (Large)", price: 330, isVeg: true },

  { name: "Avocado Jalapeño Sushi (Small) 🌶", price: 220, isVeg: true },
  { name: "Avocado Jalapeño Sushi (Large) 🌶", price: 340, isVeg: true },

  { name: "Paneer Vietnamese Roll", price: 210, isVeg: true },
  { name: "Exotic Vietnamese Roll", price: 200, isVeg: true },
  { name: "Avocado Vietnamese Roll", price: 220, isVeg: true },
  { name: "Avo-Asparagus Vietnamese Roll", price: 250, isVeg: true },
  { name: "Avo-Jalapeño Vietnamese Roll 🌶", price: 230, isVeg: true },

  { name: "HOS Special Platter (4 varieties, 16 pcs)", price: 750, isVeg: true }
],
//--Panishkar Tastearaunt--//
    "Panishkar Tastearaunt": [
  { name: "Jain Frankie", price: 80, isVeg: true },
  { name: "Jain Cheese Frankie", price: 100, isVeg: true },
  { name: "Jain Paneer Frankie", price: 120, isVeg: true },

  { name: "Aloo Frankie", price: 70, isVeg: true },
  { name: "Cheese Frankie", price: 90, isVeg: true },
  { name: "Schezwan Frankie", price: 90, isVeg: true },
  { name: "Aloo Cheese Frankie", price: 100, isVeg: true },
  { name: "Cheese Burst Frankie", price: 120, isVeg: true },

  { name: "Paneer Frankie", price: 100, isVeg: true },
  { name: "Paneer Chilli Frankie", price: 100, isVeg: true },
  { name: "Paneer Cheese Frankie", price: 120, isVeg: true },
  { name: "Paneer Schezwan Frankie", price: 120, isVeg: true },
  { name: "Paneer Cheese Burst", price: 140, isVeg: true },

  { name: "Veg Frankie", price: 90, isVeg: true },
  { name: "Manchurian Frankie", price: 100, isVeg: true },
  { name: "Veg Cheese Frankie", price: 110, isVeg: true },
  { name: "Veg Schezwan Frankie", price: 110, isVeg: true },
  { name: "Veg Cheese Burst", price: 130, isVeg: true }
],

//--Tasty Table Corner--//

"Tasty Table Fast Food": [
  { "name": "Bread Butter", "price": 40, "isVeg": true },
  { "name": "Bread Butter Jam", "price": 50, "isVeg": true },
  { "name": "Veg Sandwich", "price": 60, "isVeg": true },
  { "name": "Puna Sandwich", "price": 70, "isVeg": true },
  { "name": "Samosa Sandwich", "price": 80, "isVeg": true },
  { "name": "Onion Cheese Sandwich", "price": 90, "isVeg": true },
  { "name": "Veg-Cheese Sandwich", "price": 100, "isVeg": true },
  { "name": "Toast Sandwich", "price": 110, "isVeg": true },
  { "name": "Samosa Toast Sandwich", "price": 110, "isVeg": true },
  { "name": "Chocolate Toast Sandwich", "price": 110, "isVeg": true },
  { "name": "American Corn Grill Sandwich", "price": 120, "isVeg": true },
  { "name": "Veg Corn Cheese Grill Sandwich", "price": 120, "isVeg": true },
  { "name": "Paneer Cheese Grill Sandwich", "price": 130, "isVeg": true },
  { "name": "Cheese Chilli Grill Sandwich", "price": 130, "isVeg": true },
  { "name": "Veg Grill Sandwich", "price": 130, "isVeg": true },
  { "name": "Pahadi Grill Sandwich", "price": 130, "isVeg": true },
  { "name": "Bombay Cheese Grill Sandwich", "price": 140, "isVeg": true },
  { "name": "Veg Chilli Grill Sandwich", "price": 140, "isVeg": true },
  { "name": "Melted Cheese Sandwich", "price": 150, "isVeg": true },
  { "name": "Melted Chilli Schezwan Sandwich", "price": 160, "isVeg": true },
  { "name": "Club Sandwich", "price": 170, "isVeg": true },
  { "name": "Australian Sandwich", "price": 170, "isVeg": true },
  { "name": "Cheese Chilli Toast", "price": 170, "isVeg": true },
  { "name": "Veg Cheese Toast", "price": 200, "isVeg": true },
  { "name": "Samosa Cheese Toast", "price": 200, "isVeg": true },

  { "name": "White Sauce Pasta", "price": 230, "isVeg": true },
  { "name": "Arabiata Pasta", "price": 230, "isVeg": true },
  { "name": "Pinks Sauce Pasta", "price": 250, "isVeg": true },

  { "name": "Cheese Pizza", "price": 150, "isVeg": true },
  { "name": "Paneer Pasta Pizza", "price": 200, "isVeg": true },
  { "name": "Veg Cheese Pizza", "price": 200, "isVeg": true },
  { "name": "Pahadi Pizza", "price": 200, "isVeg": true },
  { "name": "Mexican Pizza", "price": 200, "isVeg": true },
  { "name": "Paneer Tandoori Pizza", "price": 230, "isVeg": true },
  { "name": "Farmer Pizza", "price": 230, "isVeg": true },
  { "name": "Melted Pizza", "price": 250, "isVeg": true },

  { "name": "Melting Cheese Garlic Bread", "price": 180, "isVeg": true },
  { "name": "Cheese Garlic Bread", "price": 160, "isVeg": true },
  { "name": "Paneer Tikka Garlic Bread", "price": 180, "isVeg": true },
  { "name": "Paneer Chilli Garlic Bread", "price": 180, "isVeg": true },
  { "name": "Chilli Cheese Garlic Bread", "price": 180, "isVeg": true },
  { "name": "Masala Garlic Bread", "price": 180, "isVeg": true },
  { "name": "Corn Garlic Bread", "price": 180, "isVeg": true },
  { "name": "Olive Jalapeno Garlic Bread", "price": 180, "isVeg": true },

  { "name": "A1 Samosa", "price": 30, "isVeg": true },
  { "name": "A1 Samosa Pav", "price": 40, "isVeg": true },
  { "name": "A1 Cheese Samosa Pav", "price": 70, "isVeg": true },

  { "name": "Veg Cheese Blast", "price": 250, "isVeg": true },
  { "name": "Paneer Cheese Blast", "price": 250, "isVeg": true },
  { "name": "Special Mojito", "price": 180, "isVeg": true },
  { "name": "Special Mango Desert", "price": 240, "isVeg": true },

  { "name": "Paneer Tikka Open Toast", "price": 180, "isVeg": true },
  { "name": "Paneer Chilli Cheese Open", "price": 180, "isVeg": true },
  { "name": "Corn Mexican Open Toast", "price": 180, "isVeg": true },
  { "name": "Chilli Cheese Open Toast", "price": 180, "isVeg": true },
  { "name": "Pahadi Open Toast", "price": 180, "isVeg": true },

  { "name": "Chikoo Milkshake", "price": 100, "isVeg": true },
  { "name": "Choco Chocolate Milkshake", "price": 120, "isVeg": true },
  { "name": "Vanilla Milkshake", "price": 100, "isVeg": true },
  { "name": "Oreo Milkshake", "price": 120, "isVeg": true },
  { "name": "Chocolate Crunch Milkshake", "price": 120, "isVeg": true },
  { "name": "Milo Milkshake", "price": 120, "isVeg": true },
  { "name": "Strawberry Milkshake", "price": 100, "isVeg": true },
  { "name": "Choco Chips Milkshake", "price": 120, "isVeg": true },
  { "name": "Kesar Pista Milkshake", "price": 120, "isVeg": true },
  { "name": "Kaju Milkshake", "price": 150, "isVeg": true },
  { "name": "Strawberry White Milkshake", "price": 150, "isVeg": true },
  { "name": "Mango Milkshake", "price": 120, "isVeg": true },
  { "name": "Sitafal Milkshake", "price": 150, "isVeg": true },
  { "name": "Kitkat Milkshake", "price": 120, "isVeg": true },
  { "name": "Chocolate Milkshake (Brownie)", "price": 150, "isVeg": true },
  { "name": "Choco Almond Milkshake", "price": 150, "isVeg": true },
  { "name": "Kaju Anjeer Milkshake", "price": 160, "isVeg": true },
  { "name": "Kaju GulKand Milkshake", "price": 160, "isVeg": true },
  { "name": "Cold Coffee", "price": 100, "isVeg": true },

  { "name": "Pink Flamingo", "price": 180, "isVeg": true },
  { "name": "Litchi Blossom", "price": 180, "isVeg": true },
  { "name": "Pineapple Blossom", "price": 180, "isVeg": true },
  { "name": "Mosambi Blossom", "price": 180, "isVeg": true },
  { "name": "Hungama", "price": 180, "isVeg": true },
  { "name": "Monalisa", "price": 180, "isVeg": true },
  { "name": "Pinacolada", "price": 180, "isVeg": true },
  { "name": "Strawberry Blossom", "price": 180, "isVeg": true },
  { "name": "Kiwi Blossom", "price": 180, "isVeg": true },
  { "name": "Mango Blossom", "price": 180, "isVeg": true },
  { "name": "King Blossom", "price": 180, "isVeg": true },
  { "name": "Chashme Baddur", "price": 180, "isVeg": true },
  { "name": "Dolly Bubby", "price": 180, "isVeg": true },
  { "name": "Mogambo", "price": 180, "isVeg": true },
  { "name": "Black Devil", "price": 180, "isVeg": true },
  { "name": "Aladdin", "price": 180, "isVeg": true },
  { "name": "Nathkhat Juice", "price": 180, "isVeg": true },
  { "name": "Litchi Coconut Juice", "price": 180, "isVeg": true },
  { "name": "Black Jamun Juice", "price": 180, "isVeg": true },
  { "name": "PF", "price": 180, "isVeg": true },
  { "name": "Gangajal", "price": 180, "isVeg": true },
  { "name": "KLM Juice", "price": 180, "isVeg": true },
  { "name": "Masti Juice", "price": 180, "isVeg": true },
  { "name": "Dil Humsafar Juice", "price": 180, "isVeg": true },
  { "name": "Humsafar Juice", "price": 180, "isVeg": true },
  { "name": "All Rounder Juice", "price": 180, "isVeg": true },
  { "name": "Champion Juice", "price": 180, "isVeg": true },

  { "name": "Mosambi Juice", "price": 80, "isVeg": true },
  { "name": "Orange Juice", "price": 80, "isVeg": true },
  { "name": "Pineapple Juice", "price": 80, "isVeg": true },
  { "name": "Orange Juice (Seasonal)", "price": 130, "isVeg": true },
  { "name": "Ganga Jamna Juice", "price": 130, "isVeg": true },
  { "name": "Mara Mari Juice", "price": 130, "isVeg": true },
  { "name": "Mosambi Juice", "price": 130, "isVeg": true },
  { "name": "Cocktail Juice", "price": 130, "isVeg": true },
  { "name": "Anar Juice (Seasonal)", "price": 140, "isVeg": true },
  { "name": "Anar Apple Juice", "price": 140, "isVeg": true },
  { "name": "Kiwi Juice", "price": 140, "isVeg": true },
  { "name": "Strawberry Juice", "price": 140, "isVeg": true },

  { "name": "Sitafal Falooda", "price": 200, "isVeg": true },
  { "name": "Rose Falooda", "price": 190, "isVeg": true },
  { "name": "Butterscotch Falooda", "price": 190, "isVeg": true },
  { "name": "Mango Falooda", "price": 190, "isVeg": true },
  { "name": "Thandai Falooda", "price": 200, "isVeg": true },
  { "name": "Chocolate Falooda", "price": 200, "isVeg": true },
  { "name": "Kesar Falooda", "price": 200, "isVeg": true },
  { "name": "Kulfi Falooda", "price": 200, "isVeg": true },

  { "name": "Veg Cheese Panini", "price": 180, "isVeg": true },
  { "name": "Paneer Panini", "price": 180, "isVeg": true },
  { "name": "Italian Panini", "price": 180, "isVeg": true },
  { "name": "Mexican Panini", "price": 180, "isVeg": true },
  { "name": "Caribbean Panini", "price": 180, "isVeg": true },
  { "name": "Fusion Panini", "price": 180, "isVeg": true },
  { "name": "Firangi Panini", "price": 200, "isVeg": true }
],
//--Cheese on Fire--//
"Cheese on Fire": [
  { "name": "Pizza Shots", "price": 150, "isVeg": true },
  { "name": "Fearless", "price": 180, "isVeg": true },
  { "name": "T. I. C", "price": 160, "isVeg": true },
  { "name": "The Warning Punch", "price": 180, "isVeg": true },
  { "name": "Monacan", "price": 140, "isVeg": true },
  { "name": "Tongue Tickler", "price": 190, "isVeg": true },
  { "name": "P3 – Theory", "price": 200, "isVeg": true },

  { "name": "Farmer Pizza Small", "price": 130, "isVeg": true },
  { "name": "Farmer Pizza Medium", "price": 170, "isVeg": true },
  { "name": "Farmer Pizza Large", "price": 220, "isVeg": true },
  { "name": "Bunk Bed Pizza Small", "price": 170, "isVeg": true },
  { "name": "Bunk Bed Pizza Medium", "price": 200, "isVeg": true },
  { "name": "Bunk Bed Pizza Large", "price": 250, "isVeg": true },
  { "name": "PP Pizza Small", "price": 200, "isVeg": true },
  { "name": "PP Pizza Medium", "price": 250, "isVeg": true },
  { "name": "PP Pizza Large", "price": 300, "isVeg": true },
  { "name": "Cheese Burst Pizza Small", "price": 200, "isVeg": true },
  { "name": "Cheese Burst Pizza Medium", "price": 250, "isVeg": true },
  { "name": "Cheese Burst Pizza Large", "price": 300, "isVeg": true },
  { "name": "Cheese Paneer Pizza Small", "price": 250, "isVeg": true },
  { "name": "Cheese Paneer Pizza Medium", "price": 300, "isVeg": true },
  { "name": "Cheese Paneer Pizza Large", "price": 350, "isVeg": true },
  { "name": "Chinese Pizza Small", "price": 300, "isVeg": true },
  { "name": "Chinese Pizza Medium", "price": 350, "isVeg": true },
  { "name": "Pasta Pizza Small", "price": 300, "isVeg": true },
  { "name": "Pasta Pizza Medium", "price": 350, "isVeg": true },
  { "name": "Nacho Pizza Small", "price": 330, "isVeg": true },
  { "name": "Nacho Pizza Medium", "price": 380, "isVeg": true },
  { "name": "Maggie Pizza Small", "price": 280, "isVeg": true },
  { "name": "Maggie Pizza Medium", "price": 330, "isVeg": true },
  { "name": "Margherita Pizza Small", "price": 300, "isVeg": true },
  { "name": "Margherita Pizza Medium", "price": 350, "isVeg": true },
  { "name": "Tandoori Paneer Pizza Small", "price": 330, "isVeg": true },
  { "name": "Tandoori Paneer Pizza Medium", "price": 380, "isVeg": true },
  { "name": "Exotic Italian Pizza Small", "price": 330, "isVeg": true },
  { "name": "Exotic Italian Pizza Medium", "price": 380, "isVeg": true },

  { "name": "French Fries", "price": 100, "isVeg": true },
  { "name": "Cheese Fries", "price": 150, "isVeg": true },
  { "name": "Peri Peri Fries", "price": 140, "isVeg": true },
  { "name": "Special Fries", "price": 180, "isVeg": true },

  { "name": "Cheese Chilli Corn Toast 4 pcs", "price": 80, "isVeg": true },
  { "name": "Cheese Chilli Corn Toast 8 pcs", "price": 150, "isVeg": true },
  { "name": "Cheese Chilli Garlic Toast 4 pcs", "price": 80, "isVeg": true },
  { "name": "Cheese Chilli Garlic Toast 8 pcs", "price": 150, "isVeg": true },
  { "name": "Mayo Toast 4 pcs", "price": 80, "isVeg": true },
  { "name": "Mayo Toast 5 pcs", "price": 150, "isVeg": true },
  { "name": "Chilli Milli Toast 4 pcs", "price": 80, "isVeg": true },
  { "name": "Chilli Milli Toast 8 pcs", "price": 150, "isVeg": true },

  { "name": "Veg Maggi", "price": 50, "isVeg": true },
  { "name": "Veg Jain Maggi", "price": 50, "isVeg": true },
  { "name": "Veg Extra Masala Maggi", "price": 50, "isVeg": true },
  { "name": "Veg Peri Peri Masala Maggi", "price": 70, "isVeg": true },
  { "name": "Veg Mayo Maggi", "price": 70, "isVeg": true },
  { "name": "Veg Tandoori Mayo Maggi", "price": 90, "isVeg": true },

  { "name": "White Sauce Pasta", "price": 200, "isVeg": true },
  { "name": "Red Sauce Pasta", "price": 200, "isVeg": true },
  { "name": "Pink Sauce Pasta", "price": 200, "isVeg": true },

  { "name": "Paneer Tikka", "price": 150, "isVeg": true },

  { "name": "Veg Momos (Steam, 6 pcs)", "price": 80, "isVeg": true },
  { "name": "Achari Momos (Steam, 6 pcs)", "price": 100, "isVeg": true },
  { "name": "Schezwan Momos (Steam, 6 pcs)", "price": 100, "isVeg": true },
  { "name": "Paneer Momos (Steam, 6 pcs)", "price": 100, "isVeg": true },
  { "name": "Maggi Momos (Steam, 6 pcs)", "price": 100, "isVeg": true },
  { "name": "Cheese Corn Momos (Steam, 6 pcs)", "price": 110, "isVeg": true },

  { "name": "Veg Fried Momos", "price": 100, "isVeg": true },
  { "name": "Achari Fried Momos", "price": 110, "isVeg": true },
  { "name": "Schezwan Fried Momos", "price": 110, "isVeg": true },
  { "name": "Paneer Fried Momos", "price": 120, "isVeg": true },
  { "name": "Maggi Fried Momos", "price": 120, "isVeg": true },
  { "name": "Cheese Corn Fried Momos", "price": 130, "isVeg": true },

  { "name": "Veg Gravy Momos", "price": 120, "isVeg": true },
  { "name": "Achari Gravy Momos", "price": 130, "isVeg": true },
  { "name": "Schezwan Gravy Momos", "price": 130, "isVeg": true },
  { "name": "Paneer Gravy Momos", "price": 140, "isVeg": true },
  { "name": "Maggi Gravy Momos", "price": 140, "isVeg": true },
  { "name": "Cheese Corn Gravy Momos", "price": 150, "isVeg": true },

  { "name": "Veg Tandoori Momos", "price": 160, "isVeg": true },
  { "name": "Achari Tandoori Momos", "price": 170, "isVeg": true },
  { "name": "Schezwan Tandoori Momos", "price": 170, "isVeg": true },
  { "name": "Paneer Tandoori Momos", "price": 180, "isVeg": true },
  { "name": "Maggi Tandoori Momos", "price": 180, "isVeg": true },
  { "name": "Cheese Corn Tandoori Momos", "price": 190, "isVeg": true },

  { "name": "Cheese Garlic Bread", "price": 100, "isVeg": true },
  { "name": "Cheese Herbs Jain Bread", "price": 100, "isVeg": true },
  { "name": "Bruschetta", "price": 140, "isVeg": true },
  { "name": "Melted Cheese Garlic Bread", "price": 190, "isVeg": true },

  { "name": "Classic Nachos", "price": 100, "isVeg": true },
  { "name": "Peri-Peri Nachos", "price": 130, "isVeg": true },
  { "name": "Cheesy Loaded Nachos", "price": 150, "isVeg": true },
  { "name": "Cheesy Vegetable Nachos", "price": 200, "isVeg": true },
  { "name": "Cheesy Fondue Nachos", "price": 250, "isVeg": true },
  { "name": "Chocolate Fondue Nachos", "price": 250, "isVeg": true }
],
//--Seven Spices--//
"Seven Spices Fast Food": [
    { "name": "Italian Paneer Roll (Wheat Maida) (JAIN)", "price": 240, "isVeg": true },
    { "name": "Italian Paneer Roll (Rumali Roll) (JAIN)", "price": 260, "isVeg": true },
    { "name": "Cheese Jalepino Paneer Roll (Wheat Maida) (JAIN)", "price": 240, "isVeg": true },
    { "name": "Cheese Jalepino Paneer Roll (Rumali Roll) (JAIN)", "price": 260, "isVeg": true },
    { "name": "Afghani Paneer Roll (Wheat Maida) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Afghani Paneer Roll (Rumali Roll) (JAIN)", "price": 230, "isVeg": true },
    { "name": "Malai Paneer Roll (Wheat Maida) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Malai Paneer Roll (Rumali Roll) (JAIN)", "price": 230, "isVeg": true },
    { "name": "Tandoori Paneer Roll (Wheat Maida) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Tandoori Paneer Roll (Rumali Roll) (JAIN)", "price": 220, "isVeg": true },
    { "name": "Peri-Peri Paneer Roll (Wheat Maida) (JAIN)", "price": 220, "isVeg": true },
    { "name": "Peri-Peri Paneer Roll (Rumali Roll) (JAIN)", "price": 240, "isVeg": true },
    { "name": "Schezwan Paneer Roll (Wheat Maida) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Schezwan Paneer Roll (Rumali Roll) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Achari Paneer Roll (Wheat Maida) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Achari Paneer Roll (Rumali Roll) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Garlic Paneer Roll (Wheat Maida) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Garlic Paneer Roll (Rumali Roll) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Pudina Paneer Roll (Wheat Maida) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Pudina Paneer Roll (Rumali Roll) (JAIN)", "price": 220, "isVeg": true },
    { "name": "Angara Paneer Tikka Roll (Wheat Maida) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Angara Paneer Tikka Roll (Rumali Roll) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Pasanda Paneer Tikka Roll (Wheat Maida) (JAIN)" , "price": 190, "isVeg": true },
    { "name": "Pasanda Paneer Tikka Roll (Rumali Roll) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Masala Paneer Tikka Roll (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Masala Paneer Tikka Roll (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Chatpata Paneer Tikka Roll (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Chatpata Paneer Tikka Roll (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Lemon Paneer Tikka Roll (Wheat Maida) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Lemon Paneer Tikka Roll (Rumali Roll) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Paneer Roll (Dry) (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Paneer Roll (Dry) (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Extra Cheese (JAIN)", "price": 30, "isVeg": true },

    { "name": "Italian Paneer Tikka (Half) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Italian Paneer Tikka (Full) (JAIN)", "price": 390, "isVeg": true },
    { "name": "Cheese Jalepino Paneer Tikka (Half) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Cheese Jalepino Paneer Tikka (Full) (JAIN)", "price": 390, "isVeg": true },
    { "name": "Afghani Paneer Tikka (Half) (JAIN)", "pr (JAIN)ice": 180, "isVeg": true },
    { "name": "Afghani Paneer Tikka (Full) (JAIN)", "price": 330, "isVeg": true },
    { "name": "Malai Chaap Paneer Tikka (Half) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Malai Chaap Paneer Tikka (Full) (JAIN)", "price": 330, "isVeg": true },
    { "name": "Tandoori Paneer Tikka (Half) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Tandoori Paneer Tikka (Full) (JAIN)", "price": 310, "isVeg": true },
    { "name": "Peri-Peri Paneer Tikka (Half) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Peri-Peri Paneer Tikka (Full) (JAIN)", "price": 350, "isVeg": true },
    { "name": "Schezwan Paneer Tikka (Half) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Schezwan Paneer Tikka (Full) (JAIN)", "price": 290, "isVeg": true },
    { "name": "Achari Paneer Tikka (Half) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Achari Paneer Tikka (Full) (JAIN)", "price": 290, "isVeg": true },
    { "name": "Garlic Paneer Tikka (Half) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Garlic Paneer Tikka (Full) (JAIN)", "price": 290, "isVeg": true },
    { "name": "Pudina Paneer Tikka (Half) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Pudina Paneer Tikka (Full) (JAIN)", "price": 310, "isVeg": true },
    { "name": "Angara Paneer Tikka (Half) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Angara Paneer Tikka (Full) (JAIN)", "price": 290, "isVeg": true },
    { "name": "Pasanda Paneer Tikka (Half) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Pasanda Paneer Tikka (Full) (JAIN)", "price": 290, "isVeg": true },
    { "name": "Masala Paneer Tikka (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Masala Paneer Tikka (Full) (JAIN)", "price": 270, "isVeg": true },
    { "name": "Chatpata Paneer Tikka (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Chatpata Paneer Tikka (Full) (JAIN)", "price": 270, "isVeg": true },
    { "name": "Lemon Paneer Tikka (Half) (JAIN)", "price": 140, "isVeg": true },
    { "name": "Lemon Paneer Tikka (Full) (JAIN)", "price": 250, "isVeg": true },
    { "name": "Paneer Tikka (Dry) (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Paneer Tikka (Dry) (Full) (JAIN)", "price": 260, "isVeg": true },
    { "name": "Extra Cheese (JAIN)", "price": 30, "isVeg": true },

    { "name": "Italian Chaap (Half) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Italian Chaap (Full) (JAIN)", "price": 380, "isVeg": true },
    { "name": "Cheese Jalepino Chaap (Half) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Cheese Jalepino Chaap (Full) (JAIN)", "price": 380, "isVeg": true },
    { "name": "Afghani Chaap (Half) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Afghani Chaap (Full) (JAIN)", "price": 320, "isVeg": true },
    { "name": "Malai Chaap (Half) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Malai Chaap (Full) (JAIN)", "price": 320, "isVeg": true },
    { "name": "Tandoori Chaap (Half) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Tandoori Chaap (Full) (JAIN)", "price": 300, "isVeg": true },
    { "name": "Peri-Peri Chaap (Half) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Peri-Peri Chaap (Full) (JAIN)", "price": 340, "isVeg": true },
    { "name": "Schezwan Chaap (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Schezwan Chaap (Full) (JAIN)", "price": 280, "isVeg": true },
    { "name": "Achari Chaap (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Achari Chaap (Full) (JAIN)", "price": 280, "isVeg": true },
    { "name": "Garlic Chaap (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Garlic Chaap (Full) (JAIN)", "price": 280, "isVeg": true },
    { "name": "Pudina Chaap (Half) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Pudina Chaap (Full) (JAIN)", "price": 300, "isVeg": true },
    { "name": "Angara Chaap (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Angara Chaap (Full) (JAIN)", "price": 280, "isVeg": true },
    { "name": "Pasanda Chaap (Half) (JAIN)", "price": 150, "isVeg": true },
    { "name": "Pasanda Chaap (Full) (JAIN)", "price": 280, "isVeg": true },
    { "name": "Masala Chaap (Half) (JAIN)", "price": 140, "isVeg": true },
    { "name": "Masala Chaap (Full) (JAIN)", "price": 260, "isVeg": true },
    { "name": "Chatpata Chaap (Half) (JAIN)", "price": 140, "isVeg": true },
    { "name": "Chatpata Chaap (Full) (JAIN)", "price": 260, "isVeg": true },
    { "name": "Lemon Chaap (Half) (JAIN)", "price": 130, "isVeg": true },
    { "name": "Lemon Chaap (Full) (JAIN)", "price": 240, "isVeg": true },
    { "name": "Paneer Tikka (Half) (JAIN)", "price": 140, "isVeg": true },
    { "name": "Paneer Tikka (Full) (JAIN)", "price": 250, "isVeg": true },
    { "name": "Wheat & Maida Roti (JAIN)", "price": 30, "isVeg": true },
    { "name": "Rumali Roti (JAIN)", "price": 50, "isVeg": true },
    { "name": "Extra Cheese (JAIN)", "price": 30, "isVeg": true },
    { "name": "Extra Cream (JAIN)", "price": 10, "isVeg": true },

    { "name": "Italian Chaap Roll (Wheat Maida) (JAIN)", "price": 230, "isVeg": true },
    { "name": "Italian Chaap Roll (Rumali Roll) (JAIN)", "price": 250, "isVeg": true },
    { "name": "Cheese Jalepino Chaap Roll (Wheat Maida) (JAIN)", "price": 230, "isVeg": true },
    { "name": "Cheese Jalepino Chaap Roll (Rumali Roll) (JAIN)", "price": 250, "isVeg": true },
    { "name": "Afghani Chaap Roll (Wheat Maida) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Afghani Chaap Roll (Rumali Roll) (JAIN)", "price": 220, "isVeg": true },
    { "name": "Malai Chaap Roll (Wheat Maida) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Malai Chaap Roll (Rumali Roll) (JAIN)", "price": 220, "isVeg": true },
    { "name": "Tandoori Chaap Roll (Wheat Maida) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Tandoori Chaap Roll (Rumali Roll) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Peri-Peri Chaap Roll (Wheat Maida) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Peri-Peri Chaap Roll (Rumali Roll) (JAIN)", "price": 230, "isVeg": true },
    { "name": "Schezwan Chaap Roll (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Schezwan Chaap Roll (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Achari Chaap Roll (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Achari Chaap Roll (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Garlic Chaap Roll (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Garlic Chaap Roll (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Pudina Chaap Roll (Wheat Maida) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Pudina Chaap Roll (Rumali Roll) (JAIN)", "price": 210, "isVeg": true },
    { "name": "Angara Chaap Roll (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Angara Chaap Roll (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Pasanda Chaap Roll (Wheat Maida) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Pasanda Chaap Roll (Rumali Roll) (JAIN)", "price": 200, "isVeg": true },
    { "name": "Masala Chaap Roll (Wheat Maida) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Masala Chaap Roll (Rumali Roll) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Chatpata Chaap Roll (Wheat Maida) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Chatpata Chaap Roll (Rumali Roll) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Lemon Chaap Roll (Wheat Maida) (JAIN)", "price": 160, "isVeg": true },
    { "name": "Lemon Chaap Roll (Rumali Roll) (JAIN)", "price": 180, "isVeg": true },
    { "name": "Paneer Tikka Roll (Wheat Maida) (JAIN)", "price": 170, "isVeg": true },
    { "name": "Paneer Tikka Roll (Rumali Roll) (JAIN)", "price": 190, "isVeg": true },
    { "name": "Extra Cheese (JAIN)", "price": 30, "isVeg": true },
    { "name": "Extra Cream (JAIN)", "price": 10, "isVeg": true }
  ],

//--Norchi--//
 "Norchi": [
    { "name": "Manchow Soup", "price": 160, "isVeg": true },
    { "name": "Tomato Soup", "price": 150, "isVeg": true },
    { "name": "Hot & Sour Soup", "price": 160, "isVeg": true },

    { "name": "Salted Fries", "price": 130, "isVeg": true },
    { "name": "Peri Peri Fries", "price": 140, "isVeg": true },
    { "name": "Salted Pop Corn Fries", "price": 130, "isVeg": true },
    { "name": "Peri Peri Pop Corn Fries", "price": 140, "isVeg": true },
    { "name": "Potato Wedges", "price": 160, "isVeg": true },
    { "name": "Paneer Chilli (JAIN)", "price": 200, "isVeg": true },
    { "name": "Mushroom Chilli", "price": 200, "isVeg": true },
    { "name": "Paneer Crispy", "price": 200, "isVeg": true },
    { "name": "Veg Crispy (JAIN)", "price": 190, "isVeg": true },
    { "name": "Veg Manchurian", "price": 190, "isVeg": true },
    { "name": "Chilli Potato (NEW)", "price": 190, "isVeg": true },
    { "name": "Honey Chilli Potato (NEW)", "price": 190, "isVeg": true },
    { "name": "Jalapeno Poppers", "price": 180, "isVeg": true },
    { "name": "Garlic Potato Shots", "price": 180, "isVeg": true },
    { "name": "Cheesy Corn Triangles", "price": 180, "isVeg": true },

    { "name": "Paneer Butter Masala Roll", "price": 200, "isVeg": true },
    { "name": "Paneer Kolhapuri Roll", "price": 200, "isVeg": true },
    { "name": "Paneer Tikka Masala Roll", "price": 200, "isVeg": true },
    { "name": "Paneer Makhani Roll", "price": 200, "isVeg": true },
    { "name": "Mushroom Masala Roll", "price": 200, "isVeg": true },
    { "name": "Paneer Chilli Roll", "price": 200, "isVeg": true },
    { "name": "Mushroom Chilli Roll", "price": 200, "isVeg": true },
    { "name": "Veg Manchurian Roll", "price": 200, "isVeg": true },
    { "name": "Paneer Crispy Roll", "price": 200, "isVeg": true },
    { "name": "Veg Crispy Roll", "price": 200, "isVeg": true },
    { "name": "Chilli Potato Roll (NEW)", "price": 200, "isVeg": true },
    { "name": "Honey Chilli Potato Roll (NEW)", "price": 200, "isVeg": true },

    { "name": "Paneer Butter Masala & Jeera Rice (JAIN)", "price": 220, "isVeg": true },
    { "name": "Paneer Kolhapuri & Jeera Rice", "price": 220, "isVeg": true },
    { "name": "Paneer Tikka Masala & Jeera Rice", "price": 220, "isVeg": true },
    { "name": "Mushroom Masala & Jeera Rice", "price": 220, "isVeg": true },
    { "name": "Paneer Makhani & Jeera Rice", "price": 220, "isVeg": true },
    { "name": "Paneer Kadhai & Jeera Rice", "price": 220, "isVeg": true },
    { "name": "Veg Kolhapuri & Jeera Rice", "price": 210, "isVeg": true },
    { "name": "Veg Makhani & Jeera Rice", "price": 210, "isVeg": true },
    { "name": "Veg Kadhai & Jeera Rice", "price": 210, "isVeg": true },
    { "name": "Paneer Chilli & Fried Rice", "price": 220, "isVeg": true },
    { "name": "Mushroom Chilli & Fried Rice", "price": 220, "isVeg": true },
    { "name": "Veg Manchurian & Fried Rice (JAIN)", "price": 220, "isVeg": true },
    { "name": "Paneer Crispy & Fried Rice", "price": 220, "isVeg": true },
    { "name": "Veg Crispy & Fried Rice", "price": 220, "isVeg": true },
    { "name": "Paneer Chilli & Hakka Noodles (JAIN)", "price": 230, "isVeg": true },
    { "name": "Mushroom Chilli & Hakka Noodles", "price": 230, "isVeg": true },
    { "name": "Veg Manchurian & Hakka Noodles", "price": 220, "isVeg": true },
    { "name": "Paneer Crispy & Hakka Noodles", "price": 230, "isVeg": true },
    { "name": "Veg Crispy & Hakka Noodles", "price": 220, "isVeg": true },

    { "name": "Veg Kolhapuri (JAIN)", "price": 200, "isVeg": true },
    { "name": "Veg Kadhai (JAIN)", "price": 200, "isVeg": true },
    { "name": "Veg Makhani", "price": 200, "isVeg": true },
    { "name": "Paneer Kolhapuri", "price": 220, "isVeg": true },
    { "name": "Paneer Kadhai", "price": 220, "isVeg": true },
    { "name": "Paneer Butter Masala", "price": 220, "isVeg": true },
    { "name": "Paneer Makhani (JAIN)", "price": 220, "isVeg": true },
    { "name": "Paneer Tikka Masala (JAIN)", "price": 220, "isVeg": true },
    { "name": "Paneer Bhurji", "price": 180, "isVeg": true },
    { "name": "Mushroom Masala", "price": 220, "isVeg": true },

    { "name": "Plain Rumali Roti", "price": 80, "isVeg": true },
    { "name": "Butter Rumali Roti", "price": 90, "isVeg": true },
    { "name": "Plain Paratha", "price": 60, "isVeg": true },
    { "name": "Butter Paratha", "price": 70, "isVeg": true },
    { "name": "Tawa Plain Roti", "price": 30, "isVeg": true },
    { "name": "Butter Tawa Roti", "price": 40, "isVeg": true },

    { "name": "Jeera Rice", "price": 180, "isVeg": true },
    { "name": "Fried Rice", "price": 190, "isVeg": true },
    { "name": "Paneer Fried Rice", "price": 200, "isVeg": true },
    { "name": "Mushroom Fried Rice", "price": 200, "isVeg": true },
    { "name": "Schezwan Fried Rice", "price": 200, "isVeg": true },
    { "name": "Paneer Schezwan Fried Rice", "price": 210, "isVeg": true },
    { "name": "Mushroom Schezwan Fried Rice", "price": 210, "isVeg": true },
    { "name": "Triple Fried Rice", "price": 230, "isVeg": true },
    { "name": "Burnt Garlic Fried Rice (NEW)", "price": 240, "isVeg": true },
    { "name": "Burnt Garlic Schezwan Fried Rice (NEW)", "price": 240, "isVeg": true },

    { "name": "Hakka Noodles", "price": 200, "isVeg": true },
    { "name": "Paneer Hakka Noodles", "price": 210, "isVeg": true },
    { "name": "Mushroom Hakka Noodles", "price": 210, "isVeg": true },
    { "name": "Schezwan Noodles", "price": 200, "isVeg": true },
    { "name": "Paneer Schezwan Noodles", "price": 220, "isVeg": true },
    { "name": "Mushroom Schezwan Noodles", "price": 220, "isVeg": true },
    { "name": "Triple Noodles", "price": 230, "isVeg": true },
    { "name": "Burnt Garlic Hakka Noodles (NEW)", "price": 240, "isVeg": true },
    { "name": "Burnt Garlic Schezwan Hakka Noodles (NEW)", "price": 240, "isVeg": true },

    { "name": "Mix Veg Biryani (NEW)", "price": 260, "isVeg": true },
    { "name": "Paneer Biryani", "price": 280, "isVeg": true },
    { "name": "Paneer Tikka Biryani", "price": 300, "isVeg": true },

    { "name": "Chocolate Cake Bowl (NEW)", "price": 160, "isVeg": true },
    { "name": "Dutch Chocolate Pastry", "price": 120, "isVeg": true },
    { "name": "Chocolate Mousse Pastry", "price": 100, "isVeg": true },
    { "name": "Orange Pastry", "price": 100, "isVeg": true },
    { "name": "Pineapple Pastry", "price": 100, "isVeg": true },
    { "name": "Pineapple Sheera", "price": 120, "isVeg": true },

    { "name": "Vanilla Shake", "price": 135, "isVeg": true },
    { "name": "Chocolate Shake", "price": 150, "isVeg": true },
    { "name": "Cold Coffee", "price": 150, "isVeg": true },
    { "name": "Oreo Shake", "price": 160, "isVeg": true },
    { "name": "Kitkat Shake", "price": 160, "isVeg": true },

    { "name": "Sweet Lassi", "price": 70, "isVeg": true },
    { "name": "Buttermilk", "price": 50, "isVeg": true },
    { "name": "Jeera Masala", "price": 20, "isVeg": true },
    { "name": "Cold Drinks (250 ML)", "price": 20, "isVeg": true },
    { "name": "Water", "price": 10, "isVeg": true }
  ],
  //--Green Chatni--//
  "Green Chatni Food" : [
    { "name": "Veg Hakka Noodles With Veg Manchow Soup And Fried Rice", "price": 240, "isVeg": true },
    { "name": "Veg Schezwan Rice With Veg Hakka Noodles And Veg Manchurian Gravy", "price": 240, "isVeg": true },
    { "name": "Dal Makhni With Jeera Rice", "price": 180, "isVeg": true },
    { "name": "Dal Tadka With Steamed Rice", "price": 180, "isVeg": true },
    { "name": "Vegetables Of The Day With 3 Chapati", "price": 240, "isVeg": true },
    { "name": "Paneer Tikka Masala With 2 Laccha Paratha", "price": 240, "isVeg": true },
    { "name": "Paneer Tikka Masala With 2 Kulcha", "price": 240, "isVeg": true },
    { "name": "Paneer Tikka Masala With 2 Butter Naan", "price": 240, "isVeg": true },
    { "name": "Paneer Tikka Masala With 3 Chapati", "price": 240, "isVeg": true },
    { "name": "Paneer Makhanwala With 2 Laccha Paratha", "price": 240, "isVeg": true },
    { "name": "Paneer Makhanwala With 2 Kulcha", "price": 240, "isVeg": true },
    { "name": "Paneer Makhanwala With 2 Butter Naan", "price": 240, "isVeg": true },
    { "name": "Paneer Makhanwala With 3 Chapati", "price": 240, "isVeg": true },
    { "name": "Chole Masala + 3 Chapati", "price": 240, "isVeg": true },
    { "name": "Chole Masala + 2 Laccha Paratha", "price": 240, "isVeg": true },
    { "name": "Shahi Paneer With 2 Laccha Paratha", "price": 240, "isVeg": true },
    { "name": "Shahi Paneer With 2 Kulcha", "price": 240, "isVeg": true },
    { "name": "Shahi Paneer With 2 Butter Naan", "price": 240, "isVeg": true },
    { "name": "Veg Chilli Milli With 2 Laccha Paratha", "price": 240, "isVeg": true },
    { "name": "Veg Chilli Milli With 2 Kulcha", "price": 240, "isVeg": true },
    { "name": "Veg Chilli Milli With 2 Butter Naan", "price": 240, "isVeg": true },
    { "name": "Veg Chilli Milli With 3 Chapati", "price": 240, "isVeg": true },
    { "name": "Panner Kofta With 2 Laccha Paratha", "price": 240, "isVeg": true },
    { "name": "Panner Kofta With 2 Kulcha", "price": 240, "isVeg": true },
    { "name": "Panner Kofta With 2 Butter Naan", "price": 240, "isVeg": true },
    { "name": "Panner Kofta With 3 Chapati", "price": 240, "isVeg": true },
    { "name": "Chole Masala + 2 Kulcha", "price": 240, "isVeg": true },
    { "name": "Chole Masala + 2 Naan", "price": 240, "isVeg": true },

    { "name": "Punjabi Thali", "price": 300, "isVeg": true },
    { "name": "Paneer Tikka Thali", "price": 300, "isVeg": true },
    { "name": "Dal Makhani Thali", "price": 300, "isVeg": true },
    { "name": "Matar Paneer Thali", "price": 300, "isVeg": true },
    { "name": "Veg Kolhapuri Thali", "price": 300, "isVeg": true },
    { "name": "Jain Thali", "price": 300, "isVeg": true },
    { "name": "Maharashtrian Thali", "price": 300, "isVeg": true },
    { "name": "Special Thali", "price": 300, "isVeg": true },

    { "name": "Paneer Tikka", "price": 310, "isVeg": true },
    { "name": "Aloo Cheese Tikki", "price": 260, "isVeg": true },
    { "name": "Veg Cutlet", "price": 270, "isVeg": true },
    { "name": "Chole Bhature", "price": 220, "isVeg": true },

    { "name": "Paneer Kolhapuri", "price": 310, "isVeg": true },
    { "name": "Paneer Tikka Masala", "price": 320, "isVeg": true },
    { "name": "Paneer Lababdar", "price": 310, "isVeg": true },
    { "name": "Shahi Paneer", "price": 300, "isVeg": true },
    { "name": "Paneer Kofta", "price": 330, "isVeg": true },
    { "name": "Paneer Handi", "price": 330, "isVeg": true },
    { "name": "Paneer Butter Masala", "price": 310, "isVeg": true },
    { "name": "Paneer Makhanwala", "price": 320, "isVeg": true },
    { "name": "Paneer Kadai", "price": 350, "isVeg": true },

    { "name": "Tandoori Roti (Wheat)", "price": 55, "isVeg": true },
    { "name": "Butter Roti", "price": 60, "isVeg": true },
    { "name": "Paneer Paratha", "price": 140, "isVeg": true },
    { "name": "Laccha Paratha", "price": 70, "isVeg": true },
    { "name": "Naan", "price": 60, "isVeg": true },
    { "name": "Butter Naan", "price": 70, "isVeg": true },
    { "name": "Kulcha", "price": 60, "isVeg": true },
    { "name": "Garlic Naan", "price": 80, "isVeg": true },
    { "name": "Chapati", "price": 40, "isVeg": true },
    { "name": "Butter Chapati", "price": 60, "isVeg": true },
    { "name": "Aloo Paratha", "price": 100, "isVeg": true },
    { "name": "Mix Paratha", "price": 100, "isVeg": true },

    { "name": "Dal Fry", "price": 220, "isVeg": true },
    { "name": "Dal Tadka", "price": 230, "isVeg": true },
    { "name": "Dla Makhani", "price": 250, "isVeg": true },

    { "name": "Steam Rice", "price": 170, "isVeg": true },
    { "name": "Jeera Rice", "price": 200, "isVeg": true },
    { "name": "Dal Khichadi (Tadka)", "price": 250, "isVeg": true },
    { "name": "Veg Pulav", "price": 260, "isVeg": true },
    { "name": "Paneer Pulav", "price": 270, "isVeg": true },
    { "name": "Veg Biryani", "price": 270, "isVeg": true },

    { "name": "Paneer Biryani", "price": 300, "isVeg": true },
    { "name": "Paneer Tikka Biryani", "price": 310, "isVeg": true },

    { "name": "Paneer Shezwan", "price": 300, "isVeg": true },
    { "name": "Paneer Chilli (Dry & Gravy)", "price": 300, "isVeg": true },
    { "name": "Paneer Crispy", "price": 320, "isVeg": true },

    { "name": "Veg Hakka Noodles", "price": 270, "isVeg": true },
    { "name": "Veg Schezwan Noodles", "price": 280, "isVeg": true },
    { "name": "Veg Triple Schezwan Noodles", "price": 300, "isVeg": true },
    { "name": "Veg Triple Hakka Noodles", "price": 290, "isVeg": true },
    { "name": "Veg Fried Rice", "price": 270, "isVeg": true },
    { "name": "Veg Schezwan Rice", "price": 280, "isVeg": true },
    { "name": "Veg Triple Fried Rice", "price": 290, "isVeg": true },
    { "name": "Veg Triple Sch Fried Rice", "price": 300, "isVeg": true },

    { "name": "Veg Biryani (1 Kg)", "price": 840, "isVeg": true },
    { "name": "Veg Pulav (1 Kg)", "price": 750, "isVeg": true },
    { "name": "Paneer Biryani (1 Kg)", "price": 920, "isVeg": true },
    { "name": "Veg Haydrabadi Biryani (1 Kg)", "price": 840, "isVeg": true },

    { "name": "Masala Papad", "price": 60, "isVeg": true },
    { "name": "Roasted Papad", "price": 40, "isVeg": true },
    { "name": "Fry Papad", "price": 50, "isVeg": true },
    { "name": "Amul Butter Milk", "price": 25, "isVeg": true }
  ],
  //--Maharshatra Sashan--//
  "Maharashtra Shashan": [
  { "name": "Cheese Samosa Pav", "price": 35, "isVeg": true },
  { "name": "Samosa Cheese Grill Schezwan Pav", "price": 50, "isVeg": true },
  { "name": "Samosa Pav", "price": 22, "isVeg": true },
  { "name": "Gurukrupa A-1 Samosa", "price": 18, "isVeg": true },
  { "name": "Jain Samosa", "price": 22, "isVeg": true },
  { "name": "Samosa Cheese Grill Pav", "price": 50, "isVeg": true },
  { "name": "Dabeli", "price": 20, "isVeg": true },
  { "name": "Cheese Dabeli", "price": 20, "isVeg": true },
  { "name": "Sada Frankie", "price": 30, "isVeg": true },
  { "name": "Sada Cheese Frankie", "price": 40, "isVeg": true },
  { "name": "Noodles Frankie", "price": 30, "isVeg": true },
  { "name": "Veg Amul Frankie", "price": 30, "isVeg": true },
  { "name": "Veg Amul Cheese Frankie", "price": 40, "isVeg": true },
  { "name": "Veg Amul Schezwan Frankie", "price": 40, "isVeg": true },
  { "name": "Amul Mayonish Frankie", "price": 40, "isVeg": true },
  { "name": "Veg Noodles Frankie", "price": 40, "isVeg": true },
  { "name": "Amul Mayonish Cheese Frankie", "price": 50, "isVeg": true },
  { "name": "Veg Amul Schezwan Mayonish Frankie", "price": 50, "isVeg": true },
  { "name": "Veg Amul Schezwan Cheese Frankie", "price": 50, "isVeg": true },
  { "name": "Veg Amul Schezwan Manchurian Frankie", "price": 50, "isVeg": true },
  { "name": "Veg Noodles Cheese Frankie", "price": 50, "isVeg": true },
  { "name": "Veg Noodles Schezwan Frankie", "price": 50, "isVeg": true },
  { "name": "Amul Paneer Frankie", "price": 50, "isVeg": true },
  { "name": "Veg Amul Schezwan Mayonish Cheese Frankie", "price": 60, "isVeg": true },
  { "name": "Veg Amul Schezwan Manchurian Cheese Frankie", "price": 60, "isVeg": true },
  { "name": "Veg Noodles Schezwan Cheese Frankie", "price": 60, "isVeg": true },
  { "name": "Amul Paneer Cheese Frankie", "price": 60, "isVeg": true },
  { "name": "Veg Amul Schezwan Paneer Frankie", "price": 60, "isVeg": true },
  { "name": "Veg Amul Schezwan Mayonish Cheese Noodle", "price": 70, "isVeg": true },
  { "name": "Veg Amul Schezwan Manchurian Cheese Noodle", "price": 70, "isVeg": true },
  { "name": "Veg Amul Schezwan Paneer Cheese Frankie", "price": 70, "isVeg": true },
  { "name": "Veg Amul Schezwan Manchurian Cheese Paneer Noodle", "price": 80, "isVeg": true },
  { "name": "Veg Amul Schezwan Mayonish Cheese Paneer Noodle", "price": 80, "isVeg": true },
  { "name": "Amul Dabeli", "price": 20, "isVeg": true },
  { "name": "Amul Cheese Dabeli", "price": 30, "isVeg": true },
  { "name": "Chinese Bhel", "price": 20, "isVeg": true }
],
//-Patel Juice--//
"Patel Juice Centre": [
  { "name": "Mosambi Juice", "price": 80, "isVeg": true },
  { "name": "Orange Juice", "price": 100, "isVeg": true },
  { "name": "Watermelon Juice", "price": 60, "isVeg": true },
  { "name": "Pineapple Juice", "price": 90, "isVeg": true },
  { "name": "Special Cocktail Juice", "price": 90, "isVeg": true },
  { "name": "Shimla Apple Juice", "price": 120, "isVeg": true },
  { "name": "Ganga Jamuna (Orange + Mosambi)", "price": 90, "isVeg": true },
  { "name": "Mara Mari (Pineapple + Mosambi)", "price": 90, "isVeg": true },
  { "name": "Munna Munni (Pineapple + Orange)", "price": 90, "isVeg": true },
  { "name": "Sangam (Mosambi + Orange + Pineapple)", "price": 100, "isVeg": true },
  { "name": "Kabuli Anar Juice", "price": 100, "isVeg": true },
  { "name": "Black Grape Juice", "price": 100, "isVeg": true },
  { "name": "Ginger Lemon Juice", "price": 80, "isVeg": true },
  { "name": "Guava (Peru) Juice", "price": 80, "isVeg": true },
  { "name": "Orange Muskmelon Juice", "price": 100, "isVeg": true },
  { "name": "Green Valley Juice (K+P+G)", "price": 120, "isVeg": true },
  { "name": "Orange Anar Juice", "price": 100, "isVeg": true },
  { "name": "Litchi Juice", "price": 160, "isVeg": true },
  { "name": "Plum Juice (Seasonal)", "price": 160, "isVeg": true },
  { "name": "Peach Juice (Seasonal)", "price": 160, "isVeg": true },
  { "name": "Black Jamun Juice", "price": 160, "isVeg": true },
  { "name": "New Zealand Kiwi Juice", "price": 180, "isVeg": true },
  { "name": "Kiwi Dragon Juice", "price": 180, "isVeg": true },
  { "name": "Strawberry Juice", "price": 180, "isVeg": true },
  { "name": "Muskmelon Juice", "price": 180, "isVeg": true },
  { "name": "Cherry Orange Juice", "price": 180, "isVeg": true },
  { "name": "Peach & Plum Juice", "price": 180, "isVeg": true },

  { "name": "Chikoo Milkshake", "price": 90, "isVeg": true },
  { "name": "Strawberry Milkshake", "price": 160, "isVeg": true },
  { "name": "Sitafal Milkshake", "price": 150, "isVeg": true },
  { "name": "Shimla Apple Milkshake", "price": 150, "isVeg": true },
  { "name": "Muskmelon with Fresh Cream Milkshake", "price": 200, "isVeg": true },
  { "name": "Cold Coffee", "price": 90, "isVeg": true },
  { "name": "Coconut Milkshake", "price": 90, "isVeg": true },
  { "name": "Butter Scotch Milkshake", "price": 90, "isVeg": true },
  { "name": "Gulkand Milkshake", "price": 90, "isVeg": true },
  { "name": "Kesar Milkshake", "price": 90, "isVeg": true },
  { "name": "Pista Milkshake", "price": 90, "isVeg": true },
  { "name": "Chikoo Chocolate Milkshake", "price": 100, "isVeg": true },
  { "name": "Special Mango Milkshake", "price": 100, "isVeg": true },
  { "name": "Kaju Anjeer Milkshake", "price": 200, "isVeg": true },
  { "name": "Dry Anjeer Milkshake", "price": 200, "isVeg": true },
  { "name": "Dry Fruit Milkshake", "price": 280, "isVeg": true },
  { "name": "Fresh Anjeer Milkshake", "price": 280, "isVeg": true },
  { "name": "Litchi Fresh Milkshake", "price": 160, "isVeg": true },
  { "name": "Avocado + Honey Milkshake", "price": 180, "isVeg": true },
  { "name": "Avocado + Kesar Milkshake", "price": 180, "isVeg": true },
  { "name": "Oreo Milkshake", "price": 160, "isVeg": true },
  { "name": "Kit Kat Milkshake", "price": 160, "isVeg": true },
  { "name": "Kulfi Milkshake", "price": 160, "isVeg": true },
  { "name": "Kulfi Kesar Milkshake", "price": 180, "isVeg": true },
  { "name": "Chocolate Milkshake", "price": 100, "isVeg": true },

  { "name": "Lemon Mojito", "price": 100, "isVeg": true },
  { "name": "Kiwi Mojito", "price": 100, "isVeg": true },
  { "name": "Watermelon Mojito", "price": 100, "isVeg": true },
  { "name": "Strawberry Mojito", "price": 160, "isVeg": true },
  { "name": "Orange Mojito", "price": 160, "isVeg": true },

  { "name": "Royal Falooda", "price": 100, "isVeg": true },
  { "name": "Kesar Falooda", "price": 120, "isVeg": true },
  { "name": "Kulfi Falooda (Small)", "price": 120, "isVeg": true },
  { "name": "Pista Falooda", "price": 120, "isVeg": true },
  { "name": "Butter Scotch Falooda", "price": 100, "isVeg": true },
  { "name": "Jelly Ice Falooda", "price": 100, "isVeg": true },
  { "name": "Chocolate Falooda", "price": 100, "isVeg": true },
  { "name": "Dry Fruit Falooda (Small)", "price": 120, "isVeg": true },
  { "name": "Patel Special Falooda", "price": 150, "isVeg": true },
  { "name": "Rabdi Falooda", "price": 140, "isVeg": true },

  { "name": "Strawberry Cream", "price": 300, "isVeg": true },
  { "name": "Sitafal Cream", "price": 300, "isVeg": true },
  { "name": "Kiwi Cream", "price": 260, "isVeg": true },
  { "name": "Mango Cream", "price": 180, "isVeg": true },
  { "name": "Muskmelon Cream", "price": 150, "isVeg": true },

  { "name": "Special Patel Strawberry Malai", "price": 220, "isVeg": true },
  { "name": "Blue Berry", "price": 220, "isVeg": true },
  { "name": "Mal Berry", "price": 180, "isVeg": true },
  { "name": "Kashmir Cherry", "price": 160, "isVeg": true },
  { "name": "4 Berry", "price": 190, "isVeg": true },

  { "name": "Strawberry Blossom", "price": 180, "isVeg": true },
  { "name": "Sitafal Blossom", "price": 180, "isVeg": true },
  { "name": "Watermelon Blossom", "price": 120, "isVeg": true },
  { "name": "Pineapple Blossom", "price": 120, "isVeg": true },
  { "name": "Kiwi Blossom", "price": 120, "isVeg": true },
  { "name": "Apple Blossom", "price": 120, "isVeg": true },
  { "name": "Black Grapes Blossom", "price": 120, "isVeg": true },
  { "name": "Litchi + Strawberry Blossom", "price": 200, "isVeg": true },
  { "name": "Oreo Blossom", "price": 150, "isVeg": true },
  { "name": "Kit Kat Blossom", "price": 150, "isVeg": true },
  { "name": "Mango Blossom", "price": 140, "isVeg": true },
  { "name": "Kesar Chikoo Blossom", "price": 140, "isVeg": true },
  { "name": "Orange Blossom", "price": 120, "isVeg": true },
  { "name": "Cold Coffee Blossom", "price": 120, "isVeg": true },
  { "name": "Chikoo + Chocolate Blossom", "price": 140, "isVeg": true },
  { "name": "Chocolate Blossom", "price": 140, "isVeg": true },

  { "name": "Dil Khush (S+K+A+G)", "price": 140, "isVeg": true },
  { "name": "Anjum (K+L+A)", "price": 130, "isVeg": true },
  { "name": "Rizmin (S+K)", "price": 130, "isVeg": true },
  { "name": "Hum Safar (S+A+G)", "price": 130, "isVeg": true },
  { "name": "Champion (K+L+A)", "price": 130, "isVeg": true },
  { "name": "Zip Zip (K+Kalingar)", "price": 130, "isVeg": true },
  { "name": "Friends (Kalingar+Musk)", "price": 120, "isVeg": true },
  { "name": "Zip Zip 2 (K+Musk)", "price": 120, "isVeg": true },
  { "name": "Man Pasand (Rose+Pine+Gnt+Grapes)", "price": 130, "isVeg": true },

  { "name": "Veg Toast", "price": 100, "isVeg": true },
  { "name": "Veg Sandwich", "price": 60, "isVeg": true },
  { "name": "Veg Cheese Sandwich", "price": 80, "isVeg": true },
  { "name": "Veg Cheese Toast Sandwich", "price": 140, "isVeg": true },
  { "name": "Cheese Chilli Toast", "price": 130, "isVeg": true },
  { "name": "Paneer Toast", "price": 140, "isVeg": true },
  { "name": "Paneer Cheese Grill", "price": 200, "isVeg": true },
  { "name": "Jam Toast", "price": 80, "isVeg": true },
  { "name": "Veg Grilled Sandwich", "price": 140, "isVeg": true },
  { "name": "Veg Cheese Grilled Sandwich", "price": 180, "isVeg": true },
  { "name": "Paneer Grilled Sandwich", "price": 180, "isVeg": true },
  { "name": "Mexican Grilled Sandwich", "price": 160, "isVeg": true }
],

//--Veggie Adda--//

"Shree Veggie Adda": [
  { "name": "Tandoori Paneer Tikka", "price": 130, "isVeg": true },
  { "name": "Malai Paneer Tikka", "price": 140, "isVeg": true },
  { "name": "Hariyali/Pahadi Paneer Tikka", "price": 140, "isVeg": true },
  { "name": "Veg Seekh Kebab", "price": 160, "isVeg": true },
  { "name": "Mushroom Tikka", "price": 160, "isVeg": true },
  { "name": "Mushroom Stuffed Tikka", "price": 200, "isVeg": true },
  { "name": "Baby Corn Tikka", "price": 140, "isVeg": true },
  { "name": "Tandoori Aloo", "price": 120, "isVeg": true },
  { "name": "Cheese Tandoori Aloo (shorts)", "price": 130, "isVeg": true },
  { "name": "Malai Paneer Mushroom & Corn Tikka", "price": 180, "isVeg": true },
  { "name": "Soya Chaap Tikka", "price": 130, "isVeg": true },
  { "name": "Malai Soya Chaap Tikka", "price": 140, "isVeg": true },
  { "name": "Hariyali/Pahadi Chaap Tikka", "price": 140, "isVeg": true },
  { "name": "Mix Chaap/Mushroom & Corn", "price": 180, "isVeg": true },
  { "name": "Spl. Tikka/BBQ Platter (all mix)", "price": 240, "isVeg": true },
  { "name": "Spl. BBQ Veg Salad", "price": 160, "isVeg": true },

  { "name": "Veg Chilli/Manchurian", "price": 140, "isVeg": true },
  { "name": "Soya Chilli/Manchurian", "price": 150, "isVeg": true },
  { "name": "Paneer Chilli/Manchurian", "price": 160, "isVeg": true },
  { "name": "Mushroom Chilli/Manchurian", "price": 180, "isVeg": true },
  { "name": "Baby Corn Chilli", "price": 160, "isVeg": true },
  { "name": "Cheese Balls (6 pcs)", "price": 120, "isVeg": true },
  { "name": "Tandoori Cheese Balls (6 pcs)", "price": 160, "isVeg": true },

  { "name": "Fries (plain)", "price": 100, "isVeg": true },
  { "name": "Masala Fries", "price": 120, "isVeg": true },
  { "name": "Cheese Chilli Fries", "price": 140, "isVeg": true },
  { "name": "Mayo Fries", "price": 120, "isVeg": true },
  { "name": "Peri Peri Fries", "price": 120, "isVeg": true },
  { "name": "Sezwan Fries", "price": 120, "isVeg": true },
  { "name": "Cheese Sezwan Fries", "price": 140, "isVeg": true },
  { "name": "Tikka Fries", "price": 120, "isVeg": true },
  { "name": "Cheese Tikka Fries", "price": 140, "isVeg": true },
  { "name": "Mint Fries", "price": 120, "isVeg": true },

  { "name": "Veg Wrap", "price": 100, "isVeg": true },
  { "name": "Veg Cheese Wrap", "price": 130, "isVeg": true },
  { "name": "Veg Sezwan Wrap", "price": 120, "isVeg": true },
  { "name": "Veg Sezwan Cheese Wrap", "price": 140, "isVeg": true },
  { "name": "Veg Paneer Wrap", "price": 140, "isVeg": true },
  { "name": "Veg Cheese Paneer Wrap", "price": 160, "isVeg": true },
  { "name": "Veg Cheese Sezwan Paneer Wrap", "price": 160, "isVeg": true },
  { "name": "Veg Manchurian Wrap", "price": 130, "isVeg": true },
  { "name": "Veg Manchurian Cheese Wrap", "price": 150, "isVeg": true },
  { "name": "Mushroom Wrap", "price": 150, "isVeg": true },
  { "name": "Baby Corn Tikka Wrap", "price": 140, "isVeg": true },
  { "name": "Aloo Tandoori Wrap", "price": 130, "isVeg": true },
  { "name": "Cheese Baby Corn Tikka Wrap", "price": 160, "isVeg": true },

  { "name": "Paneer Tikka Wrap", "price": 150, "isVeg": true },
  { "name": "Cheese Paneer Tikka Wrap", "price": 170, "isVeg": true },
  { "name": "Sezwan Paneer Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Malai Paneer Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Cheese Malai Paneer Tikka Wrap", "price": 180, "isVeg": true },
  { "name": "Hariyali/Pahadi Paneer Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Cheese Hariyali Paneer Tikka Wrap", "price": 180, "isVeg": true },
  { "name": "Veg Kebab Tikka Wrap", "price": 150, "isVeg": true },
  { "name": "Veg Seekh Tikka Wrap", "price": 150, "isVeg": true },
  { "name": "Soya Chaap Tikka Wrap", "price": 150, "isVeg": true },
  { "name": "Cheese Soya Chaap Wrap", "price": 170, "isVeg": true },
  { "name": "Mix Chaap Wrap", "price": 160, "isVeg": true },
  { "name": "Cheese Mix Chaap Wrap", "price": 180, "isVeg": true },
  { "name": "Mushroom Tikka Wrap", "price": 170, "isVeg": true },
  { "name": "Cheese Mushroom Wrap", "price": 190, "isVeg": true },
  { "name": "Manchurian Noodles Wrap", "price": 140, "isVeg": true },
  { "name": "Paneer Noodles Wrap", "price": 150, "isVeg": true },
  { "name": "Cheese Noodles Wrap", "price": 170, "isVeg": true },
  { "name": "Cheese Chaap Tikka Wrap", "price": 180, "isVeg": true },

  { "name": "Malai Chaap Tikka Wrap", "price": 180, "isVeg": true },
  { "name": "Cheese Malai Chaap Tikka Wrap", "price": 210, "isVeg": true },
  { "name": "Hariyali/Pahadi Chaap Tikka Wrap", "price": 180, "isVeg": true },
  { "name": "Cheese Hariyali Chaap Tikka Wrap", "price": 210, "isVeg": true },
  { "name": "Cheese Ball Wrap", "price": 190, "isVeg": true },
  { "name": "Aloo Paneer Tikka Wrap", "price": 190, "isVeg": true },
  { "name": "Cheese Aloo Paneer Tikka Wrap", "price": 200, "isVeg": true },
  { "name": "Paneer Mushroom Wrap", "price": 210, "isVeg": true },
  { "name": "Cheese Paneer Mushroom Tikka Wrap", "price": 240, "isVeg": true },
  { "name": "Paneer & Chaap Tikka Wrap", "price": 230, "isVeg": true },
  { "name": "Cheese Paneer & Chaap Tikka Wrap", "price": 250, "isVeg": true },

  { "name": "Jain Tandoori Paneer Tikka", "price": 130, "isVeg": true },
  { "name": "Jain Malai Paneer Tikka", "price": 140, "isVeg": true },
  { "name": "Hariyali/Pahadi Paneer Tikka", "price": 140, "isVeg": true },
  { "name": "Jain Resami Paneer Tikka", "price": 150, "isVeg": true },
  { "name": "Jain BBQ Platter (all mix)", "price": 240, "isVeg": true },
  { "name": "Jain Veg Chilli", "price": 140, "isVeg": true },
  { "name": "Jain Cheese Balls (6 pcs)", "price": 120, "isVeg": true },

  { "name": "Jain Veg Tikka Wrap", "price": 130, "isVeg": true },
  { "name": "Veg Jain Wrap", "price": 100, "isVeg": true },
  { "name": "Jain Falafel Wrap", "price": 120, "isVeg": true },
  { "name": "Jain Tandoori Falafel Wrap", "price": 160, "isVeg": true },

  { "name": "Jain Tandoori Falafel Wrap", "price": 140, "isVeg": true },
  { "name": "Jain Cheese Tandoori Falafel", "price": 160, "isVeg": true },
  { "name": "Jain Tandoori Paneer Tikka Wrap", "price": 150, "isVeg": true },
  { "name": "Jain Malai Paneer Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Jain Aloo Paneer Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Jain Hariyali Paneer Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Jain Cheese Paneer Tikka Wrap", "price": 170, "isVeg": true },
  { "name": "Jain Sezwan Paneer Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Jain Cheese Sezwan Paneer Wrap", "price": 180, "isVeg": true },
  { "name": "Jain Mushroom Tikka Wrap", "price": 170, "isVeg": true },
  { "name": "Jain Cheese Mushroom Tikka Wrap", "price": 190, "isVeg": true },
  { "name": "Jain Chaap Wrap", "price": 150, "isVeg": true },
  { "name": "Jain Cheese Chaap Wrap", "price": 170, "isVeg": true },
  { "name": "Jain Mix Chaap Wrap", "price": 160, "isVeg": true },
  { "name": "Jain Cheese Mix Chaap Wrap", "price": 180, "isVeg": true },
  { "name": "Jain Cheese Ball Wrap", "price": 190, "isVeg": true },
  { "name": "Jain Aloo Tikka Wrap", "price": 130, "isVeg": true },
  { "name": "Jain Cheese Aloo Tikka Wrap", "price": 160, "isVeg": true },
  { "name": "Jain Manchurian Noodles Wrap", "price": 140, "isVeg": true },
  { "name": "Jain Paneer Noodles Wrap", "price": 150, "isVeg": true },
  { "name": "Jain Cheese Noodles Wrap", "price": 170, "isVeg": true },
  { "name": "Jain Cheese Veg Noodles Wrap", "price": 180, "isVeg": true },
  { "name": "Jain Cheese Chilli Paneer Wrap", "price": 190, "isVeg": true },
  { "name": "Jain Cheese Malai Chaap Tikka Wrap", "price": 210, "isVeg": true }
],

//--Ramanandi--//

    "Ramanandi Pizza": [
  // Regular Base Pizza
  { name: "Farm Pizza (Regular Base) (JAIN)", price: 220, isVeg: true },
  { name: "Ramanandi Spl. Pizza (Regular Base) (JAIN)", price: 300, isVeg: true },
  { name: "Masala Paneer Pizza (Regular Base) (JAIN)", price: 250, isVeg: true },
  { name: "Only Cheese Pizza (Regular Base) (JAIN)", price: 240, isVeg: true },
  { name: "Margherita Pizza (Regular Base) (JAIN)", price: 240, isVeg: true },
  { name: "Corn & Cheese Pizza (Regular Base) (JAIN)", price: 240, isVeg: true },
  { name: "Sezwan Pizza (Regular Base) (JAIN)", price: 240, isVeg: true },

  // Bhakhri Pizza (Wheat)
  { name: "Farm Pizza (Bhakhri) (JAIN)", price: 220, isVeg: true },
  { name: "Ramanandi Spl. Pizza (Bhakhri) (JAIN)", price: 300, isVeg: true },
  { name: "Masala Paneer Pizza (Bhakhri) (JAIN)", price: 230, isVeg: true },
  { name: "Vegetable Bhakhri Pizza (JAIN)", price: 200, isVeg: true },
  { name: "Only Cheese Pizza (Bhakhri) (JAIN)", price: 220, isVeg: true },
  { name: "Margherita Pizza (Bhakhri) (JAIN)", price: 180, isVeg: true },
  { name: "Corn & Cheese Pizza (Bhakhri) (JAIN)", price: 200, isVeg: true },
  { name: "Sezwan Pizza (Bhakhri) (JAIN)", price: 200, isVeg: true },

  // Bread Pizza
  { name: "Vegetable Bread Pizza (JAIN)", price: 120, isVeg: true },
  { name: "Masala Paneer Bread Pizza (JAIN)", price: 170, isVeg: true },
  { name: "Only Cheese Bread Pizza (JAIN)", price: 150, isVeg: true },
  { name: "Margherita Bread Pizza (JAIN)", price: 150, isVeg: true },
  { name: "Cheese & Corn Bread Pizza (JAIN)", price: 120, isVeg: true },

  // Bajri Pizza
  { name: "Farm Pizza (Bajri) (JAIN)", price: 240, isVeg: true },
  { name: "Ramanandi Spl. Pizza (Bajri) (JAIN)", price: 300, isVeg: true },
  { name: "Masala Paneer Pizza (Bajri) (JAIN)", price: 230, isVeg: true },
  { name: "Vegetable Bajri Pizza (JAIN)", price: 200, isVeg: true },
  { name: "Only Cheese Pizza (Bajri) (JAIN)", price: 220, isVeg: true },
  { name: "Margherita Pizza (Bajri) (JAIN)", price: 180, isVeg: true },
  { name: "Corn & Cheese Pizza (Bajri) (JAIN)", price: 200, isVeg: true },
  { name: "Sezwan Pizza (Bajri) (JAIN)", price: 200, isVeg: true },

  // Jawar Pizza
  { name: "Farm Pizza (Jawar) (JAIN)", price: 240, isVeg: true },
  { name: "Ramanandi Spl. Pizza (Jawar) (JAIN)", price: 300, isVeg: true },
  { name: "Masala Paneer Pizza (Jawar) (JAIN)", price: 250, isVeg: true },
  { name: "Vegetable Jawar Pizza (JAIN)", price: 200, isVeg: true },
  { name: "Only Cheese Pizza (Jawar) (JAIN)", price: 220, isVeg: true },
  { name: "Margherita Pizza (Jawar) (JAIN)", price: 220, isVeg: true },
  { name: "Corn & Cheese Pizza (Jawar) (JAIN)", price: 200, isVeg: true },
  { name: "Sezwan Pizza (Jawar) (JAIN)", price: 220, isVeg: true },

  // Besan Pudla (Chilla) - Jain items
  { name: "Plain Pudla (JAIN)", price: 60, isVeg: true },
  { name: "Vegetable Pudla (JAIN)", price: 90, isVeg: true },
  { name: "Bread Pudla Plain (JAIN)", price: 80, isVeg: true },
  { name: "Vegetable Bread Pudla (JAIN)", price: 100, isVeg: true },
  { name: "Vegetable Pudla Sandwich (JAIN)", price: 100, isVeg: true },
  { name: "Paneer Pudla Plain (JAIN)", price: 130, isVeg: true },
  { name: "Paneer Pudla Vegetable (JAIN)", price: 130, isVeg: true },
  { name: "Paneer Bread Pudla Plain (JAIN)", price: 130, isVeg: true },
  { name: "Paneer Veg. Bread Pudla (JAIN)", price: 140, isVeg: true },
  { name: "Paneer Pudla Sandwich Plain (JAIN)", price: 120, isVeg: true },
  { name: "Paneer Veg. Pudla Sandwich (JAIN)", price: 140, isVeg: true },

  // Garlic Bread
  { name: "Cheese Garlic Bread (JAIN)", price: 180, isVeg: true },
  { name: "Corn & Cheese Garlic Bread (JAIN)", price: 190, isVeg: true },
  { name: "Cheese & Onion Garlic Bread (JAIN)", price: 200, isVeg: true },
  { name: "Vegetable Garlic Bread (JAIN)", price: 200, isVeg: true },

  // Milkshakes With Ice Cream
  { name: "Cold Coffee Shake (JAIN)", price: 120, isVeg: true },
  { name: "Rose Shake (JAIN)", price: 120, isVeg: true },
  { name: "Butterscotch Shake (JAIN)", price: 120, isVeg: true },
  { name: "Mango Shake (JAIN)", price: 120, isVeg: true },
  { name: "Chocolate Shake (JAIN)", price: 120, isVeg: true },
  { name: "Thandai Shake (JAIN)", price: 120, isVeg: true }
],

//--Hungrill--//

"Hungrill": [
  { name: "Veg Sandwich", price: 60, isVeg: true },
  { name: "Veg Toast", price: 70, isVeg: true },
  { name: "Samosa Veg Sandwich", price: 80, isVeg: true },
  { name: "Jain Schezwan Toast Sandwich", price: 80, isVeg: true },
  { name: "Samosa Veg Toast", price: 90, isVeg: true },
  { name: "Veg Cheese Sandwich", price: 90, isVeg: true },
  { name: "Veg Cheese Toast", price: 110, isVeg: true },
  { name: "Veg Grilled Sandwich", price: 110, isVeg: true },
  { name: "Samosa Veg Grilled Sandwich", price: 150, isVeg: true },
  { name: "Veg Cheese Grilled Sandwich", price: 150, isVeg: true },
  { name: "Samosa Veg Cheese Grilled Sandwich", price: 190, isVeg: true },
  { name: "Mix Veg Paneer Grilled Sandwich", price: 200, isVeg: true },

  { name: "Bun Maska", price: 25, isVeg: true },
  { name: "Tutti Fruity Bun Maska", price: 30, isVeg: true },
  { name: "Samosa Grill Pav", price: 40, isVeg: true },
  { name: "Lays Pav", price: 40, isVeg: true },
  { name: "Tandoori/Mexican/Peri Peri Samosa Grill Pav", price: 50, isVeg: true },
  { name: "Malai Bun Maska", price: 50, isVeg: true },
  { name: "Cheese Samosa Grill Pav", price: 60, isVeg: true },
  { name: "Nutella Bun Maska", price: 70, isVeg: true },
  { name: "Garlic Bread", price: 70, isVeg: true },
  { name: "Cheese Garlic Bread", price: 90, isVeg: true },
  { name: "Hungrill Special Garlic Bread", price: 130, isVeg: true },

  { name: "Bread Butter", price: 40, isVeg: true },
  { name: "Jam Bread", price: 50, isVeg: true },
  { name: "Vegetable Sandwich", price: 60, isVeg: true },
  { name: "Potato Sandwich", price: 55, isVeg: true },
  { name: "Only Cheese Sandwich", price: 70, isVeg: true },
  { name: "Samosa Sandwich", price: 80, isVeg: true },
  { name: "Cheese Sada Sandwich", price: 90, isVeg: true },
  { name: "Cheese Samosa Sandwich", price: 110, isVeg: true },

  { name: "Veg Toast Sandwich", price: 70, isVeg: true },
  { name: "Potato Toast", price: 70, isVeg: true },
  { name: "Veg Masala Toast", price: 70, isVeg: true },
  { name: "Chocolate Sandwich", price: 80, isVeg: true },
  { name: "Samosa Toast Sandwich", price: 80, isVeg: true },
  { name: "Cheese Chilli Toast", price: 110, isVeg: true },
  { name: "Veg Cheese Toast", price: 110, isVeg: true },
  { name: "Cheese Masala Toast", price: 110, isVeg: true },
  { name: "Cheese Samosa Toast Sandwich", price: 120, isVeg: true },
  { name: "Veg Grill", price: 100, isVeg: true },
  { name: "Masala Grill", price: 100, isVeg: true },
  { name: "Samosa Veg Grill", price: 100, isVeg: true },
  { name: "Veg Cheese Grill", price: 130, isVeg: true },
  { name: "Cheese Veg Masala Grill", price: 130, isVeg: true },
  { name: "Cheese Chilli Grill", price: 150, isVeg: true },
  { name: "Samosa Veg Cheese Grill", price: 150, isVeg: true },
  { name: "Peri Peri Paneer Grill", price: 170, isVeg: true },
  { name: "Paneer Tikka Grill", price: 180, isVeg: true },
  { name: "Mexican Cheese Grill", price: 200, isVeg: true },

  { name: "Margherita", price: 150, isVeg: true },
  { name: "Farm House", price: 190, isVeg: true },
  { name: "Tandoori Paneer", price: 230, isVeg: true },

  { name: "Mexican Grill", price: 140, isVeg: true },
  { name: "Peri Peri Grill", price: 140, isVeg: true },
  { name: "Malwani Grill", price: 140, isVeg: true },
  { name: "Tandoori Paneer Grill", price: 150, isVeg: true },
  { name: "Hungrill Special", price: 180, isVeg: true }
],

//--Sai Amritsar Kulcha--//

"Sai Krupa Amritsar Kulcha": [
  { name: "Aloo Kulcha", price: 50, isVeg: true },
  { name: "Paneer Kulcha", price: 60, isVeg: true },
  { name: "Aloo Onion Kulcha", price: 60, isVeg: true },
  { name: "Gobi Kulcha", price: 60, isVeg: true },
  { name: "Paneer Onion Kulcha", price: 70, isVeg: true },
  { name: "Gobi Onion Kulcha", price: 70, isVeg: true },
  { name: "Soya Onion Kulcha", price: 70, isVeg: true },
  { name: "Mix Kulcha", price: 80, isVeg: true },

  { name: "Aloo Cheese Kulcha", price: 70, isVeg: true },
  { name: "Paneer Cheese Kulcha", price: 80, isVeg: true },
  { name: "Aloo Onion Cheese Kulcha", price: 80, isVeg: true },
  { name: "Mix Cheese Kulcha", price: 80, isVeg: true },
  { name: "Soya Cheese Kulcha", price: 80, isVeg: true },
  { name: "Aloo Double Cheese Kulcha", price: 90, isVeg: true },
  { name: "Paneer Double Cheese Kulcha", price: 110, isVeg: true },
  { name: "Aloo Onion Double Cheese", price: 110, isVeg: true },
  { name: "Mix Double Cheese Kulcha", price: 110, isVeg: true },
  { name: "Soya Double Cheese Kulcha", price: 110, isVeg: true },

  { name: "Gobi Kulcha (JAIN)", price: 60, isVeg: true },
  { name: "Paneer Kulcha (JAIN)", price: 60, isVeg: true },
  { name: "Paneer Cheese Kulcha (JAIN)", price: 80, isVeg: true },
  { name: "Paneer Double Cheese Kulcha (JAIN)", price: 110, isVeg: true },
  { name: "Soya Kulcha", price: 60, isVeg: true },
  { name: "Soya Paneer Kulcha", price: 70, isVeg: true },
  { name: "Soya Gobi Kulcha", price: 70, isVeg: true },
  { name: "Paneer Gobi Cheese Kulcha", price: 90, isVeg: true }
],

//--Smootheory--//

"Smootheory": [
  { "name": "Sweet Lassi", "price": 60, "isVeg": true },
  { "name": "Banana Lassi", "price": 70, "isVeg": true },
  { "name": "Mango Lassi", "price": 80, "isVeg": true },
  { "name": "Strawberry Lassi", "price": 90, "isVeg": true },
  { "name": "Fruit Lassi", "price": 90, "isVeg": true },
  { "name": "Dry Fruits Lassi", "price": 90, "isVeg": true },

  { "name": "Falooda", "price": 100, "isVeg": true },
  { "name": "Kesar Falooda", "price": 110, "isVeg": true },
  { "name": "Kulfi Falooda", "price": 110, "isVeg": true },
  { "name": "Delhi Style Falooda", "price": 130, "isVeg": true },
  { "name": "Royal Falooda", "price": 130, "isVeg": true },
  { "name": "Dry Fruit Falooda", "price": 170, "isVeg": true },
  { "name": "Mix Fruit Falooda", "price": 170, "isVeg": true },

  { "name": "Mississippi Mud Shake", "price": 130, "isVeg": true },
  { "name": "Flakes Mud Shake", "price": 130, "isVeg": true },
  { "name": "5 Star Mud Shake", "price": 140, "isVeg": true },
  { "name": "Oreo Mud Shake", "price": 150, "isVeg": true },
  { "name": "Ferraro Mud Shake", "price": 150, "isVeg": true },
  { "name": "Nabati Mud Shake", "price": 170, "isVeg": true },
  { "name": "Kitkat Mud Shake", "price": 170, "isVeg": true },
  { "name": "Snickers Mud Shake", "price": 170, "isVeg": true },
  { "name": "Nutella Mud Shake", "price": 170, "isVeg": true },
  { "name": "Dairy Milk Mud Shake", "price": 170, "isVeg": true },

  { "name": "Blue Lime Ice Krusher", "price": 80, "isVeg": true },
  { "name": "Red Lime Ice Krusher", "price": 90, "isVeg": true },
  { "name": "Purple Lime Ice Krusher", "price": 90, "isVeg": true },
  { "name": "Green Lime Ice Krusher", "price": 90, "isVeg": true },

  { "name": "Banana Bonkers Milkshake", "price": 80, "isVeg": true },
  { "name": "Musk Melon Milkshake", "price": 80, "isVeg": true },
  { "name": "Chiku Milkshake", "price": 90, "isVeg": true },
  { "name": "Black Current Milkshake", "price": 90, "isVeg": true },
  { "name": "Strawberry Milkshake", "price": 90, "isVeg": true },
  { "name": "Mango Milkshake", "price": 90, "isVeg": true },
  { "name": "Kesar Pista Milkshake", "price": 90, "isVeg": true },
  { "name": "Green Pista Milkshake", "price": 90, "isVeg": true },
  { "name": "Belgian Chocolate Milkshake", "price": 90, "isVeg": true },
  { "name": "Butterscotch Milkshake", "price": 90, "isVeg": true },
  { "name": "Simply Vanilla Milkshake", "price": 100, "isVeg": true },
  { "name": "Kiwi Milkshake", "price": 110, "isVeg": true },
  { "name": "Mango Strawberry Milkshake", "price": 110, "isVeg": true },
  { "name": "Mango & Dates Milkshake", "price": 100, "isVeg": true },
  { "name": "Flake Shake", "price": 100, "isVeg": true },
  { "name": "Peach & Apricot Milkshake", "price": 100, "isVeg": true },
  { "name": "Dates Milkshake", "price": 100, "isVeg": true },
  { "name": "Belgian Chips Milkshake", "price": 110, "isVeg": true },
  { "name": "Hopscotch Milkshake", "price": 110, "isVeg": true },
  { "name": "Monte Carlo Vanilla Milkshake", "price": 110, "isVeg": true },
  { "name": "Oreo Magic Milkshake", "price": 110, "isVeg": true },
  { "name": "Ferrero Rocher Milkshake", "price": 110, "isVeg": true },
  { "name": "Blueberry Milkshake", "price": 110, "isVeg": true },
  { "name": "Cadbury Milkshake", "price": 110, "isVeg": true },
  { "name": "5 Star Milkshake", "price": 110, "isVeg": true },
  { "name": "Dryfruit Milkshake", "price": 120, "isVeg": true },
  { "name": "Cashew Milkshake", "price": 120, "isVeg": true },
  { "name": "Peanut Milkshake", "price": 120, "isVeg": true },
  { "name": "Fig & Honey Milkshake", "price": 130, "isVeg": true },
  { "name": "Dairy Milk Milkshake", "price": 130, "isVeg": true },

  { "name": "Kitkat Premium Milkshake", "price": 130, "isVeg": true },
  { "name": "Snickers Premium Milkshake", "price": 130, "isVeg": true },
  { "name": "Nutella Chocolate Premium Milkshake", "price": 130, "isVeg": true },
  { "name": "Tender Coconut Premium Milkshake", "price": 130, "isVeg": true },
  { "name": "Cranberry Dryfruit Premium Milkshake", "price": 130, "isVeg": true },
  { "name": "Peanut & Nutella Premium Milkshake", "price": 140, "isVeg": true },
  { "name": "Snickers & Dates Premium Milkshake", "price": 140, "isVeg": true },
  { "name": "Lychee & Mango Premium Milkshake", "price": 150, "isVeg": true },
  { "name": "Lotus Biscoff Premium Milkshake", "price": 150, "isVeg": true },

  { "name": "Mango Smoothie", "price": 100, "isVeg": true },
  { "name": "Strawberry Smoothie", "price": 100, "isVeg": true },
  { "name": "Banana Smoothie", "price": 100, "isVeg": true },
  { "name": "Chocolate Smoothie", "price": 100, "isVeg": true },
  { "name": "Butterscotch Smoothie", "price": 110, "isVeg": true },
  { "name": "Black Current Smoothie", "price": 110, "isVeg": true },
  { "name": "Kesar Pista Smoothie", "price": 110, "isVeg": true },
  { "name": "Mint & Vanilla Smoothie", "price": 120, "isVeg": true },
  { "name": "Walk Like an Egyptian Smoothie", "price": 120, "isVeg": true },

  { "name": "Brownie with Ice Cream", "price": 90, "isVeg": true },
  { "name": "Chocolate Fudge", "price": 90, "isVeg": true },
  { "name": "Oreo Cookies Ice Cream", "price": 90, "isVeg": true },
  { "name": "Fruit Salad with Ice Cream", "price": 90, "isVeg": true },
  { "name": "Fruit Overload", "price": 110, "isVeg": true },
  { "name": "Death by Chocolate", "price": 120, "isVeg": true },
  { "name": "Nutella Fudge", "price": 130, "isVeg": true },
  { "name": "Nutella Brownie", "price": 130, "isVeg": true },
  { "name": "Dry Fruit Sundae", "price": 130, "isVeg": true },
  { "name": "Lychee with Ice Cream", "price": 130, "isVeg": true },
  { "name": "Gudbud", "price": 140, "isVeg": true },
  { "name": "Chocolate Roulette", "price": 170, "isVeg": true },

  { "name": "Rock Coffee", "price": 50, "isVeg": true },
  { "name": "Hard Rock Coffee", "price": 90, "isVeg": true },
  { "name": "Strawberry Coffee", "price": 100, "isVeg": true },
  { "name": "Chocolate Coffee", "price": 100, "isVeg": true },
  { "name": "Swedish House Mafia Coffee", "price": 110, "isVeg": true },
  { "name": "Coffee on the Rock", "price": 110, "isVeg": true },
  { "name": "Oreo Coffee", "price": 120, "isVeg": true },
  { "name": "Cream & Cappuccino Coffee", "price": 130, "isVeg": true },
  { "name": "Mud Coffee", "price": 130, "isVeg": true },

  { "name": "Green Apple Boba Mojito", "price": 140, "isVeg": true },
  { "name": "Blueberry Boba Mojito", "price": 140, "isVeg": true },
  { "name": "Raspberry Boba Mojito", "price": 140, "isVeg": true },
  { "name": "Ice Tea Boba Mojito", "price": 140, "isVeg": true },
  { "name": "Orange Boba Mojito", "price": 140, "isVeg": true },
  { "name": "Strawberry Boba Mojito", "price": 140, "isVeg": true },

  { "name": "Chocolate Boba Shake", "price": 150, "isVeg": true },
  { "name": "Strawberry Boba Shake", "price": 150, "isVeg": true },
  { "name": "Mango Boba Shake", "price": 170, "isVeg": true },
  { "name": "Blueberry Boba Shake", "price": 170, "isVeg": true },
  { "name": "Nutella Boba Shake", "price": 200, "isVeg": true },

  { "name": "Classic Boba Coffee", "price": 150, "isVeg": true },
  { "name": "Strawberry Boba Coffee", "price": 160, "isVeg": true },
  { "name": "Oreo Boba Coffee", "price": 160, "isVeg": true },
  { "name": "Nutella Boba Coffee", "price": 180, "isVeg": true },
  { "name": "Mud Boba Coffee", "price": 200, "isVeg": true },

  { "name": "Strawberry Mojito", "price": 80, "isVeg": true },
  { "name": "Raspberry Mojito", "price": 80, "isVeg": true },
  { "name": "Blueberry Mojito", "price": 80, "isVeg": true },
  { "name": "Blue Lagoon Mojito", "price": 80, "isVeg": true },
  { "name": "Green Apple Mojito", "price": 80, "isVeg": true },
  { "name": "Lemon Mint Mojito", "price": 80, "isVeg": true },
  { "name": "Watermelon Mojito", "price": 80, "isVeg": true },
  { "name": "Grenadine Mojito", "price": 80, "isVeg": true },
  { "name": "Passion Fruit Mojito", "price": 80, "isVeg": true },
  { "name": "Mix Fruits Mojito", "price": 80, "isVeg": true },
  { "name": "Bubble Gum Mojito", "price": 80, "isVeg": true },
  { "name": "Cotton Candy Mojito", "price": 80, "isVeg": true },
  { "name": "Peach Ice Tea Mojito", "price": 80, "isVeg": true },
  { "name": "Exotic Berry Ice Tea Mojito", "price": 80, "isVeg": true },
  { "name": "Purple Mist Mojito", "price": 80, "isVeg": true },

  { "name": "Fresh Lime Juice", "price": 40, "isVeg": true },
  { "name": "Masala Lime Juice", "price": 40, "isVeg": true },
  { "name": "Ginger Lime Juice", "price": 40, "isVeg": true },
  { "name": "Watermelon Juice", "price": 50, "isVeg": true },
  { "name": "Mosambi Juice", "price": 50, "isVeg": true },
  { "name": "Pineapple Juice", "price": 60, "isVeg": true },
  { "name": "Moroccan Mint Lime Juice", "price": 60, "isVeg": true },
  { "name": "Orange Juice", "price": 60, "isVeg": true },
  { "name": "Mausambi + Orange Juice", "price": 70, "isVeg": true },
  { "name": "Mausambi + Pineapple Juice", "price": 70, "isVeg": true },
  { "name": "Pineapple + Orange Juice", "price": 70, "isVeg": true },

  { "name": "Musk Melon Special Juice", "price": 80, "isVeg": true },
  { "name": "Watermelon Blossom Juice", "price": 90, "isVeg": true },
  { "name": "Mausambi Blossom Juice", "price": 90, "isVeg": true },
  { "name": "Orange Blossom Juice", "price": 90, "isVeg": true },
  { "name": "Musk Melon Blossom Juice", "price": 90, "isVeg": true }
], 

//--Cafe Jethwa Food Corner--//

"Cafe Jethwa": [
  { "name": "Potato Cheese Shots (8 pcs)", "price": 100, "isVeg": true },
  { "name": "Cheese Corn Triangle (6 pcs)", "price": 80, "isVeg": true },
  { "name": "Veggie Nugget (8 pcs)", "price": 80, "isVeg": true },
  { "name": "Cheese Garlic Bread (4 pcs)", "price": 80, "isVeg": true },
  { "name": "Chilly Cheese Garlic Bread (4 pcs)", "price": 180, "isVeg": true },
  { "name": "Schezwan Cheese Garlic Bread (4 pcs)", "price": 180, "isVeg": true },
  { "name": "Tandoori Cheese Garlic Bread (4 pcs)", "price": 180, "isVeg": true },
  { "name": "Chipotle Cheese Garlic Bread (4 pcs)", "price": 180, "isVeg": true },

  { "name": "Masala Twister", "price": 80, "isVeg": true },
  { "name": "Salsa Twister", "price": 80, "isVeg": true },
  { "name": "Cheese Twister", "price": 100, "isVeg": true },
  { "name": "Mayo Twister", "price": 100, "isVeg": true },
  { "name": "Peri Peri Twister", "price": 100, "isVeg": true },
  { "name": "Tandoori Twister", "price": 100, "isVeg": true },
  { "name": "Schezwan Twister", "price": 100, "isVeg": true },
  { "name": "Chipotle Twister", "price": 100, "isVeg": true },
  { "name": "Thousand Island Twister", "price": 100, "isVeg": true },
  { "name": "Harissa Twister", "price": 100, "isVeg": true },
  { "name": "Chilly Garlic Twister", "price": 100, "isVeg": true },
  { "name": "Cheese Jalapeno Twister", "price": 100, "isVeg": true },
  { "name": "Mayo Garlic Twister", "price": 120, "isVeg": true },
  { "name": "Chocolate Twister", "price": 120, "isVeg": true },
  { "name": "Chilly Garlic Cheese Twister", "price": 120, "isVeg": true },
  { "name": "Mayo Garlic Cheese Twister", "price": 120, "isVeg": true },
  { "name": "Peri Peri Cheese Twister", "price": 120, "isVeg": true },
  { "name": "Peri Peri Chipotle Twister", "price": 120, "isVeg": true },
  { "name": "Cheese Jalapeno Twister", "price": 120, "isVeg": true },
  { "name": "Cheese Thousand Island Twister", "price": 120, "isVeg": true },
  { "name": "Cheese Harissa Twister", "price": 120, "isVeg": true },
  { "name": "Peri Peri Tandoori Twister", "price": 120, "isVeg": true },
  { "name": "Schezwan Chipotle Twister", "price": 120, "isVeg": true },
  { "name": "Thousand Island Peri Peri Twister", "price": 120, "isVeg": true },
  { "name": "Mayo Peri Peri Twister", "price": 140, "isVeg": true },
  { "name": "Cheese Mayo Peri Peri Twister", "price": 140, "isVeg": true },

  { "name": "Plain Fries", "price": 80, "isVeg": true },
  { "name": "Salsa Fries", "price": 80, "isVeg": true },
  { "name": "Cheese Fries", "price": 100, "isVeg": true },
  { "name": "Chilly Fries", "price": 100, "isVeg": true },
  { "name": "Peri Peri Fries", "price": 100, "isVeg": true },
  { "name": "Chipotle Fries", "price": 100, "isVeg": true },
  { "name": "Thousand Island Fries", "price": 100, "isVeg": true },
  { "name": "Chilly Garlic Fries", "price": 100, "isVeg": true },
  { "name": "Cheese Jalapeno Fries", "price": 100, "isVeg": true },
  { "name": "Barbeque Fries", "price": 100, "isVeg": true },
  { "name": "Harissa Fries", "price": 100, "isVeg": true },
  { "name": "Thousand Island Cheese Fries", "price": 120, "isVeg": true },
  { "name": "Chipotle Cheese Fries", "price": 120, "isVeg": true },
  { "name": "Chilly Garlic Cheese Fries", "price": 120, "isVeg": true },
  { "name": "Mayo Fries", "price": 120, "isVeg": true },
  { "name": "Schezwan Fries", "price": 120, "isVeg": true },
  { "name": "Chilly Garlic Mayo Fries", "price": 120, "isVeg": true },
  { "name": "Schezwan Cheese Fries", "price": 120, "isVeg": true },
  { "name": "Tandoori Fries", "price": 120, "isVeg": true },
  { "name": "Peri Peri Cheese Fries", "price": 120, "isVeg": true },
  { "name": "Chocolate Fries", "price": 120, "isVeg": true },
  { "name": "Peri Peri Mayo Fries", "price": 140, "isVeg": true },
  { "name": "Peri Peri Schezwan Fries", "price": 140, "isVeg": true },
  { "name": "Peri Peri Chipotle Fries", "price": 140, "isVeg": true },
  { "name": "Peri Peri Tandoori Fries", "price": 140, "isVeg": true },
  { "name": "Thousand Island Fries", "price": 140, "isVeg": true },
  { "name": "Tandoori Fries", "price": 140, "isVeg": true },
  { "name": "Thousand Island Cheese Fries", "price": 150, "isVeg": true },
  { "name": "Tandoori Cheese Fries", "price": 150, "isVeg": true },
  { "name": "Thousand Island Tandoori Cheese Fries", "price": 150, "isVeg": true },

  { "name": "Plain Masala Fries", "price": 110, "isVeg": true },
  { "name": "Salsa Masala Fries", "price": 130, "isVeg": true },
  { "name": "Chilly Masala Fries", "price": 130, "isVeg": true },
  { "name": "Cheese Masala Fries", "price": 130, "isVeg": true },
  { "name": "Mayo Masala Fries", "price": 130, "isVeg": true },
  { "name": "Chipotle Masala Fries", "price": 130, "isVeg": true },
  { "name": "Peri Peri Masala Fries", "price": 130, "isVeg": true },
  { "name": "Tandoori Masala Fries", "price": 130, "isVeg": true },
  { "name": "Thousand Island Masala Fries", "price": 130, "isVeg": true },
  { "name": "Schezwan Masala Fries", "price": 130, "isVeg": true },
  { "name": "Chilly Garlic Masala Fries", "price": 130, "isVeg": true },
  { "name": "Mayo Garlic Fries", "price": 130, "isVeg": true },
  { "name": "Cheese Jalapeno Fries", "price": 130, "isVeg": true },
  { "name": "Barbeque Masala Fries", "price": 130, "isVeg": true },
  { "name": "Chilly Cheese Masala Fries", "price": 150, "isVeg": true },
  { "name": "Chilly Garlic Mayo Masala Fries", "price": 150, "isVeg": true },
  { "name": "Chilly Cheese Mayo Masala Fries", "price": 150, "isVeg": true },
  { "name": "Barbeque Cheese Masala Fries", "price": 150, "isVeg": true },
  { "name": "Cheese Mayo Masala Fries", "price": 150, "isVeg": true },
  { "name": "Mayo Chilly Fries", "price": 150, "isVeg": true },
  { "name": "Mayo Peri Peri Masala Fries", "price": 150, "isVeg": true },
  { "name": "Salsa Cheese Masala Fries", "price": 150, "isVeg": true },
  { "name": "Tandoori Chilly Masala Fries", "price": 150, "isVeg": true },
  { "name": "Schezwan Cheese Masala Fries", "price": 150, "isVeg": true },
  { "name": "Tandoori Peri Peri Masala Fries", "price": 150, "isVeg": true },
  { "name": "Tandoori Thousand Island Masala Fries", "price": 150, "isVeg": true },
  { "name": "Thousand Island Cheese Masala Fries", "price": 150, "isVeg": true },
  { "name": "Cheese Peri Peri Masala Fries", "price": 150, "isVeg": true },
  { "name": "Schezwan Peri Peri Cheese Masala Fries", "price": 170, "isVeg": true },

  { "name": "Aloo Tikki Burger", "price": 80, "isVeg": true },
  { "name": "Vegetable Burger", "price": 110, "isVeg": true },
  { "name": "Cheese Aloo Tikki Burger", "price": 110, "isVeg": true },
  { "name": "Cheese Vegetable Burger", "price": 140, "isVeg": true },
  { "name": "Grill Samosa Burger", "price": 110, "isVeg": true },
  { "name": "Cheese Grill Samosa Burger", "price": 130, "isVeg": true },
  { "name": "Grill Samosa Vegetable Burger", "price": 150, "isVeg": true },
  { "name": "Cheese Grill Samosa Vegetable Burger", "price": 150, "isVeg": true },
  { "name": "Chili Garlic Grill Samosa Vegetable Burger", "price": 180, "isVeg": true },
  { "name": "Chili Garlic Cheese Grill Samosa Vegetable Burger", "price": 180, "isVeg": true },
  { "name": "Tandoori Aloo Tikki Burger", "price": 120, "isVeg": true },
  { "name": "Tandoori Cheese Aloo Tikki Burger", "price": 140, "isVeg": true },
  { "name": "Tandoori Vegetable Burger", "price": 190, "isVeg": true },
  { "name": "Tandoori Cheese Vegetable Burger", "price": 190, "isVeg": true },
  { "name": "Chili Garlic Vegetable Burger", "price": 160, "isVeg": true },
  { "name": "Chili Garlic Cheese Vegetable Burger", "price": 190, "isVeg": true },
  { "name": "Paneer Vegetable Burger", "price": 160, "isVeg": true },
  { "name": "Paneer Schezwan Vegetable Burger", "price": 170, "isVeg": true },
  { "name": "Paneer Cheese Vegetable Burger", "price": 190, "isVeg": true },
  { "name": "Paneer Cheese Schezwan Vegetable Burger", "price": 200, "isVeg": true },

  { "name": "Margherita Pizza (8 inch, Jain available)", "price": 130, "isVeg": true },
  { "name": "Capsicum Onion Tomato Pizza (8 inch, Jain available)", "price": 170, "isVeg": true },
  { "name": "Capsicum Tomato Pizza (8 inch, Jain available)", "price": 170, "isVeg": true },
  { "name": "Tandoori Vegetable Pizza (8 inch, Jain available)", "price": 200, "isVeg": true },
  { "name": "Tandoori Paneer Vegetable Pizza (8 inch, Jain available)", "price": 240, "isVeg": true },
  { "name": "Schezwan Vegetable Pizza (8 inch, Jain available)", "price": 200, "isVeg": true },
  { "name": "Paneer Schezwan Pizza (8 inch, Jain available)", "price": 240, "isVeg": true },
  { "name": "Onion Capsicum Pizza (8 inch, Jain available)", "price": 170, "isVeg": true },
  { "name": "Corn Pizza (8 inch, Jain available)", "price": 170, "isVeg": true },
  { "name": "Chili Garlic Vegetable Pizza (8 inch, Jain available)", "price": 200, "isVeg": true },
  { "name": "Chili Garlic Paneer Vegetable Pizza (8 inch, Jain available)", "price": 240, "isVeg": true },
  { "name": "Peri Peri Vegetable Pizza (8 inch, Jain available)", "price": 200, "isVeg": true },
  { "name": "Peri Peri Paneer Vegetable Pizza (8 inch, Jain available)", "price": 240, "isVeg": true },
  { "name": "Mango Pizza (8 inch, Jain available)", "price": 240, "isVeg": true },
  { "name": "Aloo Tikki Pizza (8 inch, Jain available)", "price": 240, "isVeg": true },
  { "name": "Fried Pizza (8 inch, Jain available)", "price": 220, "isVeg": true },
  { "name": "Mushroom Vegetable Pizza (8 inch, Jain available)", "price": 220, "isVeg": true },
  { "name": "CJ Special Pizza (8 inch, Jain available)", "price": 310, "isVeg": true },
  { "name": "Barbeque Vegetable Pizza (8 inch, Jain available)", "price": 220, "isVeg": true },
  { "name": "Barbeque Paneer Vegetable Pizza (8 inch, Jain available)", "price": 270, "isVeg": true },

  { "name": "Chocolate Milkshake", "price": 120, "isVeg": true },
  { "name": "Coffee Milkshake", "price": 100, "isVeg": true },
  { "name": "Choco Chip Chocolate Milkshake", "price": 130, "isVeg": true },
  { "name": "Butterscotch Milkshake", "price": 100, "isVeg": true },
  { "name": "Vanilla Milkshake", "price": 100, "isVeg": true },
  { "name": "Coffee Chocolate Milkshake", "price": 160, "isVeg": true },
  { "name": "Oreo Milkshake", "price": 150, "isVeg": true },
  { "name": "Oreo Chocolate Milkshake", "price": 190, "isVeg": true },
  { "name": "Kit Kat Milkshake", "price": 160, "isVeg": true },
  { "name": "Kit Kat Chocolate Milkshake", "price": 190, "isVeg": true },
  { "name": "Oreo Kit Kat Milkshake", "price": 190, "isVeg": true },
  { "name": "Strawberry Milkshake (Seasonal)", "price": 140, "isVeg": true },
  { "name": "Black Current Milkshake", "price": 120, "isVeg": true },
  { "name": "Rose Milkshake", "price": 130, "isVeg": true },
  { "name": "Mango Milkshake (Seasonal)", "price": 170, "isVeg": true },
  { "name": "Five Star Milkshake", "price": 150, "isVeg": true },

  { "name": "Plain Wedges", "price": 100, "isVeg": true },
  { "name": "Salsa Wedges", "price": 100, "isVeg": true },
  { "name": "Cheese Wedges", "price": 120, "isVeg": true },
  { "name": "Chilly Wedges", "price": 120, "isVeg": true },
  { "name": "Mayo Wedges", "price": 120, "isVeg": true },
  { "name": "Peri Peri Wedges", "price": 120, "isVeg": true },
  { "name": "Chilly Peri Peri Wedges", "price": 120, "isVeg": true },
  { "name": "Chipotle Wedges", "price": 120, "isVeg": true },
  { "name": "Tandoori Wedges", "price": 120, "isVeg": true },
  { "name": "Thousand Island Wedges", "price": 120, "isVeg": true },
],
//--Uncle Corner--//
  "Uncles Corner" : [
  { "name": "Samosa", "price": 20, "isVeg": true },
  { "name": "Grilled Samosa Pav", "price": 40, "isVeg": true },
  { "name": "Cheese Grilled Samosa Pav", "price": 55, "isVeg": true },
  { "name": "Grilled Lays Pav", "price": 35, "isVeg": true },
  { "name": "Cheese Grilled Lays Pav", "price": 50, "isVeg": true },

  { "name": "Veg Sandwich", "price": 55, "isVeg": true },
  { "name": "Veg Cheese Sandwich", "price": 70, "isVeg": true },
  { "name": "Grilled Veg Sandwich", "price": 65, "isVeg": true },
  { "name": "Grilled Cheese Veg Sandwich", "price": 85, "isVeg": true },
  { "name": "Veg Lays Sandwich", "price": 65, "isVeg": true },
  { "name": "Veg Cheese Lays Sandwich", "price": 80, "isVeg": true },
  { "name": "Grilled Veg Lays Sandwich", "price": 75, "isVeg": true },
  { "name": "Grilled Veg Lays Cheese Sandwich", "price": 90, "isVeg": true },
  { "name": "Potato Sandwich", "price": 50, "isVeg": true },
  { "name": "Masala Toast", "price": 75, "isVeg": true },
  { "name": "Cheese Masal Toast", "price": 90, "isVeg": true },
  { "name": "Grilled Potato Sandwich", "price": 60, "isVeg": true },
  { "name": "Potato Cheese Sandwich", "price": 65, "isVeg": true },
  { "name": "Grilled Potato Cheese Sandwich", "price": 75, "isVeg": true },
  { "name": "Lays Potato Sandwich", "price": 60, "isVeg": true },
  { "name": "Cheese Lays Potato Sandwich", "price": 75, "isVeg": true },
  { "name": "Grilled Lays Potato Sandwich", "price": 70, "isVeg": true },
  { "name": "Cheese Grilled Lays Potato Sandwich", "price": 85, "isVeg": true },
  { "name": "Veg Samosa Sandwich", "price": 75, "isVeg": true },
  { "name": "Veg Cheese Samosa Sandwich", "price": 90, "isVeg": true },
  { "name": "Veg Samosa Lays Sandwich", "price": 85, "isVeg": true },
  { "name": "Veg Cheese Samosa Lays Sandwich", "price": 100, "isVeg": true },
  { "name": "Veg Grilled Samosa Sandwich", "price": 85, "isVeg": true },
  { "name": "Veg Cheese Grilled Samosa Sandwich", "price": 100, "isVeg": true },
  { "name": "Veg Grilled Samosa Lays Sandwich", "price": 95, "isVeg": true },
  { "name": "Veg Cheese Grilled Lays Samosa Sandwich", "price": 110, "isVeg": true },
  { "name": "Cheese Chilly Sandwich", "price": 90, "isVeg": true },
  { "name": "Cheese Chilly Samosa Sandwich", "price": 100, "isVeg": true },
  { "name": "Cheese Chilly Lays Sandwich", "price": 100, "isVeg": true },
  { "name": "Cheese Chilly Lays Samosa Sandwich", "price": 110, "isVeg": true },
  { "name": "Chocolate Sandwich", "price": 20, "isVeg": true },
  { "name": "Bread Butter", "price": 25, "isVeg": true },
  { "name": "Bread Butter Cheese", "price": 40, "isVeg": true },
  { "name": "Bread Butter Toast", "price": 35, "isVeg": true },
  { "name": "Bread Butter Cheese Toast", "price": 50, "isVeg": true }
],

//--Priya Foods--//

"Priya Foods": [
  { "name": "Jain Vada Pav", "price": 25, "isVeg": true },
  { "name": "Jain Samosa Pav", "price": 25, "isVeg": true },
  { "name": "Jain Samosa", "price": 20, "isVeg": true },
  { "name": "Single Jain Vada", "price": 17, "isVeg": true },

  { "name": "Idli Chatni (2 pcs)", "price": 30, "isVeg": true },
  { "name": "Idli Chatni Sambar", "price": 40, "isVeg": true },
  { "name": "Medu Vada (2 pcs)", "price": 45, "isVeg": true },
  { "name": "1 Medu Vada + 1 Idli with Chatni & Sambar", "price": 45, "isVeg": true },
  { "name": "Vada Pav", "price": 20, "isVeg": true },
  { "name": "Single Vada", "price": 17, "isVeg": true },
  { "name": "Regular Samosa", "price": 20, "isVeg": true },
  { "name": "Regular Samosa Pav", "price": 25, "isVeg": true }
], 

//--Magic Momos--//

"Magic Momos": [
  { "name": "Veg Steam Momos (6 pcs)", "price": 80, "isVeg": true },
  { "name": "Achari Steam Momos (6 pcs)", "price": 100, "isVeg": true },
  { "name": "Schezwan Steam Momos (6 pcs)", "price": 100, "isVeg": true },
  { "name": "Paneer Steam Momos (6 pcs)", "price": 100, "isVeg": true },
  { "name": "Maggi Steam Momos (6 pcs)", "price": 100, "isVeg": true },
  { "name": "Cheese Corn Steam Momos (6 pcs)", "price": 110, "isVeg": true },

  { "name": "Veg Fried Momos", "price": 100, "isVeg": true },
  { "name": "Achari Fried Momos", "price": 110, "isVeg": true },
  { "name": "Schezwan Fried Momos", "price": 110, "isVeg": true },
  { "name": "Paneer Fried Momos", "price": 120, "isVeg": true },
  { "name": "Maggi Fried Momos", "price": 120, "isVeg": true },
  { "name": "Cheese Corn Fried Momos", "price": 130, "isVeg": true },

  { "name": "Veg Gravy Momos", "price": 120, "isVeg": true },
  { "name": "Achari Gravy Momos", "price": 130, "isVeg": true },
  { "name": "Schezwan Gravy Momos", "price": 130, "isVeg": true },
  { "name": "Paneer Gravy Momos", "price": 130, "isVeg": true },
  { "name": "Maggi Gravy Momos", "price": 140, "isVeg": true },
  { "name": "Cheese Corn Gravy Momos", "price": 150, "isVeg": true },

  { "name": "Veg Tandoori Momos", "price": 160, "isVeg": true },
  { "name": "Achari Tandoori Momos", "price": 170, "isVeg": true },
  { "name": "Schezwan Tandoori Momos", "price": 170, "isVeg": true },
  { "name": "Paneer Tandoori Momos", "price": 180, "isVeg": true },
  { "name": "Maggi Tandoori Momos", "price": 180, "isVeg": true },
  { "name": "Cheese Corn Tandoori Momos", "price": 190, "isVeg": true }
],

//--moctails on Fire--//

"Mocktails on Fire": [
  { "name": "Boba Pooping Pearls (Water Base)", "price": 100, "isVeg": true },
  { "name": "Boba Pooping Pearls (Soda Base)", "price": 120, "isVeg": true },
  { "name": "Boba Pooping Pearls (Milk Base)", "price": 150, "isVeg": true },

  { "name": "Lychee Boba (Water Base)", "price": 100, "isVeg": true },
  { "name": "Lychee Boba (Soda Base)", "price": 120, "isVeg": true },
  { "name": "Lychee Boba (Milk Base)", "price": 150, "isVeg": true },

  { "name": "Strawberry Boba (Water Base)", "price": 100, "isVeg": true },
  { "name": "Strawberry Boba (Soda Base)", "price": 120, "isVeg": true },
  { "name": "Strawberry Boba (Milk Base)", "price": 150, "isVeg": true },

  { "name": "Coffee Boba (Water Base)", "price": 100, "isVeg": true },
  { "name": "Coffee Boba (Soda Base)", "price": 120, "isVeg": true },
  { "name": "Coffee Boba (Milk Base)", "price": 150, "isVeg": true },

  { "name": "Green Apple Boba (Water Base)", "price": 100, "isVeg": true },
  { "name": "Green Apple Boba (Soda Base)", "price": 120, "isVeg": true },
  { "name": "Green Apple Boba (Milk Base)", "price": 150, "isVeg": true },

  { "name": "Coconut Shake Coconut Tadgola", "price": 180, "isVeg": true },
  { "name": "Coconut Punch", "price": 180, "isVeg": true },
  { "name": "Coconut Khajur", "price": 200, "isVeg": true },
  { "name": "Coconut Sitafal", "price": 200, "isVeg": true },
  { "name": "Coconut Litchi", "price": 180, "isVeg": true },

  { "name": "Red Bull Mojito", "price": 180, "isVeg": true },
  { "name": "Red Kiwi", "price": 180, "isVeg": true },
  { "name": "Strawberry Wings", "price": 180, "isVeg": true },
  { "name": "Passion Mojito", "price": 200, "isVeg":true}
],
//-Dilkhush Dabeli Centre--//
"Dilkhush Dabeli Centre" : [
    {
      "name": "Butter Dabeli",
      "price": 30,
      "isVeg": true
    }
  ],


};
const categoryFilters = [
  { name: 'Pizza', keywords: ['pizza', 'pizzatta'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557648908-f3yzue48jb4-1756557650705_hsfuv5_screenshot_2025-08-3.png' },
  { name: 'Sandwich', keywords: ['sandwich', 'panini', 'bagel'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552327686-rhswl7x25uh-1756552327877_35f5o9_screenshot_2025-08-3.png' },
  { name: 'Rolls & Wraps', keywords: ['roll', 'frankie', 'wrap'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557561163-4v9aunjt71f-1756557563014_zdepzl_screenshot_2025-08-3.png' },
  { name: 'Burger', keywords: ['burger'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557328450-pmk9jldolg-1756557330397_m33evn_screenshot_2025-08-3.png' },
  { name: 'Street Food', keywords: ['vada pav', 'samosa', 'dabeli', 'bhel', 'pakoda', 'dhokla', 'locho', 'khamani', 'patra', 'chaat', 'pav', 'pudla', 'bhurji', 'idli'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557328450-pmk9jldolg-1756557330397_m33evn_screenshot_2025-08-3.png' },
  { name: 'Breads & Kulcha', keywords: ['kulcha', 'garlic bread', 'roti', 'naan', 'paratha', 'bun maska'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557214213-k5uo08e6do-1756557215834_tm6edh_screenshot_2025-08-3.png' },
  { name: 'Chinese', keywords: ['noodles', 'manchurian', 'ramen', 'schezwan', 'hakka'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756556600027-5ktrv5mxz6b-1756556600301_mzvjpe_screenshot_2025-08-3.png' },
  { name: 'Momos', keywords: ['momos'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557061089-powevnv8brq-1756557061231_soqr9p_screenshot_2025-08-3.png' },
  { name: 'Pasta', keywords: ['pasta', 'spaghetti'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557131451-77u7ytc8hjh-1756557132811_xpym3t_screenshot_2025-08-3.png' },
  { name: 'Sushi', keywords: ['sushi'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552882328-c8w8if74axq-1756552883691_shkbyo_screenshot_2025-08-3.png' },
  { name: 'Fries', keywords: ['fries', 'wedges', 'twister'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552720273-nor1l0jr2w-1756552722137_2vbqus_screenshot_2025-08-3.png' },
  { name: 'Desserts', keywords: ['waffle', 'pastry', 'brownie', 'cake', 'falooda', 'sundae', 'sheera'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552423146-33vmee7qwcc-1756552425289_3gqwk8_screenshot_2025-08-3.png' },
  { name: 'Beverages', keywords: ['juice', 'shake', 'tea', 'coffee', 'lassi', 'mojito', 'boba', 'blossom', 'limbu', 'coco'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552468201-sb2j0y8fah-1756552470016_6s1tf6_screenshot_2025-08-3.png' },
];


// --- COMPONENTS ---
const Header = ({ onCartClick, cartItems, searchQuery, onSearchChange }) => (
    <header className="bg-white shadow-sm p-4 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-50 border-b">
<img src={logo} alt="MyEzz Logo" className="h-25" />        
        <div className="relative flex-1 max-w-xl mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>

        <div className="flex items-center space-x-4">
            <button onClick={onCartClick} className="relative text-gray-600 hover:text-orange-500">
                <CartIcon />
                {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
            </button>
        </div>
    </header>
);

const FilterCheckbox = ({ label, description, checked, onChange }) => (
    <div className="relative">
        {checked && <div className="absolute left-[-1rem] top-0 h-full w-1 bg-orange-500"></div>}
        <label className="flex items-start space-x-3 cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-5 w-5 text-orange-500 rounded-sm border-gray-300 bg-gray-100 focus:ring-orange-500" />
            <span className="text-gray-700">
                {label}
                {description && <p className="text-xs text-gray-500">{description}</p>}
            </span>
        </label>
    </div>
);

const Sidebar = ({ selectedCuisines, setSelectedCuisines, isOpen }) => {
    const handleCuisineChange = (cuisine) => {
        setSelectedCuisines(prev =>
            prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
        );
    };

    const clearFilters = () => {
        setSelectedCuisines([]);
    };

    return (
        <aside className={`w-72 flex-shrink-0 p-4 space-y-6 bg-white md:bg-transparent md:block transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
            <div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">Cuisine Type</h3>
                <div className="flex flex-wrap gap-2">
                    {["Jain", "Non-Jain", "Beverages"].map(cuisine => (
                        <button key={cuisine} onClick={() => handleCuisineChange(cuisine)} className={`px-3 py-1 text-sm border rounded-lg transition-colors ${selectedCuisines.includes(cuisine) ? 'bg-orange-500 text-white border-orange-500' : 'text-gray-700 hover:bg-orange-50'}`}>{cuisine}</button>
                    ))}
                </div>
            </div>
            <div className="sticky bottom-4 space-y-2 pt-4">
                <button onClick={clearFilters} className="w-full text-gray-600 font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors">Clear All</button>
            </div>
        </aside>
    );
};

const RestaurantCard = ({ name, distance, cuisines, rating, reviews, time, price, image, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
        <div className="relative">
            <img src={image} alt={name} className="w-full h-40 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }} />
            <div className="absolute top-0 right-0 p-2">
                <button className="text-white opacity-80 hover:opacity-100 hover:text-orange-500 transition-colors">
                    <HeartIcon />
                </button>
            </div>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded-md text-sm">
                    <StarIcon />
                    <span className="ml-1 font-semibold">{rating}</span>
                </div>
            </div>
            <p className="text-gray-500 text-sm truncate">{cuisines.join(', ')}</p>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span>{distance} km</span>
                <span>{time} mins</span>
                
            </div>
        </div>
    </div>
);

const HomePage = ({ setSelectedRestaurant, searchQuery }) => {
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredRestaurants = restaurantData.filter(restaurant => {
        const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.some(c => restaurant.cuisines.includes(c));
        
        if (!matchesCuisine) {
            return false;
        }

        if (searchQuery.trim() === '') {
            return true;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();
        const matchesName = restaurant.name.toLowerCase().includes(lowerCaseQuery);
        
        if (matchesName) {
            return true;
        }

        const menuItems = menuData[restaurant.name] || [];
        const matchesMenuItem = menuItems.some(item =>
            item.name.toLowerCase().includes(lowerCaseQuery)
        );

        return matchesMenuItem;
    });

    const jainRestaurants = filteredRestaurants.filter(r => r.cuisines.includes('Jain'));
    const nonJainRestaurants = filteredRestaurants.filter(r => r.cuisines.includes('Non-Jain'));
    const beverageRestaurants = filteredRestaurants.filter(r => r.cuisines.includes('Beverages'));

    return (
        <div className="flex max-w-screen-xl mx-auto">
            <Sidebar selectedCuisines={selectedCuisines} setSelectedCuisines={setSelectedCuisines} isOpen={showFilters} />
            <main className="flex-1 p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">{filteredRestaurants.length} restaurants found</p>
                    <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center px-3 py-2 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">
                        <FilterIcon /> Filters
                    </button>
                </div>
                
                {filteredRestaurants.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No restaurants or dishes found matching your search.</p>
                    </div>
                )}

                {searchQuery.trim() === '' && selectedCuisines.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {restaurantData.map((restaurant, index) => (
                            <RestaurantCard key={index} {...restaurant} onClick={() => setSelectedRestaurant(restaurant)} />
                        ))}
                    </div>
                ) : (
                    <>
                         {filteredRestaurants.length > 0 && (selectedCuisines.length === 0 || searchQuery.trim() !== '') && (
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredRestaurants.map((restaurant, index) => (
                                    <RestaurantCard key={index} {...restaurant} onClick={() => setSelectedRestaurant(restaurant)} />
                                ))}
                            </div>
                        )}
                        
                        {selectedCuisines.length > 0 && searchQuery.trim() === '' && (
                            <>
                                {jainRestaurants.length > 0 && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-4">Jain</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {jainRestaurants.map((restaurant, index) => (
                                                <RestaurantCard key={index} {...restaurant} onClick={() => setSelectedRestaurant(restaurant)} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {nonJainRestaurants.length > 0 && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold mb-4">Non-Jain</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {nonJainRestaurants.map((restaurant, index) => (
                                                <RestaurantCard key={index} {...restaurant} onClick={() => setSelectedRestaurant(restaurant)} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {beverageRestaurants.length > 0 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Beverages</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {beverageRestaurants.map((restaurant, index) => (
                                                <RestaurantCard key={index} {...restaurant} onClick={() => setSelectedRestaurant(restaurant)} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                             </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};


const RestaurantMenuPage = ({ restaurant, onBack, cartItems, setCartItems, searchQuery }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const items = menuData[restaurant.name] || [];

    useEffect(() => {
        setSelectedCategory('All');
    }, [restaurant]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(i => i.name === item.name);
            if (itemExists) {
                return prevItems.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const availableCategories = categoryFilters.filter(category =>
        items.some(item =>
            category.keywords.some(keyword =>
                item.name.toLowerCase().includes(keyword)
            )
        )
    );

    // Filter the menu items based on the currently selected category
    const categoryFilteredItems = selectedCategory === 'All'
        ? items
        : items.filter(item => {
            const categoryInfo = categoryFilters.find(cat => cat.name === selectedCategory);
            if (!categoryInfo) return false;
            const lowerCaseName = item.name.toLowerCase();
            return categoryInfo.keywords.some(keyword => lowerCaseName.includes(keyword));
        });

    const filteredMenuItems = searchQuery.trim() === ''
        ? categoryFilteredItems
        : categoryFilteredItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="max-w-screen-xl mx-auto p-4 sm:p-8 text-gray-800">
            <button onClick={onBack} className="flex items-center font-semibold text-orange-500 mb-4">
                <BackIcon />
                <span className="ml-2">Back to Restaurants</span>
            </button>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-2">{restaurant.name}</h2>
                    <p className="text-gray-500 mb-4">{restaurant.cuisines.join(', ')}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <StarIcon filled={true} />
                            <span className="ml-1 font-semibold">{restaurant.rating} ({restaurant.reviews} reviews)</span>
                        </div>
                        <span>•</span>
                        <span>{restaurant.time} mins</span>
                        
                        
                    </div>
                </div>

                {/* --- CATEGORY FILTER UI --- */}
                {availableCategories.length > 0 && searchQuery.trim() === '' && (
                    <div className="p-6 border-t">
                        <h3 className="text-xl font-bold mb-4">Categories</h3>
                        <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`flex-shrink-0 text-center p-2 rounded-lg transition-all duration-200 ${selectedCategory === 'All' ? 'bg-orange-100' : 'hover:bg-gray-100'}`}
                            >
                                <div className={`w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-2 border-2 ${selectedCategory === 'All' ? 'border-orange-500' : 'border-transparent'}`}>
                                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-lg font-semibold text-gray-700">All</span>
                                    </div>
                                </div>
                                <span className={`text-sm font-semibold ${selectedCategory === 'All' ? 'text-orange-600' : 'text-gray-600'}`}>
                                    All
                                </span>
                            </button>

                            {availableCategories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`flex-shrink-0 text-center p-2 rounded-lg transition-all duration-200 ${selectedCategory === cat.name ? 'bg-orange-100' : 'hover:bg-gray-100'}`}
                                >
                                    <div className={`w-20 h-20 rounded-full mx-auto mb-2 border-2 ${selectedCategory === cat.name ? 'border-orange-500' : 'border-transparent'}`}>
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                                    </div>
                                    <span className={`text-sm font-semibold ${selectedCategory === cat.name ? 'text-orange-600' : 'text-gray-600'}`}>
                                        {cat.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- FILTERED MENU LIST --- */}
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">
                        {searchQuery.trim() !== '' ? 'Search Results' : (selectedCategory === 'All' ? 'Full Menu' : selectedCategory)}
                    </h3>
                    {filteredMenuItems.length > 0 ? (
                        <div className="space-y-4">
                            {filteredMenuItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-gray-50">
                                    <div>
                                        <h4 className="font-semibold">{item.name}</h4>
                                        {item.price && <p className="text-sm text-gray-500">₹{item.price}</p>}
                                    </div>
                                    {item.price && <button onClick={() => addToCart(item)} className="px-4 py-2 text-sm font-bold text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">ADD</button>}
                                </div>
                            ))}
                        </div>
                    ) : (
                         <p className="text-gray-500 text-center py-8">No items found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


const CheckoutPage = ({ cartItems, onBack, address, setAddress, setCartItems, onPayNow }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 30;
    const total = subtotal + deliveryFee;

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const removeItem = (itemName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                    <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                <p>₹{item.price * item.quantity}</p>
                                <button onClick={() => removeItem(item.name)} className="ml-4 text-red-500 hover:text-red-700">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 && <button onClick={() => setCartItems([])} className="text-sm text-red-500 mt-2">Clear Cart</button>}
                <div className="mt-6 pt-6 border-t space-y-2">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>₹{deliveryFee.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg"><span>Grand Total</span><span>₹{total.toFixed(2)}</span></div>
                </div>
                <div className="mt-6">
                    <h3 className="font-bold mb-2">Delivery Information</h3>
                    <input
                        type="text"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleAddressChange}
                        placeholder="Full Name"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="email"
                        name="emailId"
                        value={address.emailId}
                        onChange={handleAddressChange}
                        placeholder="Email ID"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={handleAddressChange}
                        placeholder="Phone Number"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="fullAddress"
                        value={address.fullAddress}
                        onChange={handleAddressChange}
                        placeholder="Full Delivery Address"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                </div>
                <button onClick={() => onPayNow(address)} className="w-full mt-6 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">Pay Now</button>
            </div>
        </div>
    );
};

export default function App() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [address, setAddress] = useState({
        fullName: '',
        emailId: '',
        phoneNumber: '',
        fullAddress: ''
    });

    // In a real app, you would use React Router's `useNavigate` hook like this.
    // Since we're in a single-file setup without a router, we'll mock it.
    const navigate = (path, options) => {
        console.log("Navigating to:", path);
        console.log("With state:", options.state);
        alert(`Order placed! Check console for details.`);
    };

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidPhone = (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    };

    const handlePayNow = (addressData) => {
        if (!addressData.fullName.trim() || !addressData.emailId.trim() || !addressData.phoneNumber.trim() || !addressData.fullAddress.trim()) {
            alert("Please fill in all delivery information fields.");
            return;
        }

        if (!isValidEmail(addressData.emailId)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!isValidPhone(addressData.phoneNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const customerInfo = {
            fullName: addressData.fullName,
            phoneNumber: addressData.phoneNumber,
            emailId: addressData.emailId,
            fullAddress: addressData.fullAddress
        };

        const cartWithVendor = cartItems.map(item => ({
            ...item,
            vendor: selectedRestaurant ? selectedRestaurant.name : "Unknown Vendor"
        }));

        setShowCheckout(false);

        navigate("/payment", {
            state: {
                customerInfo: customerInfo,
                cart: cartWithVendor,
            }
        });
    };

    const renderPage = () => {
        if (selectedRestaurant) {
            return <RestaurantMenuPage 
                        restaurant={selectedRestaurant} 
                        onBack={() => setSelectedRestaurant(null)} 
                        cartItems={cartItems} 
                        setCartItems={setCartItems}
                        searchQuery={searchQuery} 
                    />;
        }
        return <HomePage 
                    setSelectedRestaurant={setSelectedRestaurant} 
                    address={address} 
                    searchQuery={searchQuery}
                />;
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans transition-colors duration-500 pb-16 md:pb-0">
            <Header 
                cartItems={cartItems} 
                onCartClick={() => setShowCheckout(true)} 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            {renderPage()}
            {showCheckout && <CheckoutPage cartItems={cartItems} onBack={() => setShowCheckout(false)} address={address} setAddress={setAddress} setCartItems={setCartItems} onPayNow={handlePayNow} />}

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                <button onClick={() => { setSelectedRestaurant(null); setSearchQuery(''); }} className={`flex flex-col items-center text-xs ${!selectedRestaurant ? 'text-orange-500' : 'text-gray-500'}`}>
                    <HomeIcon className="h-6 w-6" />
                    <span>Home</span>
                </button>
                <button onClick={() => setShowCheckout(true)} className={`flex flex-col items-center text-xs relative ${cartItems.length > 0 ? 'text-orange-500' : 'text-gray-500'}`}>
                    <CartIcon className="h-6 w-6" />
                    {cartItems.length > 0 && <span className="absolute -top-1 right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
                    <span>Cart</span>
                </button>
            </nav>
        </div>
    );
}
