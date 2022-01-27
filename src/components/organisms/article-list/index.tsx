import { articlePost } from "components/types";
import { useState } from "react";
import Card from "components/organisms/card";
import styles from "./articleList.module.css";

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

export default function ArticleList({
  articlePosts,
}: {
  articlePosts: articlePost[];
}): React.ReactElement {
  const [articles, setArticles] = useState<articlePost[] | object[]>(
    demoArticles
  );

  return (
    <section className={styles.features}>
      {articles.map((props, index) => (
        <article
          key={index}
          className={styles.cardWrapper}
          style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
        >
          <Card
            title={props.title}
            description={props.description}
            icon={props.author.image}
            callToAction={
              <Card.CallToAction as="a" href={`/article/${props.slug}`}>
                Visit article →
              </Card.CallToAction>
            }
          />
        </article>
      ))}
    </section>
  );
}
