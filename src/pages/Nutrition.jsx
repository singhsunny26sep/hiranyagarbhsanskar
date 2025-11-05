import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Nutrition() {
  const [activeMeal, setActiveMeal] = useState('breakfast');

  const nutrients = [
    {
      name: "Folic Acid",
      icon: "🌱",
      importance: "Prevents neural tube defects",
      sources: ["Leafy greens", "Citrus fruits", "Fortified cereals"],
      daily: "400-800 mcg",
      color: "from-green-400 to-green-600"
    },
    {
      name: "Iron",
      icon: "⚡",
      importance: "Prevents anemia, supports oxygen transport",
      sources: ["Red meat", "Spinach", "Lentils", "Fortified cereals"],
      daily: "27 mg",
      color: "from-red-400 to-red-600"
    },
    {
      name: "Calcium",
      icon: "🦴",
      importance: "Builds baby's bones and teeth",
      sources: ["Dairy products", "Leafy greens", "Fortified plant milks"],
      daily: "1000 mg",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Protein",
      icon: "💪",
      importance: "Supports baby's growth and development",
      sources: ["Lean meats", "Fish", "Eggs", "Legumes", "Nuts"],
      daily: "71 g",
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Omega-3",
      icon: "🐟",
      importance: "Brain and eye development",
      sources: ["Fatty fish", "Flaxseeds", "Walnuts", "Chia seeds"],
      daily: "200-300 mg DHA",
      color: "from-cyan-400 to-cyan-600"
    },
    {
      name: "Vitamin D",
      icon: "☀️",
      importance: "Calcium absorption and immune function",
      sources: ["Sunlight", "Fortified milk", "Fatty fish", "Egg yolks"],
      daily: "600 IU",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const mealPlans = {
    breakfast: [
      {
        name: "Greek Yogurt Parfait",
        ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"],
        nutrients: ["Protein", "Calcium", "Antioxidants"],
        calories: 320,
        prep: "5 mins"
      },
      {
        name: "Avocado Toast with Egg",
        ingredients: ["Whole grain bread", "Avocado", "Poached egg", "Cherry tomatoes"],
        nutrients: ["Healthy fats", "Protein", "Folic acid"],
        calories: 380,
        prep: "10 mins"
      },
      {
        name: "Smoothie Bowl",
        ingredients: ["Banana", "Spinach", "Almond milk", "Chia seeds", "Berries"],
        nutrients: ["Vitamins", "Omega-3", "Fiber"],
        calories: 280,
        prep: "5 mins"
      }
    ],
    lunch: [
      {
        name: "Quinoa Salad Bowl",
        ingredients: ["Quinoa", "Mixed greens", "Chickpeas", "Feta", "Olive oil dressing"],
        nutrients: ["Protein", "Iron", "Healthy fats"],
        calories: 450,
        prep: "15 mins"
      },
      {
        name: "Grilled Chicken Wrap",
        ingredients: ["Whole wheat tortilla", "Grilled chicken", "Lettuce", "Tomato", "Hummus"],
        nutrients: ["Protein", "Fiber", "Vitamins"],
        calories: 420,
        prep: "10 mins"
      },
      {
        name: "Lentil Soup with Bread",
        ingredients: ["Red lentils", "Vegetables", "Whole grain bread", "Greek yogurt"],
        nutrients: ["Protein", "Iron", "Calcium"],
        calories: 380,
        prep: "25 mins"
      }
    ],
    dinner: [
      {
        name: "Baked Salmon with Vegetables",
        ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Olive oil"],
        nutrients: ["Omega-3", "Protein", "Vitamins"],
        calories: 480,
        prep: "30 mins"
      },
      {
        name: "Turkey Stir-Fry",
        ingredients: ["Ground turkey", "Mixed vegetables", "Brown rice", "Soy sauce"],
        nutrients: ["Protein", "Vitamins", "Complex carbs"],
        calories: 460,
        prep: "20 mins"
      },
      {
        name: "Vegetable Curry",
        ingredients: ["Mixed vegetables", "Coconut milk", "Spices", "Chickpeas"],
        nutrients: ["Vitamins", "Protein", "Antioxidants"],
        calories: 420,
        prep: "25 mins"
      }
    ],
    snacks: [
      {
        name: "Apple with Almond Butter",
        ingredients: ["Apple", "Almond butter", "Cinnamon"],
        nutrients: ["Fiber", "Healthy fats", "Vitamins"],
        calories: 180,
        prep: "2 mins"
      },
      {
        name: "Greek Yogurt with Nuts",
        ingredients: ["Greek yogurt", "Mixed nuts", "Honey"],
        nutrients: ["Protein", "Healthy fats", "Calcium"],
        calories: 220,
        prep: "2 mins"
      },
      {
        name: "Veggie Sticks with Hummus",
        ingredients: ["Carrot sticks", "Celery", "Cucumber", "Hummus"],
        nutrients: ["Vitamins", "Fiber", "Protein"],
        calories: 150,
        prep: "5 mins"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nutrition & Meal Planning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fuel your pregnancy with science-backed nutrition. Our expert dietitians create
            personalized meal plans to ensure you and your baby get optimal nutrition.
          </p>
        </div>

        {/* Key Nutrients Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Essential Nutrients for Pregnancy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nutrients.map((nutrient, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <div className={`w-16 h-16 bg-gradient-to-r ${nutrient.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <span className="text-2xl">{nutrient.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{nutrient.name}</h3>
                <p className="text-gray-600 text-sm mb-3 text-center">{nutrient.importance}</p>
                <div className="text-center">
                  <p className="text-sm font-medium text-purple-600 mb-2">Daily: {nutrient.daily}</p>
                  <div className="text-xs text-gray-500">
                    <strong>Sources:</strong> {nutrient.sources.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Planning Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Personalized Meal Plans</h2>

          {/* Meal Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(mealPlans).map((mealType) => (
              <button
                key={mealType}
                onClick={() => setActiveMeal(mealType)}
                className={`px-6 py-3 rounded-full font-semibold capitalize transition duration-300 ${
                  activeMeal === mealType
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mealType}
              </button>
            ))}
          </div>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlans[activeMeal].map((meal, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{meal.name}</h3>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {meal.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Nutrients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {meal.nutrients.map((nutrient, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>🔥 {meal.calories} cal</span>
                  <span>⏱️ {meal.prep}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nutrition Tips</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Eat Small, Frequent Meals</h3>
                  <p className="text-gray-600 text-sm">Eating smaller meals throughout the day helps maintain energy levels and prevents nausea.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Stay Hydrated</h3>
                  <p className="text-gray-600 text-sm">Drink plenty of water and avoid sugary drinks. Aim for 8-10 glasses daily.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Include Protein in Every Meal</h3>
                  <p className="text-gray-600 text-sm">Protein supports your baby's growth. Include lean meats, fish, eggs, or plant-based proteins.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-pink-600 text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Limit Processed Foods</h3>
                  <p className="text-gray-600 text-sm">Choose whole foods over processed items to maximize nutrient intake.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Your Nutrition Progress</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Daily Goals Met</span>
                  <span className="text-lg font-bold">85%</span>
                </div>
                <div className="w-full bg-purple-300 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Weekly Nutrition Score</span>
                  <span className="text-lg font-bold">92%</span>
                </div>
                <div className="w-full bg-pink-300 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-purple-100">Meals Logged</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-purple-100">Water Glasses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Your Personalized Nutrition Plan</h2>
            <p className="text-gray-600 mb-6">
              Work with our certified dietitians to create a meal plan tailored to your specific nutritional needs and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105">
                Start Nutrition Assessment
              </button>
              <button className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 transition duration-300">
                Download Meal Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Nutrition;