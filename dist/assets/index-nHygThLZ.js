import{L as E,o as F}from"./vendor-B4umW4ZV.js";import{l as U}from"./workbox-pECmu2PR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const d="https://story-api.dicoding.dev/v1",O="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";async function u(s){const t=await s.json();if(!s.ok){const e=t.message||`Server error: ${s.status}`;throw new Error(e)}return t}async function R({name:s,email:t,password:e}){try{if(!s||typeof s!="string"||s.trim().length===0)throw new Error("Nama tidak boleh kosong");if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))throw new Error("Email tidak valid");if(!e||e.length<8)throw new Error("Password harus minimal 8 karakter");console.log("Mengirim data registrasi:",{name:s,email:t,password:e});const i=await fetch(`${d}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s,email:t,password:e})}),n=await u(i);return console.log("Respons dari server (register):",n),n}catch(i){throw console.error("Error registering:",i.message),new Error(i.message)}}async function N({email:s,password:t}){try{if(!s||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))throw new Error("Email tidak valid");if(!t||t.length<8)throw new Error("Password harus minimal 8 karakter");console.log("Mengirim data login:",{email:s,password:t});const e=await fetch(`${d}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,password:t})}),i=await u(e);return console.log("Respons dari server (login):",i),i}catch(e){throw console.error("Error logging in:",e.message),new Error(e.message)}}async function q({description:s,photo:t,lat:e,lon:i,token:n}){try{if(!s||s.trim().length===0)throw new Error("Deskripsi tidak boleh kosong");if(!t)throw new Error("Foto wajib diunggah");if(!n)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const a=new FormData;a.append("description",s),a.append("photo",t),e&&i&&(a.append("lat",e),a.append("lon",i)),console.log("Mengirim data cerita:",{description:s,lat:e,lon:i,token:n});const o=await fetch(`${d}/stories`,{method:"POST",headers:{Authorization:`Bearer ${n}`},body:a}),c=await u(o);return console.log("Respons dari server (addStory):",c),c}catch(a){throw console.error("Error adding story:",a.message),new Error(a.message)}}async function W({description:s,photo:t,lat:e,lon:i}){try{if(!s||s.trim().length===0)throw new Error("Deskripsi tidak boleh kosong");if(!t)throw new Error("Foto wajib diunggah");const n=new FormData;n.append("description",s),n.append("photo",t),e&&i&&(n.append("lat",e),n.append("lon",i)),console.log("Mengirim data cerita guest:",{description:s,lat:e,lon:i});const a=await fetch(`${d}/stories/guest`,{method:"POST",body:n}),o=await u(a);return console.log("Respons dari server (addGuestStory):",o),o}catch(n){throw console.error("Error adding guest story:",n.message),new Error(n.message)}}async function z({token:s,page:t=1,size:e=10,location:i=0}){try{if(!s)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const n=new URLSearchParams({page:t,size:e,location:i});console.log("Mengambil daftar cerita dengan params:",n.toString());const a=await fetch(`${d}/stories?${n}`,{headers:{Authorization:`Bearer ${s}`}}),o=await u(a);return console.log("Respons dari server (getStories):",o),o}catch(n){throw console.error("Error getting stories:",n.message),new Error(n.message)}}async function V(s,t){try{if(!s)throw new Error("ID cerita tidak boleh kosong");if(!t)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");console.log("Mengambil detail cerita dengan ID:",s);const e=await fetch(`${d}/stories/${s}`,{headers:{Authorization:`Bearer ${t}`}}),i=await u(e);return console.log("Respons dari server (getStoryDetail):",i),i}catch(e){throw console.error("Error getting story detail:",e.message),new Error(e.message)}}async function j(s,t){try{if(!s)throw new Error("Data subscription tidak boleh kosong");if(!t)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const e={endpoint:s.endpoint,keys:{p256dh:s.keys.p256dh,auth:s.keys.auth}};console.log("Mengirim data subscription ke server:",e);const i=await fetch(`${d}/notifications/subscribe`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)}),n=await u(i);return console.log("Respons dari server (subscribeNotifications):",n),n}catch(e){throw console.error("Error subscribing to notifications:",e.message),new Error(e.message)}}async function G(s,t){try{if(!s)throw new Error("Endpoint tidak boleh kosong");if(!t)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");console.log("Menghapus subscription dengan endpoint:",s);const e=await fetch(`${d}/notifications/subscribe`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({endpoint:s})}),i=await u(e);return console.log("Respons dari server (unsubscribeFromNotifications):",i),i}catch(e){throw console.error("Error unsubscribing from notifications:",e.message),new Error(e.message)}}async function J(s,t){try{if(!t)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const e={title:"New Story Added!",body:`${s.name} just shared a new story: ${s.description.substring(0,50)}...`,data:{storyId:s.id,url:`/#/detail/${s.id}`}};console.log("Triggering story notification:",e);const i=await fetch(`${d}/notifications/trigger`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(i.ok){const n=await i.json();return console.log("Notification triggered successfully:",n),n}else return console.warn("Notification trigger endpoint not available"),null}catch(e){return console.error("Error triggering story notification:",e.message),null}}class k{async getStories({token:t,page:e=1,size:i=10,location:n=1}){const a=await z({token:t,page:e,size:i,location:n});if(a.error)throw new Error(a.message);return a.listStory}async getStoryDetail(t,e){const i=await V(t,e);if(i.error)throw new Error(i.message);return i.story}async addStory({description:t,photo:e,lat:i,lon:n,token:a}){const o=await q({description:t,photo:e,lat:i,lon:n,token:a});if(o.error)throw new Error(o.message);return o}async addGuestStory({description:t,photo:e,lat:i,lon:n}){const a=await W({description:t,photo:e,lat:i,lon:n});if(a.error)throw new Error(a.message);return a}}function v(s,t=-6.2,e=106.8,i=13){const n=E.map(s).setView([t,e],i);return E.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(n),n}function b(s,t,e,i){const n=E.marker([t,e]).addTo(s);return i&&n.bindPopup(i).openPopup(),n}function _(s,t){s.on("click",e=>{const{lat:i,lng:n}=e.latlng;t(i,n)})}class C{constructor(t){this.view=t,this.model=new k}async loadStories(){try{const t=localStorage.getItem("token");if(!t){this.view.showMessage("Silakan login terlebih dahulu!",()=>{window.location.hash="#/login"});return}const e=await this.getStories(t);if(e.error)throw new Error(e.message);this.view.displayStories(e)}catch(t){this.view.showMessage(`Gagal memuat cerita: ${t.message}`,()=>{this.loadStories()})}}async getStories(t){return await this.model.getStories({token:t,page:1,size:10,location:1})}initMap(t,e,i,n){if(e&&i){const a=v(t,e,i,13);b(a,e,i,n)}}}function r(s,t={}){const e=document.createElement(s);return Object.entries(t).forEach(([i,n])=>{e.setAttribute(i,n)}),e}const Y="story-app-db",K=1,m="stories";async function f(){return await F(Y,K,{upgrade(t){t.objectStoreNames.contains(m)||t.createObjectStore(m,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function L(s){const e=(await f()).transaction(m,"readwrite");await Promise.all([...s.map(i=>e.store.put(i)),e.done])}async function Q(){return(await f()).getAllFromIndex(m,"createdAt")}async function X(s){await(await f()).delete(m,s)}class Z{constructor(){this.presenter=new C(this)}async init(){const t=r("div",{class:"home-container",role:"region","aria-label":"Daftar cerita"});t.innerHTML=`
      <h2 id="story-list-title">Daftar Cerita</h2>
      <div 
        id="story-list" 
        role="feed" 
        aria-labelledby="story-list-title"
        class="stories-container"
      ></div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),await this.presenter.loadStories()}displayStories(t){const e=document.getElementById("story-list");e.innerHTML="",t.forEach(i=>{const n=r("div",{class:"story-item",role:"article"});n.innerHTML=`
        <h3>${i.name}</h3>
        <p>${i.description}</p>
        <img 
          src="${i.photoUrl}" 
          alt="Foto untuk cerita: ${i.description.substring(0,50)}..." 
          loading="lazy"
          class="story-image"
        >
        <p>Dibuat pada: ${new Date(i.createdAt).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}</p>
        ${i.lat&&i.lon?`<div 
                id="map-${i.id}" 
                class="story-map" 
                role="complementary" 
                aria-label="Lokasi cerita di peta"
              ></div>`:""}
        <div class="story-actions">
          <a 
            href="#/detail/${i.id}" 
            class="detail-link"
            aria-label="Lihat detail cerita dari ${i.name}"
          >Lihat Detail</a>
          <button 
            class="save-favorite-btn" 
            data-story='${JSON.stringify(i).replace(/'/g,"&apos;")}'
            aria-label="Simpan ke favorit"
          >
            ❤️ Simpan ke Favorit
          </button>
        </div>
      `,e.appendChild(n),i.lat&&i.lon&&this.presenter.initMap(`map-${i.id}`,i.lat,i.lon,i.name)}),document.querySelectorAll(".save-favorite-btn").forEach(i=>{i.addEventListener("click",async n=>{const a=JSON.parse(n.target.dataset.story.replace(/&apos;/g,"'"));await this.saveFavorite(a)})})}async saveFavorite(t){try{await L([t]),this.showMessage("Cerita berhasil disimpan ke favorit!")}catch(e){this.showMessage(`Gagal menyimpan cerita: ${e.message}`)}}showMessage(t,e){const i=document.getElementById("story-list");e?(i.innerHTML=`
        <div role="alert">
          <p>${t}</p>
          <button id="retry-btn" class="retry-button">Coba Lagi</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",e)):alert(t)}}function $(s){localStorage.setItem("token",s)}function l(){return localStorage.getItem("token")}function tt(){localStorage.removeItem("token")}class et{constructor(){this.installPrompt=null}async init(){const t=l(),e=r("div",{class:"landing-container",role:"main"});e.innerHTML=`
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Share Your Stories</h1>
          <p class="hero-subtitle">Capture and share your special moments with the Dicoding community</p>
          <div class="hero-actions">
            <a href="#/add-story" class="btn btn-primary">Create New Story</a>
            <a href="#/stories" class="btn btn-secondary">Browse Stories</a>
          </div>
        </div>
        <div class="hero-image">
          <div class="story-preview">
            <div class="story-card">
              <div class="story-placeholder"></div>
              <h3>Your Story Here</h3>
              <p>Share your amazing experiences</p>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Why Choose StoryApp?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📸</div>
              <h3>Photo Stories</h3>
              <p>Capture moments with your camera and share them instantly</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🗺️</div>
              <h3>Location Sharing</h3>
              <p>Add location data to your stories and explore places</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">❤️</div>
              <h3>Save Favorites</h3>
              <p>Keep your favorite stories for offline reading</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔔</div>
              <h3>Push Notifications</h3>
              <p>Get notified when new stories are shared</p>
            </div>
          </div>
        </div>
      </section>

      <section class="install-section">
        <div class="install-card">
          <div class="install-content">
            <h3>Install StoryApp for a better experience!</h3>
            <p>Get the full app experience with offline access and push notifications</p>
            <div class="install-actions">
              <button id="install-btn" class="btn btn-install">Install</button>
              <button id="not-now-btn" class="btn btn-outline">Not Now</button>
            </div>
          </div>
          <div class="install-icon">📱</div>
        </div>
      </section>

      ${t?`
        <section class="featured-stories-section">
          <div class="container">
            <h2 class="section-title">Featured Stories</h2>
            <div id="featured-stories" class="stories-preview"></div>
            <div class="view-all-container">
              <a href="#/stories" class="btn btn-outline">View All Stories</a>
            </div>
          </div>
        </section>
      `:""}
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),this.setupInstallPrompt(),t&&await this.loadFeaturedStories()}setupInstallPrompt(){const t=document.getElementById("install-btn"),e=document.getElementById("not-now-btn"),i=document.querySelector(".install-section");window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),this.installPrompt=n,i.style.display="block"}),t.addEventListener("click",async()=>{this.installPrompt?(this.installPrompt.prompt(),(await this.installPrompt.userChoice).outcome==="accepted"&&(i.style.display="none"),this.installPrompt=null):this.showMessage("To install this app, use your browser's 'Add to Home Screen' option in the menu.")}),e.addEventListener("click",()=>{i.style.display="none"}),window.matchMedia("(display-mode: standalone)").matches&&(i.style.display="none")}async loadFeaturedStories(){try{const t=l();if(!t)return;const i=await(await fetch("https://story-api.dicoding.dev/v1/stories?page=1&size=3&location=1",{headers:{Authorization:`Bearer ${t}`}})).json();i.listStory&&i.listStory.length>0&&this.displayFeaturedStories(i.listStory)}catch(t){console.error("Error loading featured stories:",t)}}displayFeaturedStories(t){const e=document.getElementById("featured-stories");e&&(e.innerHTML=t.map(i=>`
      <div class="featured-story-card">
        <div class="story-image-container">
          <img src="${i.photoUrl}" alt="${i.description.substring(0,50)}..." loading="lazy">
        </div>
        <div class="story-content">
          <h3>${i.name}</h3>
          <p class="story-date">${new Date(i.createdAt).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}</p>
          <p class="story-description">${i.description.substring(0,100)}...</p>
          <a href="#/detail/${i.id}" class="view-details-btn">View Details</a>
        </div>
      </div>
    `).join(""))}showMessage(t){alert(t)}}class it{constructor(){this.presenter=new C(this)}async init(){const t=r("div",{class:"stories-page-container",role:"region","aria-label":"Daftar semua cerita"});t.innerHTML=`
      <div class="stories-header">
        <h1>All Stories</h1>
        <p>Discover amazing stories from our community</p>
      </div>
      
      <div class="stories-filters">
        <div class="filter-group">
          <label for="sort-select">Sort by:</label>
          <select id="sort-select">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div class="filter-group">
          <button id="refresh-btn" class="btn btn-outline">🔄 Refresh</button>
        </div>
      </div>
      
      <div 
        id="stories-list" 
        role="feed" 
        aria-label="Daftar cerita"
        class="stories-container"
      ></div>
      
      <div id="loading-indicator" class="loading-indicator" style="display: none;">
        <div class="spinner"></div>
        <p>Loading stories...</p>
      </div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),this.setupEventListeners(),await this.presenter.loadStories()}setupEventListeners(){const t=document.getElementById("refresh-btn"),e=document.getElementById("sort-select");t.addEventListener("click",()=>{this.presenter.loadStories()}),e.addEventListener("change",i=>{this.sortStories(i.target.value)})}displayStories(t){const e=document.getElementById("stories-list");if(e.innerHTML="",t.length===0){e.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon">📖</div>
          <h3>No Stories Yet</h3>
          <p>Be the first to share your story!</p>
          <a href="#/add-story" class="btn btn-primary">Create Story</a>
        </div>
      `;return}t.forEach(i=>{const n=r("div",{class:"story-item",role:"article"});n.innerHTML=`
        <div class="story-header">
          <div class="story-author">
            <div class="author-avatar">
              ${i.name.charAt(0).toUpperCase()}
            </div>
            <div class="author-info">
              <h3>${i.name}</h3>
              <p class="story-date">${new Date(i.createdAt).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
            </div>
          </div>
        </div>
        
        <div class="story-content">
          <p class="story-description">${i.description}</p>
          <img 
            src="${i.photoUrl}" 
            alt="Foto untuk cerita: ${i.description.substring(0,50)}..." 
            loading="lazy"
            class="story-image"
          >
        </div>
        
        ${i.lat&&i.lon?`
          <div class="story-location">
            <div class="location-info">
              <span class="location-icon">📍</span>
              <span>Location: ${i.lat.toFixed(4)}, ${i.lon.toFixed(4)}</span>
            </div>
            <div 
              id="map-${i.id}" 
              class="story-map" 
              role="complementary" 
              aria-label="Lokasi cerita di peta"
            ></div>
          </div>
        `:""}
        
        <div class="story-actions">
          <a 
            href="#/detail/${i.id}" 
            class="action-btn detail-btn"
            aria-label="Lihat detail cerita dari ${i.name}"
          >
            <span class="btn-icon">👁️</span>
            View Details
          </a>
          <button 
            class="action-btn favorite-btn" 
            data-story='${JSON.stringify(i).replace(/'/g,"&apos;")}'
            aria-label="Simpan ke favorit"
          >
            <span class="btn-icon">❤️</span>
            Save to Favorites
          </button>
        </div>
      `,e.appendChild(n),i.lat&&i.lon&&this.presenter.initMap(`map-${i.id}`,i.lat,i.lon,i.name)}),document.querySelectorAll(".favorite-btn").forEach(i=>{i.addEventListener("click",async n=>{const a=JSON.parse(n.target.closest(".favorite-btn").dataset.story.replace(/&apos;/g,"'"));await this.saveFavorite(a)})})}async saveFavorite(t){try{await L([t]),this.showMessage("Cerita berhasil disimpan ke favorit!")}catch(e){this.showMessage(`Gagal menyimpan cerita: ${e.message}`)}}sortStories(t){const e=document.getElementById("stories-list"),i=Array.from(e.querySelectorAll(".story-item"));i.sort((n,a)=>{const o=new Date(n.querySelector(".story-date").textContent),c=new Date(a.querySelector(".story-date").textContent);return t==="newest"?c-o:o-c}),e.innerHTML="",i.forEach(n=>e.appendChild(n))}showMessage(t,e){if(e){const i=document.getElementById("stories-list");i.innerHTML=`
        <div class="error-state" role="alert">
          <div class="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>${t}</p>
          <button id="retry-btn" class="btn btn-primary">Try Again</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",e)}else alert(t)}}function st(s){const t="=".repeat((4-s.length%4)%4),e=(s+t).replace(/\-/g,"+").replace(/_/g,"/"),i=window.atob(e),n=new Uint8Array(i.length);for(let a=0;a<i.length;++a)n[a]=i.charCodeAt(a);return n}async function P(){if(!("Notification"in window))return console.warn("This browser does not support notifications"),!1;if(Notification.permission==="granted")return!0;if(Notification.permission==="denied")return console.warn("Notification permission denied"),!1;try{return await Notification.requestPermission()==="granted"}catch(s){return console.error("Error requesting notification permission:",s),!1}}function g(){return"serviceWorker"in navigator&&"PushManager"in window}async function D(){if(!g())return null;try{return await(await navigator.serviceWorker.ready).pushManager.getSubscription()}catch(s){return console.error("Error getting push subscription:",s),null}}async function nt(){return await D()!==null}async function x(s){if(!g())throw new Error("Push notifications are not supported in this browser");if(!await P())throw new Error("Notification permission not granted");try{const e=await navigator.serviceWorker.ready;let i=await e.pushManager.getSubscription();i||(i=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:st(O)}));try{return await j(i,s),console.log("Successfully subscribed to push notifications"),i}catch(n){throw console.error("Server subscription failed, rolling back:",n),await i.unsubscribe(),new Error(`Failed to register subscription with server: ${n.message}`)}}catch(e){throw console.error("Error subscribing to push notifications:",e),e}}async function at(s){if(!g())throw new Error("Push notifications are not supported in this browser");try{const t=await D();if(!t)return console.log("No active subscription found"),!0;try{await G(t.endpoint,s)}catch(i){console.warn("Server unsubscription failed:",i)}const e=await t.unsubscribe();return console.log("Successfully unsubscribed from push notifications"),e}catch(t){throw console.error("Error unsubscribing from push notifications:",t),t}}async function ot(s,t,e={}){if(!("Notification"in window)){console.warn("This browser does not support notifications");return}if(Notification.permission!=="granted"){console.warn("Notification permission not granted");return}try{"serviceWorker"in navigator?await(await navigator.serviceWorker.ready).showNotification(s,{body:t,icon:"/icons/icon-192x192.png",badge:"/icons/icon-96x96.png",tag:"story-notification",data:e,requireInteraction:!1,vibrate:[200,100,200],actions:[{action:"view",title:"View Stories"}]}):new Notification(s,{body:t,icon:"/icons/icon-192x192.png",tag:"story-notification"})}catch(i){console.error("Error showing notification:",i)}}async function A(){const s=g(),t="Notification"in window?Notification.permission:"unsupported",e=await nt();return{isSupported:s,permission:t,isSubscribed:e,canSubscribe:s&&t!=="denied"}}async function rt(){if(!g())return console.warn("Push notifications not supported"),!1;try{return navigator.serviceWorker.controller||await navigator.serviceWorker.register("/sw.js"),await navigator.serviceWorker.ready,console.log("Notification system initialized"),!0}catch(s){return console.error("Error initializing notifications:",s),!1}}class ct{constructor(t){this.view=t,this.model=new k,this.coordinates={},this.currentMarker=null,this.map=null}initMap(t){return this.map=v(t),_(this.map,(e,i)=>{this.setCoordinates(e,i),this.view.updateLocationDisplay(e,i)}),this.map}setCoordinates(t,e){this.coordinates={lat:t,lon:e},this.currentMarker&&this.map.removeLayer(this.currentMarker),this.currentMarker=b(this.map,t,e,"Selected location"),console.log("Coordinates selected:",t,e)}updateMapLocation(t,e){this.map&&(this.map.setView([t,e],15),this.setCoordinates(t,e))}getCoordinates(){return this.coordinates}async addStory(t,e,i,n,a){var o;try{const c=await this.model.addStory({description:t,photo:e,lat:i||this.coordinates.lat,lon:n||this.coordinates.lon,token:a});await ot("Story Shared Successfully!",`Your story "${t.substring(0,50)}..." has been shared with the community.`,{url:"/#/stories",action:"story_shared"});try{const p={id:((o=c.story)==null?void 0:o.id)||Date.now().toString(),name:"You",description:t};await J(p,a)}catch(p){console.warn("Could not trigger push notification:",p.message)}this.view.showMessage("Story shared successfully!"),this.view.stopCamera(),setTimeout(()=>{window.location.hash="#/stories"},1e3)}catch(c){this.view.showMessage(`Failed to share story: ${c.message}`)}}}async function lt(s){try{const t=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});return s.srcObject=t,t}catch(t){if(t.name==="NotFoundError"||t.name==="DevicesNotFoundError")try{console.warn("Environment camera not found, trying fallback to any available camera");const e=await navigator.mediaDevices.getUserMedia({video:!0});return s.srcObject=e,e}catch(e){throw console.error("Fallback camera access also failed:",e),e}throw console.error("Error accessing camera:",t),t}}function dt(s,t){const e=t.getContext("2d");return t.width=s.videoWidth,t.height=s.videoHeight,e.drawImage(s,0,0,t.width,t.height),t.toDataURL("image/jpeg")}function ut(s){s&&s.getTracks().forEach(t=>t.stop())}function pt(s,t){const e=s.split(","),i=e[0].match(/:(.*?);/)[1],n=atob(e[1]);let a=n.length;const o=new Uint8Array(a);for(;a--;)o[a]=n.charCodeAt(a);return new File([o],t,{type:i})}class ht{constructor(){this.presenter=new ct(this),this.stream=null,this.photo=null,this.userLocation=null}async init(){if(!l()){this.showMessage("Silakan login terlebih dahulu!"),window.location.hash="#/login";return}const e=r("div",{class:"add-story-container"});e.innerHTML=`
      <div class="form-header">
        <h2>Create New Story</h2>
        <p>Share your amazing experience with the community</p>
      </div>
      
      <form id="add-story-form" class="story-form">
        <div class="form-group">
          <label for="description">Story Description</label>
          <textarea 
            id="description" 
            required 
            aria-required="true" 
            placeholder="Tell us about your experience..."
            rows="4"
          ></textarea>
          <div class="char-counter">
            <span id="char-count">0</span>/500 characters
          </div>
        </div>
        
        <div class="form-group">
          <label for="photo">Photo</label>
          <div class="photo-section">
            <video id="camera" autoplay playsinline class="camera-preview"></video>
            <img id="preview" class="photo-preview" alt="Photo Preview" style="display:none;" />
            <canvas id="canvas" style="display:none;"></canvas>
            
            <div class="camera-controls">
              <button type="button" id="capture" class="btn btn-camera">
                <span class="btn-icon">📷</span>
                Capture Photo
              </button>
              <button type="button" id="retake" class="btn btn-outline" style="display:none;">
                <span class="btn-icon">🔄</span>
                Retake
              </button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="location">Location</label>
          <p class="location-help">Click on the map to set your story's location (optional)</p>
          
          <div class="location-controls">
            <button type="button" id="use-my-location" class="btn btn-location">
              <span class="btn-icon">📍</span>
              Use My Location
            </button>
            <div class="location-inputs">
              <div class="input-group">
                <label for="latitude">Latitude</label>
                <input type="number" id="latitude" step="any" placeholder="Latitude" readonly>
              </div>
              <div class="input-group">
                <label for="longitude">Longitude</label>
                <input type="number" id="longitude" step="any" placeholder="Longitude" readonly>
              </div>
            </div>
          </div>
          
          <div id="location-info" class="location-info">
            <span class="location-icon">📍</span>
            <span class="location-text">No location selected</span>
          </div>
          
          <div id="map" class="story-map"></div>
        </div>
        
        <div class="form-actions">
          <button type="button" id="cancel-btn" class="btn btn-outline">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            <span class="btn-icon">📝</span>
            Share Story
          </button>
        </div>
      </form>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),await this.initializeForm()}async initializeForm(){const t=document.getElementById("camera");try{this.stream=await lt(t)}catch(e){this.showMessage(`Failed to access camera: ${e.message}. Please ensure camera is available and allow camera access in browser settings.`);return}this.presenter.initMap("map"),this.setupEventListeners()}setupEventListeners(){const t=document.getElementById("description"),e=document.getElementById("char-count"),i=document.getElementById("capture"),n=document.getElementById("retake"),a=document.getElementById("use-my-location"),o=document.getElementById("cancel-btn"),c=document.getElementById("add-story-form");t.addEventListener("input",p=>{const B=p.target.value.length;e.textContent=B,e.style.color=B>500?"#ef476f":"#6c757d"}),i.addEventListener("click",()=>{this.capturePhoto()}),n.addEventListener("click",()=>{this.retakePhoto()}),a.addEventListener("click",()=>{this.getCurrentLocation()}),o.addEventListener("click",()=>{confirm("Are you sure you want to cancel? Your story will be lost.")&&(this.stopCamera(),window.location.hash="#/stories")}),c.addEventListener("submit",async p=>{p.preventDefault(),await this.submitStory()})}capturePhoto(){const t=document.getElementById("camera"),e=document.getElementById("canvas"),i=document.getElementById("preview"),n=document.getElementById("capture"),a=document.getElementById("retake"),o=dt(t,e);this.photo=pt(o,"story.jpg"),i.src=o,i.style.display="block",t.style.display="none",n.style.display="none",a.style.display="inline-flex"}retakePhoto(){const t=document.getElementById("camera"),e=document.getElementById("preview"),i=document.getElementById("capture"),n=document.getElementById("retake");this.photo=null,e.style.display="none",t.style.display="block",i.style.display="inline-flex",n.style.display="none"}async getCurrentLocation(){const t=document.getElementById("use-my-location"),e=t.innerHTML;t.innerHTML='<span class="spinner-small"></span> Getting location...',t.disabled=!0;try{const i=await new Promise((o,c)=>{navigator.geolocation.getCurrentPosition(o,c,{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})}),{latitude:n,longitude:a}=i.coords;this.updateLocationDisplay(n,a),this.presenter.setCoordinates(n,a),this.presenter.updateMapLocation(n,a)}catch(i){this.showMessage(`Failed to get location: ${i.message}`)}finally{t.innerHTML=e,t.disabled=!1}}updateLocationDisplay(t,e){const i=document.getElementById("location-info"),n=document.getElementById("latitude"),a=document.getElementById("longitude");i.innerHTML=`
      <span class="location-icon">📍</span>
      <span class="location-text">Location: ${t.toFixed(6)}, ${e.toFixed(6)}</span>
    `,i.classList.add("location-selected"),n.value=t.toFixed(6),a.value=e.toFixed(6)}async submitStory(){const t=document.getElementById("description").value.trim(),e=l();if(!t){this.showMessage("Please enter a story description!");return}if(t.length>500){this.showMessage("Story description must be 500 characters or less!");return}if(!this.photo){this.showMessage("Please capture a photo first!");return}const{lat:i,lon:n}=this.presenter.getCoordinates(),a=document.querySelector('button[type="submit"]'),o=a.innerHTML;a.innerHTML='<span class="spinner-small"></span> Sharing...',a.disabled=!0;try{await this.presenter.addStory(t,this.photo,i,n,e)}catch{a.innerHTML=o,a.disabled=!1}}stopCamera(){ut(this.stream)}showMessage(t){alert(t)}}class mt{constructor(t){this.view=t,this.model=new k}async getStoryDetail(t,e){try{return await this.model.getStoryDetail(t,e)}catch(i){throw new Error(`Gagal mengambil detail cerita: ${i.message}`)}}initMap(t,e,i,n){if(e&&i){const a=v(t,e,i,13);b(a,e,i,n)}}}class gt{constructor(){this.presenter=new mt(this)}async init({id:t}){const e=l();if(!e){window.location.hash="#/login";return}const i=r("div",{class:"detail-container"});i.innerHTML=`
      <div class="detail-header">
        <button id="back-btn" class="btn btn-outline">
          <span class="btn-icon">←</span>
          Back to Stories
        </button>
        <div class="detail-actions">
          <button id="save-favorite" class="btn btn-outline">
            <span class="btn-icon">❤️</span>
            Save to Favorites
          </button>
          <button id="share-story" class="btn btn-outline">
            <span class="btn-icon">📤</span>
            Share
          </button>
        </div>
      </div>
      
      <div id="story-detail" class="story-detail-content">
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading story...</p>
        </div>
      </div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(i),this.setupEventListeners();try{const n=await this.presenter.getStoryDetail(t,e);this.displayStory(n)}catch(n){this.showError(n.message)}}setupEventListeners(){const t=document.getElementById("back-btn"),e=document.getElementById("save-favorite"),i=document.getElementById("share-story");t.addEventListener("click",()=>{window.history.back()}),e.addEventListener("click",()=>{this.currentStory&&this.saveFavorite(this.currentStory)}),i.addEventListener("click",()=>{this.currentStory&&this.shareStory(this.currentStory)})}displayStory(t){this.currentStory=t;const e=document.getElementById("story-detail");e.innerHTML=`
      <article class="story-article">
        <header class="story-header">
          <div class="author-section">
            <div class="author-avatar">
              ${t.name.charAt(0).toUpperCase()}
            </div>
            <div class="author-info">
              <h1 class="story-author">${t.name}</h1>
              <time class="story-date" datetime="${t.createdAt}">
                ${new Date(t.createdAt).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}
              </time>
            </div>
          </div>
        </header>

        <div class="story-content">
          <div class="story-image-container">
            <img 
              src="${t.photoUrl}" 
              alt="Story photo by ${t.name}" 
              class="story-image"
              loading="lazy"
            >
          </div>
          
          <div class="story-text">
            <p class="story-description">${t.description}</p>
          </div>

          ${t.lat&&t.lon?`
            <div class="story-location-section">
              <h3 class="location-title">
                <span class="location-icon">📍</span>
                Story Location
              </h3>
              <div class="location-coordinates">
                <span class="coordinate">
                  <strong>Latitude:</strong> ${t.lat.toFixed(6)}
                </span>
                <span class="coordinate">
                  <strong>Longitude:</strong> ${t.lon.toFixed(6)}
                </span>
              </div>
              <div id="map-detail" class="story-map-detail"></div>
            </div>
          `:""}
        </div>

        <footer class="story-footer">
          <div class="story-stats">
            <span class="stat-item">
              <span class="stat-icon">👁️</span>
              <span class="stat-text">Story viewed</span>
            </span>
          </div>
        </footer>
      </article>
    `,t.lat&&t.lon&&setTimeout(()=>{this.presenter.initMap("map-detail",t.lat,t.lon,t.name)},100)}async saveFavorite(t){try{await L([t]),this.showMessage("Story saved to favorites!");const e=document.getElementById("save-favorite");e.innerHTML='<span class="btn-icon">✅</span> Saved',e.disabled=!0,setTimeout(()=>{e.innerHTML='<span class="btn-icon">❤️</span> Save to Favorites',e.disabled=!1},2e3)}catch(e){this.showMessage(`Failed to save story: ${e.message}`)}}shareStory(t){if(navigator.share)navigator.share({title:`Story by ${t.name}`,text:t.description,url:window.location.href}).catch(e=>console.log("Error sharing:",e));else{const e=window.location.href;navigator.clipboard.writeText(e).then(()=>{this.showMessage("Story link copied to clipboard!")}).catch(()=>{this.showMessage("Unable to share story. Please copy the URL manually.")})}}showError(t){const e=document.getElementById("story-detail");e.innerHTML=`
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Unable to Load Story</h3>
        <p>${t}</p>
        <button id="retry-btn" class="btn btn-primary">Try Again</button>
        <a href="#/stories" class="btn btn-outline">Back to Stories</a>
      </div>
    `,document.getElementById("retry-btn").addEventListener("click",()=>{window.location.reload()})}showMessage(t){const e=r("div",{class:"toast-notification"});e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.classList.add("show")},100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}}class yt{constructor(t){this.view=t}async login({email:t,password:e}){try{const i=await N({email:t,password:e});if(i.error)throw new Error(i.message);$(i.loginResult.token),localStorage.setItem("userData",JSON.stringify({name:i.loginResult.name||t.split("@")[0],email:t})),this.view.showMessage("Login berhasil!"),window.location.hash="#/"}catch(i){i.message==="User not found"?this.view.showMessage("Pengguna tidak ditemukan. Silakan registrasi terlebih dahulu."):this.view.showMessage(`Login gagal: ${i.message}`)}}}class vt{constructor(){this.presenter=new yt(this)}async init(){const t=r("div",{class:"auth-container"});t.innerHTML=`
      <h2>Login</h2>
      <form id="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" required aria-required="true">
        </div>
        <button type="submit" aria-label="Masuk ke akun">Login</button>
      </form>
      <p>Belum punya akun? <a href="#/register" aria-label="Daftar akun baru">Register di sini</a></p>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),document.getElementById("login-form").addEventListener("submit",async e=>{e.preventDefault();const i=document.getElementById("email").value,n=document.getElementById("password").value;await this.presenter.login({email:i,password:n})})}showMessage(t){alert(t)}}class bt{constructor(t){this.view=t}async register({name:t,email:e,password:i}){try{const n=await R({name:t,email:e,password:i});if(n.error)throw new Error(n.message);const a=await N({email:e,password:i});$(a.loginResult.token),localStorage.setItem("userData",JSON.stringify({name:t,email:e})),this.view.showMessage("Registrasi berhasil! Anda telah login."),window.location.hash="#/"}catch(n){n.message==="Email is already taken"?this.view.showMessage("Email sudah terdaftar. Silakan login atau gunakan email lain."):n.message==="terjadi kesalahan pada server kami"?this.view.showMessage("Server sedang bermasalah. Silakan coba lagi nanti."):this.view.showMessage(`Registrasi gagal: ${n.message}`)}}}class ft{constructor(){this.presenter=new bt(this)}async init(){const t=r("div",{class:"auth-container"});t.innerHTML=`
      <h2>Register</h2>
      <form id="register-form">
        <div class="form-group">
          <label for="name">Nama</label>
          <input type="text" id="name" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required aria-required="true">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" required aria-required="true" minlength="8">
        </div>
        <button type="submit" aria-label="Daftar akun baru">Register</button>
      </form>
      <p>Sudah punya akun? <a href="#/login" aria-label="Masuk ke akun">Login di sini</a></p>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),document.getElementById("register-form").addEventListener("submit",async e=>{e.preventDefault();const i=document.getElementById("name").value.trim(),n=document.getElementById("email").value.trim(),a=document.getElementById("password").value;if(!i||!n||!a){this.showMessage("Semua kolom harus diisi!");return}await this.presenter.register({name:i,email:n,password:a})})}showMessage(t){alert(t)}}class wt{constructor(){this.isSubscribed=!1,this.subscription=null}async init(){const t=l();if(!t){this.showMessage("Please login first!"),window.location.hash="#/login";return}const e=r("div",{class:"subscribe-container"});e.innerHTML=`
      <div class="subscribe-header">
        <h2>Push Notifications</h2>
        <p>Stay updated with the latest stories from our community</p>
      </div>
      
      <div class="notification-info">
        <div class="info-card">
          <div class="info-icon">🔔</div>
          <div class="info-content">
            <h3>Why Enable Notifications?</h3>
            <ul>
              <li>Get notified when new stories are shared</li>
              <li>Never miss interesting content from the community</li>
              <li>Receive updates even when the app is closed</li>
              <li>Stay connected with your favorite storytellers</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="subscription-status-card">
        <div class="status-header">
          <h3>Notification Status</h3>
          <div id="status-indicator" class="status-indicator">
            <span class="status-dot"></span>
            <span id="status-text">Checking...</span>
          </div>
        </div>
        
        <div class="status-details">
          <div class="detail-item">
            <span class="detail-label">Browser Support:</span>
            <span id="browser-support" class="detail-value">Checking...</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Permission Status:</span>
            <span id="permission-status" class="detail-value">Checking...</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Subscription Status:</span>
            <span id="subscription-status" class="detail-value">Checking...</span>
          </div>
        </div>
      </div>

      <div class="subscription-actions">
        <button id="subscribe-btn" class="btn btn-primary" style="display: none;">
          <span class="btn-icon">🔔</span>
          Enable Notifications
        </button>
        <button id="unsubscribe-btn" class="btn btn-danger" style="display: none;">
          <span class="btn-icon">🔕</span>
          Disable Notifications
        </button>
        <button id="test-notification-btn" class="btn btn-outline" style="display: none;">
          <span class="btn-icon">🧪</span>
          Test Notification
        </button>
      </div>

      <div class="help-section">
        <h3>Troubleshooting</h3>
        <div class="help-content">
          <details>
            <summary>Notifications not working?</summary>
            <div class="help-text">
              <p>If notifications aren't working, try these steps:</p>
              <ol>
                <li>Make sure notifications are enabled in your browser settings</li>
                <li>Check that the website has permission to send notifications</li>
                <li>Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Try refreshing the page and subscribing again</li>
              </ol>
            </div>
          </details>
          
          <details>
            <summary>How to manage notifications</summary>
            <div class="help-text">
              <p>You can control notifications in several ways:</p>
              <ul>
                <li>Use the buttons above to enable/disable notifications</li>
                <li>Manage notification settings in your browser</li>
                <li>Block notifications from specific websites in browser settings</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),await this.initializeSubscription(t)}async initializeSubscription(t){this.checkBrowserSupport(),await this.checkPermissionStatus(),await this.checkSubscriptionStatus(),this.setupEventListeners(t),this.updateUI()}checkBrowserSupport(){const t=document.getElementById("browser-support");"serviceWorker"in navigator&&"PushManager"in window?(t.textContent="✅ Supported",t.className="detail-value success"):(t.textContent="❌ Not Supported",t.className="detail-value error")}async checkPermissionStatus(){const t=document.getElementById("permission-status");if("Notification"in window)switch(Notification.permission){case"granted":t.textContent="✅ Granted",t.className="detail-value success";break;case"denied":t.textContent="❌ Denied",t.className="detail-value error";break;default:t.textContent="⏳ Not Requested",t.className="detail-value warning"}else t.textContent="❌ Not Available",t.className="detail-value error"}async checkSubscriptionStatus(){const t=document.getElementById("subscription-status");if("serviceWorker"in navigator&&"PushManager"in window)try{const e=await navigator.serviceWorker.ready;this.subscription=await e.pushManager.getSubscription(),this.subscription?(this.isSubscribed=!0,t.textContent="✅ Active",t.className="detail-value success"):(this.isSubscribed=!1,t.textContent="❌ Not Subscribed",t.className="detail-value error")}catch(e){console.error("Error checking subscription status:",e),t.textContent="❌ Error",t.className="detail-value error"}else t.textContent="❌ Not Available",t.className="detail-value error"}setupEventListeners(t){const e=document.getElementById("subscribe-btn"),i=document.getElementById("unsubscribe-btn"),n=document.getElementById("test-notification-btn");e.addEventListener("click",async()=>{await this.handleSubscribe(t)}),i.addEventListener("click",async()=>{await this.handleUnsubscribe()}),n.addEventListener("click",()=>{this.testNotification()})}async handleSubscribe(t){const e=document.getElementById("subscribe-btn"),i=e.innerHTML;e.innerHTML='<span class="spinner-small"></span> Subscribing...',e.disabled=!0;try{if(!await P()){this.showMessage("Notification permission is required to subscribe.");return}await x(t),this.isSubscribed=!0,await this.checkSubscriptionStatus(),this.updateUI(),this.showMessage("Successfully subscribed to notifications!")}catch(n){console.error("Subscription error:",n),this.showMessage(`Failed to subscribe: ${n.message}`)}finally{e.innerHTML=i,e.disabled=!1}}async handleUnsubscribe(){const t=document.getElementById("unsubscribe-btn"),e=t.innerHTML;t.innerHTML='<span class="spinner-small"></span> Unsubscribing...',t.disabled=!0;try{this.subscription&&(await this.subscription.unsubscribe(),this.isSubscribed=!1,this.subscription=null,await this.checkSubscriptionStatus(),this.updateUI(),this.showMessage("Successfully unsubscribed from notifications!"))}catch(i){console.error("Unsubscription error:",i),this.showMessage(`Failed to unsubscribe: ${i.message}`)}finally{t.innerHTML=e,t.disabled=!1}}testNotification(){Notification.permission==="granted"?new Notification("Test Notification",{body:"This is a test notification from StoryApp!",icon:"/icons/icon-192x192.png",badge:"/icons/icon-96x96.png"}):this.showMessage("Notifications are not enabled. Please enable them first.")}updateUI(){const t=document.getElementById("status-indicator"),e=document.getElementById("status-text"),i=document.getElementById("subscribe-btn"),n=document.getElementById("unsubscribe-btn"),a=document.getElementById("test-notification-btn"),o="serviceWorker"in navigator&&"PushManager"in window&&Notification.permission!=="denied";this.isSubscribed?(t.className="status-indicator active",e.textContent="Active",i.style.display="none",n.style.display="inline-flex",a.style.display="inline-flex"):o?(t.className="status-indicator inactive",e.textContent="Not Subscribed",i.style.display="inline-flex",n.style.display="none",a.style.display="none"):(t.className="status-indicator error",e.textContent="Not Available",i.style.display="none",n.style.display="none",a.style.display="none")}showMessage(t){const e=r("div",{class:"toast-notification"});e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.classList.add("show")},100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{document.body.removeChild(e)},300)},4e3)}}class St{constructor(){this.stories=[]}async init(){const t=r("div",{class:"home-container",role:"region","aria-label":"Cerita Favorit"});t.innerHTML=`
      <h2 id="favorites-title">Cerita Favorit</h2>
      <div 
        id="favorites-list" 
        role="feed" 
        aria-labelledby="favorites-title"
      ></div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),await this.loadFavorites()}async loadFavorites(){try{this.stories=await Q(),this.displayStories()}catch(t){this.showMessage(`Gagal memuat cerita favorit: ${t.message}`)}}displayStories(){const t=document.getElementById("favorites-list");if(this.stories.length===0){t.innerHTML=`
        <div class="empty-state">
          <p>Belum ada cerita favorit.</p>
          <a href="#/home" class="back-home">Kembali ke Beranda</a>
        </div>
      `;return}t.innerHTML="",this.stories.forEach(e=>{const i=r("div",{class:"story-item",role:"article"});i.innerHTML=`
        <h3>${e.name}</h3>
        <p>${e.description}</p>
        <img 
          src="${e.photoUrl}" 
          alt="Foto untuk cerita: ${e.description.substring(0,50)}..." 
          loading="lazy"
          class="story-image"
        >
        <p>Dibuat pada: ${new Date(e.createdAt).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}</p>
        ${e.lat&&e.lon?`<div 
                id="map-${e.id}" 
                class="story-map" 
                role="complementary" 
                aria-label="Lokasi cerita di peta"
              ></div>`:""}
        <div class="story-actions">
          <button 
            class="remove-favorite-btn" 
            data-story-id="${e.id}"
            aria-label="Hapus dari favorit"
          >
            Hapus dari Favorit
          </button>
        </div>
      `,t.appendChild(i),e.lat&&e.lon&&this.initMap(`map-${e.id}`,e.lat,e.lon,e.name)}),document.querySelectorAll(".remove-favorite-btn").forEach(e=>{e.addEventListener("click",async i=>{const n=i.target.dataset.storyId;await this.removeFavorite(n)})})}async removeFavorite(t){try{await X(t),await this.loadFavorites(),this.showMessage("Cerita berhasil dihapus dari favorit!")}catch(e){this.showMessage(`Gagal menghapus cerita: ${e.message}`)}}initMap(t,e,i,n){if(e&&i){const a=v(t,e,i,13);b(a,e,i,n)}}showMessage(t){alert(t)}}class Et{async init(){const t=r("div",{class:"about-container",role:"main"});t.innerHTML=`
      <div class="about-hero">
        <div class="container">
          <h1>About StoryApp</h1>
          <p class="hero-subtitle">Connecting people through shared experiences</p>
        </div>
      </div>

      <div class="about-content">
        <div class="container">
          <section class="about-section">
            <div class="section-content">
              <div class="text-content">
                <h2>Our Mission</h2>
                <p>StoryApp is designed to bring people together through the power of storytelling. We believe that every moment has a story worth sharing, and every story has the potential to inspire, connect, and create meaningful relationships within the Dicoding community.</p>
                <p>Built as part of the Dicoding Web Development course, this application demonstrates modern web technologies while providing a platform for authentic human connection.</p>
              </div>
              <div class="image-content">
                <div class="mission-icon">🌟</div>
              </div>
            </div>
          </section>

          <section class="features-showcase">
            <h2>What Makes Us Special</h2>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">📱</div>
                <h3>Progressive Web App</h3>
                <p>Install on any device for a native app experience with offline capabilities</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🗺️</div>
                <h3>Location Integration</h3>
                <p>Share where your stories happen with interactive maps powered by OpenStreetMap</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📸</div>
                <h3>Camera Integration</h3>
                <p>Capture moments directly from your device's camera</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🔔</div>
                <h3>Push Notifications</h3>
                <p>Stay updated with new stories from the community</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">♿</div>
                <h3>Accessibility First</h3>
                <p>Built with WCAG standards for inclusive user experience</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <h3>Fast & Responsive</h3>
                <p>Optimized performance with smooth transitions and modern design</p>
              </div>
            </div>
          </section>

          <section class="tech-stack">
            <h2>Technology Stack</h2>
            <div class="tech-grid">
              <div class="tech-item">
                <h4>Frontend</h4>
                <ul>
                  <li>Vanilla JavaScript (ES6+)</li>
                  <li>HTML5 & CSS3</li>
                  <li>Progressive Web App</li>
                  <li>Service Workers</li>
                </ul>
              </div>
              <div class="tech-item">
                <h4>Architecture</h4>
                <ul>
                  <li>Single Page Application (SPA)</li>
                  <li>MVP Pattern</li>
                  <li>Hash-based Routing</li>
                  <li>Modular Design</li>
                </ul>
              </div>
              <div class="tech-item">
                <h4>APIs & Libraries</h4>
                <ul>
                  <li>Dicoding Story API</li>
                  <li>Leaflet.js for Maps</li>
                  <li>IndexedDB for Storage</li>
                  <li>Web Push API</li>
                </ul>
              </div>
              <div class="tech-item">
                <h4>Features</h4>
                <ul>
                  <li>Camera Access</li>
                  <li>Geolocation</li>
                  <li>Offline Support</li>
                  <li>Push Notifications</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="team-section">
            <h2>Development Team</h2>
            <div class="team-info">
              <div class="team-member">
                <div class="member-avatar">👨‍💻</div>
                <h3>Dicoding Student</h3>
                <p>Full Stack Developer</p>
                <p>Passionate about creating meaningful web applications that connect people and communities.</p>
              </div>
            </div>
          </section>

          <section class="contact-section">
            <h2>Get In Touch</h2>
            <div class="contact-info">
              <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>
              <div class="contact-methods">
                <div class="contact-item">
                  <span class="contact-icon">🌐</span>
                  <span>Visit Dicoding.com</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">💬</span>
                  <span>Join our Community</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <span>Share your feedback</span>
                </div>
              </div>
            </div>
          </section>

          <section class="acknowledgments">
            <h2>Acknowledgments</h2>
            <p>Special thanks to:</p>
            <ul>
              <li><strong>Dicoding Indonesia</strong> - For providing excellent web development education</li>
              <li><strong>OpenStreetMap</strong> - For free and open map data</li>
              <li><strong>Leaflet.js</strong> - For beautiful interactive maps</li>
              <li><strong>The Web Community</strong> - For continuous innovation and open source contributions</li>
            </ul>
          </section>
        </div>
      </div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t)}}class H{init(){const t=r("div",{class:"not-found-container"});t.innerHTML=`
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <a href="#/home" class="back-home">Kembali ke Beranda</a>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t)}}function S(s){const t=document.getElementById("content");t.style.opacity="0",setTimeout(()=>{s(),t.style.opacity="1"},300)}const M={"#/":et,"#/home":Z,"#/stories":it,"#/add-story":ht,"#/detail/:id":gt,"#/login":vt,"#/register":ft,"#/subscribe":wt,"#/favorites":St,"#/about":Et,"#/404":H};function kt(){y(),window.addEventListener("hashchange",()=>{y(),I()}),window.addEventListener("load",()=>{y(),I()}),document.getElementById("logout-link").addEventListener("click",s=>{s.preventDefault(),tt(),y(),window.location.hash="#/login"})}function y(){const s=l(),t=document.getElementById("login-link"),e=document.getElementById("logout-link"),i=document.getElementById("subscribe-link"),n=document.getElementById("favorites-link"),a=document.getElementById("user-welcome");if(s){if(t.style.display="none",e.style.display="inline",i&&(i.style.display="inline"),n&&(n.style.display="inline"),a){const o=Lt();a.textContent=`Hi, ${o.name||"User"}`,a.style.display="inline"}}else t.style.display="inline",e.style.display="none",i&&(i.style.display="none"),n&&(n.style.display="none"),a&&(a.style.display="none")}function Lt(){try{const s=localStorage.getItem("userData");return s?JSON.parse(s):{name:"User"}}catch{return{name:"User"}}}function I(){const s=window.location.hash||"#/",t=Object.keys(M).find(e=>new RegExp(`^${e.replace(":id","([^/]+)")}$`).test(s));if(t){const e=M[t],i=new e;if(t==="#/detail/:id"){const n=s.match(new RegExp(`^${t.replace(":id","([^/]+)")}$`)),a=n?n[1]:null;S(()=>i.init({id:a}))}else S(()=>i.init())}else{const e=new H;window.location.hash="#/404",S(()=>e.init())}}async function Bt(){if(await f(),kt(),Mt(),await It(),"serviceWorker"in navigator){const s=new U("/sw.js");s.addEventListener("installed",t=>{t.isUpdate&&T(s)}),s.addEventListener("waiting",t=>{T(s)}),s.addEventListener("controlling",t=>{window.location.reload()}),s.register()}}function Mt(){let s;const t=document.getElementById("install-app-btn");window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),s=e,t&&(t.style.display="flex")}),t&&t.addEventListener("click",async()=>{s&&(s.prompt(),(await s.userChoice).outcome==="accepted"&&(t.style.display="none"),s=null)}),window.matchMedia("(display-mode: standalone)").matches&&t&&(t.style.display="none")}async function It(){try{await rt(),Tt(),console.log("Notification system setup completed")}catch(s){console.error("Error setting up notification system:",s)}}function Tt(){const s=document.querySelector("header nav ul");if(!s)return;const t=document.createElement("li");t.id="notification-container",t.style.display="none";const e=document.createElement("button");e.id="notification-btn",e.className="notification-btn",e.innerHTML='<span class="btn-icon">🔔</span><span class="btn-text">Notifications</span>',t.appendChild(e);const i=document.getElementById("install-app-btn");i&&i.parentElement?s.insertBefore(t,i.parentElement):s.appendChild(t),e.addEventListener("click",Nt),w()}async function Nt(){const s=l();if(!s){h("Please login first to enable notifications","warning"),window.location.hash="#/login";return}const t=document.getElementById("notification-btn"),e=t.innerHTML;try{t.innerHTML='<span class="spinner-small"></span> Processing...',t.disabled=!0,(await A()).isSubscribed?(await at(s),h("Notifications disabled successfully","success")):(await x(s),h("Notifications enabled successfully","success")),await w()}catch(i){console.error("Error toggling notifications:",i),h(`Error: ${i.message}`,"error")}finally{t.innerHTML=e,t.disabled=!1}}async function w(){const s=document.getElementById("notification-container"),t=document.getElementById("notification-btn");if(!(!s||!t))try{const e=await A();l()&&e.isSupported?(s.style.display="block",e.isSubscribed?(t.innerHTML='<span class="btn-icon">🔕</span><span class="btn-text">Disable</span>',t.className="notification-btn subscribed",t.title="Click to disable notifications"):e.canSubscribe?(t.innerHTML='<span class="btn-icon">🔔</span><span class="btn-text">Enable</span>',t.className="notification-btn unsubscribed",t.title="Click to enable notifications"):(t.innerHTML='<span class="btn-icon">🚫</span><span class="btn-text">Blocked</span>',t.className="notification-btn blocked",t.title="Notifications are blocked. Please enable in browser settings.",t.disabled=!0)):s.style.display="none"}catch(e){console.error("Error updating notification UI:",e),s.style.display="none"}}function T(s){const t=document.createElement("div");t.className="update-banner",t.innerHTML=`
    <div class="update-content">
      <span>🔄 App update available!</span>
      <button id="update-btn" class="btn btn-primary">Update Now</button>
      <button id="dismiss-update" class="btn btn-outline">Later</button>
    </div>
  `,document.body.appendChild(t),document.getElementById("update-btn").addEventListener("click",()=>{s.messageSkipWaiting(),t.remove()}),document.getElementById("dismiss-update").addEventListener("click",()=>{t.remove()})}function h(s,t="success"){const e=document.createElement("div");e.className=`toast-notification ${t}`,e.textContent=s,document.body.appendChild(e),setTimeout(()=>{e.classList.add("show")},100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},300)},3e3)}window.addEventListener("hashchange",()=>{setTimeout(w,100)});window.addEventListener("storage",s=>{s.key==="token"&&setTimeout(w,100)});window.addEventListener("online",()=>{h("Connection restored","success")});window.addEventListener("offline",()=>{h("You are offline. Some features may be limited.","warning")});Bt();
//# sourceMappingURL=index-nHygThLZ.js.map
