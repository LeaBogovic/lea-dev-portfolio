import { useEffect, useState } from "react";
import "./App.css";

// Project data for the cards and modal
const projects = [
  {
    id: "mersus-vr-training",
    icon: "✦",
    title: "VR Kitchen Hygiene Training",
    label: "Placement project",
    summary:
      "A Unity and C# VR training project I worked on during my placement at Mersus Technologies.",
    tags: ["Unity", "C#", "VR", "Agile"],
    role: "Immersive Developer Intern",
    challenge:
      "Build a clear and easy-to-follow training experience for kitchen hygiene and food safety in VR.",
    work: [
      "Built and tested object interactions for food prep tasks.",
      "Worked on grabbing, snapping, hand poses, poke interactions and feedback.",
      "Helped improve prompts, guidance and the overall user flow.",
      "Took part in Agile work including testing, bug fixing and team feedback.",
    ],
    result:
      "The training module was completed and later featured in a public Mersus blog post and video.",
    blogUrl: "https://mersus.ie/vr-hygiene-training-kitchen-safety-simulator/",
    videoId: "OqryGDjhtSA",
  },
  {
    id: "hands-of-growth",
    icon: "✿",
    title: "Hands of Growth",
    label: "Final year project",
    summary:
      "A hand-tracking VR project about bringing a dull apartment space to life through interaction.",
    tags: ["Unity", "Hand Tracking", "Shader Graph", "VR"],
    role: "Student Developer",
    challenge:
      "Create a hand-tracking experience that feels natural, visual and easy to understand.",
    work: [
      "Designed interactions for touching, planting, grabbing and object movement.",
      "Explored visual feedback and simple storytelling through the environment.",
      "Built a colour reveal effect that changes the world through interaction.",
      "Tested ideas with performance in mind for standalone VR hardware.",
    ],
    result:
      "This project helped me combine interaction design, technical development and visual ideas in one piece of work.",
  },
  {
    id: "software-foundations",
    icon: "⌘",
    title: "Software and Graphics Work",
    label: "College work",
    summary:
      "A mix of software, database, graphics and game development work completed during my course.",
    tags: ["Java", "C++", "SQL", "OpenGL"],
    role: "Student Developer",
    challenge:
      "Build a broad technical foundation across different areas of software and interactive development.",
    work: [
      "Built Java applications with CRUD features and database work.",
      "Created C++ projects using object-oriented programming.",
      "Learned OpenGL basics such as shaders, textures, buffers and lighting.",
      "Built Unity prototypes with gameplay systems, movement and interaction.",
    ],
    result:
      "This gave me a broad base and helped me get comfortable learning different tools and workflows.",
  },
];

const skillGroups = {
  unity: {
    label: "Unity and VR",
    icon: "✦",
    description:
      "This is the area I feel strongest in because of my placement and project work.",
    skills: ["Unity", "C#", "VR", "Hand Tracking", "XR Interaction", "Agile"],
  },
  web: {
    label: "Web",
    icon: "{ }",
    description:
      "I really enjoy web design and frontend work, especially simple and interactive interfaces.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Vite", "Responsive Design"],
  },
  software: {
    label: "Software",
    icon: "⌘",
    description:
      "My course gave me a broad base across software development and problem solving.",
    skills: ["Java", "C++", "SQL", "OOP", "Testing", "GitHub"],
  },
  graphics: {
    label: "Graphics",
    icon: "◇",
    description:
      "I also worked with graphics and rendering basics during college.",
    skills: ["OpenGL", "Shaders", "Textures", "Lighting", "Rendering"],
  },
};

// Small cursor effect for desktop
function CursorEffects() {
  useEffect(() => {
    const ring = document.querySelector(".cursor-ring");

    if (!ring) {
      console.warn("Cursor ring was not found.");
      return undefined;
    }

    function moveCursor(event) {
      ring.style.left = `${event.clientX}px`;
      ring.style.top = `${event.clientY}px`;
      ring.style.opacity = "1";
    }

    function handlePointerDown() {
      ring.classList.add("cursor-ring-clicked");

      window.setTimeout(() => {
        ring.classList.remove("cursor-ring-clicked");
      }, 180);
    }

    function handlePointerOver(event) {
      const interactiveElement = event.target.closest(
        "a, button, .project-card, .scanner-skill"
      );

      if (interactiveElement) {
        ring.classList.add("cursor-ring-active");
      }
    }

    function handlePointerOut(event) {
      const interactiveElement = event.target.closest(
        "a, button, .project-card, .scanner-skill"
      );

      if (interactiveElement) {
        ring.classList.remove("cursor-ring-active");
      }
    }

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return <div className="cursor-ring" aria-hidden="true" />;
}
function App() {
  const roles = [
    "Graduate Developer",
    "Unity and C# Developer",
    "VR and Interactive Developer",
    "Junior Web Developer",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [currentRole, setCurrentRole] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightMode, setLightMode] = useState(false);
  const [activeSkillGroup, setActiveSkillGroup] = useState("unity");

  const activeSkills = skillGroups[activeSkillGroup];

  // Simple typing effect for the role text
  useEffect(() => {
    const fullText = roles[roleIndex];
    let letterIndex = 0;

    setCurrentRole("");

    const timer = window.setInterval(() => {
      letterIndex += 1;
      setCurrentRole(fullText.slice(0, letterIndex));

      if (letterIndex >= fullText.length) {
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [roleIndex]);

  // Reveal sections when they scroll into view
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close project modal with escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  function changeRole() {
    setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
  }

  function openProject(project) {
    setSelectedProject(project);
  }

  function closeProject() {
    setSelectedProject(null);
  }

  return (
    <main className={`desktop ${lightMode ? "light-mode" : ""}`}>
      <CursorEffects />

      <div className="grid-overlay" />
      <div className="floating-shape shape-one" />
      <div className="floating-shape shape-two" />
      <div className="floating-shape shape-three" />

      <div className="side-orbit left-orbit" aria-hidden="true">
        <span>⌘</span>
        <i />
        <b />
      </div>

      <div className="side-orbit right-orbit" aria-hidden="true">
        <span>{`{ }`}</span>
        <i />
        <b />
      </div>

      <div className="wireframe-cube" aria-hidden="true">
        <span />
      </div>

      <nav className="top-bar">
        <a className="logo" href="#home">
          Lea Bogovic
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#video">Video</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          className="theme-button"
          onClick={() => setLightMode((prevMode) => !prevMode)}
          aria-label="Change theme"
        >
          {lightMode ? "☾" : "☀"}
        </button>
      </nav>

      <section className="hero-window" id="home">
        <div className="window-bar">
          <span>portfolio</span>

          <div className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-intro">
            <div className="hero-copy">
              <p className="eyebrow">HI, I’M</p>

              <h1>Lea Bogovic</h1>

              <h2 className="role-title">
                {currentRole}
                <span className="cursor">|</span>
              </h2>

              <p>
                I’m a final-year software design and game development student with experience in Unity, C# and VR training projects. Unity is the area I feel strongest in, and I
                also really enjoy web design and building simple interactive
                experiences.
              </p>

              <div className="hero-buttons">
  <a href="#work">View projects</a>

  <a
    href="/Lea-B-Resume2026.pdf"
    download
    className="secondary-button"
  >
    Download CV
  </a>

  <a className="secondary-button" href="#contact">
    Contact me
  </a>

  <button onClick={changeRole}>Change title</button>
</div>

              <p className="availability">
                <span>●</span> Open to junior and graduate roles in software,
                Unity, QA, support and other IT roles where I can learn and
                grow.
              </p>
            </div>

            <div className="hero-photo-panel">
              <div className="photo-orbit photo-orbit-one" />
              <div className="photo-orbit photo-orbit-two" />

              <img
                src="/images/lea-profile.jpg"
                alt="Lea Bogovic"
                className="hero-profile-photo"
              />

              <div className="photo-caption">
                <span>Based in Blessington</span>
                <span>Open to work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-grid reveal" id="about">
        <article className="mini-window">
          <div className="mini-window-bar">
            <span>about.txt</span>
            <span>□</span>
          </div>

          <div className="mini-window-content">
            <p className="eyebrow">ABOUT</p>

            <h2>A broad background with a strong interest in interactive work.</h2>

            <p>
              I studied Software Design and Game Development at TUS Athlone. My
              course was broad, so I built a foundation across software, games,
              graphics, databases, testing and VR.
            </p>

            <p>
              I feel strongest in Unity because of my placement and project
              work, but I am still open to a wide range of junior IT roles. I
              enjoy learning new workflows, improving through real work, and
              building things that are clear and easy to use.
            </p>
          </div>
        </article>

        <article className="mini-window">
          <div className="mini-window-bar">
            <span>education.txt</span>
            <span>□</span>
          </div>

          <div className="mini-window-content">
            <p className="eyebrow">EDUCATION</p>

            <h2>BSc (Hons)</h2>

            <p>
              Software Design and Game Development at TUS Athlone, with modules
              across software engineering, object-oriented programming,
              databases, graphics and VR.
            </p>

            <div className="mini-details">
              <span>Software</span>
              <span>Unity</span>
              <span>Graphics</span>
            </div>
          </div>
        </article>
      </section>

      <section className="projects-section reveal" id="work">
        <div className="section-heading">
          <p className="eyebrow">PROJECTS</p>

          <h2>Some of the work I’ve done.</h2>

          <p>
            These are a few projects from my placement and college work that
            show the kind of development I enjoy most.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <button
              className="project-card"
              key={project.id}
              onClick={() => openProject(project)}
            >
              <div className="project-card-bar">
                <span>
                  {project.icon} {project.label}
                </span>

                <span>↗</span>
              </div>

              <div className="project-card-content">
                <div className="project-icon">{project.icon}</div>

                <h3>{project.title}</h3>
                <p>{project.summary}</p>

                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <span className="open-file">Read more ↗</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="skills-section reveal" id="skills">
        <div className="section-heading">
          <p className="eyebrow">SKILLS</p>

          <h2>What I’ve worked with.</h2>

          <p>
            My course was broad, so I have some experience across different
            areas. These are the ones I have spent the most time in.
          </p>
        </div>

        <div className="skill-scanner">
          <div className="scanner-tabs" role="tablist" aria-label="Skill areas">
            {Object.entries(skillGroups).map(([key, group]) => (
              <button
                key={key}
                className={key === activeSkillGroup ? "active" : ""}
                onClick={() => setActiveSkillGroup(key)}
                role="tab"
                aria-selected={key === activeSkillGroup}
              >
                <span>{group.icon}</span>
                {group.label}
              </button>
            ))}
          </div>

          <div className="scanner-screen" role="tabpanel">
            <div className="scanner-screen-header">
              <span>{activeSkills.label}</span>
              <span className="scanner-dot">●</span>
            </div>

            <div className="scanner-screen-content">
              <div className="scanner-icon">{activeSkills.icon}</div>

              <div>
                <h3>{activeSkills.label}</h3>
                <p>{activeSkills.description}</p>
              </div>
            </div>

            <div className="scanner-skills">
              {activeSkills.skills.map((skill) => (
                <span className="scanner-skill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="working-style">
          <span>Agile</span>
          <span>Testing</span>
          <span>Debugging</span>
          <span>Teamwork</span>
          <span>Communication</span>
          <span>Learning new workflows</span>
        </div>
      </section>

      <section className="experience-section reveal" id="experience">
        <article className="experience-window">
          <div className="mini-window-bar">
            <span>experience.txt</span>
            <span>□</span>
          </div>

          <div className="experience-content">
            <div>
              <p className="eyebrow">PLACEMENT</p>
              <h2>Mersus Technologies</h2>
              <h3>Immersive Developer Intern</h3>
            </div>

            <div>
              <p>
                During my placement, I worked on Unity and C# VR training
                projects. I helped build interactions, test features, fix bugs
                and improve the user experience as part of an Agile team.
              </p>

              <div className="tag-list">
                <span>Unity</span>
                <span>C#</span>
                <span>VR</span>
                <span>Testing</span>
                <span>Agile</span>
              </div>
            </div>
          </div>
        </article>

        <div className="extra-experience">
  <article>
    <p className="eyebrow">CURRENT WORK</p>
    <h3>Smyths Superstores</h3>
    <p>
      I currently work as a sales assistant in Tallaght. It has helped me
      build confidence in communication, teamwork and staying reliable in a
      busy environment.
    </p>
  </article>

  <article className="highlight-card">
    <p className="eyebrow">COMPETITION</p>
    <h3>Games Fleadh</h3>
    <img
      src="/images/games-fleadh.jpg"
      alt="Lea Bogovic at Games Fleadh"
      className="highlight-photo"
      loading="lazy"
    />
    <p>
      A photo from competing at Games Fleadh.
    </p>
  </article>
</div>
      </section>

      <section className="video-highlight-section reveal" id="video">
        <div className="contact-window">
          <p className="eyebrow">SHORT INTRO</p>

          <h2>A quick video introduction.</h2>

          <p>
            This is a short elevator pitch video about me, my background, and
            the kind of work I’m looking for.
          </p>

          <div className="video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/9EfXx00OtNU"
              title="Lea Bogovic elevator pitch video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="contact-section reveal" id="contact">
        <div className="contact-window">
          <p className="eyebrow">CONTACT</p>

          <h2>I’m looking for my next role.</h2>

          <p>
            I’m currently looking for junior or graduate roles in software
            development, Unity, QA, support or other IT work where I can keep
            learning and gain more hands-on experience.
          </p>

          <div className="contact-links">
            <a href="mailto:bogoviclea1@gmail.com">Email me ↗</a>

            <a
              href="https://github.com/LeaBogovic"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/lea-bogovic/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} Lea Bogovic</span>
        <span>Built with React and Vite</span>
      </footer>

      {selectedProject && (
        <div className="project-modal-backdrop" onClick={closeProject}>
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-top-bar">
              <span>Project details</span>

              <button
                className="close-button"
                onClick={closeProject}
                aria-label="Close project details"
              >
                ×
              </button>
            </div>

            <div className="modal-scroll-content">
              <p className="eyebrow">{selectedProject.label}</p>

              <h2 id="modal-title">{selectedProject.title}</h2>

              <p className="modal-role">
                <strong>Role:</strong> {selectedProject.role}
              </p>

              <h3>Project goal</h3>
              <p>{selectedProject.challenge}</p>

              <h3>What I worked on</h3>
              <ul className="case-study-list">
                {selectedProject.work.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>Outcome</h3>
              <p>{selectedProject.result}</p>

              <div className="tag-list">
                {selectedProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {selectedProject.videoId && (
                <div className="video-section">
                  <p className="eyebrow">Video</p>

                  <div className="video-frame">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedProject.videoId}`}
                      title="Project video"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {selectedProject.blogUrl && (
                <a
                  className="case-study-button"
                  href={selectedProject.blogUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the blog post ↗
                </a>
              )}

              <p className="modal-note">
                This case study focuses on my contribution and does not include
                private company code or assets.
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;