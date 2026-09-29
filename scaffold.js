const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SVELTE_DIR = path.join(ROOT_DIR, "svelte-app");
const COMPONENTS_DIR = path.join(SVELTE_DIR, "src", "lib", "components");
const STYLES_DIR = path.join(SVELTE_DIR, "src", "assets", "styles");

if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
}
if (!fs.existsSync(STYLES_DIR)) {
  fs.mkdirSync(STYLES_DIR, { recursive: true });
}

// 1. Copy CSS to SCSS
const src_css = path.join(ROOT_DIR, "styles", "main.css");
const dest_scss = path.join(STYLES_DIR, "main.scss");
if (fs.existsSync(src_css)) {
  fs.copyFileSync(src_css, dest_scss);
}

// 2. Parse HTML and extract sections
const html_file = path.join(ROOT_DIR, "index.html");
const content = fs.readFileSync(html_file, 'utf8');

function extract_tag(tag_name, attr_id = null) {
  let pattern;
  if (attr_id) {
    pattern = new RegExp(`<${tag_name}[^>]*id="${attr_id}"[^>]*>[\\s\\S]*?<\\/${tag_name}>`, 'i');
  } else {
    pattern = new RegExp(`<${tag_name}[^>]*>[\\s\\S]*?<\\/${tag_name}>`, 'i');
  }
  const match = content.match(pattern);
  return match ? match[0] : "";
}

const sections = {
  "Header.svelte": extract_tag("header", "main-header"),
  "Hero.svelte": extract_tag("section", "hero"),
  "Featured.svelte": extract_tag("section", "featured"),
  "Library.svelte": extract_tag("section", "library"),
  "Cafe.svelte": extract_tag("section", "cafe"),
  "Events.svelte": extract_tag("section", "events"),
  "Reserve.svelte": extract_tag("section", "reserve"),
  "Feedback.svelte": extract_tag("section", "feedback"),
  "Footer.svelte": extract_tag("footer")
};

for (const [name, html] of Object.entries(sections)) {
  if (html) {
    fs.writeFileSync(path.join(COMPONENTS_DIR, name), `<!-- Migrated from index.html -->\n${html}\n`, 'utf8');
  }
}

// 3. Create App.svelte
const app_svelte = `<script>
  import './assets/styles/main.scss';
  import Header from './lib/components/Header.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Featured from './lib/components/Featured.svelte';
  import Library from './lib/components/Library.svelte';
  import Cafe from './lib/components/Cafe.svelte';
  import Events from './lib/components/Events.svelte';
  import Reserve from './lib/components/Reserve.svelte';
  import Feedback from './lib/components/Feedback.svelte';
  import Footer from './lib/components/Footer.svelte';
</script>

<Header />
<main>
  <Hero />
  <Featured />
  <Library />
  <Cafe />
  <Events />
  <Reserve />
  <Feedback />
</main>
<Footer />
`;
fs.writeFileSync(path.join(SVELTE_DIR, "src", "App.svelte"), app_svelte, 'utf8');

// 4. Update index.html for Svelte Vite
const svelteHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Beeboard Cafe | Svelte App</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,300..900;1,300..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(SVELTE_DIR, "index.html"), svelteHtml, 'utf8');

console.log("Scaffolding complete!");
