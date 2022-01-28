import { articlePost } from "components/types";
import Card from "components/organisms/card";
import styles from "./articleList.module.css";

export default function ArticleList({
  articles,
}: {
  articles: articlePost[];
}): React.ReactElement {
  return (
    <section className={styles.features}>
      {articles ? (
        articles.map((props, index) => (
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
        ))
      ) : (
        <h2>No articles found.</h2>
      )}
    </section>
  );
}
