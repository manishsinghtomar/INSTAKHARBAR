const API_KEY = "2fd67d752650421790c4be5eaf02c7e4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchNews("india"));

function reload(){
    window.location.reload();
}

// async function fetchNews(query) {
//     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);//async operation
//     const data = await res.json(); //it also return promise thats why we are using await & json() is used to convert the data into json format
//     console.log(data);
// }


async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {timeZone: "Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} . ${date}`;
    
    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank"); //_blank for new tab
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');//if curSelected is not null then remove active class
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')//adding active class in clickednav link
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", ()=> {
    const query = searchText.value;
    if(!query) return; //if empty query hit by user then return nothing 
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});