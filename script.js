(() => {
  const data = window.portfolioData;
  if (!data) return;

  document.querySelectorAll("[data-profile]").forEach((node) => {
    const key = node.dataset.profile;
    const value = data.profile[key] ?? (key === "email" ? data.contact.email : undefined);
    if (value) {
      node.textContent = value;
      if (key === "email" && node instanceof HTMLAnchorElement) node.href = `mailto:${value}`;
    }
  });

  const skills = document.querySelector("#mini-skills");
  const allSkills = [...new Set([...data.skills.map((skill) => skill.name), ...data.profile.skillHighlights])];
  skills.innerHTML = allSkills.map((skill) => `<span>${skill}</span>`).join("");

  document.querySelector("#skill-bars").innerHTML = data.skills.map((skill) => `
    <div class="skill-row"><div class="skill-row-label"><strong>${skill.name}</strong><span>LEARNING</span></div>
      <div class="skill-track" role="img" aria-label="${skill.name}: currently learning"><span style="width:${skill.level}%"></span></div>
    </div>`).join("");

  const projectEntry = (project) => `<article class="timeline-entry"><h4>${project.name}</h4><span class="date-pill ${project.visual === "falcon" ? "date-muted" : ""}">${project.status.replace(" · ", " / ")}</span><p class="italic">${project.kind.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}</p><ul>${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul></article>`;
  document.querySelector("#resume-content").innerHTML = `
    <div class="resume-column">
      <h3 class="resume-heading">Summary</h3>
      <article class="timeline-entry"><h4>${data.profile.fullName}</h4><p class="italic">${data.profile.degree} student at ${data.profile.university}, currently in ${data.profile.semester}.</p><ul><li>Programming: ${data.profile.programmingLanguages.join(", ")}</li><li>Database: ${data.profile.database.join(", ")}</li><li>Technologies used in projects: ${data.profile.technologies.join(", ")}</li><li>DSA background: ${data.profile.dsaBackground}</li><li>${data.profile.competitiveProgramming}</li><li>${data.profile.problemSolving}</li><li>Career goal: ${data.profile.goal}</li></ul></article>
      <h3 class="resume-heading">Education</h3>
      <article class="timeline-entry"><h4>${data.profile.degree}</h4><span class="date-pill">EXPECTED GRADUATION · ${data.profile.expectedGraduation}</span><p class="italic">${data.profile.university}</p><p>Developing a foundation in software engineering through university study and independent practice.</p></article>
      <h3 class="resume-heading">Admission Journey</h3><p>I also received admission opportunities in these programs:</p>
      ${data.education.admission.map((item) => `<article class="timeline-entry compact-entry"><h4>${item.school}</h4><p class="italic">Subject: ${item.subject}</p></article>`).join("")}
      <h3 class="resume-heading">Secondary Education</h3>
      ${data.education.secondary.map((item) => `<article class="timeline-entry compact-entry"><h4>${item.award}</h4><p class="italic">${item.school}</p><p>Board: ${item.board} · Result: ${item.result} · Passing year: ${item.year}</p></article>`).join("")}
      <h3 class="resume-heading">Relevant coursework</h3><article class="timeline-entry"><h4>SOFTWARE ENGINEERING STUDIES</h4><ul class="coursework-list">${data.coursework.map((course) => `<li>${course}</li>`).join("")}</ul></article>
    </div>
    <div class="resume-column">
      <h3 class="resume-heading">Technical learning</h3><article class="timeline-entry"><h4>BUILDING PRACTICAL SKILLS</h4><p>Continuing to develop programming, database, web development, and software engineering foundations through coursework and project work.</p></article>
      <h3 class="resume-heading">Project experience</h3>${data.projects.map(projectEntry).join("")}
      <h3 class="resume-heading">Course-related projects</h3>
      ${data.academicProjects.map((project) => `<article class="timeline-entry compact-entry"><h4>${project.name}</h4><span class="date-pill ${project.status === "Completed" ? "" : "date-muted"}">${project.status}</span><p class="italic">${[project.semester, project.course].filter(Boolean).join(" · ") || "University course project"}</p><p>${project.technology}</p></article>`).join("")}
    </div>`;

  const interestIcons = {
    settings: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" transform="translate(-1 -1)"/></svg>`,
    python: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3H8a3 3 0 0 0-3 3v4h7v2H8a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-4h1a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-4Z"/><path d="M9 6h.01M15 18h.01" stroke-width="2.5"/></svg>`,
    code: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>`,
    workflow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><rect x="9" y="10.5" width="6" height="5.5" rx="1"/><path d="M10.5 10.5V9a1.5 1.5 0 0 1 3 0v1.5"/></svg>`,
    brain: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5a3 3 0 0 0-5.7-1.2A3.4 3.4 0 0 0 4.5 9a3.5 3.5 0 0 0 1.2 6.5A3.2 3.2 0 0 0 12 17.2V4.5Z"/><path d="M12 4.5a3 3 0 0 1 5.7-1.2A3.4 3.4 0 0 1 19.5 9a3.5 3.5 0 0 1-1.2 6.5 3.2 3.2 0 0 1-6.3 1.7V4.5Z"/><path d="M8 8.5c1.4 0 2 .7 2 1.8M16 8.5c-1.4 0-2 .7-2 1.8M8 14c1.3-.2 2 .2 2 1.2M16 14c-1.3-.2-2 .2-2 1.2"/></svg>`,
    book: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h7"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2A2.3 2.3 0 0 0 9.5 16H18a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="10" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/></svg>`,
    gamepad: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9h11a4.5 4.5 0 0 1 4.3 5.8l-.8 2.6a2.6 2.6 0 0 1-4.3 1.1l-2.1-1.8h-5.2l-2.1 1.8A2.6 2.6 0 0 1 3 17.4l-.8-2.6A4.5 4.5 0 0 1 6.5 9Z"/><path d="M8 11v4M6 13h4M16 12h.01M18.5 14h.01"/></svg>`,
  };
  document.querySelector("#interest-grid").innerHTML = data.interests.map((item) => `
    <article class="interest-card"><span class="interest-icon" aria-hidden="true">${interestIcons[item.icon] || interestIcons.code}</span><h3>${item.title}</h3><p>${item.description}</p></article>`).join("");

  document.querySelector("#academic-project-grid").innerHTML = data.academicProjects.map((project) => `
    <article class="academic-card">
      <div class="academic-card-top"><span class="academic-icon" aria-hidden="true">${interestIcons[project.icon]}</span><span class="academic-status"><span aria-hidden="true">${project.status === "Completed" ? "✓" : "•"}</span> ${project.status}</span></div>
      <p class="academic-tech">${project.technology}</p>
      <h3>${project.name}</h3>
      ${project.semester || project.course ? `<p class="academic-course">${[project.semester, project.course].filter(Boolean).join(" · ")}</p>` : ""}
      <p class="academic-description">${project.description}</p>
      ${project.features.length ? `<ul class="academic-features">${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>` : ""}
    </article>`).join("");

  document.querySelector("#certification-list").innerHTML = data.certifications.map((item) => `
    <article class="certification-card"><span class="certification-icon" aria-hidden="true">${interestIcons.book}</span><div class="certification-copy"><h3>${item.title}</h3><p>${item.provider}</p><div class="certification-meta"><span>${item.duration}</span><span>Completed ${item.completed}</span></div></div></article>`).join("");

  const contactLinks = document.querySelector("#contact-links");
  const contacts = [];
  if (data.contact.email) contacts.push(data.contact.emailIsExample
    ? `<div class="contact-item"><span class="contact-icon">✉</span><div><strong>Email</strong><small>${data.contact.email} <em>example</em></small></div></div>`
    : `<a class="contact-item" href="mailto:${data.contact.email}"><span class="contact-icon">✉</span><div><strong>Email</strong><small>${data.contact.email}</small></div></a>`);
  if (data.contact.github) contacts.push(`<a class="contact-item" href="${data.contact.github}" target="_blank" rel="noreferrer"><span class="contact-icon">⌘</span><div><strong>GitHub</strong><small>${data.contact.github.replace(/^https?:\/\//, "")}</small></div></a>`);
  if (data.contact.linkedin) contacts.push(`<a class="contact-item" href="${data.contact.linkedin}" target="_blank" rel="noreferrer"><span class="contact-icon">in</span><div><strong>LinkedIn</strong><small>${data.contact.linkedin.replace(/^https?:\/\//, "")}</small></div></a>`);
  contactLinks.innerHTML = `${contacts.join("")}<p class="contact-disclaimer">${data.contact.emailIsExample ? "The email shown is a sample placeholder. Replace it with your public address before sharing this portfolio." : "Use the links here to reach me."}</p>`;
  document.querySelector("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#form-result").textContent = "Your details are valid. This demo form does not send or store messages.";
  });

  document.querySelector("#projects").innerHTML = data.projects.map((project) => `
    <article class="project-card">
      <div class="project-visual ${project.visual}" aria-hidden="true">
        ${project.cover
          ? `<img class="project-cover" src="${project.cover}" alt="" loading="lazy" />`
          : `<span class="visual-label">${project.number} &nbsp; / &nbsp; ${project.kind}</span><div class="falcon-letter">F<span style="color:#78b7ff">✳</span></div>`}
      </div>
      <div class="project-content">
        <div class="project-meta"><span>${project.kind}</span><span class="project-state ${project.visual === "falcon" ? "pending" : ""}">${project.status}</span></div>
        <h3>${project.name}</h3><p>${project.description}</p>
        <ul>${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
        <div class="tech-list">${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
        ${project.url ? `<a class="project-link" href="${project.url}" target="_blank" rel="noreferrer">View live project ↗</a>` : ""}
      </div>
    </article>`).join("");

  document.querySelector("#year").textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealItems = document.querySelectorAll(".section-heading, .about-card, .skill-row, .resume-column, .interest-card, .project-card, .academic-card, .certification-card, .contact-card, .contact-form");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    document.body.classList.add("motion-ready");
    revealItems.forEach((item) => {
      item.classList.add("scroll-reveal");
      revealObserver.observe(item);
    });
  }

  const themeToggle = document.querySelector("#theme-toggle");
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("rifat-portfolio-theme") === "dark" ? "dark" : "light";
  } catch { /* Use the light theme when browser storage is unavailable. */ }
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.title = isDark ? "Switch to light theme" : "Switch to dark theme";
  };
  applyTheme(savedTheme);
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try { localStorage.setItem("rifat-portfolio-theme", nextTheme); } catch { /* Theme still works for this visit. */ }
  });

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }));
})();
