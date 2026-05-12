const services = [
  {
    id: 1,
    title: "PowerPoint Design for Class Reports",
    category: "Presentation",
    provider: "Glyndell M.",
    course: "BS Information Technology",
    icon: "📊",
    image: "images/powerpoint.jpg",
    price: 80,
    rating: 4.9,
    completed: 34,
    location: "Sindangan / Online",
    description:
      "Clean, modern, and organized PowerPoint design for class reports, project proposals, and pitch presentations.",
    portfolio: [
      "Sample pitch deck",
      "Research presentation",
      "Class report slides",
    ],
  },
  {
    id: 2,
    title: "AutoCAD Drafting Assistance",
    category: "Engineering",
    provider: "Dioscoro A.",
    course: "BS Agricultural and Biosystems Engineering",
    icon: "📐",
    image: "images/autocad.jpg",
    price: 150,
    rating: 4.8,
    completed: 21,
    location: "MSU-Sindangan / Online",
    description:
      "CAD guidance, drafting support, and technical drawing assistance for engineering-related activities.",
    portfolio: ["2D floor plan", "Machine part sketch", "Engineering layout"],
  },
  {
    id: 3,
    title: "Basic Coding Help and Debugging",
    category: "Coding",
    provider: "Daryl S.",
    course: "BS Computer Science",
    icon: "💻",
    image: "images/coding.jpg",
    price: 120,
    rating: 4.7,
    completed: 18,
    location: "Online",
    description:
      "Beginner-friendly programming support for HTML, CSS, JavaScript, Python, and simple school projects.",
    portfolio: [
      "HTML website",
      "JavaScript calculator",
      "Python activity guide",
    ],
  },
  {
    id: 4,
    title: "Math and Physics Tutoring",
    category: "Tutoring",
    provider: "Danica R.",
    course: "BS Secondary Education",
    icon: "📚",
    image: "images/math.jpg",
    price: 100,
    rating: 4.9,
    completed: 42,
    location: "Sindangan / Meet-up",
    description:
      "One-on-one review support for math, physics, and problem-solving activities. Available online or meet-up.",
    portfolio: ["Algebra review", "Physics problem set", "Exam preparation"],
  },
  {
    id: 5,
    title: "Poster and Graphic Design",
    category: "Design",
    provider: "Lyka P.",
    course: "BS Information Systems",
    icon: "🎨",
    image: "images/poster.jpg",
    price: 90,
    rating: 4.6,
    completed: 27,
    location: "Online",
    description:
      "Creative poster, infographic, pubmat, and layout design for school events, organizations, and class activities.",
    portfolio: ["Event poster", "Infographic", "Organization pubmat"],
  },
  {
    id: 6,
    title: "Research Formatting and Proofreading",
    category: "Research",
    provider: "Kaye L.",
    course: "BA English Language Studies",
    icon: "📝",
    image: "images/research.jpg",
    price: 130,
    rating: 4.8,
    completed: 25,
    location: "Online",
    description:
      "Support for formatting, grammar checking, proofreading, references, and presentation polishing. No ghostwriting.",
    portfolio: [
      "APA formatting",
      "Grammar proofreading",
      "Research slide polishing",
    ],
  },
  {
    id: 7,
    title: "Short Video Editing for School Projects",
    category: "Editing",
    provider: "Marco V.",
    course: "BS Multimedia Arts",
    icon: "🎬",
    image: "images/editing.jpg",
    price: 180,
    rating: 4.7,
    completed: 16,
    location: "Sindangan / Online",
    description:
      "Video editing for class outputs, documentation videos, school events, and project presentations.",
    portfolio: [
      "Event recap",
      "Class documentary",
      "Project presentation video",
    ],
  },
  {
    id: 8,
    title: "Reviewer and Notes Layout Assistance",
    category: "Research",
    provider: "Angel T.",
    course: "BS Education",
    icon: "📒",
    image: "images/review.jpg",
    price: 70,
    rating: 4.5,
    completed: 31,
    location: "Online",
    description:
      "Organized reviewers, notes layout, and study material formatting for easier reading and exam preparation.",
    portfolio: ["Exam reviewer", "Lecture notes", "Study guide"],
  },
];

let currentCategory = "All";

function goToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  document.getElementById("mobileNav").classList.remove("show");
}

function toggleMobileMenu() {
  document.getElementById("mobileNav").classList.toggle("show");
}

function openAuth(type) {
  document.getElementById("authModal").classList.add("show");
  switchAuth(type);
}

function closeAuth() {
  document.getElementById("authModal").classList.remove("show");
}

function switchAuth(type) {
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (type === "login") {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
  } else {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
  }
}

function loginUser(event) {
  event.preventDefault();

  closeAuth();
  showToast("Login successful. Welcome to the Campus Gig prototype!");
  document.getElementById("dashboardGreeting").textContent =
    "Welcome back, Student!";
  goToSection("dashboard");
}

function signupUser(event) {
  event.preventDefault();

  const name = document.getElementById("signupName").value || "Student";
  document.getElementById("dashboardGreeting").textContent =
    `Welcome, ${name}!`;

  closeAuth();
  showToast(`Account created for ${name}. You can now explore Campus Gig.`);
  goToSection("dashboard");
}

function filterServices(category, button) {
  currentCategory = category;

  document.querySelectorAll(".category-card").forEach((card) => {
    card.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  goToSection("marketplace");
  renderServices();
}

function searchFromHero() {
  const heroSearchValue = document.getElementById("heroSearch").value;
  document.getElementById("serviceSearch").value = heroSearchValue;
  goToSection("marketplace");
  renderServices();
}

function renderServices() {
  const grid = document.getElementById("serviceGrid");
  const searchValue = document
    .getElementById("serviceSearch")
    .value.toLowerCase();
  const sortValue = document.getElementById("sortSelect").value;

  let filteredServices = services.filter((service) => {
    const matchesCategory =
      currentCategory === "All" || service.category === currentCategory;

    const matchesSearch =
      service.title.toLowerCase().includes(searchValue) ||
      service.category.toLowerCase().includes(searchValue) ||
      service.provider.toLowerCase().includes(searchValue) ||
      service.description.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  if (sortValue === "price-low") {
    filteredServices.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "rating-high") {
    filteredServices.sort((a, b) => b.rating - a.rating);
  }

  if (filteredServices.length === 0) {
    grid.innerHTML = `
      <div class="activity-dashboard-card" style="grid-column: 1 / -1; text-align:center; padding:26px;">
        <h3>No services found</h3>
        <p style="color:#706b66; margin-top:8px;">Try another keyword or choose a different category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredServices
    .map((service) => {
      return `
        <article class="service-card">
          <div class="service-cover" style="background-image: url('${service.image}')">
            <span>${service.icon}</span>
            <div class="service-category">${service.category}</div>
          </div>

          <div class="service-body">
            <h3>${service.title}</h3>
            <p class="provider-line">By ${service.provider} • ${service.course}</p>

            <div class="service-meta">
              <span>⭐ ${service.rating}</span>
              <span>${service.completed} completed</span>
            </div>

            <div class="service-bottom">
              <div class="price">
                <small>Starts at</small><br>
                <strong>₱${service.price}</strong>
              </div>

              <button class="view-btn" onclick="openProvider(${service.id})">View Gig</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function openProvider(id) {
  const service = services.find((item) => item.id === id);
  const modal = document.getElementById("providerModal");
  const content = document.getElementById("providerModalContent");

  content.innerHTML = `
    <button class="close-modal" onclick="closeProvider()" style="position:absolute; top:18px; right:18px;">×</button>

    <div class="provider-head">
      <div class="avatar">${getInitials(service.provider)}</div>

      <div>
        <h2>${service.provider}</h2>
        <p>${service.course}</p>
        <p>⭐ ${service.rating} rating • ${service.completed} completed gigs</p>
      </div>
    </div>

    <h3>${service.title}</h3>
    <p>${service.description}</p>

    <div class="profile-details">
      <div>
        <span>Category</span>
        <strong>${service.category}</strong>
      </div>

      <div>
        <span>Starting price</span>
        <strong>₱${service.price}</strong>
      </div>

      <div>
        <span>Availability</span>
        <strong>${service.location}</strong>
      </div>

      <div>
        <span>Status</span>
        <strong>Student-verified</strong>
      </div>
    </div>

    <h3>Sample portfolio</h3>

    <div class="portfolio">
      ${service.portfolio.map((item) => `<span>${item}</span>`).join("")}
    </div>

    <div class="ethics-box" style="background:#fbfaf9; color:#2a2723; border:1px solid #e5e0dc;">
      <strong>Ethical use reminder:</strong>
      This service is intended for support, consultation, tutoring, formatting,
      and skills assistance only.
    </div>

    <div class="modal-actions">
      <button class="btn btn-primary full" onclick="requestService('${service.title}', '${service.category}')">Request Service</button>
      <button class="btn btn-light full" onclick="showToast('Messaging will be available in the full app.')">Message</button>
    </div>
  `;

  modal.classList.add("show");
}

function closeProvider() {
  document.getElementById("providerModal").classList.remove("show");
}

function requestService(title, category) {
  closeProvider();

  document.getElementById("requestTitle").value = title;
  document.getElementById("requestCategory").value = category;

  showToast("Service selected. Complete the request form below.");
  goToSection("request");
}

function submitRequest(event) {
  event.preventDefault();

  const title = document.getElementById("requestTitle").value;
  const category = document.getElementById("requestCategory").value;
  const budget = document.getElementById("requestBudget").value;

  showToast(`Request submitted: ${title} • ${category} • Budget ${budget}`);
  event.target.reset();
  goToSection("dashboard");
}

function submitOffer(event) {
  event.preventDefault();

  const title = document.getElementById("offerTitle").value;
  const category = document.getElementById("offerCategory").value;
  const priceText = document.getElementById("offerPrice").value;
  const availability = document.getElementById("offerAvailability").value;
  const description = document.getElementById("offerDescription").value;

  const newService = {
    id: services.length + 1,
    title: title,
    category: category,
    provider: "New Student Provider",
    course: "Student Account",
    icon: getCategoryIcon(category),
    image: getCategoryImage(category),
    price: extractPrice(priceText),
    rating: 5.0,
    completed: 0,
    location: availability,
    description: description,
    portfolio: [
      "New service sample",
      "Student portfolio",
      "Skill-based support",
    ],
  };

  services.unshift(newService);

  event.target.reset();

  showToast("Your service offer has been published in the prototype.");
  currentCategory = "All";
  renderServices();
  goToSection("marketplace");
}

function getCategoryIcon(category) {
  const icons = {
    Tutoring: "📚",
    Design: "🎨",
    Presentation: "📊",
    Engineering: "📐",
    Coding: "💻",
    Research: "📝",
    Editing: "🎬",
  };

  return icons[category] || "✨";
}

function getCategoryImage(category) {
  const images = {
    Tutoring: "images/math.jpg",
    Design: "images/poster.jpg",
    Presentation: "images/powerpoint.jpg",
    Engineering: "images/autocad.jpg",
    Coding: "images/coding.jpg",
    Research: "images/research.jpg",
    Editing: "images/editing.jpg",
  };

  return images[category] || "images/review.jpg";
}

function extractPrice(priceText) {
  const number = priceText.replace(/[^\d]/g, "");
  return number ? Number(number) : 100;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .replace(".", "")
    .toUpperCase();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  switchAuth("login");

  document.getElementById("authModal").addEventListener("click", (event) => {
    if (event.target.id === "authModal") {
      closeAuth();
    }
  });

  document
    .getElementById("providerModal")
    .addEventListener("click", (event) => {
      if (event.target.id === "providerModal") {
        closeProvider();
      }
    });
});
