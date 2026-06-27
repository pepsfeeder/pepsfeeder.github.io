import os
import re
from datetime import datetime

# Configuration
BASE_URL = "https://pepsfeeder.github.io"
CONTENT_DIR = "content"
OUTPUT_FILE = "static/sitemap.xml"
IGNORE_DIRS = ["wp-content", "authors", "staff"] # Folders to skip

def parse_frontmatter(file_path):
    """Parses URL and Date using regex to avoid external dependencies (yaml)."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Match YAML frontmatter between --- delimiters
        match = re.search(r'^---\s+(.*?)\s+---', content, re.DOTALL)
        if not match:
            return None
        
        frontmatter = match.group(1)
        data = {}
        
        # Simple key: value extraction
        for line in frontmatter.splitlines():
            if ":" in line:
                key, val = line.split(":", 1)
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                data[key] = val
        return data
    except Exception:
        return None

def generate_sitemap():
    pages = []
    
    # Add root URL
    pages.append({
        "loc": f"{BASE_URL}/",
        "lastmod": datetime.now().strftime("%Y-%m-%d")
    })
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        # Skip ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            if not file.endswith((".md", ".html")):
                continue
                
            file_path = os.path.join(root, file)
            metadata = parse_frontmatter(file_path)
            
            if not metadata:
                continue

            # Determine the URL
            url_path = metadata.get('url')
            if not url_path:
                rel_path = os.path.relpath(file_path, CONTENT_DIR)
                name, _ = os.path.splitext(rel_path)
                
                if name.endswith("_index"):
                    url_path = "/" + name[:-6]
                elif name.endswith("index"):
                    url_path = "/" + name[:-5]
                else:
                    url_path = "/" + name + "/"
            
            if isinstance(url_path, str):
                if not url_path.startswith("/"):
                    url_path = "/" + url_path
                if not url_path.endswith("/") and not url_path.endswith(".html"):
                    url_path += "/"

                # Get the date
                date_val = metadata.get('date', "")
                lastmod = ""
                if date_val:
                    lastmod = date_val[:10] # YYYY-MM-DD

                pages.append({
                    "loc": f"{BASE_URL}{url_path}",
                    "lastmod": lastmod
                })

    # Generate XML
    xml_header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xml_footer = '</urlset>'
    
    xml_body = ""
    for page in pages:
        xml_body += "  <url>\n"
        xml_body += f"    <loc>{page['loc']}</loc>\n"
        if page['lastmod']:
            xml_body += f"    <lastmod>{page['lastmod']}</lastmod>\n"
        xml_body += "    <changefreq>weekly</changefreq>\n"
        xml_body += "    <priority>0.5</priority>\n"
        xml_body += "  </url>\n"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(xml_header + xml_body + xml_footer)
    
    print(f"Sitemap generated successfully at {OUTPUT_FILE}")
    print(f"Total pages indexed: {len(pages)}")

if __name__ == "__main__":
    generate_sitemap()
