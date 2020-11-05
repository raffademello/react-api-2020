import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Card, Icon, Segment } from "semantic-ui-react";
import axios from "axios";

export default function News(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setNews([])
  }, [query])
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url:
        "http://newsapi.org/v2/top-headlines?country=us&apiKey=e0333c015aad435ab44496e0b864a514",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setNews((prevNews) => {
          return [
            ...new Set([
              ...prevNews,
              ...res.data.articles.map((b) => (
                <Card
                  image={b.urlToImage}
                  header={b.title}
                  meta={b.publishedAt}
                  description={b.description}
                />
              )),
            ]),
          ];
        });
        setHasMore(res.data.articles.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, news, hasMore };
}
