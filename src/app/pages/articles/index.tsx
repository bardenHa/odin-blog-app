import { Link } from "react-router-dom";
import { API_URL } from "constants/urls";
import styles from "./articles.module.css";
import { useEffect, useState } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";

import { profile, articlePost } from "components/types";
import Header from "components/organisms/header";
import ArticleList from "components/organisms/article-list";

export default function Articles() {
  const [fetching, setFetching] = useState(false);
  const [articles, setArticles] = useState<articlePost | null>(null);

  // const getArticles = async (articleSlug: string) => {
  //   await fetch(`${API_URL}/articles/${articleSlug}`, {
  //     method: "GET",
  //     headers: {
  //       "Cache-Control": "no-cache",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw response.json();
  //       }
  //       return response.json();
  //     })
  //     .then((res) => {
  //       setArticles(res.article);
  //       document.title = `${res.article.title} - Odin Blog`;
  //     })
  //     .catch((error) => {
  //       console.log("getArticle", error);
  //     });
  //   setFetching(false);
  // };

  useEffect(() => {
    //   setFetching(true);
    //   getArticle(articleSlug);
    document.title = "Articles - Odin Blog";
  }, []);

  return (
    <div className={styles.articlesContainer}>
      {fetching || !!articles ? (
        <SuspenseLoader />
      ) : (
        <>
          <Header title="Articles" />
          <ArticleList articlePosts={null} />
        </>
      )}
    </div>
  );
}
