import { Link } from "react-router-dom";
import { API_URL } from "constants/urls";
import styles from "./article.module.css";
import { useEffect, useState } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";
import ReactMarkdown from "react-markdown";

import { profile } from "components/types";
import Loader from "components/atoms/loader";

const formatDate = (date: Date, options: object) => {
  return new Date(date).toLocaleDateString(undefined, options);
};

export default function Feed() {
  const [fetching, setFetching] = useState(false);
  // const [articles, setArticles] = useState<articlePost | null>(null);

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
    document.title = "Articles - Odin Blog";
  }, []);

  // useEffect(() => {
  //   setFetching(true);
  //   getArticle(articleSlug);
  // }, [articleSlug]);

  return (
    <div>
      <h1>Feed</h1>
    </div>
    // <div className={styles.articleContainer}>
    //   {fetching || !articles ? (
    //     <SuspenseLoader />
    //   ) : (
    //     <>
    //       <section className={styles.headerSection}>
    //         <h1 className={styles.headerTitle}>{article.title}</h1>
    //       </section>
    //     </>
    //   )}
    // </div>
  );
}
