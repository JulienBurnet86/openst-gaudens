import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import NewsTicker, { Directions } from "react-advanced-news-ticker";
function TennisNews() {
  const language = window.location.href.includes("/en") ? "en" : "fr";
  const [news, setNews] = useState([]);

  useMemo(() => {
    fetch("/assets/json/news.json")
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setNews(jsonData[language]);
      });
  }, [language]);

  if (news.length === 0) return <></>;

  return (
    <div className="news-section">
      <NewsTicker pauseOnHover={false} duration={4000}>
        {news.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </NewsTicker>
    </div>
  );
}

ReactDOM.render(<TennisNews />, document.getElementById("news-ticker"));
