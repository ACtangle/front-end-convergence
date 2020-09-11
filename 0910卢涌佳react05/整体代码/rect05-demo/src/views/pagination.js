import React, { Fragment } from "react";
import data from "../static/data";
import { useParams, Link } from "react-router-dom";
const pages = 5;
function Pagination(props) {
  const { urlPage } = props;

  let { type = "all", page = 1 } = useParams();
  page = Number(page);
  let nowData = [];
  if (type === "all") {
    nowData = [...data["good"], ...data["share"], ...data["ask"]];
  } else {
    nowData = data[type];
  }
  let pageLen = Math.ceil(nowData.length / pages);
  function setPage() {
    let pageNub = [];
    for (let i = 1; i <= pageLen; i++) {
      pageNub.push(
        i === page ? (
          <a className="active" key={i}>
            {i}
          </a>
        ) : (
          <Fragment key={i}>
            <span> </span>
            <Link to={`/${urlPage}/${type}/${i}`}>{i}</Link>
            <span> </span>
          </Fragment>
        )
      );
    }
    return pageNub;
  }
  return (
    <nav className="pagination">
      {/* 上一页 */}
      {page > 1 ? (
        <Link to={`/${urlPage}/${type}/${page - 1}`}>上一页</Link>
      ) : (
        <a>上一页</a>
      )}
      {/* 页码 */}
      {setPage()}
      {/* 下一页 */}
      {page < pageLen ? (
        <Link to={`/${urlPage}/${type}/${page + 1}`}>下一页</Link>
      ) : (
        <a>下一页</a>
      )}
    </nav>
  );
}

export default Pagination;
