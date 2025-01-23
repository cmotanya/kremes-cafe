import {
  ChefHat,
  Clock,
  Coffee,
  MapPin,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { FlipWords } from "../components/FlipWord/flip-words";
import {
  Outfit,
  Playfair_Display as Playfair,
  Cormorant as CormorantFont,
  Bricolage_Grotesque as Grotesque,
} from "next/font/google";

export const grotesque = Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
export const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
});
export const cormorant = CormorantFont({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export const navigationItems = ["home", "about", "menu", "contact"];

export const images = ["/images/1.jpg", "/images/2.jpg"];

export const storyImages = [
  {
    src: "/images/restaurant-1.avif",
    className: "h-[10rem]",
  },
  {
    src: "/images/restaurant-2.avif",
    className: "h-[18rem]",
  },
  {
    src: "/images/restaurant-3.avif",
    className: "h-[15rem]",
  },
  {
    src: "/images/restaurant-4.avif",
    className: "h-[30rem]",
  },
  {
    src: "/images/restaurant-5.avif",
    className: "h-[45rem]",
  },
  {
    src: "/images/restaurant-6.avif",
    className: "h-[35rem]",
  },
];

export const customers = [
  "/images/customer1.jpg",
  "/images/customer2.jpg",
  "/images/customer3.jpg",
  "/images/customer4.jpg",
  "/images/customer5.jpg",
];

export type MenuItem = {
  id: string;
  name: string;
  prep: string;
  difficulty: string;
  orders: number;
  image: string;
  description: string;
  price: number;
};

export const todaysSpecials: MenuItem[] = [
  {
    id: "1",
    name: "Truffle Pasta",
    prep: "15 min",
    difficulty: "Medium",
    orders: 45,
    image: "/images/truffle-pasta.jpg",
    description: "Hand-crafted pasta with fresh black truffle and parmesan",
    price: 24,
  },
  {
    id: "2",
    name: "Matcha Cake",
    prep: "30 min",
    difficulty: "Hard",
    orders: 28,
    image: "/images/matcha-cake.jpg",
    description: "Japanese-inspired layered matcha cream cake",
    price: 18,
  },
  {
    id: "3",
    name: "Avocado Toast",
    prep: "10 min",
    difficulty: "Easy",
    orders: 67,
    image: "/images/avocado-toast.jpg",
    description: "Sourdough toast with smashed avocado and poached eggs",
    price: 16,
  },
];

export const features = [
  { id: "1", icon: Clock, text: "Open 7AM-10PM" },
  {
    id: "2",
    icon: MapPin,
    text: (
      <FlipWords
        words={["Links Road, Nyali", "Westlands, NBI", "Greenwood, Nyali"]}
      />
    ),
    animationDelay: 0.2,
  },
  { id: "3", icon: Star, text: "4.9/5 Rating" },
];

export const stats = [
  {
    icon: Coffee,
    value: "15+",
    label: "Years of Excellence",
    description: "Crafting memorable experiences since 2009",
    color: "bg-blue-500",
  },
  {
    icon: ChefHat,
    value: "12",
    label: "Master Chefs",
    description: "Internationally acclaimed culinary experts",
    color: "bg-red-500",
  },
  {
    icon: UtensilsCrossed,
    value: "50+",
    label: "Signature Dishes",
    description: "Unique recipes perfected over time",
    color: "bg-green-500",
  },
  {
    icon: Users,
    value: "2K+",
    label: "Monthly Guests",
    description: "Loyal customers who call us home",
    color: "bg-purple-500",
  },
];

export const awards = [
  {
    year: "2023",
    title: "Best Fine Dining Restaurant",
    org: "City Culinary Awards",
  },
  { year: "2022", title: "Chef of the Year", org: "Gastronomy Excellence" },
  {
    year: "2021",
    title: "Innovation in Cuisine",
    org: "Food & Wine Magazine",
  },
];

export const menuItems = [
  {
    id: 1,
    name: "Classic Breakfast",
    price: 15.99,
    description: "Eggs, bacon, toast, and hash browns",
    category: "Breakfast",
    prepTime: "15 mins",
  },
  {
    id: 2,
    name: "Caesar Salad",
    price: 12.99,
    description: "Fresh romaine lettuce, croutons, parmesan",
    category: "Lunch",
    prepTime: "10 mins",
  },
  {
    id: 3,
    name: "Grilled Salmon",
    price: 24.99,
    description: "Fresh salmon with seasonal vegetables",
    category: "Dinner",
    prepTime: "25 mins",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    price: 8.99,
    description: "Warm chocolate cake with molten center",
    category: "Dessert",
    prepTime: "20 mins",
  },
];
