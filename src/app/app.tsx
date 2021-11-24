import Logos from "components/atoms/logos";
import Card from "components/organisms/card";
import Button from "components/atoms/button";

import styles from "./app.module.css";
import { useEffect, useState } from "react";

const defaultImage =
  "https://avatars.dicebear.com/api/avataaars/harrybarden.svg?topChance=100&eyes[]=default&eyes[]=wink&eyes[]=happy&eyebrow[]=defaultNatural&eyebrow[]=default&mouth[]=smile&mouth[]=default";

const demoArticles = [
  {
    title: "Vite",
    description:
      "Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.Faster and leaner development experience for modern web projects.",
    slug: "https://vitejs.dev/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "React",
    description: "JavaScript library for building user interfaces.",
    slug: "https://reactjs.org/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript.",
    slug: "https://www.typescriptlang.org/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "Tailwind with JIT",
    description: "A utility-first CSS framework packed with classes.",
    slug: "https://tailwindcss.com/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "Jest",
    description: "Testing Framework with a focus on simplicity.",
    slug: "https://jestjs.io/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "CSS Modules",
    description:
      "CSS file in which all class names and animation names are scoped locally by default.",
    slug: "https://github.com/css-modules/css-modules",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "ESLint",
    description: "Find and fix problems in your JavaScript code.",
    slug: "https://eslint.org/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "Prettier",
    description: "An opinionated code formatter.",
    slug: "https://prettier.io/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "Husky",
    description:
      "Lint your commit messages, run tests, lint code, etc... when you commit or push.",
    slug: "https://github.com/typicode/husky",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "Commit-lint",
    description: "Helps your team adhering to a commit convention.",
    slug: "https://github.com/conventional-changelog/commitlint",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "Atomic design",
    description:
      "We’re not designing pages, we’re designing systems of components.",
    slug: "https://bradfrost.com/blog/post/atomic-web-design/",
    author: {
      image: defaultImage,
    },
  },
  {
    title: "Absolute imports",
    description:
      "Import resource using its full path from the project’s src folder.",
    slug: "https://github.com/vitejs/vite/issues/88#issuecomment-762415200",
    author: {
      image: defaultImage,
    },
  },
];

const App = (): JSX.Element => {
  const [articles, setArticles] = useState(demoArticles);

  const fetchArticles = async () => {
    const res = await fetch("http://localhost:8080/api/articles/?limit=5", {
      method: "GET",
      headers: {
        "cache-control": "no-cache",
      },
    });
    const data = await res.json();
    console.log(data);

    setArticles(data.articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Odin Blog</h1>
        <p className={styles.headerDescription}>
          A MERN stack blog application developed as part of{" "}
          <a
            href="https://www.theodinproject.com/"
            target="_blank"
            rel="nofollow noreferrer"
            className={styles.anchorLink}
          >
            The Odin Project
          </a>
          's curriculum. Built using:{" "}
          <code className={styles.headerDescriptionCode}>CSS-Modules</code>,{" "}
          <code className={styles.headerDescriptionCode}>Tailwind</code>,{" "}
          <code className={styles.headerDescriptionCode}>Jest</code>,{" "}
          <code className={styles.headerDescriptionCode}>TypeScript</code>,{" "}
          <code className={styles.headerDescriptionCode}>Commit-lint</code>,{" "}
          <code className={styles.headerDescriptionCode}>ESLint</code>,{" "}
          <code className={styles.headerDescriptionCode}>Prettier</code> and{" "}
          <code className={styles.headerDescriptionCode}>Vite</code> for the
          front-end. The back-end makes use of:{" "}
          <code className={styles.headerDescriptionCode}>Mongoose</code>,{" "}
          <code className={styles.headerDescriptionCode}>PassportJS</code> and{" "}
          <code className={styles.headerDescriptionCode}>JWT</code> for
          authentication.{" "}
        </p>
        <div className={styles.viteLogoContainer}>
          <Logos.Vite className={styles.viteLogo} />
        </div>
      </header>
      <section className={styles.copy}>
        <div className={styles.copyInner}>
          <a href="https://github.com/jvidalv/vital">
            <Button>Sign Up</Button>
          </a>
          <a href="#" className={styles.anchorCallToAction}>
            Articles →
          </a>
        </div>
      </section>
      <section className={styles.features}>
        {articles.map((props, index) => (
          <div
            key={index}
            className={styles.cardWrapper}
            style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
          >
            <Card
              title={props.title}
              description={props.description}
              icon={props.author.image}
              callToAction={
                <Card.CallToAction as="a" href={props.slug} target="_blank">
                  Visit article →
                </Card.CallToAction>
              }
            />
          </div>
        ))}
      </section>
      <footer className={styles.footer}>
        <a href="https://github.com/bardenHa">
          Harry Barden @ {new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
};

export default App;
