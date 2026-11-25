// 1. عرض المشاريع من ملف البيانات باستخدام template (بدون innerHTML)
const projectsGrid = document.getElementById("projects-grid");
const cardTemplate = document.getElementById("project-card-template");

function renderProjects(list) {
  projectsGrid.replaceChildren();

  list.forEach((project) => {
    const clone = cardTemplate.content.cloneNode(true);

    const img = clone.querySelector(".project-img");
    img.src = project.image;
    img.alt = project.title;

    clone.querySelector(".project-title").textContent = project.title;
    clone.querySelector(".project-desc").textContent = project.description;

    const tagsBox = clone.querySelector(".project-tags");
    project.tags.forEach((tagText) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tagText;
      tagsBox.appendChild(span);
    });

    clone.querySelector(".demo-link").href = project.demo;
    clone.querySelector(".code-link").href = project.code;

    projectsGrid.appendChild(clone);
  });
}

renderProjects(projects);

// 2. أزرار تصفية المشاريع
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");

    const category = button.dataset.category;
    const filtered =
      category === "all"
        ? projects
        : projects.filter((item) => item.category === category);

    renderProjects(filtered);
  });
});

// 3. الوضع الداكن مع الحفظ في المتصفح
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "الوضع الفاتح ☀️" : "الوضع الداكن 🌙";
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// 4. ظهور الأقسام بهدوء عند النزول
const revealSections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealSections.forEach((section) => observer.observe(section));

// 5. كتابة السنة تلقائياً في الشريط السفلي
document.getElementById("year").textContent = new Date().getFullYear();

// 6. لمسة إبداعية 1: تحية حسب الوقت
const greetingEl = document.getElementById("greeting-text");
if (greetingEl) {
  const hour = new Date().getHours();
  greetingEl.textContent = hour < 12 ? "صباح الخير، أهلاً بك في موقعي" : "مساء الخير، أهلاً بك في موقعي";
}

// 7. لمسة إبداعية 2: زر نسخ البريد الإلكتروني
const copyEmailBtn = document.getElementById("copy-email-btn");
const copyFeedback = document.getElementById("copy-feedback");

if (copyEmailBtn && copyFeedback) {
  copyEmailBtn.addEventListener("click", () => {
    const email = copyEmailBtn.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      copyFeedback.textContent = "تم نسخ البريد الإلكتروني بنجاح ✓";
      setTimeout(() => {
        copyFeedback.textContent = "";
      }, 2500);
    });
  });
}
