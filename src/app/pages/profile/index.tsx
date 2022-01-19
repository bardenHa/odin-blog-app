import { useParams } from "react-router-dom";
import { API_URL } from "constants/urls";
import { useEffect, useState } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";
import Loader from "components/atoms/loader";
import styles from "./profile.module.css";
import Card from "components/organisms/card";
import * as ROUTES from "constants/routes";

interface profile {
  username: string;
  image: string;
  bio?: string;
  following: boolean;
}

interface article {
  comments: string[];
  _id: string;
  title: string;
  description: string;
  body: string;
  favoritesCount: number;
  tagList: string[];
  author: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<profile | null>(null);
  const [articles, setArticles] = useState<Array<article>>([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username } = useParams();

  const getUserProfile = async (username: string) => {
    await fetch(`${API_URL}/profiles/${username}`, {
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
        setProfile(res.profile);
        setArticles(res.posts);
      })
      .catch((error) => {
        console.log("getUserProfile", error);
        setProfile(null);
      });
    setFetching(false);
  };

  const handleFollow = async () => {
    setLoading(true);

    await fetch(`${API_URL}/profiles/${profile.username}/follow`, {
      method: "POST",
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
      .then((profile) => {
        profile.following = true;
        setProfile(profile);
      })
      .catch((error) => {
        console.log("followUser", error);
      });

    setLoading(false);
  };

  useEffect(() => {
    setFetching(true);
    getUserProfile(username);
  }, [username]);

  return (
    <>
      <section className={styles.profileSection}>
        {fetching ? (
          <SuspenseLoader />
        ) : (
          <>
            {profile ? (
              <>
                <UserProfile
                  profile={profile}
                  loading={loading}
                  handleFollow={handleFollow}
                />
              </>
            ) : (
              <div>
                <h1>No profile</h1>
              </div>
            )}
          </>
        )}
      </section>
      <section>
        {!fetching && profile && <UserArticles articles={articles} />}
      </section>
    </>
  );
}

const UserProfile: React.FC<{
  profile: profile;
  loading: boolean;
  handleFollow: () => void;
}> = ({ profile, loading, handleFollow }) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.imageContainer}>
        <img src={profile.image} alt="User profile image" />
      </div>
      <h2>{profile.username}</h2>
      {profile.bio ? (
        <p className={styles.bio}>{profile.bio}</p>
      ) : (
        <p className={styles.bio}>No bio.</p>
      )}
      <button className={styles.followButton} onClick={handleFollow}>
        <p>{profile.following ? "Unfollow" : "Follow"}</p>
        {loading && <Loader />}
      </button>
    </div>
  );
};

const UserArticles: React.FC<{ articles: Array<article> }> = ({ articles }) => {
  return (
    <section className={styles.articleSection}>
      {articles.map((article, index) => (
        <div
          key={index}
          className={styles.cardWrapper}
          style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
        >
          <Card
            title={article.title}
            description={article.description}
            callToAction={
              <Card.CallToAction
                as="a"
                href={`${ROUTES.ARTICLE}/${article.slug}`}
              >
                Visit article →
              </Card.CallToAction>
            }
          />
        </div>
      ))}
    </section>
  );
};
