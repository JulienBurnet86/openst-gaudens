import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import NewsTicker from "react-advanced-news-ticker";
function TennisNews() {
  const language = window.location.href.includes("/en") ? "en" : "fr";
  const [news, setNews] = useState([]);

  useMemo(() => {
    fetch("/assets/json/news.json")
      .then((response) => response.json())
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

const root = createRoot(document.getElementById("news-ticker"));
root.render(<TennisNews />);
