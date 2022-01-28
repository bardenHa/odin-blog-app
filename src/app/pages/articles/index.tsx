import { API_URL } from "constants/urls";
import styles from "./articles.module.css";
import { useEffect, useState } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";

import { articlePost } from "components/types";
import Header from "components/organisms/header";
import ArticleList from "components/organisms/article-list";

export default function Articles() {
  const [fetching, setFetching] = useState(false);
  const [articles, setArticles] = useState<articlePost[] | null>(null);

  const getArticles = async () => {
    await fetch(`${API_URL}/articles`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((res) => {
        setArticles(res.articles);
      })
      .catch((error) => {
        console.log("getArticle", error);
      });
    setFetching(false);
  };

  useEffect(() => {
    document.title = "Articles - Odin Blog";
    setFetching(true);
    getArticles();
  }, []);

  return (
    <div className={styles.articlesContainer}>
      <Header title="Articles" />
      {fetching || !articles ? (
        <SuspenseLoader />
      ) : (
        <>
          <ArticleList articles={articles} />
        </>
      )}
    </div>
  );
}
