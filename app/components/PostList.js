import React from "react";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";
import Timestamp from "./Timestamp";

export const PostList = ({ posts }) => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <ul>
          {posts.map((item) => (
            <li key={item.id} className="post">
              {!item.url ? 
                <Link className='link'
                to={{
                  pathname: "/post",
                  search: `?id=${item.id}`,
                }}
              >
                {item.title}
              </Link>
               : (
                <a className="link" href={item.url}>
                {item.title}
              </a>
              )}

              <div className={`meta-info-${theme}`}>
                <span>
                  by{" "}
                  <Link
                    to={{
                      pathname: "/user",
                      search: `?id=${item.by}`,
                    }}
                  >
                    {item.by}
                  </Link>
                </span>
                <span>
                  on <Timestamp timestamp={item.time} />
                </span>
                <span>
                  with <a href={`post?id=${item.id}`}>{item.descendants}</a>{" "}
                  comments
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </ThemeConsumer>
  );
};
