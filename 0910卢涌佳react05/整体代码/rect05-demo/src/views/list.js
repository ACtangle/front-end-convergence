import React from "react";
import { useLocation, useParams } from "react-router-dom";
import data from "../static/data";
import Pagination from "../views/pagination";
import Nav from "../views/nav";

const pages = 5;

export default function List(props) {
  let { pathname } = useLocation();
  let urlPage = pathname.split("/")[1];
  let { type = "all", page = 1 } = useParams();
  let nowData = [];
  if (type === "all") {
    nowData = [...data["good"], ...data["share"], ...data["ask"]];
  } else {
    nowData = data[type];
  }
  console.log("List -> nowData", nowData);
  let start = (page - 1) * pages;
  let end = start + pages;
  nowData = nowData.filter((item, index) => {
    return index >= start && index < end;
  });
  return (
    <div className="wrap">
      <Nav />
      <ul className="list">
        {nowData.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
      <Pagination urlPage={urlPage} />
    </div>
  );
}
