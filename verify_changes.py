from bs4 import BeautifulSoup
import re

with open('index.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# 1. Verify New Sections
spotify_single = soup.find('section', id='spotify-single')
lanzamientos = soup.find('section', id='lanzamientos')

if spotify_single and '3IUn2UU2KTom6hc8nOX1lO' in str(spotify_single):
    print("SUCCESS: Spotify Single section found and contains correct track ID.")
else:
    print("FAILURE: Spotify Single section missing or incorrect.")

if lanzamientos:
    print("SUCCESS: Latest Releases section found.")
else:
    print("FAILURE: Latest Releases section missing.")

# 2. Verify Style CSS - Hamburger Menu and Hero Padding
with open('style.css', 'r') as f:
    css = f.read()

# Check for menu toggle
if '.menu-toggle { display: block; }' in css:
    print("SUCCESS: Hamburger menu explicitly set to display: block.")
else:
    print("WARNING: Hamburger menu visibility check ambiguous. Check manually.")

# Check for hero padding
if 'padding-top: 80px;' in css:
     print("SUCCESS: Hero padding added for header overlap.")
else:
     print("FAILURE: Hero padding missing or incorrect.")

# 3. Verify Bottom Nav structure
nav = soup.find('nav', class_='bottom-nav')
links = nav.find_all('a')
expected_links = ['#inicio', '#fechas', '#albumes', '#videos', '#zona-pro']
found_links = [a['href'] for a in links]

if all(link in found_links for link in expected_links):
    print("SUCCESS: Bottom nav links are correct.")
else:
    print(f"FAILURE: Bottom nav links mismatch. Found: {found_links}")
