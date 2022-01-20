import { useParams } from "react-router-dom";
import styles from "./article.module.css";

export default function Article() {
  const { articleSlug } = useParams();
  const article = {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    excerpt:
      "Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit",
    content:
      "Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit",
  };

  return (
    <div className={styles.articleContainer}>
      <section className={styles.headerSection}>
        <h1 className={styles.headerTitle}>{article.title}</h1>
        <div className={styles.authorContainer}>
          <div className={styles.imageContainer}>
            <img
              src="https://avatars.dicebear.com/api/avataaars/newuser.svg?topChance=100&eyes[]=default&eyes[]=wink&eyes[]=happy&eyebrow[]=defaultNatural&eyebrow[]=default&mouth[]=smile&mouth[]=default"
              alt="User profile image"
            />
          </div>
          <div className={styles.authorInfo}>
            <h5>Test User</h5>
            <small>February 14th, 2020</small>
          </div>
        </div>
      </section>
      <section className={styles.contentSection}>
        <strong className={styles.excerpt}>{article.excerpt}</strong>
        <p>{article.content}</p>
      </section>
      <section className={styles.commentSection}>
        <p>{articleSlug}</p>
      </section>
    </div>
  );
}
