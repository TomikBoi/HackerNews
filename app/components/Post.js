import React from "react";
import { fetchItem, fetchComments } from "../utils/api";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Timestamp from "./Timestamp";
import Loading from "./Loading";

export default class Post extends React.Component {
  state = {
    post: {},
    isLoadingPost: true,
    comments: [],
  };

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);

    fetchItem(id).then((post) => {
      this.setState({
        post: post,
        isLoadingPost: false,
      });
    });
  }

  render() {
    const { post, comments, isLoadingPost, isLoadingComments } = this.state;

    function createMarkup() {
      return { __html: post.text };
    }

    if (post.kids) {
      fetchComments(post.kids).then((res) => {
        this.setState({
          comments: res,
        });
      });
    }

    if (isLoadingPost === true) {
      return <Loading text="Fetching Post" />;
    }
    return (
      <React.Fragment>
        <h1 className="header">
          <Link
            className="link"
            to={{
              pathname: "/post",
              search: `?id=${post.id}`,
            }}
          >
            {post.title}
          </Link>
        </h1>
        <div className="meta-info-light">
          <span>
            by{" "}
            <Link
              to={{
                pathname: "/user",
                search: `?id=${post.by}`,
              }}
            >
              {post.by}
            </Link>
          </span>
          <span>
            on <Timestamp timestamp={post.time} />
          </span>
          <span>
            with{" "}
            <Link
              to={{
                pathname: "/post",
                search: `?id=${post.id}`,
              }}
            >
              {post.descendants}
            </Link>{" "}
            comments
          </span>
        </div>
        <p dangerouslySetInnerHTML={createMarkup()}></p>
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="meta-info-light">
              <span>
                by{" "}
                <Link
                  to={{
                    pathname: "/user",
                    search: `?id=${comment.by}`,
                  }}
                >
                  {comment.by}
                </Link>
              </span>
              <span>
                on <Timestamp timestamp={comment.time} />
              </span>
            </div>
            <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
