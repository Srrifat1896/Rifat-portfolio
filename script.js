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
  const allSkills = [...new Set([...data.skills.flatMap((group) => group.items), ...data.profile.skillHighlights])];
  skills.innerHTML = allSkills.map((skill) => `<span>${skill}</span>`).join("");

  const skillIcons = {
    code: `<svg viewBox="0 0 24 24"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-3 18"/></svg>`,
    browser: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 8h18M7 6h.01M10 6h.01M8 22h8m-4-3v3"/></svg>`,
    database: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>`,
    layers: `<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5m-18 5 9 5 9-5"/></svg>`,
    tools: `<svg viewBox="0 0 24 24"><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2 2 0 1 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7ZM16 4l4 4"/></svg>`,
    shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  };
  document.querySelector("#skill-bars").innerHTML = data.skills.map((group) => `
    <article class="skill-group"><div class="skill-group-heading"><div class="skill-group-title"><span class="skill-category-icon" aria-hidden="true">${skillIcons[group.icon] || skillIcons.code}</span><h3>${group.category}</h3></div><span class="skill-group-status">${group.status}</span></div>
      <ul class="skill-tags">${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>`).join("");
  document.querySelector("#problem-solving-highlight").innerHTML = `
    <strong class="problem-solving-count">100+</strong><div><h3>Programming problems solved</h3><p>Practice across HackerRank, Codeforces, and LeetCode</p></div>`;

  const projectEntry = (project) => `<article class="timeline-entry"><h4>${project.name}</h4><span class="date-pill ${project.visual === "falcon" ? "date-muted" : ""}">${project.status.replace(" · ", " / ")}</span><p class="italic">${project.kind.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}</p><ul>${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul></article>`;
  document.querySelector("#resume-content").innerHTML = `
    <div class="resume-column">
      <h3 class="resume-heading">Profile</h3>
      <article class="timeline-entry"><h4>${data.profile.fullName}</h4><p class="italic">${data.profile.heroRole}</p><p>${data.profile.fullName} is a ${data.profile.degree} student at ${data.profile.university}, building practical software and developing a foundation in cybersecurity.</p><ul><li>${data.profile.problemSolving}</li><li>${data.profile.competitiveProgramming}</li><li>Career direction: software development with a long-term goal of cybersecurity engineering.</li></ul></article>
      <h3 class="resume-heading">Current Education</h3>
      <article class="timeline-entry"><h4>${data.profile.degree}</h4><span class="date-pill">EXPECTED GRADUATION · ${data.profile.expectedGraduation}</span><p class="italic">${data.profile.university}</p><p>Developing a foundation in software engineering through university study and independent practice.</p></article>
      <h3 class="resume-heading">University Admission Achievements</h3>
      ${data.education.admission.map((item) => `<article class="timeline-entry compact-entry admission-entry"><h4>${item.school}</h4><p><span class="admission-subject-label">Admission opportunity for:</span> ${item.subject}</p></article>`).join("")}
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
    <article class="certification-card">${item.logo ? `<span class="certification-logo${item.logoTall ? " certification-logo-tall" : ""}" aria-hidden="true"><img src="${item.logo}" alt="" loading="lazy" decoding="async" /></span>` : `<span class="certification-icon" aria-hidden="true">${interestIcons.book}</span>`}<div class="certification-copy"><h3>${item.title}</h3><p>${item.provider}</p><div class="certification-meta"><span>${item.duration}</span><span>Completed ${item.completed}</span></div></div></article>`).join("");

  const contactLinks = document.querySelector("#contact-links");
  const contacts = [];
  const contactIcon = (kind, svg) => `<span class="contact-icon contact-icon-${kind}" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${svg}</svg></span>`;
  const contactRow = (kind, title, value, href, svg) => `${href ? `<a class="contact-item" href="${href}" ${href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>` : `<div class="contact-item">`}${contactIcon(kind, svg)}<span class="contact-copy"><strong>${title}</strong><small>${value}</small></span>${href ? "</a>" : "</div>"}`;
  if (data.contact.location) contacts.push(contactRow("location", "Location", data.contact.location, "", `<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>`));
  if (data.contact.whatsapp) contacts.push(contactRow("whatsapp", "WhatsApp", data.contact.whatsapp, `https://wa.me/${data.contact.whatsapp.replace(/\D/g, "")}`, `<path fill="currentColor" d="M12.04 2a9.8 9.8 0 0 0-8.42 14.82L2.3 21.8l5.1-1.3A9.8 9.8 0 1 0 12.04 2Zm0 17.8a8 8 0 0 1-4.08-1.12l-.3-.18-3.03.78.8-2.95-.2-.31A8 8 0 1 1 12.04 19.8Zm4.4-5.98c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.5.58.19 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/>`));
  if (data.contact.email) contacts.push(contactRow("email", "Email", data.contact.email, `mailto:${data.contact.email}`, `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>`));
  if (data.contact.github) contacts.push(contactRow("github", "GitHub", data.contact.github.replace(/^https?:\/\//, ""), data.contact.github, `<path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.13 3.54 1.62.1-.72.4-1.21.72-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.11-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.7 10.7 0 0 1 5.57 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.22 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.61 5.24-5.1 5.52.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>`));
  if (data.contact.linkedin) contacts.push(contactRow("linkedin", "LinkedIn", data.contact.linkedin.replace(/^https?:\/\//, ""), data.contact.linkedin, `<path fill="currentColor" d="M5.2 3.5a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0ZM2 8h3v14H2zm6 0h2.9v1.9h.1A3.2 3.2 0 0 1 14 7.7c3.2 0 4 2.1 4 5V22h-3v-8.2c0-2-.1-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22H8Z"/>`));
  contactLinks.innerHTML = contacts.join("");
  document.querySelector("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const subject = String(fields.get("subject") || "Portfolio contact");
    const body = `From: ${fields.get("name")}\nReply-to: ${fields.get("email")}\n\n${fields.get("message")}`;
    document.querySelector("#form-result").textContent = "Opening your email app with a prepared draft. Review it and press Send there; this website does not store messages.";
    window.location.href = `mailto:${data.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
        ${project.problem ? `<p class="project-problem"><strong>Problem focus:</strong> ${project.problem}</p>` : ""}
        <ul>${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
        <div class="tech-list">${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
        <div class="project-actions">${project.url ? `<a class="project-link" href="${project.url}" target="_blank" rel="noreferrer">View live demo ↗</a>` : ""}${project.repository ? `<a class="project-link" href="${project.repository}" target="_blank" rel="noreferrer">View repository ↗</a>` : ""}</div>
      </div>
    </article>`).join("");

  document.querySelector("#year").textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealItems = document.querySelectorAll(".section-heading, .about-card, .skill-group, .problem-solving-highlight, .resume-download-wrap, .resume-column, .interest-card, .project-card, .academic-card, .certification-card, .contact-card, .contact-form");
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
