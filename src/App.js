import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "217140668359bc2ba0f507496c80366f2e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  const classes = useStyles();

  // Adding the Alan button
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setnewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again.");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening Master!!");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>Nahian's News Application</h1>
      <div className={classes.logoContainer}>
        <img
          src="https://raw.githubusercontent.com/Nahian36/FreeCodeCamp_Project_Images-/main/Logo%20Alan.png"
          className={classes.alanLogo}
          alt="alan logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
