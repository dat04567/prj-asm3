'use strict'



const page = document.getElementById('page-num');
const nextBtn = document.getElementById('btn-next');
const prevBtn = document.getElementById('btn-prev');
const newContainer = document.getElementById('news-container')


// calutate count pga 
const sumPage = async function(country, category = 'general', pageSize = 12, apikey)
{
   try {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&pageSize=${pageSize}`);
      // get data json 
      const {totalResults : totalPage} = await res.json();
      return Math.ceil( totalPage / pageSize);
   } catch (err) {
      throw err;
   }   
};

// get count page
const countPage = (async function (){
   // catch all errors
   try {
      const obj = getFromStorage('settings', {});
      let pageSize = obj.pageSize;
      let category = obj.category;
      let totalPages =  await sumPage('us',category,pageSize,'1a58d2b9895f4e13b6884c6b52f7f16c');
      return totalPages;
   } catch (err) {
      console.error(err);
   }  
})();



// get data page 
const objectNews = async function(country = 'us',category = 'general', page, pageSize = 12,apikey)
{
   try {
      const reponse = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&&page=${page}&pageSize=${pageSize}`) ;
      // get data json 
      const {articles : data}   = await reponse.json();
      // dataa news 
      return data;
   } catch (error) {
      throw error;
   }   
};

// get full data page size
const fulldata = (async function () {

   try {
      let reposneArr = [];
      const page = await countPage;
      const obj = getFromStorage('settings', {});
      let pageSize = obj.pageSize;
      let category = obj.category;
      // take data to index page 
      for (let i = 1; i <= page; i++) 
      {
         reposneArr.push(objectNews(undefined,category,i,pageSize,'1a58d2b9895f4e13b6884c6b52f7f16c'));
      }
      const newArr = await Promise.all(reposneArr);
      console.log(newArr);
      return newArr;
   } catch (error) {
      throw error;
   }
})();


nextBtn.addEventListener("click", async function(){
   const next = parseInt(page.innerText);
   page.innerHTML = next + 1;
   // get total page
   const totalPages = await countPage;
   // if total Pages undefine then check max 
   if( ( next + 1) === totalPages){
      nextBtn.parentNode.classList.add('disabled')
   } 
   // if next + 1 >= 2  remove disable 
   if ( (next + 1) >= 2) 
      prevBtn.parentNode.classList.remove('disabled');
   renderNews(next + 1);
});

prevBtn.addEventListener('click', function(){
   const prev = parseInt(page.innerText);
   page.innerHTML = prev - 1;
   // disable when page = 1
   if( prev - 1 === 1)
      prevBtn.parentNode.classList.add('disabled')
   // if <
   if( ( prev - 1) < prev)
      nextBtn.parentNode.classList.remove('disabled');
   // render news 
   renderNews(prev - 1);
});


// render data
const renderNews = async function(pageNum)
{  
      try {
         const data = await fulldata;
         console.log(data);
         // rennder data
         newContainer.innerHTML = data[pageNum - 1].map( item => `
         <div class="card flex-row flex-wrap">
         <div class="card">
            <div class="row no-gutters">
               <div class="col-md-4">
                  <img src="${item.urlToImage}"
                     class="card-img"
                     alt="${item.title}">
               </div>
               <div class="col-md-8">
                  <div class="card-body">
                     <h5 class="card-title">${item.title}</h5>
                     <p class="card-text">${item.description} </p>
                     <a href="${item.url}" class="btn btn-primary" style = "display: flex;
                     width: 7%;"> View</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
         `).join('');
      } catch (error) {
         console.error(error);
      }
      
};



// default rennder page one 
(async function(){
   renderNews(1);
})();
