async function loadContent() {
  const res = await fetch("content.json");
  const data = await res.json();

  document.getElementById("name").textContent = data.name;
  document.getElementById("footerName").textContent = data.name;
  document.getElementById("headline").textContent = data.headline || "";
  document.getElementById("location").textContent = data.location || "";

  const emailLink = document.getElementById("emailLink");
  emailLink.textContent = data.email || "Email";
  emailLink.href = data.email ? `mailto:${data.email}` : "#";

  // Links
  const links = document.getElementById("links");
  links.innerHTML = "";
  (data.links || []).forEach(l => {
    const a = document.createElement("a");
    a.className = "linkBtn";
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = l.label;
    links.appendChild(a);
  });

  // About
  const about = document.getElementById("about");
  about.innerHTML = "";
  (data.about || []).forEach(p => {
    const el = document.createElement("p");
    el.className = "small";
    el.textContent = p;
    about.appendChild(el);
  });

  // Skills
  const skills = document.getElementById("skills");
  skills.innerHTML = "";
  (data.skills || []).forEach(s => {
    const el = document.createElement("span");
    el.className = "tag";
    el.textContent = s;
    skills.appendChild(el);
  });

  // Experience
  const exp = document.getElementById("experience");
  exp.innerHTML = "";
  (data.experience || []).forEach(e => {
    const wrap = document.createElement("div");
    wrap.className = "item";
    wrap.innerHTML = `
      <div class="itemTitle">
        <strong>${e.title}</strong>
        <span>${e.dates || ""}</span>
      </div>
      <div class="itemOrg">${e.org || ""}</div>
      ${e.bullets?.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join("")}</ul>` : ""}
    `;
    exp.appendChild(wrap);
  });

  // Projects
  const projects = document.getElementById("projects");
  projects.innerHTML = "";
  (data.projects || []).forEach(p => {
    const wrap = document.createElement("div");
    wrap.className = "item";
    wrap.innerHTML = `
      <div class="itemTitle">
        <strong>${p.name}</strong>
        ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">Link</a>` : ""}
      </div>
      <div class="small">${p.description || ""}</div>
    `;
    projects.appendChild(wrap);
  });

  // Education
  const edu = document.getElementById("education");
  edu.innerHTML = "";
  (data.education || []).forEach(ed => {
    const wrap = document.createElement("div");
    wrap.className = "item";
    wrap.innerHTML = `
      <div class="itemTitle">
        <strong>${ed.school}</strong>
      </div>
      <div class="small">${ed.details || ""}</div>
    `;
    edu.appendChild(wrap);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
}

loadContent();
