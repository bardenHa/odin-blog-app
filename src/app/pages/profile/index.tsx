import { Link, useParams } from "react-router-dom";
import { API_URL } from "constants/urls";
import { useEffect, useState, useContext } from "react";
import SuspenseLoader from "components/organisms/suspense-loader";
import Loader from "components/atoms/loader";
import styles from "./profile.module.css";
import Card from "components/organisms/card";
import AuthContext from "components/context/AuthContext";
import * as ROUTES from "constants/routes";
import { user, article, profile } from "components/types";

export default function Profile() {
  const { user } = useContext(AuthContext);

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
      method: profile.following ? "DELETE" : "POST",
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
      .then((updatedProfile) => {
        updatedProfile.following = profile.following ? false : true;
        setProfile(updatedProfile);
      })
      .catch((error) => {
        console.log("followUser", error);
      });

    setLoading(false);
  };

  useEffect(() => {
    setFetching(true);
    getUserProfile(username);
    document.title = `${username} - Odin Blog`;
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
                  user={user}
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
  user: user;
  profile: profile;
  loading: boolean;
  handleFollow: () => void;
}> = ({ user, profile, loading, handleFollow }) => {
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
      {user ? (
        user.username !== profile.username && (
          <FollowButton
            handleFollow={handleFollow}
            profile={profile}
            loading={loading}
          />
        )
      ) : (
        <p>
          <Link to={`/${ROUTES.SIGNIN}`} className={styles.link}>
            Sign in
          </Link>{" "}
          to follow this user.
        </p>
      )}
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
                href={`${ROUTES.ARTICLE_LINK}/${article.slug}`}
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

const FollowButton: React.FC<{
  handleFollow: () => void;
  profile: profile;
  loading: boolean;
}> = ({ handleFollow, profile, loading }) => {
  return (
    <button className={styles.followButton} onClick={handleFollow}>
      <p>{profile.following ? "Unfollow" : "Follow"}</p>
      {loading && <Loader />}
    </button>
  );
};
