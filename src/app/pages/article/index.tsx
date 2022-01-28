import { Link, useParams } from "react-router-dom";
import { API_URL } from "constants/urls";
import styles from "./article.module.css";
import { useContext, useEffect, useState } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";
import ReactMarkdown from "react-markdown";
import AuthContext from "components/context/AuthContext";
import * as ROUTES from "constants/routes";

import { profile, articlePost } from "components/types";
import Loader from "components/atoms/loader";

const formatDate = (date: Date, options: object) => {
  return new Date(date).toLocaleDateString(undefined, options);
};

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
                <img src={article.author.image} alt="User profile image" />
              </div>
              <div className={styles.authorInfo}>
                <h5>
                  <Link to={`/user/${article.author.username}`}>
                    {article.author.username}
                  </Link>
                </h5>
                <small>
                  {formatDate(article.createdAt, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
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

interface comment {
  id: string;
  body: string;
  createdAt: Date;
  author: profile;
}

const Comments: React.FC<{ article: articlePost }> = ({ article }) => {
  const [writeComment, setWriteComment] = useState<boolean>(false);
  const [writeCommentText, setWriteCommentText] = useState<string>("");
  const [posting, setPosting] = useState<boolean>(false);
  const [comments, setComments] = useState<comment[] | null>(null);

  const { user } = useContext(AuthContext);

  const getComments = async (articleSlug: string) => {
    await fetch(`${API_URL}/articles/${articleSlug}/comments`, {
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
        setComments(res.comments);
      })
      .catch((error) => {
        setComments(null);
        console.log("getComments", error);
      });
  };

  const postComment = async (comment: string, articleSlug: string) => {
    setPosting(true);
    await fetch(`${API_URL}/articles/${articleSlug}/comments`, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: {
          body: comment,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((res) => {
        setComments((comments) => [...comments, res.comment]);
      })
      .catch((error) => {
        setComments(null);
        console.log("postComments", error);
      });
    setPosting(false);
    setWriteComment(false);
  };

  useEffect(() => {
    getComments(article.slug);
  }, [article]);

  return (
    <>
      <div className={styles.writeCommentContainer}>
        <div className={styles.writeComment}>
          <h2>
            Comments {comments && comments.length > 0 && `(${comments.length})`}
          </h2>
          {user ? (
            <button
              className={styles.commentButton}
              onClick={() => setWriteComment(!writeComment)}
            >
              {writeComment ? <MinusIcon /> : <PlusIcon />}
              Write a comment
            </button>
          ) : (
            <Link to={ROUTES.SIGNUP}>
              <button className={styles.commentButton}>
                Sign up to comment
                <RightArrowIcon />
              </button>
            </Link>
          )}
        </div>
        <form
          className={`${styles.writeCommentForm} ${
            writeComment && styles.showHidden
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            postComment(writeCommentText, article.slug);
          }}
        >
          <textarea
            name="comment"
            id="writeComment"
            rows={5}
            maxLength={600}
            className={styles.writeCommentField}
            onChange={(e) => setWriteCommentText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            name="submitComment"
            className={styles.commentButton}
          >
            Post
            {posting ? <Loader /> : <RightArrowIcon />}
          </button>
        </form>
      </div>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div className={styles.comment} key={index}>
            <div className={styles.commentAuthorContainer}>
              <div className={styles.commentImageContainer}>
                <img src={comment.author.image} alt="User profile image" />
              </div>
              <div className={styles.authorInfo}>
                <h5>
                  <Link to={`/user/${article.author.username}`}>
                    {comment.author.username}
                  </Link>
                </h5>
                <small>
                  {formatDate(comment.createdAt, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
            </div>
            <p className={styles.commentDescription}>{comment.body}</p>
          </div>
        ))
      ) : (
        <div className={styles.comment}>No comments</div>
      )}
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

const MinusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-1 h-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const RightArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-1 h-1"
      viewBox="0 0 12 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
