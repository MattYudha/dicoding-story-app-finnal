// src/js/views/about.js
import { createElement } from "../utils/dom.js";

export default class AboutView {
  async init() {
    const content = createElement("div", { 
      class: "about-container",
      role: "main"
    });
    
    content.innerHTML = `
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
    `;
    
    document.getElementById("content").innerHTML = "";
    document.getElementById("content").appendChild(content);
  }
}