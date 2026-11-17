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
  const allSkills = [...new Set([...data.skills.map((skill) => skill.name), "Data Structures & Algorithms"])];
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
    </div>`;

  const interestIcons = {
    settings: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" transform="translate(-1 -1)"/></svg>`,
    python: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3H8a3 3 0 0 0-3 3v4h7v2H8a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-4h1a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-4Z"/><path d="M9 6h.01M15 18h.01" stroke-width="2.5"/></svg>`,
    code: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></svg>`,
    workflow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><rect x="9" y="10.5" width="6" height="5.5" rx="1"/><path d="M10.5 10.5V9a1.5 1.5 0 0 1 3 0v1.5"/></svg>`,
    brain: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5a3 3 0 0 0-5.7-1.2A3.4 3.4 0 0 0 4.5 9a3.5 3.5 0 0 0 1.2 6.5A3.2 3.2 0 0 0 12 17.2V4.5Z"/><path d="M12 4.5a3 3 0 0 1 5.7-1.2A3.4 3.4 0 0 1 19.5 9a3.5 3.5 0 0 1-1.2 6.5 3.2 3.2 0 0 1-6.3 1.7V4.5Z"/><path d="M8 8.5c1.4 0 2 .7 2 1.8M16 8.5c-1.4 0-2 .7-2 1.8M8 14c1.3-.2 2 .2 2 1.2M16 14c-1.3-.2-2 .2-2 1.2"/></svg>`,
  };
  document.querySelector("#interest-grid").innerHTML = data.interests.map((item) => `
    <article class="interest-card"><span class="interest-icon" aria-hidden="true">${interestIcons[item.icon] || interestIcons.code}</span><h3>${item.title}</h3><p>${item.description}</p></article>`).join("");

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
