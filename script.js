// Quiz Application - Complete JavaScript Implementation

class QuizApp {
  constructor() {
    this.currentCategory = null
    this.currentQuestionIndex = 0
    this.score = 0
    this.correctAnswers = 0
    this.currentStreak = 0
    this.bestStreak = 0
    this.questionTimer = 30
    this.categoryTimer = 600 // 10 minutes
    this.questionInterval = null
    this.categoryInterval = null
    this.userStats = this.loadUserStats()
    this.newAchievements = []

    this.initializeApp()
    this.createParticles()
    this.updateUserStats()
    
  }

  // Quiz Questions Database
  questions = {
    mathematics: [
      {
        question: "What is 15 × 8?",
        options: ["120", "125", "115", "130"],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the square root of 144?",
        options: ["11", "12", "13", "14"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is 25% of 200?",
        options: ["40", "45", "50", "55"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the value of π (pi) to 2 decimal places?",
        options: ["3.14", "3.15", "3.16", "3.13"],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is 7³ (7 cubed)?",
        options: ["343", "349", "336", "357"],
        correct: 0,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2x²"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      { question: "What is log₁₀(1000)?", options: ["2", "3", "4", "5"], correct: 1, difficulty: "medium", points: 15 },
      {
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the area of a circle with radius 5?",
        options: ["25π", "10π", "15π", "20π"],
        correct: 0,
        difficulty: "medium",
        points: 15,
      },
      { question: "What is 2⁵?", options: ["16", "25", "32", "64"], correct: 2, difficulty: "easy", points: 10 },
      {
        question: "What is the quadratic formula?",
        options: ["x = -b ± √(b²-4ac)/2a", "x = b ± √(b²+4ac)/2a", "x = -b ± √(b²+4ac)/2a", "x = b ± √(b²-4ac)/2a"],
        correct: 0,
        difficulty: "hard",
        points: 20,
      },
      { question: "What is sin(90°)?", options: ["0", "1", "-1", "0.5"], correct: 1, difficulty: "medium", points: 15 },
      {
        question: "What is the factorial of 5?",
        options: ["60", "100", "120", "150"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the slope of y = 3x + 2?",
        options: ["2", "3", "5", "1"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is ∫x dx?",
        options: ["x²/2 + C", "x + C", "x²", "2x + C"],
        correct: 0,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "What is the perimeter of a square with side 6?",
        options: ["12", "18", "24", "36"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      { question: "What is cos(0°)?", options: ["0", "1", "-1", "0.5"], correct: 1, difficulty: "easy", points: 10 },
      {
        question: "What is the volume of a cube with side 4?",
        options: ["16", "32", "48", "64"],
        correct: 3,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the limit of (sin x)/x as x approaches 0?",
        options: ["0", "1", "∞", "undefined"],
        correct: 1,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "What is the determinant of [[2,3],[1,4]]?",
        options: ["5", "6", "7", "8"],
        correct: 0,
        difficulty: "hard",
        points: 20,
      },
    ],
    science: [
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the speed of light?",
        options: ["3×10⁸ m/s", "3×10⁷ m/s", "3×10⁹ m/s", "3×10⁶ m/s"],
        correct: 0,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the atomic number of carbon?",
        options: ["4", "6", "8", "12"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is Newton's first law?",
        options: ["F=ma", "Law of inertia", "Action-reaction", "Conservation of energy"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the pH of pure water?",
        options: ["6", "7", "8", "9"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the formula for photosynthesis?",
        options: ["6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O", "2H₂ + O₂ → 2H₂O", "N₂ + 3H₂ → 2NH₃"],
        correct: 0,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the hardest natural substance?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the molecular formula of water?",
        options: ["H₂O", "HO₂", "H₂O₂", "H₃O"],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is Avogadro's number?",
        options: ["6.022×10²³", "6.022×10²²", "6.022×10²⁴", "6.022×10²¹"],
        correct: 0,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the process by which plants make food?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Pascal", "Watt"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the chemical formula for table salt?",
        options: ["NaCl", "KCl", "CaCl₂", "MgCl₂"],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the study of earthquakes called?",
        options: ["Geology", "Seismology", "Meteorology", "Oceanography"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the smallest unit of matter?",
        options: ["Molecule", "Atom", "Electron", "Proton"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the process of cell division called?",
        options: ["Mitosis", "Meiosis", "Both A and B", "Osmosis"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the theory of relativity proposed by?",
        options: ["Newton", "Einstein", "Galileo", "Kepler"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the Heisenberg uncertainty principle?",
        options: ["E=mc²", "Δx·Δp ≥ ℏ/2", "F=ma", "PV=nRT"],
        correct: 1,
        difficulty: "hard",
        points: 20,
      },
    ],
    history: [
      {
        question: "When did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "In which year did the Berlin Wall fall?",
        options: ["1987", "1988", "1989", "1990"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Who was known as the 'Iron Lady'?",
        options: ["Queen Elizabeth II", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which empire was ruled by Julius Caesar?",
        options: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Ottoman Empire"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "When did India gain independence?",
        options: ["1946", "1947", "1948", "1949"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Who wrote 'The Communist Manifesto'?",
        options: ["Lenin", "Stalin", "Marx and Engels", "Trotsky"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which war was fought between 1914-1918?",
        options: ["World War I", "World War II", "Cold War", "Vietnam War"],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Who was the last Tsar of Russia?",
        options: ["Nicholas I", "Alexander III", "Nicholas II", "Alexander II"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "When did the American Civil War begin?",
        options: ["1860", "1861", "1862", "1863"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which ancient wonder was located in Alexandria?",
        options: ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"],
        correct: 1,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "Who was the first man to walk on the moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which dynasty built the Great Wall of China?",
        options: ["Han", "Tang", "Ming", "Qing"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "When did the French Revolution begin?",
        options: ["1787", "1788", "1789", "1790"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Who was the founder of the Mongol Empire?",
        options: ["Kublai Khan", "Genghis Khan", "Ogedei Khan", "Tolui Khan"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which city was the capital of the Byzantine Empire?",
        options: ["Rome", "Athens", "Constantinople", "Alexandria"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "When did the Renaissance period begin?",
        options: ["13th century", "14th century", "15th century", "16th century"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Who was the first Emperor of Rome?",
        options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which treaty ended World War I?",
        options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of Westphalia"],
        correct: 1,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "When did the Industrial Revolution begin?",
        options: ["1750s", "1760s", "1770s", "1780s"],
        correct: 1,
        difficulty: "hard",
        points: 20,
      },
    ],
    geography: [
      {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the highest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which country has the most time zones?",
        options: ["Russia", "USA", "China", "France"],
        correct: 3,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which desert is the largest in the world?",
        options: ["Sahara", "Gobi", "Antarctica", "Arabian"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the deepest ocean trench?",
        options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Peru-Chile Trench"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which continent has the most countries?",
        options: ["Asia", "Africa", "Europe", "South America"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
        correct: 3,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the most populous city in the world?",
        options: ["Tokyo", "Delhi", "Shanghai", "São Paulo"],
        correct: 0,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "Which country is both in Europe and Asia?",
        options: ["Russia", "Turkey", "Kazakhstan", "All of the above"],
        correct: 3,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the largest island in the world?",
        options: ["Australia", "Greenland", "New Guinea", "Borneo"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which strait separates Europe and Africa?",
        options: ["Bering Strait", "Strait of Gibraltar", "Strait of Hormuz", "Strait of Malacca"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the driest place on Earth?",
        options: ["Sahara Desert", "Atacama Desert", "Death Valley", "Gobi Desert"],
        correct: 1,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "Which country has the longest coastline?",
        options: ["Russia", "Canada", "Norway", "Chile"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the largest lake in the world?",
        options: ["Lake Superior", "Caspian Sea", "Lake Victoria", "Lake Baikal"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which mountain range contains Mount Everest?",
        options: ["Andes", "Rockies", "Himalayas", "Alps"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the southernmost continent?",
        options: ["South America", "Australia", "Africa", "Antarctica"],
        correct: 3,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which river flows through the Grand Canyon?",
        options: ["Mississippi River", "Colorado River", "Rio Grande", "Columbia River"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
    ],
    technology: [
      {
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Processing Unit",
          "Central Program Unit",
          "Computer Program Unit",
        ],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Who founded Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What does HTML stand for?",
        options: [
          "Hypertext Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink and Text Markup Language",
        ],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which company developed the iPhone?",
        options: ["Samsung", "Google", "Apple", "Microsoft"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the most popular programming language in 2024?",
        options: ["Java", "Python", "JavaScript", "C++"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What does AI stand for?",
        options: [
          "Automated Intelligence",
          "Artificial Intelligence",
          "Advanced Intelligence",
          "Algorithmic Intelligence",
        ],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "HTTPS", "FTP", "SMTP"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the binary representation of 10?",
        options: ["1010", "1100", "1001", "1011"],
        correct: 0,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which company owns YouTube?",
        options: ["Facebook", "Microsoft", "Google", "Amazon"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the latest version of JavaScript?",
        options: ["ES2020", "ES2021", "ES2022", "ES2023"],
        correct: 3,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "Which database is known as NoSQL?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Advanced Programming Interface",
          "Automated Programming Interface",
          "Application Program Interface",
        ],
        correct: 0,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which company developed React?",
        options: ["Google", "Facebook", "Microsoft", "Apple"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the maximum value of an 8-bit integer?",
        options: ["127", "255", "256", "128"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which cloud platform is owned by Amazon?",
        options: ["Azure", "Google Cloud", "AWS", "IBM Cloud"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which programming language is used for iOS development?",
        options: ["Java", "Kotlin", "Swift", "C#"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "Which protocol is used for email?",
        options: ["HTTP", "FTP", "SMTP", "TCP"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
    ],
    sports: [
      {
        question: "How many players are on a basketball team on the court?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which country won the 2018 FIFA World Cup?",
        options: ["Brazil", "Germany", "France", "Argentina"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "What is the maximum score possible in ten-pin bowling?",
        options: ["200", "250", "300", "350"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which sport is known as 'The Beautiful Game'?",
        options: ["Basketball", "Football/Soccer", "Tennis", "Cricket"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "How many Grand Slam tournaments are there in tennis?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which athlete has won the most Olympic gold medals?",
        options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the diameter of a basketball hoop in inches?",
        options: ["16", "17", "18", "19"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which country has won the most Cricket World Cups?",
        options: ["India", "Australia", "England", "West Indies"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "How long is a marathon race?",
        options: ["26.2 miles", "25 miles", "27 miles", "24.2 miles"],
        correct: 0,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which sport uses the term 'love' for zero points?",
        options: ["Golf", "Tennis", "Badminton", "Squash"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Who holds the record for most home runs in MLB?",
        options: ["Babe Ruth", "Hank Aaron", "Barry Bonds", "Willie Mays"],
        correct: 2,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "Which Formula 1 driver has won the most championships?",
        options: ["Ayrton Senna", "Michael Schumacher", "Lewis Hamilton", "Sebastian Vettel"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the highest possible hand in poker?",
        options: ["Four of a Kind", "Full House", "Royal Flush", "Straight Flush"],
        correct: 2,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "Which team has won the most NBA championships?",
        options: ["Lakers", "Celtics", "Bulls", "Warriors"],
        correct: 1,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "How many holes are played in a standard round of golf?",
        options: ["16", "17", "18", "19"],
        correct: 2,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which country invented rugby?",
        options: ["Australia", "New Zealand", "South Africa", "England"],
        correct: 3,
        difficulty: "medium",
        points: 15,
      },
      {
        question: "What is the fastest recorded tennis serve?",
        options: ["163 mph", "183 mph", "263 mph", "153 mph"],
        correct: 2,
        difficulty: "hard",
        points: 20,
      },
      {
        question: "Which boxer was known as 'The Greatest'?",
        options: ["Mike Tyson", "Muhammad Ali", "Floyd Mayweather", "Sugar Ray Robinson"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "How many periods are in an ice hockey game?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        difficulty: "easy",
        points: 10,
      },
      {
        question: "Which swimmer is known as the 'Flying Fish'?",
        options: ["Adam Peaty", "Caeleb Dressel", "Michael Phelps", "Katie Ledecky"],
        correct: 2,
        difficulty: "hard",
        points: 20,
      },
    ],
  }

  initializeApp() {
    this.bindEvents()
    this.showScreen("homeScreen")
  }

  bindEvents() {
    // Category selection
    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const category = e.currentTarget.dataset.category
        this.startQuiz(category)
      })
    })

    // Navigation buttons
    document.getElementById("backBtn").addEventListener("click", () => {
      this.endQuiz()
      this.showScreen("homeScreen")
    })

    document.getElementById("retryBtn").addEventListener("click", () => {
      this.startQuiz(this.currentCategory)
    })

    document.getElementById("homeBtn").addEventListener("click", () => {
      this.showScreen("homeScreen")
    })
  }

  startQuiz(category) {
    this.currentCategory = category
    this.currentQuestionIndex = 0
    this.score = 0
    this.correctAnswers = 0
    this.currentStreak = 0
    this.questionTimer = 30
    this.categoryTimer = 600
    this.newAchievements = []

    this.showScreen("quizScreen")
    this.updateQuizHeader()
    this.loadQuestion()
    this.startTimers()
  }

  loadQuestion() {
    const question = this.questions[this.currentCategory][this.currentQuestionIndex]

    // Update question display
    document.getElementById("questionText").textContent = question.question
    document.getElementById("questionCounter").textContent = `${this.currentQuestionIndex + 1} / 20`

    // Update difficulty indicator
    const difficultyEl = document.getElementById("difficultyIndicator")
    difficultyEl.textContent = `${question.difficulty.toUpperCase()} • ${question.points}pts`
    difficultyEl.className = `difficulty-indicator ${question.difficulty}`

    // Create answer buttons
    const answersGrid = document.getElementById("answersGrid")
    answersGrid.innerHTML = ""

    question.options.forEach((option, index) => {
      const button = document.createElement("button")
      button.className = "answer-btn"
      button.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`
      button.addEventListener("click", () => this.selectAnswer(index))
      answersGrid.appendChild(button)
    })

    // Update progress
    const progress = ((this.currentQuestionIndex + 1) / 20) * 100
    document.getElementById("progressFill").style.width = `${progress}%`

    // Reset feedback
    const feedback = document.getElementById("feedback")
    feedback.className = "feedback"
    feedback.textContent = ""

    // Reset question timer
    this.questionTimer = 30
    this.updateTimerDisplay()
  }

  selectAnswer(selectedIndex) {
    const question = this.questions[this.currentCategory][this.currentQuestionIndex]
    const isCorrect = selectedIndex === question.correct
    const buttons = document.querySelectorAll(".answer-btn")

    // Disable all buttons
    buttons.forEach((btn) => (btn.style.pointerEvents = "none"))

    // Highlight selected and correct answers
    buttons[selectedIndex].classList.add("selected")
    buttons[question.correct].classList.add("correct")

    if (!isCorrect) {
      buttons[selectedIndex].classList.add("wrong")
    }

    // Update score and streak
    if (isCorrect) {
      const timeBonus = Math.floor(this.questionTimer / 2)
      const totalPoints = question.points + timeBonus
      this.score += totalPoints
      this.correctAnswers++
      this.currentStreak++
      this.bestStreak = Math.max(this.bestStreak, this.currentStreak)

      this.showFeedback(true, `Correct! +${totalPoints} points (${timeBonus} time bonus)`)
      this.playSound("correct")
    } else {
      this.currentStreak = 0
      this.showFeedback(false, `Wrong! The correct answer was: ${question.options[question.correct]}`)
      this.playSound("wrong")
    }

    // Update current stats
    document.getElementById("currentCoins").textContent = this.userStats.totalCoins + this.score
    document.getElementById("currentStreak").textContent = this.currentStreak

    // Auto advance after 2 seconds
    setTimeout(() => {
      this.nextQuestion()
    }, 2500)
  }

  showFeedback(isCorrect, message) {
    const feedback = document.getElementById("feedback")
    feedback.textContent = message
    feedback.className = `feedback show ${isCorrect ? "correct" : "wrong"}`
  }

  nextQuestion() {
    if (this.currentQuestionIndex < 19) {
      this.currentQuestionIndex++
      this.loadQuestion()
    } else {
      this.endQuiz()
      this.showResults()
    }
  }

  endQuiz() {
    this.clearTimers()
    this.updateUserStats()
  }

  showResults() {
    this.showScreen("resultsScreen")

    const totalPossiblePoints = this.questions[this.currentCategory].reduce((sum, q) => sum + q.points, 0)
    const percentage = Math.round((this.score / totalPossiblePoints) * 100)
    const timeBonus = Math.floor((600 - this.categoryTimer) / 10)

    // Update results display
    document.getElementById("finalPercentage").textContent = `${percentage}%`
    document.getElementById("finalScore").textContent = this.score
    document.getElementById("correctAnswers").textContent = `${this.correctAnswers}/20`
    document.getElementById("finalStreak").textContent = this.bestStreak
    document.getElementById("timeBonus").textContent = timeBonus

    // Update trophy animation based on performance
    const trophyEl = document.getElementById("trophyAnimation")
    if (percentage >= 90) trophyEl.textContent = "🏆"
    else if (percentage >= 80) trophyEl.textContent = "🥇"
    else if (percentage >= 70) trophyEl.textContent = "🥈"
    else if (percentage >= 60) trophyEl.textContent = "🥉"
    else trophyEl.textContent = "📚"

    // Calculate and show achievements
    this.calculateAchievements(percentage)
    this.displayAchievements()

    // Update user stats
    this.userStats.totalCoins += this.score + timeBonus
    this.userStats.totalScore += this.score
    this.userStats.quizzesCompleted++
    this.userStats.bestStreak = Math.max(this.userStats.bestStreak, this.bestStreak)
    this.saveUserStats()
    this.updateUserStats()
  }

  calculateAchievements(percentage) {
    this.newAchievements = []

    if (percentage === 100) this.newAchievements.push("🏆 Perfect Score")
    else if (percentage >= 90) this.newAchievements.push("🥇 Gold Medal")
    else if (percentage >= 80) this.newAchievements.push("🥈 Silver Medal")
    else if (percentage >= 70) this.newAchievements.push("🥉 Bronze Medal")

    if (this.bestStreak >= 15) this.newAchievements.push("🔥 Unstoppable")
    else if (this.bestStreak >= 10) this.newAchievements.push("⚡ Hot Streak")
    else if (this.bestStreak >= 5) this.newAchievements.push("🎯 On Fire")

    if (this.categoryTimer > 480) this.newAchievements.push("⚡ Speed Demon")
    else if (this.categoryTimer > 360) this.newAchievements.push("🚀 Quick Thinker")

    if (this.correctAnswers === 20) this.newAchievements.push("💯 Flawless Victory")

    // Add to user's permanent trophies
    this.newAchievements.forEach((achievement) => {
      if (!this.userStats.trophies.includes(achievement)) {
        this.userStats.trophies.push(achievement)
      }
    })
  }

  displayAchievements() {
    const achievementsContainer = document.getElementById("newAchievements")
    const achievementsList = document.getElementById("achievementsList")

    if (this.newAchievements.length > 0) {
      achievementsContainer.style.display = "block"
      achievementsList.innerHTML = ""

      this.newAchievements.forEach((achievement) => {
        const badge = document.createElement("div")
        badge.className = "achievement-badge"
        badge.textContent = achievement
        achievementsList.appendChild(badge)
      })
    } else {
      achievementsContainer.style.display = "none"
    }
  }

  startTimers() {
    // Question timer
    this.questionInterval = setInterval(() => {
      this.questionTimer--
      this.updateTimerDisplay()

      if (this.questionTimer <= 0) {
        this.selectAnswer(-1) // Auto-select wrong answer
      }
    }, 1000)

    // Category timer
    this.categoryInterval = setInterval(() => {
      this.categoryTimer--
      this.updateCategoryTimer()

      if (this.categoryTimer <= 0) {
        this.endQuiz()
        this.showResults()
      }
    }, 1000)
  }

  clearTimers() {
    if (this.questionInterval) {
      clearInterval(this.questionInterval)
      this.questionInterval = null
    }
    if (this.categoryInterval) {
      clearInterval(this.categoryInterval)
      this.categoryInterval = null
    }
  }

  updateTimerDisplay() {
    document.getElementById("questionTime").textContent = this.questionTimer
    const percentage = (this.questionTimer / 30) * 100
    document.getElementById("questionTimerFill").style.width = `${percentage}%`
  }

  updateCategoryTimer() {
    const minutes = Math.floor(this.categoryTimer / 60)
    const seconds = this.categoryTimer % 60
    document.getElementById("categoryTime").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`

    const percentage = (this.categoryTimer / 600) * 100
    document.getElementById("categoryTimerFill").style.width = `${percentage}%`
  }

  updateQuizHeader() {
    const categoryNames = {
      mathematics: "Mathematics 🔢",
      science: "Science 🧪",
      history: "History 🏛️",
      geography: "Geography 🌍",
      technology: "Technology 💻",
      sports: "Sports ⚽",
    }

    document.getElementById("categoryName").textContent = categoryNames[this.currentCategory]
    document.getElementById("currentCoins").textContent = this.userStats.totalCoins
    document.getElementById("currentStreak").textContent = this.currentStreak
  }

  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active")
    })
    document.getElementById(screenId).classList.add("active")

    if (screenId === "homeScreen") {
      this.displayTrophies()
    }
  }

  displayTrophies() {
    const trophiesSection = document.getElementById("trophiesSection")
    const trophiesGrid = document.getElementById("trophiesGrid")

    if (this.userStats.trophies.length > 0) {
      trophiesSection.style.display = "block"
      trophiesGrid.innerHTML = ""

      this.userStats.trophies.forEach((trophy) => {
        const trophyItem = document.createElement("div")
        trophyItem.className = "trophy-item"
        trophyItem.textContent = trophy
        trophiesGrid.appendChild(trophyItem)
      })
    } else {
      trophiesSection.style.display = "none"
    }
  }

  createParticles() {
    const particlesContainer = document.getElementById("particles")

    setInterval(() => {
      if (document.querySelectorAll(".particle").length < 20) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDuration = Math.random() * 3 + 3 + "s"
        particle.style.animationDelay = Math.random() * 2 + "s"

        const colors = ["#00f0ff", "#ff00ff", "#00ff88"]
        particle.style.background = colors[Math.floor(Math.random() * colors.length)]

        particlesContainer.appendChild(particle)

        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 6000)
      }
    }, 500)
  }

  playSound(type) {
    const audio = document.getElementById(type + "Sound")
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {}) // Ignore autoplay restrictions
    }
  }

  loadUserStats() {
    const saved = localStorage.getItem("quizMasterStats")
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      totalCoins: 0,
      totalScore: 0,
      quizzesCompleted: 0,
      trophies: [],
      bestStreak: 0,
    }
  }

  saveUserStats() {
    localStorage.setItem("quizMasterStats", JSON.stringify(this.userStats))
  }

  updateUserStats() {
    document.getElementById("totalCoins").textContent = this.userStats.totalCoins
    document.getElementById("totalTrophies").textContent = this.userStats.trophies.length
    document.getElementById("bestStreak").textContent = this.userStats.bestStreak
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new QuizApp()
})

// Add some extra visual effects
document.addEventListener("mousemove", (e) => {
  const cursor = document.createElement("div")
  cursor.className = "cursor-trail"
  cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(0,240,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 5}px;
        top: ${e.clientY - 5}px;
        animation: fade-out 1s ease-out forwards;
    `

  document.body.appendChild(cursor)

  setTimeout(() => {
    if (cursor.parentNode) {
      cursor.parentNode.removeChild(cursor)
    }
  }, 1000)
})

// Add fade-out animation for cursor trail
const style = document.createElement("style")
style.textContent = `
    @keyframes fade-out {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`
document.head.appendChild(style)

async function fetchQuestions(categoryId, difficulty = "easy", amount = 10) {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}
function formatQuestion(q) {
  const answers = [...q.incorrect_answers, q.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  return {
    question: q.question,
    correctAnswer: q.correct_answer,
    options: answers
  };
}
// 1. Get DOM Elements
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const bgMusicVolume = document.getElementById("bg-music-volume");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const sfxToggle = document.getElementById("sfx-toggle");
const sfxVolume = document.getElementById("sfx-volume");

// 2. Initial Volume Settings
bgMusic.volume = parseFloat(bgMusicVolume.value);
correctSound.volume = parseFloat(sfxVolume.value);
wrongSound.volume = parseFloat(sfxVolume.value);

// 3. Toggle Mute
musicToggle.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  musicToggle.textContent = bgMusic.muted ? "🔇" : "🎵";
});

let sfxMuted = false;
sfxToggle.addEventListener("click", () => {
  sfxMuted = !sfxMuted;
  sfxToggle.textContent = sfxMuted ? "🔕" : "🔔";
});

// 4. Volume Change Listeners
bgMusicVolume.addEventListener("input", () => {
  bgMusic.volume = parseFloat(bgMusicVolume.value);
});
sfxVolume.addEventListener("input", () => {
  const vol = parseFloat(sfxVolume.value);
  correctSound.volume = vol;
  wrongSound.volume = vol;
});

// 5. Sound Playback Functions
function playCorrectSound() {
  if (!sfxMuted) {
    correctSound.currentTime = 0;
    correctSound.play();
  }
}

function playWrongSound() {
  if (!sfxMuted) {
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
}

// 6. Answer Checking Logic
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    playCorrectSound();
    // ✅ Correct logic here (e.g., increment score)
  } else {
    playWrongSound();
    // ❌ Wrong logic here (e.g., shake, show feedback)
  }
}

// 7. 🔄 Dynamic Question Renderer
function renderQuestion(questionObj) {
  const answersGrid = document.getElementById("answersGrid");
  answersGrid.innerHTML = "";

  questionObj.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = answer;

    btn.addEventListener("click", () => {
      const selected = btn.textContent.trim();
      checkAnswer(selected, questionObj.correctAnswer);
    });

    answersGrid.appendChild(btn);
  });
}

