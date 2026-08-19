import {
  PROFILE,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  EDUCATION,
  CERTIFICATIONS,
} from "./content.js";

function Header() {
  return (
    <header className="header">
      <h1>{PROFILE.name}</h1>
      <p className="tagline">
        {PROFILE.title} · {PROFILE.location}
      </p>
      <p className="blurb">{PROFILE.blurb}</p>
      <nav className="links">
        <a href={`mailto:${PROFILE.email}`}>Email</a>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </nav>
    </header>
  );
}

function Experience() {
  return (
    <section id="experience">
      <h2>Experience</h2>
      {EXPERIENCE.map((job) => (
        <article className="entry" key={job.role + job.company}>
          <div className="entry-head">
            <h3>{job.role}</h3>
            <span className="period">{job.period}</span>
          </div>
          <p className="sub">{job.company}</p>
          <p className="stack">{job.stack}</p>
          <ul>
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      {PROJECTS.map((project) => (
        <article className="entry" key={project.title}>
          <div className="entry-head">
            <h3>{project.title}</h3>
            <span className="period">{project.year}</span>
          </div>
          <p className="stack">{project.stack}</p>
          <ul>
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <dl className="skills">
        {SKILLS.map((group) => (
          <div className="skill-row" key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Education() {
  return (
    <section id="education">
      <h2>Education</h2>
      {EDUCATION.map((edu) => (
        <div className="edu" key={edu.school}>
          <div className="entry-head">
            <h3>{edu.school}</h3>
            <span className="period">{edu.period}</span>
          </div>
          <p className="sub">{edu.degree}</p>
        </div>
      ))}
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications">
      <h2>Certifications</h2>
      <ul className="certs">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.org + cert.name}>
            <span>{cert.name}</span>
            <span className="org">{cert.org}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 {PROFILE.name}</span>
      <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
    </footer>
  );
}

export default function App() {
  return (
    <div className="page">
      <Header />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <Footer />
    </div>
  );
}
