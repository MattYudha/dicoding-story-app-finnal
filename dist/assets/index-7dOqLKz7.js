import{L,o as R}from"./vendor-B4umW4ZV.js";import{l as U}from"./workbox-pECmu2PR.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const u="https://story-api.dicoding.dev/v1",q="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";async function p(n){const e=await n.json();if(!n.ok){const t=e.message||`Server error: ${n.status}`;throw new Error(t)}return e}async function z({name:n,email:e,password:t}){try{if(!n||typeof n!="string"||n.trim().length===0)throw new Error("Nama tidak boleh kosong");if(!e||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))throw new Error("Email tidak valid");if(!t||t.length<8)throw new Error("Password harus minimal 8 karakter");console.log("Mengirim data registrasi:",{name:n,email:e,password:t});const i=await fetch(`${u}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,email:e,password:t})}),s=await p(i);return console.log("Respons dari server (register):",s),s}catch(i){throw console.error("Error registering:",i.message),new Error(i.message)}}async function P({email:n,password:e}){try{if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))throw new Error("Email tidak valid");if(!e||e.length<8)throw new Error("Password harus minimal 8 karakter");console.log("Mengirim data login:",{email:n,password:e});const t=await fetch(`${u}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:e})}),i=await p(t);return console.log("Respons dari server (login):",i),i}catch(t){throw console.error("Error logging in:",t.message),new Error(t.message)}}async function W({description:n,photo:e,lat:t,lon:i,token:s}){try{if(!n||n.trim().length===0)throw new Error("Deskripsi tidak boleh kosong");if(!e)throw new Error("Foto wajib diunggah");if(!s)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const o=new FormData;o.append("description",n),o.append("photo",e),t&&i&&(o.append("lat",t),o.append("lon",i)),console.log("Mengirim data cerita:",{description:n,lat:t,lon:i,token:s});const a=await fetch(`${u}/stories`,{method:"POST",headers:{Authorization:`Bearer ${s}`},body:o}),l=await p(a);return console.log("Respons dari server (addStory):",l),l}catch(o){throw console.error("Error adding story:",o.message),new Error(o.message)}}async function V({description:n,photo:e,lat:t,lon:i}){try{if(!n||n.trim().length===0)throw new Error("Deskripsi tidak boleh kosong");if(!e)throw new Error("Foto wajib diunggah");const s=new FormData;s.append("description",n),s.append("photo",e),t&&i&&(s.append("lat",t),s.append("lon",i)),console.log("Mengirim data cerita guest:",{description:n,lat:t,lon:i});const o=await fetch(`${u}/stories/guest`,{method:"POST",body:s}),a=await p(o);return console.log("Respons dari server (addGuestStory):",a),a}catch(s){throw console.error("Error adding guest story:",s.message),new Error(s.message)}}async function j({token:n,page:e=1,size:t=10,location:i=0}){try{if(!n)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const s=new URLSearchParams({page:e,size:t,location:i});console.log("Mengambil daftar cerita dengan params:",s.toString());const o=await fetch(`${u}/stories?${s}`,{headers:{Authorization:`Bearer ${n}`}}),a=await p(o);return console.log("Respons dari server (getStories):",a),a}catch(s){throw console.error("Error getting stories:",s.message),new Error(s.message)}}async function G(n,e){try{if(!n)throw new Error("ID cerita tidak boleh kosong");if(!e)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");console.log("Mengambil detail cerita dengan ID:",n);const t=await fetch(`${u}/stories/${n}`,{headers:{Authorization:`Bearer ${e}`}}),i=await p(t);return console.log("Respons dari server (getStoryDetail):",i),i}catch(t){throw console.error("Error getting story detail:",t.message),new Error(t.message)}}async function J(n,e){try{if(!n)throw new Error("Data subscription tidak boleh kosong");if(!e)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const t={endpoint:n.endpoint,keys:{p256dh:n.keys.p256dh,auth:n.keys.auth}};console.log("Mengirim data subscription ke server:",t);const i=await fetch(`${u}/notifications/subscribe`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)}),s=await p(i);return console.log("Respons dari server (subscribeNotifications):",s),s}catch(t){throw console.error("Error subscribing to notifications:",t.message),new Error(t.message)}}async function K(n,e){try{if(!n)throw new Error("Endpoint tidak boleh kosong");if(!e)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");console.log("Menghapus subscription dengan endpoint:",n);const t=await fetch(`${u}/notifications/subscribe`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({endpoint:n})}),i=await p(t);return console.log("Respons dari server (unsubscribeFromNotifications):",i),i}catch(t){throw console.error("Error unsubscribing from notifications:",t.message),new Error(t.message)}}async function Y(n,e){try{if(!e)throw new Error("Token tidak ditemukan, silakan login terlebih dahulu");const t={title:"New Story Added!",body:`${n.name} just shared a new story: ${n.description.substring(0,50)}...`,data:{storyId:n.id,url:`/#/detail/${n.id}`}};console.log("Triggering story notification:",t);const i=await fetch(`${u}/notifications/trigger`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)});if(i.ok){const s=await i.json();return console.log("Notification triggered successfully:",s),s}else return console.warn("Notification trigger endpoint not available"),null}catch(t){return console.error("Error triggering story notification:",t.message),null}}class M{async getStories({token:e,page:t=1,size:i=10,location:s=1}){const o=await j({token:e,page:t,size:i,location:s});if(o.error)throw new Error(o.message);return o.listStory}async getStoryDetail(e,t){const i=await G(e,t);if(i.error)throw new Error(i.message);return i.story}async addStory({description:e,photo:t,lat:i,lon:s,token:o}){const a=await W({description:e,photo:t,lat:i,lon:s,token:o});if(a.error)throw new Error(a.message);return a}async addGuestStory({description:e,photo:t,lat:i,lon:s}){const o=await V({description:e,photo:t,lat:i,lon:s});if(o.error)throw new Error(o.message);return o}}function b(n,e=-6.2,t=106.8,i=13){const s=L.map(n).setView([e,t],i);return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(s),s}function w(n,e,t,i){const s=L.marker([e,t]).addTo(n);return i&&s.bindPopup(i).openPopup(),s}function Q(n,e){n.on("click",t=>{const{lat:i,lng:s}=t.latlng;e(i,s)})}class ${constructor(e){this.view=e,this.model=new M}async loadStories(){try{const e=localStorage.getItem("token");if(!e){this.view.showMessage("Silakan login terlebih dahulu!",()=>{window.location.hash="#/login"});return}const t=await this.getStories(e);if(t.error)throw new Error(t.message);this.view.displayStories(t)}catch(e){this.view.showMessage(`Gagal memuat cerita: ${e.message}`,()=>{this.loadStories()})}}async getStories(e){return await this.model.getStories({token:e,page:1,size:10,location:1})}initMap(e,t,i,s){if(t&&i){const o=b(e,t,i,13);w(o,t,i,s)}}}function c(n,e={}){const t=document.createElement(n);return Object.entries(e).forEach(([i,s])=>{t.setAttribute(i,s)}),t}const X="story-app-db",Z=1,g="stories";async function E(){return await R(X,Z,{upgrade(e){e.objectStoreNames.contains(g)||e.createObjectStore(g,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function I(n){const t=(await E()).transaction(g,"readwrite");await Promise.all([...n.map(i=>t.store.put(i)),t.done])}async function ee(){return(await E()).getAllFromIndex(g,"createdAt")}async function te(n){await(await E()).delete(g,n)}class ie{constructor(){this.presenter=new $(this)}async init(){const e=c("div",{class:"home-container",role:"region","aria-label":"Daftar cerita"});e.innerHTML=`
      <h2 id="story-list-title">Daftar Cerita</h2>
      <div 
        id="story-list" 
        role="feed" 
        aria-labelledby="story-list-title"
        class="stories-container"
      ></div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),await this.presenter.loadStories()}displayStories(e){const t=document.getElementById("story-list");t.innerHTML="",e.forEach(i=>{const s=c("div",{class:"story-item",role:"article"});s.innerHTML=`
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
      `,t.appendChild(s),i.lat&&i.lon&&this.presenter.initMap(`map-${i.id}`,i.lat,i.lon,i.name)}),document.querySelectorAll(".save-favorite-btn").forEach(i=>{i.addEventListener("click",async s=>{const o=JSON.parse(s.target.dataset.story.replace(/&apos;/g,"'"));await this.saveFavorite(o)})})}async saveFavorite(e){try{await I([e]),this.showMessage("Cerita berhasil disimpan ke favorit!")}catch(t){this.showMessage(`Gagal menyimpan cerita: ${t.message}`)}}showMessage(e,t){const i=document.getElementById("story-list");t?(i.innerHTML=`
        <div role="alert">
          <p>${e}</p>
          <button id="retry-btn" class="retry-button">Coba Lagi</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",t)):alert(e)}}function A(n){localStorage.setItem("token",n)}function d(){return localStorage.getItem("token")}function se(){localStorage.removeItem("token")}class ne{constructor(){this.installPrompt=null}async init(){const e=d(),t=c("div",{class:"landing-container",role:"main"});t.innerHTML=`
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

      ${e?`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),this.setupInstallPrompt(),e&&await this.loadFeaturedStories()}setupInstallPrompt(){const e=document.getElementById("install-btn"),t=document.getElementById("not-now-btn"),i=document.querySelector(".install-section");window.addEventListener("beforeinstallprompt",s=>{s.preventDefault(),this.installPrompt=s,i.style.display="block"}),e.addEventListener("click",async()=>{this.installPrompt?(this.installPrompt.prompt(),(await this.installPrompt.userChoice).outcome==="accepted"&&(i.style.display="none"),this.installPrompt=null):this.showMessage("To install this app, use your browser's 'Add to Home Screen' option in the menu.")}),t.addEventListener("click",()=>{i.style.display="none"}),window.matchMedia("(display-mode: standalone)").matches&&(i.style.display="none")}async loadFeaturedStories(){try{const e=d();if(!e)return;const i=await(await fetch("https://story-api.dicoding.dev/v1/stories?page=1&size=3&location=1",{headers:{Authorization:`Bearer ${e}`}})).json();i.listStory&&i.listStory.length>0&&this.displayFeaturedStories(i.listStory)}catch(e){console.error("Error loading featured stories:",e)}}displayFeaturedStories(e){const t=document.getElementById("featured-stories");t&&(t.innerHTML=e.map(i=>`
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
    `).join(""))}showMessage(e){alert(e)}}class oe{constructor(){this.presenter=new $(this)}async init(){const e=c("div",{class:"stories-page-container",role:"region","aria-label":"Daftar semua cerita"});e.innerHTML=`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),this.setupEventListeners(),await this.presenter.loadStories()}setupEventListeners(){const e=document.getElementById("refresh-btn"),t=document.getElementById("sort-select");e.addEventListener("click",()=>{this.presenter.loadStories()}),t.addEventListener("change",i=>{this.sortStories(i.target.value)})}displayStories(e){const t=document.getElementById("stories-list");if(t.innerHTML="",e.length===0){t.innerHTML=`
        <div class="empty-state">
          <div class="empty-icon">📖</div>
          <h3>No Stories Yet</h3>
          <p>Be the first to share your story!</p>
          <a href="#/add-story" class="btn btn-primary">Create Story</a>
        </div>
      `;return}e.forEach(i=>{const s=c("div",{class:"story-item",role:"article"});s.innerHTML=`
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
      `,t.appendChild(s),i.lat&&i.lon&&this.presenter.initMap(`map-${i.id}`,i.lat,i.lon,i.name)}),document.querySelectorAll(".favorite-btn").forEach(i=>{i.addEventListener("click",async s=>{const o=JSON.parse(s.target.closest(".favorite-btn").dataset.story.replace(/&apos;/g,"'"));await this.saveFavorite(o)})})}async saveFavorite(e){try{await I([e]),this.showMessage("Cerita berhasil disimpan ke favorit!")}catch(t){this.showMessage(`Gagal menyimpan cerita: ${t.message}`)}}sortStories(e){const t=document.getElementById("stories-list"),i=Array.from(t.querySelectorAll(".story-item"));i.sort((s,o)=>{const a=new Date(s.querySelector(".story-date").textContent),l=new Date(o.querySelector(".story-date").textContent);return e==="newest"?l-a:a-l}),t.innerHTML="",i.forEach(s=>t.appendChild(s))}showMessage(e,t){if(t){const i=document.getElementById("stories-list");i.innerHTML=`
        <div class="error-state" role="alert">
          <div class="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>${e}</p>
          <button id="retry-btn" class="btn btn-primary">Try Again</button>
        </div>
      `,document.getElementById("retry-btn").addEventListener("click",t)}else alert(e)}}function ae(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),i=window.atob(t),s=new Uint8Array(i.length);for(let o=0;o<i.length;++o)s[o]=i.charCodeAt(o);return s}async function x(){if(!("Notification"in window))return console.warn("This browser does not support notifications"),!1;if(Notification.permission==="granted")return!0;if(Notification.permission==="denied")return console.warn("Notification permission denied"),!1;try{return await Notification.requestPermission()==="granted"}catch(n){return console.error("Error requesting notification permission:",n),!1}}function y(){return"serviceWorker"in navigator&&"PushManager"in window}async function D(){if(!y())return null;try{return await(await navigator.serviceWorker.ready).pushManager.getSubscription()}catch(n){return console.error("Error getting push subscription:",n),null}}async function re(){return await D()!==null}async function F(n){if(!y())throw new Error("Push notifications are not supported in this browser");if(!await x())throw new Error("Notification permission not granted");try{const t=await navigator.serviceWorker.ready;let i=await t.pushManager.getSubscription();i||(i=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:ae(q)}));try{return await J(i,n),console.log("Successfully subscribed to push notifications"),i}catch(s){throw console.error("Server subscription failed, rolling back:",s),await i.unsubscribe(),new Error(`Failed to register subscription with server: ${s.message}`)}}catch(t){throw console.error("Error subscribing to push notifications:",t),t}}async function ce(n){if(!y())throw new Error("Push notifications are not supported in this browser");try{const e=await D();if(!e)return console.log("No active subscription found"),!0;try{await K(e.endpoint,n)}catch(i){console.warn("Server unsubscription failed:",i)}const t=await e.unsubscribe();return console.log("Successfully unsubscribed from push notifications"),t}catch(e){throw console.error("Error unsubscribing from push notifications:",e),e}}async function le(n,e,t={}){if(!("Notification"in window)){console.warn("This browser does not support notifications");return}if(Notification.permission!=="granted"){console.warn("Notification permission not granted");return}try{"serviceWorker"in navigator?await(await navigator.serviceWorker.ready).showNotification(n,{body:e,icon:"/icons/icon-192x192.png",badge:"/icons/icon-96x96.png",tag:"story-notification",data:t,requireInteraction:!1,vibrate:[200,100,200],actions:[{action:"view",title:"View Stories"}]}):new Notification(n,{body:e,icon:"/icons/icon-192x192.png",tag:"story-notification"})}catch(i){console.error("Error showing notification:",i)}}async function H(){const n=y(),e="Notification"in window?Notification.permission:"unsupported",t=await re();return{isSupported:n,permission:e,isSubscribed:t,canSubscribe:n&&e!=="denied"}}async function de(){if(!y())return console.warn("Push notifications not supported"),!1;try{return navigator.serviceWorker.controller||await navigator.serviceWorker.register("/sw.js"),await navigator.serviceWorker.ready,console.log("Notification system initialized"),!0}catch(n){return console.error("Error initializing notifications:",n),!1}}class ue{constructor(e){this.view=e,this.model=new M,this.coordinates={},this.currentMarker=null,this.map=null}initMap(e){return this.map=b(e),Q(this.map,(t,i)=>{this.setCoordinates(t,i),this.view.updateLocationDisplay(t,i)}),this.map}setCoordinates(e,t){this.coordinates={lat:e,lon:t},this.currentMarker&&this.map.removeLayer(this.currentMarker),this.currentMarker=w(this.map,e,t,"Selected location"),console.log("Coordinates selected:",e,t)}updateMapLocation(e,t){this.map&&(this.map.setView([e,t],15),this.setCoordinates(e,t))}getCoordinates(){return this.coordinates}async addStory(e,t,i,s,o){var a;try{const l=await this.model.addStory({description:e,photo:t,lat:i||this.coordinates.lat,lon:s||this.coordinates.lon,token:o});await le("Story Shared Successfully!",`Your story "${e.substring(0,50)}..." has been shared with the community.`,{url:"/#/stories",action:"story_shared"});try{const h={id:((a=l.story)==null?void 0:a.id)||Date.now().toString(),name:"You",description:e};await Y(h,o)}catch(h){console.warn("Could not trigger push notification:",h.message)}this.view.showMessage("Story shared successfully!"),this.view.stopCamera(),setTimeout(()=>{window.location.hash="#/stories"},1e3)}catch(l){this.view.showMessage(`Failed to share story: ${l.message}`)}}}async function pe(n){try{const e=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});return n.srcObject=e,e}catch(e){if(e.name==="NotFoundError"||e.name==="DevicesNotFoundError")try{console.warn("Environment camera not found, trying fallback to any available camera");const t=await navigator.mediaDevices.getUserMedia({video:!0});return n.srcObject=t,t}catch(t){throw console.error("Fallback camera access also failed:",t),t}throw console.error("Error accessing camera:",e),e}}function he(n,e){const t=e.getContext("2d");return e.width=n.videoWidth,e.height=n.videoHeight,t.drawImage(n,0,0,e.width,e.height),e.toDataURL("image/jpeg")}function me(n){n&&n.getTracks().forEach(e=>e.stop())}function ge(n,e){const t=n.split(","),i=t[0].match(/:(.*?);/)[1],s=atob(t[1]);let o=s.length;const a=new Uint8Array(o);for(;o--;)a[o]=s.charCodeAt(o);return new File([a],e,{type:i})}class ye{constructor(){this.presenter=new ue(this),this.stream=null,this.photo=null,this.userLocation=null}async init(){if(!d()){this.showMessage("Silakan login terlebih dahulu!"),window.location.hash="#/login";return}const t=c("div",{class:"add-story-container"});t.innerHTML=`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),await this.initializeForm()}async initializeForm(){const e=document.getElementById("camera");try{this.stream=await pe(e)}catch(t){this.showMessage(`Failed to access camera: ${t.message}. Please ensure camera is available and allow camera access in browser settings.`);return}this.presenter.initMap("map"),this.setupEventListeners()}setupEventListeners(){const e=document.getElementById("description"),t=document.getElementById("char-count"),i=document.getElementById("capture"),s=document.getElementById("retake"),o=document.getElementById("use-my-location"),a=document.getElementById("cancel-btn"),l=document.getElementById("add-story-form");e.addEventListener("input",h=>{const B=h.target.value.length;t.textContent=B,t.style.color=B>500?"#ef476f":"#6c757d"}),i.addEventListener("click",()=>{this.capturePhoto()}),s.addEventListener("click",()=>{this.retakePhoto()}),o.addEventListener("click",()=>{this.getCurrentLocation()}),a.addEventListener("click",()=>{confirm("Are you sure you want to cancel? Your story will be lost.")&&(this.stopCamera(),window.location.hash="#/stories")}),l.addEventListener("submit",async h=>{h.preventDefault(),await this.submitStory()})}capturePhoto(){const e=document.getElementById("camera"),t=document.getElementById("canvas"),i=document.getElementById("preview"),s=document.getElementById("capture"),o=document.getElementById("retake"),a=he(e,t);this.photo=ge(a,"story.jpg"),i.src=a,i.style.display="block",e.style.display="none",s.style.display="none",o.style.display="inline-flex"}retakePhoto(){const e=document.getElementById("camera"),t=document.getElementById("preview"),i=document.getElementById("capture"),s=document.getElementById("retake");this.photo=null,t.style.display="none",e.style.display="block",i.style.display="inline-flex",s.style.display="none"}async getCurrentLocation(){const e=document.getElementById("use-my-location"),t=e.innerHTML;e.innerHTML='<span class="spinner-small"></span> Getting location...',e.disabled=!0;try{const i=await new Promise((a,l)=>{navigator.geolocation.getCurrentPosition(a,l,{enableHighAccuracy:!0,timeout:1e4,maximumAge:6e4})}),{latitude:s,longitude:o}=i.coords;this.updateLocationDisplay(s,o),this.presenter.setCoordinates(s,o),this.presenter.updateMapLocation(s,o)}catch(i){this.showMessage(`Failed to get location: ${i.message}`)}finally{e.innerHTML=t,e.disabled=!1}}updateLocationDisplay(e,t){const i=document.getElementById("location-info"),s=document.getElementById("latitude"),o=document.getElementById("longitude");i.innerHTML=`
      <span class="location-icon">📍</span>
      <span class="location-text">Location: ${e.toFixed(6)}, ${t.toFixed(6)}</span>
    `,i.classList.add("location-selected"),s.value=e.toFixed(6),o.value=t.toFixed(6)}async submitStory(){const e=document.getElementById("description").value.trim(),t=d();if(!e){this.showMessage("Please enter a story description!");return}if(e.length>500){this.showMessage("Story description must be 500 characters or less!");return}if(!this.photo){this.showMessage("Please capture a photo first!");return}const{lat:i,lon:s}=this.presenter.getCoordinates(),o=document.querySelector('button[type="submit"]'),a=o.innerHTML;o.innerHTML='<span class="spinner-small"></span> Sharing...',o.disabled=!0;try{await this.presenter.addStory(e,this.photo,i,s,t)}catch{o.innerHTML=a,o.disabled=!1}}stopCamera(){me(this.stream)}showMessage(e){alert(e)}}class ve{constructor(e){this.view=e,this.model=new M}async getStoryDetail(e,t){try{return await this.model.getStoryDetail(e,t)}catch(i){throw new Error(`Gagal mengambil detail cerita: ${i.message}`)}}initMap(e,t,i,s){if(t&&i){const o=b(e,t,i,13);w(o,t,i,s)}}}class fe{constructor(){this.presenter=new ve(this)}async init({id:e}){const t=d();if(!t){window.location.hash="#/login";return}const i=c("div",{class:"detail-container"});i.innerHTML=`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(i),this.setupEventListeners();try{const s=await this.presenter.getStoryDetail(e,t);this.displayStory(s)}catch(s){this.showError(s.message)}}setupEventListeners(){const e=document.getElementById("back-btn"),t=document.getElementById("save-favorite"),i=document.getElementById("share-story");e.addEventListener("click",()=>{window.history.back()}),t.addEventListener("click",()=>{this.currentStory&&this.saveFavorite(this.currentStory)}),i.addEventListener("click",()=>{this.currentStory&&this.shareStory(this.currentStory)})}displayStory(e){this.currentStory=e;const t=document.getElementById("story-detail");t.innerHTML=`
      <article class="story-article">
        <header class="story-header">
          <div class="author-section">
            <div class="author-avatar">
              ${e.name.charAt(0).toUpperCase()}
            </div>
            <div class="author-info">
              <h1 class="story-author">${e.name}</h1>
              <time class="story-date" datetime="${e.createdAt}">
                ${new Date(e.createdAt).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}
              </time>
            </div>
          </div>
        </header>

        <div class="story-content">
          <div class="story-image-container">
            <img 
              src="${e.photoUrl}" 
              alt="Story photo by ${e.name}" 
              class="story-image"
              loading="lazy"
            >
          </div>
          
          <div class="story-text">
            <p class="story-description">${e.description}</p>
          </div>

          ${e.lat&&e.lon?`
            <div class="story-location-section">
              <h3 class="location-title">
                <span class="location-icon">📍</span>
                Story Location
              </h3>
              <div class="location-coordinates">
                <span class="coordinate">
                  <strong>Latitude:</strong> ${e.lat.toFixed(6)}
                </span>
                <span class="coordinate">
                  <strong>Longitude:</strong> ${e.lon.toFixed(6)}
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
    `,e.lat&&e.lon&&setTimeout(()=>{this.presenter.initMap("map-detail",e.lat,e.lon,e.name)},100)}async saveFavorite(e){try{await I([e]),this.showMessage("Story saved to favorites!");const t=document.getElementById("save-favorite");t.innerHTML='<span class="btn-icon">✅</span> Saved',t.disabled=!0,setTimeout(()=>{t.innerHTML='<span class="btn-icon">❤️</span> Save to Favorites',t.disabled=!1},2e3)}catch(t){this.showMessage(`Failed to save story: ${t.message}`)}}shareStory(e){if(navigator.share)navigator.share({title:`Story by ${e.name}`,text:e.description,url:window.location.href}).catch(t=>console.log("Error sharing:",t));else{const t=window.location.href;navigator.clipboard.writeText(t).then(()=>{this.showMessage("Story link copied to clipboard!")}).catch(()=>{this.showMessage("Unable to share story. Please copy the URL manually.")})}}showError(e){const t=document.getElementById("story-detail");t.innerHTML=`
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Unable to Load Story</h3>
        <p>${e}</p>
        <button id="retry-btn" class="btn btn-primary">Try Again</button>
        <a href="#/stories" class="btn btn-outline">Back to Stories</a>
      </div>
    `,document.getElementById("retry-btn").addEventListener("click",()=>{window.location.reload()})}showMessage(e){const t=c("div",{class:"toast-notification"});t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}}class be{constructor(e){this.view=e}async login({email:e,password:t}){try{const i=await P({email:e,password:t});if(i.error)throw new Error(i.message);A(i.loginResult.token),localStorage.setItem("userData",JSON.stringify({name:i.loginResult.name||e.split("@")[0],email:e})),this.view.showMessage("Login berhasil!"),window.location.hash="#/"}catch(i){i.message==="User not found"?this.view.showMessage("Pengguna tidak ditemukan. Silakan registrasi terlebih dahulu."):this.view.showMessage(`Login gagal: ${i.message}`)}}}class we{constructor(){this.presenter=new be(this)}async init(){const e=c("div",{class:"auth-container"});e.innerHTML=`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),document.getElementById("login-form").addEventListener("submit",async t=>{t.preventDefault();const i=document.getElementById("email").value,s=document.getElementById("password").value;await this.presenter.login({email:i,password:s})})}showMessage(e){alert(e)}}class Ee{constructor(e){this.view=e}async register({name:e,email:t,password:i}){try{const s=await z({name:e,email:t,password:i});if(s.error)throw new Error(s.message);const o=await P({email:t,password:i});A(o.loginResult.token),localStorage.setItem("userData",JSON.stringify({name:e,email:t})),this.view.showMessage("Registrasi berhasil! Anda telah login."),window.location.hash="#/"}catch(s){s.message==="Email is already taken"?this.view.showMessage("Email sudah terdaftar. Silakan login atau gunakan email lain."):s.message==="terjadi kesalahan pada server kami"?this.view.showMessage("Server sedang bermasalah. Silakan coba lagi nanti."):this.view.showMessage(`Registrasi gagal: ${s.message}`)}}}class Se{constructor(){this.presenter=new Ee(this)}async init(){const e=c("div",{class:"auth-container"});e.innerHTML=`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),document.getElementById("register-form").addEventListener("submit",async t=>{t.preventDefault();const i=document.getElementById("name").value.trim(),s=document.getElementById("email").value.trim(),o=document.getElementById("password").value;if(!i||!s||!o){this.showMessage("Semua kolom harus diisi!");return}await this.presenter.register({name:i,email:s,password:o})})}showMessage(e){alert(e)}}class ke{constructor(){this.isSubscribed=!1,this.subscription=null}async init(){const e=d();if(!e){this.showMessage("Please login first!"),window.location.hash="#/login";return}const t=c("div",{class:"subscribe-container"});t.innerHTML=`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(t),await this.initializeSubscription(e)}async initializeSubscription(e){this.checkBrowserSupport(),await this.checkPermissionStatus(),await this.checkSubscriptionStatus(),this.setupEventListeners(e),this.updateUI()}checkBrowserSupport(){const e=document.getElementById("browser-support");"serviceWorker"in navigator&&"PushManager"in window?(e.textContent="✅ Supported",e.className="detail-value success"):(e.textContent="❌ Not Supported",e.className="detail-value error")}async checkPermissionStatus(){const e=document.getElementById("permission-status");if("Notification"in window)switch(Notification.permission){case"granted":e.textContent="✅ Granted",e.className="detail-value success";break;case"denied":e.textContent="❌ Denied",e.className="detail-value error";break;default:e.textContent="⏳ Not Requested",e.className="detail-value warning"}else e.textContent="❌ Not Available",e.className="detail-value error"}async checkSubscriptionStatus(){const e=document.getElementById("subscription-status");if("serviceWorker"in navigator&&"PushManager"in window)try{const t=await navigator.serviceWorker.ready;this.subscription=await t.pushManager.getSubscription(),this.subscription?(this.isSubscribed=!0,e.textContent="✅ Active",e.className="detail-value success"):(this.isSubscribed=!1,e.textContent="❌ Not Subscribed",e.className="detail-value error")}catch(t){console.error("Error checking subscription status:",t),e.textContent="❌ Error",e.className="detail-value error"}else e.textContent="❌ Not Available",e.className="detail-value error"}setupEventListeners(e){const t=document.getElementById("subscribe-btn"),i=document.getElementById("unsubscribe-btn"),s=document.getElementById("test-notification-btn");t.addEventListener("click",async()=>{await this.handleSubscribe(e)}),i.addEventListener("click",async()=>{await this.handleUnsubscribe()}),s.addEventListener("click",()=>{this.testNotification()})}async handleSubscribe(e){const t=document.getElementById("subscribe-btn"),i=t.innerHTML;t.innerHTML='<span class="spinner-small"></span> Subscribing...',t.disabled=!0;try{if(!await x()){this.showMessage("Notification permission is required to subscribe.");return}await F(e),this.isSubscribed=!0,await this.checkSubscriptionStatus(),this.updateUI(),this.showMessage("Successfully subscribed to notifications!")}catch(s){console.error("Subscription error:",s),this.showMessage(`Failed to subscribe: ${s.message}`)}finally{t.innerHTML=i,t.disabled=!1}}async handleUnsubscribe(){const e=document.getElementById("unsubscribe-btn"),t=e.innerHTML;e.innerHTML='<span class="spinner-small"></span> Unsubscribing...',e.disabled=!0;try{this.subscription&&(await this.subscription.unsubscribe(),this.isSubscribed=!1,this.subscription=null,await this.checkSubscriptionStatus(),this.updateUI(),this.showMessage("Successfully unsubscribed from notifications!"))}catch(i){console.error("Unsubscription error:",i),this.showMessage(`Failed to unsubscribe: ${i.message}`)}finally{e.innerHTML=t,e.disabled=!1}}testNotification(){Notification.permission==="granted"?new Notification("Test Notification",{body:"This is a test notification from StoryApp!",icon:"/icons/icon-192x192.png",badge:"/icons/icon-96x96.png"}):this.showMessage("Notifications are not enabled. Please enable them first.")}updateUI(){const e=document.getElementById("status-indicator"),t=document.getElementById("status-text"),i=document.getElementById("subscribe-btn"),s=document.getElementById("unsubscribe-btn"),o=document.getElementById("test-notification-btn"),a="serviceWorker"in navigator&&"PushManager"in window&&Notification.permission!=="denied";this.isSubscribed?(e.className="status-indicator active",t.textContent="Active",i.style.display="none",s.style.display="inline-flex",o.style.display="inline-flex"):a?(e.className="status-indicator inactive",t.textContent="Not Subscribed",i.style.display="inline-flex",s.style.display="none",o.style.display="none"):(e.className="status-indicator error",t.textContent="Not Available",i.style.display="none",s.style.display="none",o.style.display="none")}showMessage(e){const t=c("div",{class:"toast-notification"});t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},4e3)}}class Le{constructor(){this.stories=[]}async init(){const e=c("div",{class:"home-container",role:"region","aria-label":"Cerita Favorit"});e.innerHTML=`
      <h2 id="favorites-title">Cerita Favorit</h2>
      <div 
        id="favorites-list" 
        role="feed" 
        aria-labelledby="favorites-title"
      ></div>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e),await this.loadFavorites()}async loadFavorites(){try{this.stories=await ee(),this.displayStories()}catch(e){this.showMessage(`Gagal memuat cerita favorit: ${e.message}`)}}displayStories(){const e=document.getElementById("favorites-list");if(this.stories.length===0){e.innerHTML=`
        <div class="empty-state">
          <p>Belum ada cerita favorit.</p>
          <a href="#/home" class="back-home">Kembali ke Beranda</a>
        </div>
      `;return}e.innerHTML="",this.stories.forEach(t=>{const i=c("div",{class:"story-item",role:"article"});i.innerHTML=`
        <h3>${t.name}</h3>
        <p>${t.description}</p>
        <img 
          src="${t.photoUrl}" 
          alt="Foto untuk cerita: ${t.description.substring(0,50)}..." 
          loading="lazy"
          class="story-image"
        >
        <p>Dibuat pada: ${new Date(t.createdAt).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}</p>
        ${t.lat&&t.lon?`<div 
                id="map-${t.id}" 
                class="story-map" 
                role="complementary" 
                aria-label="Lokasi cerita di peta"
              ></div>`:""}
        <div class="story-actions">
          <button 
            class="remove-favorite-btn" 
            data-story-id="${t.id}"
            aria-label="Hapus dari favorit"
          >
            Hapus dari Favorit
          </button>
        </div>
      `,e.appendChild(i),t.lat&&t.lon&&this.initMap(`map-${t.id}`,t.lat,t.lon,t.name)}),document.querySelectorAll(".remove-favorite-btn").forEach(t=>{t.addEventListener("click",async i=>{const s=i.target.dataset.storyId;await this.removeFavorite(s)})})}async removeFavorite(e){try{await te(e),await this.loadFavorites(),this.showMessage("Cerita berhasil dihapus dari favorit!")}catch(t){this.showMessage(`Gagal menghapus cerita: ${t.message}`)}}initMap(e,t,i,s){if(t&&i){const o=b(e,t,i,13);w(o,t,i,s)}}showMessage(e){alert(e)}}class Me{async init(){const e=c("div",{class:"about-container",role:"main"});e.innerHTML=`
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
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e)}}class _{init(){const e=c("div",{class:"not-found-container"});e.innerHTML=`
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <a href="#/home" class="back-home">Kembali ke Beranda</a>
    `,document.getElementById("content").innerHTML="",document.getElementById("content").appendChild(e)}}function k(n){const e=document.getElementById("content");e.style.opacity="0",setTimeout(()=>{n(),e.style.opacity="1"},300)}const T={"#/":ne,"#/home":ie,"#/stories":oe,"#/add-story":ye,"#/detail/:id":fe,"#/login":we,"#/register":Se,"#/subscribe":ke,"#/favorites":Le,"#/about":Me,"#/404":_};function Ie(){v(),window.addEventListener("hashchange",()=>{v(),C()}),window.addEventListener("load",()=>{v(),C()}),document.getElementById("logout-link").addEventListener("click",n=>{n.preventDefault(),se(),v(),window.location.hash="#/login"})}function v(){const n=d(),e=document.getElementById("login-link"),t=document.getElementById("logout-link"),i=document.getElementById("subscribe-link"),s=document.getElementById("favorites-link"),o=document.getElementById("user-welcome");if(n){if(e.style.display="none",t.style.display="inline",i&&(i.style.display="inline"),s&&(s.style.display="inline"),o){const a=Be();o.textContent=`Hi, ${a.name||"User"}`,o.style.display="inline"}}else e.style.display="inline",t.style.display="none",i&&(i.style.display="none"),s&&(s.style.display="none"),o&&(o.style.display="none")}function Be(){try{const n=localStorage.getItem("userData");return n?JSON.parse(n):{name:"User"}}catch{return{name:"User"}}}function C(){const n=window.location.hash||"#/",e=Object.keys(T).find(t=>new RegExp(`^${t.replace(":id","([^/]+)")}$`).test(n));if(e){const t=T[e],i=new t;if(e==="#/detail/:id"){const s=n.match(new RegExp(`^${e.replace(":id","([^/]+)")}$`)),o=s?s[1]:null;k(()=>i.init({id:o}))}else k(()=>i.init())}else{const t=new _;window.location.hash="#/404",k(()=>t.init())}}class Te{constructor(){this.metrics=new Map,this.observers=new Map}measurePageLoad(e){const t=performance.now();return{end:()=>{const s=performance.now()-t;return this.metrics.set(`page-load-${e}`,s),console.log(`Page ${e} loaded in ${s.toFixed(2)}ms`),s}}}lazyLoadImages(){if("IntersectionObserver"in window){const e=new IntersectionObserver((t,i)=>{t.forEach(s=>{if(s.isIntersecting){const o=s.target;o.src=o.dataset.src,o.classList.remove("lazy"),i.unobserve(o)}})});document.querySelectorAll("img[data-src]").forEach(t=>{e.observe(t)})}}preloadCriticalResources(){["/assets/css/styles.css","https://unpkg.com/leaflet@1.9.4/dist/leaflet.css","https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"].forEach(t=>{const i=document.createElement("link");i.rel="preload",i.as=t.endsWith(".css")?"style":"script",i.href=t,document.head.appendChild(i)})}monitorWebVitals(){"PerformanceObserver"in window&&(new PerformanceObserver(i=>{const s=i.getEntries(),o=s[s.length-1];console.log("LCP:",o.startTime)}).observe({entryTypes:["largest-contentful-paint"]}),new PerformanceObserver(i=>{i.getEntries().forEach(o=>{console.log("FID:",o.processingStart-o.startTime)})}).observe({entryTypes:["first-input"]}))}getMetrics(){return Object.fromEntries(this.metrics)}}class Ce{constructor(){this.setupGlobalErrorHandling(),this.errorQueue=[],this.maxErrors=50}setupGlobalErrorHandling(){window.addEventListener("error",e=>{var t;this.logError({type:"javascript",message:e.message,filename:e.filename,lineno:e.lineno,colno:e.colno,stack:(t=e.error)==null?void 0:t.stack,timestamp:new Date().toISOString()})}),window.addEventListener("unhandledrejection",e=>{var t,i;this.logError({type:"promise",message:((t=e.reason)==null?void 0:t.message)||"Unhandled promise rejection",stack:(i=e.reason)==null?void 0:i.stack,timestamp:new Date().toISOString()})}),window.addEventListener("offline",()=>{this.showUserFriendlyError("You are offline. Some features may not work.")}),window.addEventListener("online",()=>{this.showUserFriendlyMessage("Connection restored!")})}logError(e){console.error("Error logged:",e),this.errorQueue.push(e),this.errorQueue.length>this.maxErrors&&this.errorQueue.shift();try{localStorage.setItem("app-errors",JSON.stringify(this.errorQueue.slice(-10)))}catch{}this.isCriticalError(e)&&this.showUserFriendlyError("Something went wrong. Please try refreshing the page.")}isCriticalError(e){return[/network/i,/fetch/i,/api/i,/authentication/i,/authorization/i].some(i=>i.test(e.message)||i.test(e.stack||""))}showUserFriendlyError(e){this.showToast(e,"error")}showUserFriendlyMessage(e){this.showToast(e,"success")}showToast(e,t="info"){const i=document.createElement("div");i.className=`toast-notification ${t}`,i.textContent=e,document.body.appendChild(i),setTimeout(()=>i.classList.add("show"),100),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>{document.body.contains(i)&&document.body.removeChild(i)},300)},4e3)}getErrorReports(){return this.errorQueue}clearErrors(){this.errorQueue=[],localStorage.removeItem("app-errors")}}class Ne{constructor(){this.events=[],this.sessionId=this.generateSessionId(),this.startTime=Date.now()}generateSessionId(){return"session_"+Date.now()+"_"+Math.random().toString(36).substr(2,9)}trackPageView(e){this.trackEvent("page_view",{page:e,timestamp:Date.now(),session_id:this.sessionId})}trackEvent(e,t={}){var s;const i={event:e,properties:{...t,timestamp:Date.now(),session_id:this.sessionId,user_agent:navigator.userAgent,viewport:`${window.innerWidth}x${window.innerHeight}`,connection:((s=navigator.connection)==null?void 0:s.effectiveType)||"unknown"}};this.events.push(i),console.log("Analytics event:",i),this.events.length>100&&this.events.shift(),this.storeEvents()}trackStoryInteraction(e,t){this.trackEvent("story_interaction",{action:e,story_id:t})}trackPerformance(e,t){this.trackEvent("performance",{metric:e,value:t,page:window.location.hash})}trackError(e,t){this.trackEvent("error",{type:e,message:t.substring(0,100),page:window.location.hash})}storeEvents(){try{const e=this.events.slice(-50);localStorage.setItem("analytics_events",JSON.stringify(e))}catch(e){console.warn("Could not store analytics events:",e)}}getAnalyticsSummary(){const e=Date.now()-this.startTime,t=this.events.filter(o=>o.event==="page_view").length,i=this.events.filter(o=>o.event==="story_interaction").length,s=this.events.filter(o=>o.event==="error").length;return{session_id:this.sessionId,session_duration:e,page_views:t,story_interactions:i,errors:s,total_events:this.events.length}}exportData(){return{summary:this.getAnalyticsSummary(),events:this.events.map(e=>({...e,properties:{...e.properties,user_agent:void 0}}))}}}const r=new Ne;window.addEventListener("hashchange",()=>{r.trackPageView(window.location.hash)});window.addEventListener("beforeinstallprompt",()=>{r.trackEvent("install_prompt_shown")});window.addEventListener("visibilitychange",()=>{document.hidden?r.trackEvent("app_backgrounded"):r.trackEvent("app_foregrounded")});class Pe{constructor(){this.setupKeyboardNavigation(),this.setupScreenReaderSupport(),this.setupFocusManagement(),this.setupColorContrastDetection()}setupKeyboardNavigation(){document.addEventListener("keydown",e=>{if(e.altKey&&e.key==="m"){e.preventDefault();const t=document.getElementById("main-content");t&&(t.focus(),this.announceToScreenReader("Jumped to main content"))}if(e.altKey&&e.key==="n"){e.preventDefault();const t=document.querySelector("nav");if(t){const i=t.querySelector("a");i&&(i.focus(),this.announceToScreenReader("Navigation menu focused"))}}if(e.altKey&&e.key==="s"){e.preventDefault();const t=document.querySelector('input[type="search"]');t&&(t.focus(),this.announceToScreenReader("Search focused"))}e.key==="Escape"&&this.closeActiveModal()}),this.setupGridNavigation()}setupGridNavigation(){document.addEventListener("keydown",e=>{const t=document.activeElement,i=Array.from(document.querySelectorAll(".story-item"));if(i.includes(t)){const s=i.indexOf(t);let o=s;switch(e.key){case"ArrowRight":o=Math.min(s+1,i.length-1);break;case"ArrowLeft":o=Math.max(s-1,0);break;case"ArrowDown":o=Math.min(s+3,i.length-1);break;case"ArrowUp":o=Math.max(s-3,0);break;default:return}o!==s&&(e.preventDefault(),i[o].focus())}})}setupScreenReaderSupport(){this.liveRegion=document.createElement("div"),this.liveRegion.setAttribute("aria-live","polite"),this.liveRegion.setAttribute("aria-atomic","true"),this.liveRegion.className="sr-only",this.liveRegion.style.cssText=`
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `,document.body.appendChild(this.liveRegion),this.observePageChanges()}observePageChanges(){const e=new MutationObserver(i=>{i.forEach(s=>{if(s.type==="childList"&&s.target.id==="content"){const o=s.target.querySelector("h1, h2");o&&setTimeout(()=>{this.announceToScreenReader(`Page loaded: ${o.textContent}`)},500)}})}),t=document.getElementById("content");t&&e.observe(t,{childList:!0,subtree:!0})}announceToScreenReader(e){this.liveRegion&&(this.liveRegion.textContent=e,setTimeout(()=>{this.liveRegion.textContent=""},1e3))}setupFocusManagement(){let e=null;document.addEventListener("focusin",t=>{e=t.target}),this.restoreFocus=()=>{e&&document.contains(e)&&e.focus()},this.setupFocusTrap()}setupFocusTrap(){document.addEventListener("keydown",e=>{if(e.key==="Tab"){const t=document.querySelector(".modal:not([hidden])");if(t){const i=t.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(i.length===0)return;const s=i[0],o=i[i.length-1];e.shiftKey?document.activeElement===s&&(e.preventDefault(),o.focus()):document.activeElement===o&&(e.preventDefault(),s.focus())}}})}setupColorContrastDetection(){window.matchMedia("(prefers-contrast: high)").matches&&document.body.classList.add("high-contrast"),window.matchMedia("(prefers-reduced-motion: reduce)").matches&&document.body.classList.add("reduced-motion"),window.matchMedia("(prefers-contrast: high)").addEventListener("change",e=>{document.body.classList.toggle("high-contrast",e.matches)}),window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",e=>{document.body.classList.toggle("reduced-motion",e.matches)})}closeActiveModal(){const e=document.querySelector(".modal:not([hidden])");e&&(e.hidden=!0,this.restoreFocus(),this.announceToScreenReader("Modal closed"))}enhanceAriaLabels(){document.querySelectorAll(".story-item").forEach((e,t)=>{var i,s;if(!e.getAttribute("aria-label")){const o=((i=e.querySelector("h3"))==null?void 0:i.textContent)||"Story",a=((s=e.querySelector(".author-info h3"))==null?void 0:s.textContent)||"Unknown author";e.setAttribute("aria-label",`Story ${t+1}: ${o} by ${a}`)}}),document.querySelectorAll("button:not([aria-label])").forEach(e=>{var s;const t=e.textContent.trim(),i=(s=e.querySelector(".btn-icon"))==null?void 0:s.textContent;t?e.setAttribute("aria-label",t):i&&e.setAttribute("aria-label",`Button with ${i} icon`)})}auditAccessibility(){const e=[];return document.querySelectorAll("img:not([alt])").forEach(i=>{e.push(`Image missing alt text: ${i.src}`)}),document.querySelectorAll("input:not([aria-label]):not([aria-labelledby])").forEach(i=>{document.querySelector(`label[for="${i.id}"]`)||e.push(`Input missing label: ${i.type} input`)}),document.querySelectorAll("h1, h2, h3, h4, h5, h6").length===0&&e.push("Page missing heading structure"),this.checkColorContrast(e),e}checkColorContrast(e){document.querySelectorAll("*").forEach(i=>{const s=window.getComputedStyle(i),o=s.color,a=s.backgroundColor;o==="rgb(255, 255, 255)"&&a==="rgb(255, 255, 255)"&&e.push("Potential contrast issue: white text on white background")})}}const $e=new Pe,Ae=new MutationObserver(()=>{$e.enhanceAriaLabels()});Ae.observe(document.body,{childList:!0,subtree:!0});const f=new Te,O=new Ce;async function xe(){const n=f.measurePageLoad("app-init");try{if(await E(),Ie(),De(),await Fe(),f.preloadCriticalResources(),f.lazyLoadImages(),f.monitorWebVitals(),"serviceWorker"in navigator){const e=new U("/sw.js");e.addEventListener("installed",t=>{t.isUpdate&&N(e),r.trackEvent("sw_installed",{isUpdate:t.isUpdate})}),e.addEventListener("waiting",t=>{N(e),r.trackEvent("sw_waiting")}),e.addEventListener("controlling",t=>{window.location.reload(),r.trackEvent("sw_controlling")}),e.register()}r.trackEvent("app_initialized")}catch(e){O.logError({type:"initialization",message:e.message,stack:e.stack,timestamp:new Date().toISOString()})}finally{n.end()}}function De(){let n;const e=document.getElementById("install-app-btn");window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),n=t,e&&(e.style.display="flex"),r.trackEvent("install_prompt_available")}),e&&e.addEventListener("click",async()=>{if(n){n.prompt();const t=await n.userChoice;r.trackEvent("install_prompt_result",{outcome:t.outcome}),t.outcome==="accepted"&&(e.style.display="none"),n=null}}),window.matchMedia("(display-mode: standalone)").matches&&(e&&(e.style.display="none"),r.trackEvent("app_running_standalone"))}async function Fe(){try{await de(),He(),r.trackEvent("notifications_initialized"),console.log("Notification system setup completed")}catch(n){O.logError({type:"notification_setup",message:n.message,stack:n.stack,timestamp:new Date().toISOString()})}}function He(){const n=document.querySelector("header nav ul");if(!n)return;const e=document.createElement("li");e.id="notification-container",e.style.display="none";const t=document.createElement("button");t.id="notification-btn",t.className="notification-btn",t.innerHTML='<span class="btn-icon">🔔</span><span class="btn-text">Notifications</span>',t.setAttribute("aria-label","Toggle push notifications"),e.appendChild(t);const i=document.getElementById("install-app-btn");i&&i.parentElement?n.insertBefore(e,i.parentElement):n.appendChild(e),t.addEventListener("click",_e),S()}async function _e(){const n=d();if(!n){m("Please login first to enable notifications","warning"),window.location.hash="#/login";return}const e=document.getElementById("notification-btn"),t=e.innerHTML;try{e.innerHTML='<span class="spinner-small"></span> Processing...',e.disabled=!0,(await H()).isSubscribed?(await ce(n),m("Notifications disabled successfully","success"),r.trackEvent("notifications_disabled")):(await F(n),m("Notifications enabled successfully","success"),r.trackEvent("notifications_enabled")),await S()}catch(i){console.error("Error toggling notifications:",i),m(`Error: ${i.message}`,"error"),r.trackEvent("notification_toggle_error",{error:i.message})}finally{e.innerHTML=t,e.disabled=!1}}async function S(){const n=document.getElementById("notification-container"),e=document.getElementById("notification-btn");if(!(!n||!e))try{const t=await H();d()&&t.isSupported?(n.style.display="block",t.isSubscribed?(e.innerHTML='<span class="btn-icon">🔕</span><span class="btn-text">Disable</span>',e.className="notification-btn subscribed",e.setAttribute("aria-label","Disable push notifications")):t.canSubscribe?(e.innerHTML='<span class="btn-icon">🔔</span><span class="btn-text">Enable</span>',e.className="notification-btn unsubscribed",e.setAttribute("aria-label","Enable push notifications")):(e.innerHTML='<span class="btn-icon">🚫</span><span class="btn-text">Blocked</span>',e.className="notification-btn blocked",e.setAttribute("aria-label","Notifications blocked in browser settings"),e.disabled=!0)):n.style.display="none"}catch(t){console.error("Error updating notification UI:",t),n.style.display="none"}}function N(n){const e=document.createElement("div");e.className="update-banner",e.setAttribute("role","alert"),e.setAttribute("aria-live","assertive"),e.innerHTML=`
    <div class="update-content">
      <span>🔄 App update available!</span>
      <button id="update-btn" class="btn btn-primary" aria-label="Update app now">Update Now</button>
      <button id="dismiss-update" class="btn btn-outline" aria-label="Update later">Later</button>
    </div>
  `,document.body.appendChild(e),document.getElementById("update-btn").addEventListener("click",()=>{n.messageSkipWaiting(),e.remove(),r.trackEvent("app_update_accepted")}),document.getElementById("dismiss-update").addEventListener("click",()=>{e.remove(),r.trackEvent("app_update_dismissed")})}function m(n,e="success"){const t=document.createElement("div");t.className=`toast-notification ${e}`,t.textContent=n,t.setAttribute("role","alert"),t.setAttribute("aria-live","polite"),document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.contains(t)&&document.body.removeChild(t)},300)},3e3)}window.addEventListener("hashchange",()=>{setTimeout(S,100),r.trackPageView(window.location.hash)});window.addEventListener("storage",n=>{n.key==="token"&&(setTimeout(S,100),r.trackEvent("auth_state_changed",{source:"storage_event"}))});window.addEventListener("online",()=>{m("Connection restored","success"),r.trackEvent("connection_restored")});window.addEventListener("offline",()=>{m("You are offline. Some features may be limited.","warning"),r.trackEvent("connection_lost")});window.addEventListener("load",()=>{setTimeout(()=>{const n=performance.getEntriesByType("navigation")[0];n&&(r.trackPerformance("page_load_time",n.loadEventEnd-n.loadEventStart),r.trackPerformance("dom_content_loaded",n.domContentLoadedEventEnd-n.domContentLoadedEventStart))},0)});xe();
//# sourceMappingURL=index-7dOqLKz7.js.map
