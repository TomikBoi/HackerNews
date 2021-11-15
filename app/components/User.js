import React from "react";
import { fetchPosts, fetchUser } from "../utils/api";
import Loading from "./Loading";
import queryString from "query-string";
import Timestamp from "./Timestamp";
import { PostList } from "./PostList";

export default class UserProfile extends React.Component {
  state = {
    id: null,
    created: null,
    karma: null,
    about: null,
    submitted: null,
    posts: [],
    isLoadingData: true,
    isLoadingPosts: true,
    error: null,
  };

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchUser(id).then((user) => {
      this.setState({
        id: user.id,
        created: user.created,
        karma: user.karma,
        about: user.about,
        submitted: user.submitted.slice(0, 100),
        isLoadingData: false,
        error: null,
      });
    });
  }

  render() {
    const {
      id,
      created,
      karma,
      about,
      submitted,
      posts,
      isLoadingData,
      isLoadingPosts,
      error,
    } = this.state;

    if (submitted) {
      fetchPosts(submitted).then((post) =>
        this.setState({
          posts: post,
          isLoadingPosts: false,
        })
      );
    }

    function createMarkup() {
      return { __html: about };
    }

    if (isLoadingData === true) {
      return <Loading text="Fetching User profile" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <React.Fragment>
        <h1 className="header">{id}</h1>
        <div className="meta-info-light">
          <span>
            joined{" "}
            <b>
              <Timestamp timestamp={created} />
            </b>
          </span>
          <span>
            has <b>{karma}</b> karma
          </span>
        </div>
        <p dangerouslySetInnerHTML={createMarkup()}></p>
        <div>
          <h2>Posts</h2>
          {isLoadingPosts === true ? <Loading text="Fetching Users Posts" /> : <PostList posts={posts} />}
        </div>
      </React.Fragment>
    );
  }
}
