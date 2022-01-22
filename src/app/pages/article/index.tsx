import { Link, useParams } from "react-router-dom";
import { API_URL } from "constants/urls";
import styles from "./article.module.css";
import { useEffect, useState } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";
import ReactMarkdown from "react-markdown";

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                <img src={article.author.image} alt="User profile image" />
              </div>
              <div className={styles.authorInfo}>
                <h5>
                  <Link to={`/user/${article.author.username}`}>
                    {article.author.username}
                  </Link>
                </h5>
                <small>{formatDate(article.createdAt)}</small>
              </div>
            </div>
          </section>
          <section className={styles.contentSection}>
            <strong className={styles.excerpt}>{article.description}</strong>
            <ReactMarkdown
              components={{ h1: "h2", h2: "h3", h3: "h4", h4: "h5", h5: "h6" }}
            >
              {article.body}
            </ReactMarkdown>
          </section>
          <section className={styles.commentSection}>
            <Comments article={article} />
          </section>
        </>
      )}
    </div>
  );
}

const Comments: React.FC<{ article: articlePost }> = ({ article }) => {
  return (
    <>
      <div className={styles.writeComment}>
        <h2>Comments ({10})</h2>
        <button className={styles.writeCommentButton}>
          <PlusIcon />
          Write a comment
        </button>
      </div>
      <div className={styles.comment}>
        <div className={styles.commentAuthorContainer}>
          <div className={styles.commentImageContainer}>
            <img src={article.author.image} alt="User profile image" />
          </div>
          <div className={styles.authorInfo}>
            <h5>
              <Link to={`/user/${article.author.username}`}>
                {article.author.username}
              </Link>
            </h5>
            <small>Aug 31</small>
          </div>
        </div>
        <p className={styles.commentDescription}>
          Awesome Kieran Roberts! When I first started, I felt the same way
          about doing things reactively rather than proactively. I'm glad to
          hear that you're now taking on new challenges and growing a lot! Keep
          it up, you're doing just great 🎉
        </p>
      </div>
    </>
  );
};

const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-1 h-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};
