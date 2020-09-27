import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards"
import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers";
const alanKey = "82eeafcf16a1edfd16f88151d892c5272e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [newsArticle, setNewsArticle] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);

  const classes = useStyles();
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "News Headlines") {
          setNewsArticle(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          }
          else if (article) {
            console.log(number);
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          }
          else {
            alanBtn().playText('Please try that again...');
          }
        }
      }
    })
  }, [])
  console.log("news", newsArticle)

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticle} activeArticle={activeArticle} />
    </div>
  )
}




export default App;