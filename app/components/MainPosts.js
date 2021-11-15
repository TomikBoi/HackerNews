import React from "react";
import { fetchMainPosts } from "../utils/api";
import { PostList } from "./PostList";
import Loading from "./Loading";


export default class MainPosts extends React.Component {
  state = {
    postType: null,
    isLoading: true,
    error: null,
    posts: [],
  };

  componentDidMount() {
    this.fetchPosts(this.props.postType);
  }

  componentDidUpdate(prevProps) {
    if (this.props.postType !== prevProps.postType) {
      this.setState({
        isLoading: true,
      });
      this.fetchPosts(this.props.postType);
    }
  }

  fetchPosts = (postType) => {
    fetchMainPosts(postType).then((result) => {
      this.setState({
        postType: postType,
        posts: result,
        isLoading: false,
      });
    });
  };

  render() {
    const { error, isLoading, posts } = this.state;

    if (isLoading === true) {
      return (
        <Loading
          text={
            this.props.postType === "top"
              ? "Fetching Top Posts"
              : "Fetching New Posts"
          }
        />
      );
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return <PostList posts={posts} />;
  }
}
