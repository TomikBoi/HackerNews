import React from "react";
import { fetchMainPosts } from "../utils/api";
import Loading from "./Loading";
import Timestamp from "./Timestamp";


export default class Posts extends React.Component {
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
    if(this.props.postType !== prevProps.postType) {
      this.setState({
        isLoading: true
      })
      this.fetchPosts(this.props.postType)
    }
  }

 fetchPosts = (postType) => {
  fetchMainPosts(postType)
  .then(
    (result) => {
      this.setState({
        postType: postType,
        posts: result,
        isLoading: false
      });
    }
  )
}

  render() {
    const { error, isLoading, posts } = this.state;

    if (isLoading === true ) {
      return <Loading text={this.props.postType === "top" ? "Fetching Top Posts" : "Fetching New Posts"} />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      
      <ul>
        {posts.map((item) => (
          <li key={item.id} className='post'>
          <a className='link' href={item.url}>{item.title}</a>
          <div className='meta-info-light'>
          <span>
          by <a href={`/user?id=${item.by}`}>{item.by}</a>
          </span>
          <span>
           on <Timestamp timestamp={item.time} />
          </span>
          <span>
            with <a href={`post?id=${item.id}`}>{item.descendants}</a> comments
          </span>
          </div>
          </li>
        ))}
      </ul>
    );
  }
}
