import{a as q,S as v,i}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const I="48145276-ba1887f72c90a3fcdb02285cd";async function p(t,r=1,s=15){const n={key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:s,page:r};try{return(await q.get("https://pixabay.com/api/?",{params:n})).data}catch(e){throw console.error(e.message),e}}let f=null;function P(t,r=!1){const s=document.querySelector(".gallery"),n=t.map(({webformatURL:e,largeImageURL:o,tags:l,likes:b,views:w,comments:L,downloads:S})=>`<li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${e}"
              alt="${l}"
            />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${b}</p>
            <p><b>Views:</b> ${w}</p>
            <p><b>Comments:</b> ${L}</p>
            <p><b>Downloads:</b> ${S}</p>
          </div>
        </li>`).join("");r?s.insertAdjacentHTML("beforeend",n):s.innerHTML=n,f?f.refresh():f=new v(".gallery a",{captionsData:"alt",captionDelay:250})}function B(){document.querySelector(".gallery").innerHTML=""}function d(t){const r=document.querySelector("#loadBtn");r.style.display=t?"block":"none"}function a(t){const r=document.querySelector(".loader");r.style.display=t?"inline-block":"none"}function E(){const t=document.querySelector(".gallery .gallery-item");if(t){const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}const y=document.querySelector("#formImg"),$=document.querySelector("#searchImg"),H=document.querySelector("#loadBtn");let u="",c=1;const g=15;let m=0;function h(t,r=!1){if(t.hits.length===0){i.error({title:"Error",message:"No images found!"});return}P(t.hits,r),m=t.totalHits,c*g>=m?(i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),d(!1)):d(!0)}y.addEventListener("submit",async t=>{if(t.preventDefault(),u=$.value.trim(),!u){i.warning({title:"Warning",message:"Please enter a search term!"});return}y.reset(),B(),a(!0),d(!1),c=1,m=0;try{const r=await p(u,c,g);a(!1),h(r)}catch{a(!1),i.error({title:"Error",message:"Something went wrong."})}});H.addEventListener("click",async()=>{c++,a(!0);try{const t=await p(u,c,g);a(!1),h(t,!0),E()}catch{a(!1),i.error({title:"Error",message:"Something went wrong."})}});
//# sourceMappingURL=index.js.map
