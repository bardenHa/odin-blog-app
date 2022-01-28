import { API_URL } from "constants/urls";
import styles from "./feed.module.css";
import { useEffect, useState, useContext } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";
import { articlePost } from "components/types";
import Header from "components/organisms/header";
import ArticleList from "components/organisms/article-list";
import AuthContext from "components/context/AuthContext";
import Button from "components/atoms/button";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";

export default function Articles() {
  const [fetching, setFetching] = useState(false);
  const [articles, setArticles] = useState<articlePost[] | null>(null);

  const { user } = useContext(AuthContext);

  const getArticles = async () => {
    await fetch(`${API_URL}/articles/feed`, {
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
        console.log("getFeed", error);
      });
    setFetching(false);
  };

  useEffect(() => {
    document.title = "Feed - Odin Blog";
    setFetching(true);
    getArticles();
  }, []);

  if (!user) {
    return (
      <div className={styles.articlesContainer}>
        <Header title="Feed" />
        <section className={styles.messageContainer}>
          <h2>You need an account to use the feed.</h2>
          <Link to={ROUTES.SIGNUP}>
            <Button>Sign up.</Button>
          </Link>
        </section>
      </div>
    );
  }

  if (articles && articles.length === 0) {
    return (
      <div className={styles.articlesContainer}>
        <Header title="Feed" />
        <section className={styles.messageContainer}>
          <h2>You have no new articles in your feed. Go follow some users!</h2>
          <Link to={ROUTES.ARTICLES}>
            <Button>All Articles</Button>
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.articlesContainer}>
      <Header title="Feed" />
      {fetching || !articles ? (
        <SuspenseLoader />
      ) : (
        <ArticleList articles={articles} />
      )}
    </div>
  );
}
