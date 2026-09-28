import os
import re
import shutil

ROOT_DIR = r"c:\Users\Chino and Areli\Beeboard\fs-beeboard"
SVELTE_DIR = os.path.join(ROOT_DIR, "svelte-app")
COMPONENTS_DIR = os.path.join(SVELTE_DIR, "src", "lib", "components")
STYLES_DIR = os.path.join(SVELTE_DIR, "src", "assets", "styles")

os.makedirs(COMPONENTS_DIR, exist_ok=True)
os.makedirs(STYLES_DIR, exist_ok=True)

# 1. Copy CSS to SCSS
src_css = os.path.join(ROOT_DIR, "styles", "main.css")
dest_scss = os.path.join(STYLES_DIR, "main.scss")
if os.path.exists(src_css):
    shutil.copyfile(src_css, dest_scss)

# 2. Parse HTML and extract sections
html_file = os.path.join(ROOT_DIR, "index.html")
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

def extract_tag(content, tag_name, attr_id=None):
    if attr_id:
        pattern = f'<{tag_name}[^>]*id="{attr_id}"[^>]*>.*?</{tag_name}>'
    else:
        pattern = f'<{tag_name}[^>]*>.*?</{tag_name}>'
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    return match.group(0) if match else ""

sections = {
    "Header.svelte": extract_tag(content, "header", "main-header"),
    "Hero.svelte": extract_tag(content, "section", "hero"),
    "Featured.svelte": extract_tag(content, "section", "featured"),
    "Library.svelte": extract_tag(content, "section", "library"),
    "Cafe.svelte": extract_tag(content, "section", "cafe"),
    "Events.svelte": extract_tag(content, "section", "events"),
    "Reserve.svelte": extract_tag(content, "section", "reserve"),
    "Feedback.svelte": extract_tag(content, "section", "feedback"),
    "Footer.svelte": extract_tag(content, "footer")
}

for name, html in sections.items():
    if html:
        # For Library, we need to convert some inline onclick to Svelte on:click later, but just dump HTML for now
        # Also class -> class for Svelte is fine.
        with open(os.path.join(COMPONENTS_DIR, name), 'w', encoding='utf-8') as f:
            f.write(f"<!-- Migrated from index.html -->\n{html}\n")

# 3. Create App.svelte
app_svelte = """<script>
  import '../assets/styles/main.scss';
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
"""

with open(os.path.join(SVELTE_DIR, "src", "App.svelte"), 'w', encoding='utf-8') as f:
    f.write(app_svelte)

# 4. Create global main.js to import bootstrap/fa
main_js = """import { mount } from 'svelte';
import './assets/styles/main.scss';
import App from './App.svelte';

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
"""
with open(os.path.join(SVELTE_DIR, "src", "main.js"), 'w', encoding='utf-8') as f:
    f.write(main_js)

print("Scaffolding complete!")
