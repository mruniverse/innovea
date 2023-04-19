import styles from "@/styles/Home.module.css";
import 'antd-css-utilities/utility.min.css';
import Head from "next/head";
import React from "react";
import { Input, Table } from "antd";
import { useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);

  function SearchArticles(query: string) {
    const { Search } = Input;
    const [loading, setLoading] = useState(false);

    function getArticles(query: string) {
      const NewsAPI = require("newsapi");
      const newsapi = new NewsAPI(process.env.NEXT_PUBLIC_API_KEY, {
        corsProxyUrl: "https://cors-anywhere.herokuapp.com/",
      });
      setLoading(true);
      newsapi.v2
        .everything({
          q: query,
        })
        .then((response) => {
          setLoading(false);
          console.log(response.articles);
          setArticles(response.articles);
        })
        .catch((error) => {
          setLoading(false);
          console.log("teste", error);
        });
    }

    return (
      <Search
        placeholder="Quais artigos você procura?"
        enterButton="Search"
        size="large"
        onSearch={getArticles}
        loading={loading}
      />
    );
  }

  function DataTable() {
    const columns = [
      {
        title: "Autor",
        dataIndex: "author",
        key: "author",
      },
      {
        title: "Título",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Descrição",
        dataIndex: "description",
        key: "description",
      },
    ];

    return <Table dataSource={articles} columns={columns} />;
  }

  return (
    <>
      <Head>
        <title>NewsAPI Articles</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SearchArticles />
        <div className="my-2"></div>
        <DataTable dataSource={articles} />
      </main>
    </>
  );
}
