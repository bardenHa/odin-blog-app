import { useParams } from "react-router-dom";
import { API_URL } from "constants/urls";
import styles from "./article.module.css";
import { useEffect, useState } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";

import { profile } from "components/types";

interface articlePost {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  tagList: Array<[]>;
  favorited: boolean;
  favoritesCount: number;
  author: profile;
}

// const article2 = {
//   title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//   excerpt:
//     "Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit",
//   content:
//     "Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit",
// };

export default function Article() {
  const { articleSlug } = useParams();

  const [fetching, setFetching] = useState(false);
  const [article, setArticle] = useState<articlePost | null>(null);

  const getArticle = async (articleSlug: string) => {
    await fetch(`${API_URL}/articles/${articleSlug}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((res) => {
        setArticle(res.article);
        document.title = `${res.article.title} - Odin Blog`;
      })
      .catch((error) => {
        console.log("getArticle", error);
      });
    setFetching(false);
  };

  useEffect(() => {
    setFetching(true);
    getArticle(articleSlug);
  }, [articleSlug]);

  return (
    <div className={styles.articleContainer}>
      {fetching || !article ? (
        <SuspenseLoader />
      ) : (
        <>
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
            <strong className={styles.excerpt}>{article.description}</strong>
            <p>{article.body}</p>
          </section>
          <section className={styles.commentSection}>
            <p>{articleSlug}</p>
          </section>
        </>
      )}
    </div>
  );
}
