<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DICODING-STORY-APP-FINNAL Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            line-height: 1.6;
            color: #24292f;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
        }
        h1, h2, h3 {
            border-bottom: 1px solid #d0d7de;
            padding-bottom: 0.3em;
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
        }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }
        p {
            margin-top: 0;
            margin-bottom: 16px;
        }
        ul, ol {
            padding-left: 2em;
            margin-bottom: 16px;
        }
        li {
            margin-bottom: 0.25em;
        }
        code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 85%;
            padding: 0.2em 0.4em;
            margin: 0;
            background-color: rgba(175, 184, 193, 0.2);
            border-radius: 6px;
        }
        pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f6f8fa;
            border-radius: 6px;
        }
        pre code {
            padding: 0;
            margin: 0;
            background-color: transparent;
            border: 0;
        }
        img {
            max-width: 100%;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
        .badges img, .tech-logos img {
            margin: 0 5px;
        }
        a {
            color: #0969da;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        hr {
            height: .25em;
            padding: 0;
            margin: 24px 0;
            background-color: #d0d7de;
            border: 0;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1 id="top">DICODING-STORY-APP-FINNAL</h1>

        <p class="text-center">Share Your Stories, Connect with the World</p>

        <p class="text-center badges">
            <img src="https://img.shields.io/github/last-commit/MattYudha/dicoding-story-app-finnal?style=for-the-badge" alt="last commit"/>
            <img src="https://img.shields.io/github/languages/top/MattYudha/dicoding-story-app-finnal?style=for-the-badge" alt="javascript"/>
            <img src="https://img.shields.io/github/languages/count/MattYudha/dicoding-story-app-finnal?style=for-the-badge" alt="languages"/>
        </p>

        <p class="text-center">Built with the tools and technologies:</p>
        <p class="text-center tech-logos">
            <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON"/>
            <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown"/>
            <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM"/>
            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
            <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white" alt="Leaflet"/>
            <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
        </p>

        <br>

        <h2>Table of Contents</h2>
        <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#getting-started">Getting Started</a>
                <ul>
                    <li><a href="#prerequisites">Prerequisites</a></li>
                    <li><a href="#installation">Installation</a></li>
                    <li><a href="#usage">Usage</a></li>
                    <li><a href="#testing">Testing</a></li>
                </ul>
            </li>
        </ul>

        <hr>

        <h2 id="overview">Overview</h2>
        <p>The <strong>Dicoding Story App</strong> is a feature-rich Single-Page Application that empowers users to share and explore stories through an engaging multimedia experience.</p>

        <h3 id="why-app">Why Dicoding Story App?</h3>
        <p>This project enhances storytelling by integrating advanced web technologies and user-friendly features. The core features include:</p>
        <ul>
            <li>📦 <strong>Robust Caching Strategies</strong>: Ensures fast load times and offline access, improving performance in varying network conditions.</li>
            <li>🔔 <strong>Push Notification Support</strong>: Keeps users informed with real-time updates, enhancing engagement and retention.</li>
            <li>🌐 <strong>Progressive Web App (PWA) Capabilities</strong>: Delivers a native app-like experience, making the app accessible and user-friendly.</li>
            <li>🗺️ <strong>Integrated Digital Map</strong>: Visualizes story locations, enriching user interaction with geographical context.</li>
            <li>🔑 <strong>User Authentication and Story Management</strong>: Simplifies user registration and story submissions, streamlining content creation.</li>
            <li>♿ <strong>Accessibility Standards Compliance</strong>: Promotes inclusivity, ensuring a seamless experience for all users.</li>
        </ul>

        <hr>

        <h2 id="getting-started">Getting Started</h2>

        <h3 id="prerequisites">Prerequisites</h3>
        <p>This project requires the following dependencies:</p>
        <ul>
            <li><strong>Programming Language</strong>: JavaScript</li>
            <li><strong>Package Manager</strong>: Npm</li>
        </ul>

        <h3 id="installation">Installation</h3>
        <p>Build <code>dicoding-story-app-finnal</code> from the source and install dependencies:</p>
        <ol>
            <li>
                <strong>Clone the repository:</strong>
                <pre><code>git clone https://github.com/MattYudha/dicoding-story-app-finnal</code></pre>
            </li>
            <li>
                <strong>Navigate to the project directory:</strong>
                <pre><code>cd dicoding-story-app-finnal</code></pre>
            </li>
            <li>
                <strong>Install the dependencies:</strong>
                <p>Using <strong>npm</strong>:</p>
                <pre><code>npm install</code></pre>
            </li>
        </ol>

        <h3 id="usage">Usage</h3>
        <p>Run the project with:</p>
        <p>Using <strong>npm</strong>:</p>
        <pre><code>npm start</code></pre>

        <h3 id="testing">Testing</h3>
        <p><code>Dicoding-story-app-finnal</code> uses the <strong>Jest</strong> test framework. Run the test suite with:</p>
        <p>Using <strong>npm</strong>:</p>
        <pre><code>npm test</code></pre>

        <br>
        <p class="text-right"><a href="#top">⬆ Return</a></p>
    </div>

</body>
</html>
