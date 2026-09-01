export type FoodItem = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  calories: number; // per 100g
  protein: number;
  carbs: number;
  fat: number;
  servingSize?: number; // grams, default 100
  popular?: boolean;
};

export const FOODS: FoodItem[] = [
  // ===== POPULAR / COMMON =====
  { id: "chicken-breast", name: "Chicken Breast (grilled)", category: "Protein", calories: 165, protein: 31, carbs: 0, fat: 3.6, popular: true },
  { id: "egg", name: "Egg (whole)", category: "Protein", calories: 155, protein: 13, carbs: 1.1, fat: 11, popular: true },
  { id: "egg-white", name: "Egg White", category: "Protein", calories: 52, protein: 11, carbs: 0.7, fat: 0.2, popular: true },
  { id: "milk-full", name: "Milk (full cream)", category: "Dairy", calories: 64, protein: 3.2, carbs: 4.8, fat: 3.6, popular: true },
  { id: "milk-skim", name: "Milk (skimmed)", category: "Dairy", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, popular: true },
  { id: "roti", name: "Roti / Chapati", category: "Desi", calories: 297, protein: 9.6, carbs: 56, fat: 3.7, popular: true },
  { id: "paratha", name: "Paratha (plain)", category: "Desi", calories: 320, protein: 6, carbs: 42, fat: 14, popular: true },
  { id: "rice-white", name: "White Rice (cooked)", category: "Carbs", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, popular: true },
  { id: "rice-brown", name: "Brown Rice (cooked)", category: "Carbs", calories: 112, protein: 2.3, carbs: 24, fat: 0.8, popular: true },
  { id: "dal", name: "Dal (cooked)", category: "Desi", calories: 116, protein: 9, carbs: 20, fat: 0.4, popular: true },
  { id: "chai", name: "Chai (with milk & sugar)", category: "Drinks", calories: 60, protein: 1.5, carbs: 9, fat: 2, popular: true },
  { id: "banana", name: "Banana", category: "Fruits", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, popular: true },
  { id: "apple", name: "Apple", category: "Fruits", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, popular: true },
  { id: "oats", name: "Oats (dry)", category: "Carbs", calories: 389, protein: 17, carbs: 66, fat: 7, popular: true },
  { id: "whey", name: "Whey Protein (1 scoop)", category: "Supplements", calories: 120, protein: 24, carbs: 3, fat: 1.5, popular: true, servingSize: 30 },

  // ===== DESI FOODS =====
  { id: "chicken-biryani", name: "Chicken Biryani", category: "Desi", calories: 180, protein: 10, carbs: 22, fat: 6, popular: true },
  { id: "mutton-biryani", name: "Mutton Biryani", category: "Desi", calories: 200, protein: 11, carbs: 22, fat: 8, popular: true },
  { id: "beef-biryani", name: "Beef Biryani", category: "Desi", calories: 195, protein: 12, carbs: 21, fat: 7.5 },
  { id: "veg-biryani", name: "Vegetable Biryani", category: "Desi", calories: 150, protein: 4, carbs: 25, fat: 4 },
  { id: "chicken-karahi", name: "Chicken Karahi", category: "Desi", calories: 195, protein: 18, carbs: 4, fat: 12, popular: true },
  { id: "mutton-karahi", name: "Mutton Karahi", category: "Desi", calories: 230, protein: 16, carbs: 4, fat: 17 },
  { id: "beef-karahi", name: "Beef Karahi", category: "Desi", calories: 220, protein: 17, carbs: 3, fat: 15 },
  { id: "nihari", name: "Nihari (beef)", category: "Desi", calories: 210, protein: 15, carbs: 5, fat: 14, popular: true },
  { id: "haleem", name: "Haleem", category: "Desi", calories: 165, protein: 12, carbs: 15, fat: 6, popular: true },
  { id: "chicken-tikka", name: "Chicken Tikka", category: "Desi", calories: 180, protein: 25, carbs: 2, fat: 8, popular: true },
  { id: "seekh-kabab", name: "Seekh Kabab", category: "Desi", calories: 250, protein: 18, carbs: 3, fat: 18, popular: true },
  { id: "chapli-kabab", name: "Chapli Kabab", category: "Desi", calories: 280, protein: 16, carbs: 8, fat: 20 },
  { id: "chicken-handi", name: "Chicken Handi", category: "Desi", calories: 190, protein: 17, carbs: 5, fat: 11 },
  { id: "butter-chicken", name: "Butter Chicken", category: "Desi", calories: 210, protein: 14, carbs: 8, fat: 14 },
  { id: "daal-makhani", name: "Daal Makhani", category: "Desi", calories: 160, protein: 8, carbs: 18, fat: 7 },
  { id: "palak-paneer", name: "Palak Paneer", category: "Desi", calories: 180, protein: 10, carbs: 8, fat: 12 },
  { id: "paneer-tikka", name: "Paneer Tikka", category: "Desi", calories: 265, protein: 16, carbs: 6, fat: 20 },
  { id: "samosa", name: "Samosa (1 piece)", category: "Desi", calories: 260, protein: 5, carbs: 28, fat: 14, popular: true, servingSize: 80 },
  { id: "pakora", name: "Pakora / Bhaji", category: "Desi", calories: 280, protein: 6, carbs: 25, fat: 17 },
  { id: "jalebi", name: "Jalebi", category: "Desi", calories: 380, protein: 3, carbs: 70, fat: 10 },
  { id: "gulab-jamun", name: "Gulab Jamun (1 piece)", category: "Desi", calories: 150, protein: 2, carbs: 25, fat: 5, servingSize: 40 },
  { id: "lassi-sweet", name: "Sweet Lassi", category: "Drinks", calories: 90, protein: 3, carbs: 14, fat: 2.5 },
  { id: "lassi-salty", name: "Salty Lassi", category: "Drinks", calories: 55, protein: 3, carbs: 5, fat: 2.5 },
  { id: "raita", name: "Raita", category: "Desi", calories: 60, protein: 3, carbs: 5, fat: 3 },
  { id: "naan", name: "Naan (plain)", category: "Desi", calories: 310, protein: 9, carbs: 52, fat: 7 },
  { id: "garlic-naan", name: "Garlic Naan", category: "Desi", calories: 330, protein: 9, carbs: 50, fat: 10 },
  { id: "pulao", name: "Chicken Pulao", category: "Desi", calories: 170, protein: 9, carbs: 22, fat: 5 },
  { id: "keema", name: "Keema (minced meat)", category: "Desi", calories: 240, protein: 18, carbs: 3, fat: 17 },
  { id: "paye", name: "Paye (trotters)", category: "Desi", calories: 190, protein: 14, carbs: 2, fat: 14 },
  { id: "fish-fried", name: "Fried Fish (desi style)", category: "Desi", calories: 250, protein: 20, carbs: 10, fat: 14 },
  { id: "aloo-paratha", name: "Aloo Paratha", category: "Desi", calories: 280, protein: 6, carbs: 38, fat: 12, popular: true },
  { id: "anda-paratha", name: "Anda Paratha", category: "Desi", calories: 320, protein: 12, carbs: 35, fat: 15 },
  { id: "chole", name: "Chole / Chana Masala", category: "Desi", calories: 160, protein: 8, carbs: 22, fat: 5 },
  { id: "rajma", name: "Rajma", category: "Desi", calories: 140, protein: 8, carbs: 23, fat: 1.5 },
  { id: "bhindi", name: "Bhindi Masala", category: "Desi", calories: 90, protein: 2.5, carbs: 10, fat: 5 },
  { id: "aloo-gobi", name: "Aloo Gobi", category: "Desi", calories: 95, protein: 2.5, carbs: 12, fat: 4.5 },
  { id: "mixed-veg", name: "Mixed Vegetable Curry", category: "Desi", calories: 85, protein: 3, carbs: 10, fat: 4 },

  // ===== FAST FOOD - McDonald's style =====
  { id: "mcdonalds-bigmac", name: "Big Mac", brand: "McDonald's", category: "Fast Food", calories: 550, protein: 25, carbs: 45, fat: 30, servingSize: 215, popular: true },
  { id: "mcdonalds-mcchicken", name: "McChicken", brand: "McDonald's", category: "Fast Food", calories: 400, protein: 14, carbs: 40, fat: 21, servingSize: 143 },
  { id: "mcdonalds-fries-m", name: "French Fries (Medium)", brand: "McDonald's", category: "Fast Food", calories: 340, protein: 4, carbs: 44, fat: 16, servingSize: 114, popular: true },
  { id: "mcdonalds-nuggets-6", name: "Chicken McNuggets (6pc)", brand: "McDonald's", category: "Fast Food", calories: 250, protein: 15, carbs: 15, fat: 15, servingSize: 96 },
  { id: "mcdonalds-filet", name: "Filet-O-Fish", brand: "McDonald's", category: "Fast Food", calories: 390, protein: 16, carbs: 39, fat: 19, servingSize: 142 },

  // ===== KFC =====
  { id: "kfc-original-piece", name: "Original Recipe Chicken (1pc)", brand: "KFC", category: "Fast Food", calories: 320, protein: 20, carbs: 10, fat: 21, servingSize: 120, popular: true },
  { id: "kfc-zinger", name: "Zinger Burger", brand: "KFC", category: "Fast Food", calories: 520, protein: 28, carbs: 45, fat: 25, servingSize: 200, popular: true },
  { id: "kfc-twister", name: "Twister", brand: "KFC", category: "Fast Food", calories: 480, protein: 25, carbs: 42, fat: 22, servingSize: 190 },
  { id: "kfc-fries", name: "KFC Fries (Regular)", brand: "KFC", category: "Fast Food", calories: 290, protein: 4, carbs: 38, fat: 14, servingSize: 100 },
  { id: "kfc-popcorn", name: "Popcorn Chicken (Regular)", brand: "KFC", category: "Fast Food", calories: 380, protein: 18, carbs: 22, fat: 24, servingSize: 110 },

  // ===== Domino's / Pizza =====
  { id: "dominos-pep-slice", name: "Pepperoni Pizza (1 slice)", brand: "Domino's", category: "Fast Food", calories: 300, protein: 13, carbs: 32, fat: 13, servingSize: 100, popular: true },
  { id: "dominos-marg-slice", name: "Margherita Pizza (1 slice)", brand: "Domino's", category: "Fast Food", calories: 250, protein: 11, carbs: 30, fat: 10, servingSize: 95 },
  { id: "dominos-bbq-slice", name: "BBQ Chicken Pizza (1 slice)", brand: "Domino's", category: "Fast Food", calories: 280, protein: 14, carbs: 31, fat: 11, servingSize: 100 },
  { id: "pizza-hut-pan", name: "Pan Pizza (1 slice)", brand: "Pizza Hut", category: "Fast Food", calories: 320, protein: 12, carbs: 34, fat: 15, servingSize: 110 },

  // ===== Subway =====
  { id: "subway-turkey", name: "Turkey Breast Sub (6-inch)", brand: "Subway", category: "Fast Food", calories: 280, protein: 18, carbs: 46, fat: 3.5, servingSize: 220 },
  { id: "subway-chicken", name: "Chicken Teriyaki Sub (6-inch)", brand: "Subway", category: "Fast Food", calories: 370, protein: 26, carbs: 50, fat: 5, servingSize: 240 },
  { id: "subway-veggie", name: "Veggie Delite Sub (6-inch)", brand: "Subway", category: "Fast Food", calories: 230, protein: 8, carbs: 44, fat: 2.5, servingSize: 200 },

  // ===== Burger King / Others =====
  { id: "bk-whopper", name: "Whopper", brand: "Burger King", category: "Fast Food", calories: 660, protein: 28, carbs: 49, fat: 40, servingSize: 270 },
  { id: "bk-chicken", name: "Chicken Royale", brand: "Burger King", category: "Fast Food", calories: 550, protein: 25, carbs: 45, fat: 30, servingSize: 220 },

  // ===== Common Protein & Others =====
  { id: "chicken-thigh", name: "Chicken Thigh (grilled)", category: "Protein", calories: 209, protein: 26, carbs: 0, fat: 11 },
  { id: "beef-steak", name: "Beef Steak (lean)", category: "Protein", calories: 250, protein: 26, carbs: 0, fat: 15 },
  { id: "mutton", name: "Mutton (cooked)", category: "Protein", calories: 250, protein: 25, carbs: 0, fat: 16 },
  { id: "fish-salmon", name: "Salmon", category: "Protein", calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: "tuna", name: "Tuna (canned in water)", category: "Protein", calories: 86, protein: 19, carbs: 0, fat: 1 },
  { id: "paneer", name: "Paneer", category: "Dairy", calories: 265, protein: 18, carbs: 1.2, fat: 20, popular: true },
  { id: "yogurt", name: "Yogurt (plain)", category: "Dairy", calories: 60, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { id: "greek-yogurt", name: "Greek Yogurt", category: "Dairy", calories: 97, protein: 9, carbs: 3.6, fat: 5 },
  { id: "cheese-slice", name: "Cheese Slice", category: "Dairy", calories: 350, protein: 22, carbs: 2, fat: 28 },
  { id: "bread-white", name: "White Bread (1 slice)", category: "Carbs", calories: 265, protein: 9, carbs: 49, fat: 3.2, servingSize: 30 },
  { id: "bread-brown", name: "Brown Bread (1 slice)", category: "Carbs", calories: 250, protein: 10, carbs: 42, fat: 3.5, servingSize: 30 },
  { id: "potato-boiled", name: "Potato (boiled)", category: "Carbs", calories: 87, protein: 1.9, carbs: 20, fat: 0.1 },
  { id: "sweet-potato", name: "Sweet Potato", category: "Carbs", calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { id: "pasta", name: "Pasta (cooked)", category: "Carbs", calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  { id: "peanut-butter", name: "Peanut Butter", category: "Fats", calories: 588, protein: 25, carbs: 20, fat: 50, popular: true },
  { id: "almonds", name: "Almonds", category: "Fats", calories: 579, protein: 21, carbs: 22, fat: 50 },
  { id: "walnuts", name: "Walnuts", category: "Fats", calories: 654, protein: 15, carbs: 14, fat: 65 },
  { id: "olive-oil", name: "Olive Oil (1 tbsp)", category: "Fats", calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: 14 },
  { id: "ghee", name: "Ghee (1 tbsp)", category: "Fats", calories: 900, protein: 0, carbs: 0, fat: 100, servingSize: 14 },
  { id: "avocado", name: "Avocado", category: "Fats", calories: 160, protein: 2, carbs: 9, fat: 15 },
  { id: "coke", name: "Coca-Cola (can)", category: "Drinks", calories: 42, protein: 0, carbs: 10.6, fat: 0, servingSize: 330 },
  { id: "pepsi", name: "Pepsi (can)", category: "Drinks", calories: 41, protein: 0, carbs: 11, fat: 0, servingSize: 330 },
  { id: "orange-juice", name: "Orange Juice", category: "Drinks", calories: 45, protein: 0.7, carbs: 10.4, fat: 0.2 },
  { id: "protein-bar", name: "Protein Bar (avg)", category: "Supplements", calories: 200, protein: 20, carbs: 20, fat: 7, servingSize: 60 },
];

// Sort popular first, then alphabetical
export function getSortedFoods(): FoodItem[] {
  return [...FOODS].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return a.name.localeCompare(b.name);
  });
}

export function searchFoods(query: string): FoodItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return getSortedFoods();
  return getSortedFoods().filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      (f.brand && f.brand.toLowerCase().includes(q)) ||
      f.category.toLowerCase().includes(q)
  );
}

export function findExactFood(name: string): FoodItem | undefined {
  const q = name.toLowerCase().trim();
  return FOODS.find(
    (f) =>
      f.name.toLowerCase() === q ||
      f.name.toLowerCase().includes(q) ||
      (f.brand && `${f.brand} ${f.name}`.toLowerCase().includes(q))
  );
}
