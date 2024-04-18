import{S as d,i as c}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const u="43439546-09d160f4f6cc02f4d93a741f2",f=document.querySelector(".search-form"),l=document.querySelector(".gallery"),m=document.querySelector(".search-input"),p=new d(".gallery a",{captionsData:"alt",captionDelay:250}),i=document.querySelector(".loader");f.addEventListener("submit",g);function g(o){o.preventDefault();const t=m.value.trim();if(!t){c.warning({title:"Warning!",message:"Please enter image name!",position:"topRight"});return}b(),i.style.display="flex";const a=new URLSearchParams({key:u,q:t,image_type:"horizontal",safesearch:!0});fetch(`https://pixabay.com/api/?${a}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"});return}h(r.hits),p.refresh()}).catch(r=>{console.error("Error fetching images:",r),c.error({message:"Failed to fetch images. Please try again later.",position:"topRight"})}).finally(()=>{i.style.display="none"})}function h(o){const t=document.createDocumentFragment();o.forEach(a=>{const r=y(a);t.appendChild(r)}),l.appendChild(t)}function y(o){const t=document.createElement("div");return t.classList.add("card"),t.innerHTML=`
    <a class="gallery-link" href="${o.largeImageURL}">
      <img class="card-image" src="${o.webformatURL}" alt="${o.tags}" loading="lazy">
    </a>
    <div class="card-info">
      <p class="card-text"><b>Likes:</b> ${o.likes}</p>
      <p class="card-text"><b>Views:</b> ${o.views}</p>
      <p class="card-text"><b>Comments:</b> ${o.comments}</p>
      <p class="card-text"><b>Downloads:</b> ${o.downloads}</p>
    </div>
  `,t}function b(){l.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map