"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState<
    {
      url: string;
      title: string;
      urlToImage: string;
      source: { name: string };
    }[]
  >([]);
  const [articlesNum, setArticlesNum] = useState<number>(3);

  useEffect(() => {
    fetch(`https://saurav.tech/NewsAPI/everything/cnn.json`)
      .then((res) => res.json())
      .then((data) => setNews(data.articles));
  }, []);

  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 mt-5">
      <h4 className="font-bold text-xl px-4">Whats happening</h4>
      {news.slice(0, articlesNum).map((article) => (
        <div key={article.url}>
          <Link href={article.url} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{article.title}</h6>
                <p className="text-xs font-medium text-gray-500">
                  {article.source.name}
                </p>
              </div>
              <Image
                alt="image News"
                src={article.urlToImage}
                height={70}
                width={70}
                className="rounded-xl"
              />
            </div>
          </Link>
        </div>
      ))}

      <button
        onClick={() => setArticlesNum(articlesNum + 3)}
        className="text-blue-300 pl-4 pb-3 hover:text-blue-400 text-sm"
      >
        Load more
      </button>
    </div>
  );
};

export default News;
