from bs4 import BeautifulSoup
import re

with open('index.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# 1. Verify Header Logo
logo = soup.find('a', class_='logo')
img = logo.find('img')
if img and 'mercacol.com.co' in img['src']:
    print("SUCCESS: Logo image updated.")
else:
    print("FAILURE: Logo image missing or incorrect.")

# 2. Verify Hero Section (Clean)
hero = soup.find('section', id='inicio')
hero_bg = hero.find('div', class_='hero-bg')
hero_content = hero.find('div', class_='hero-content')
if hero_bg and not hero_content:
    print("SUCCESS: Hero section clean (only background).")
else:
    print("FAILURE: Hero section not clean.")

# 3. Verify Bio Tabs
tabs = soup.find('div', class_='bio-tabs')
camilo = soup.find('div', id='camilo')
julian = soup.find('div', id='julian')
if tabs and camilo and julian:
    print("SUCCESS: Bio tabs structure present.")
else:
    print("FAILURE: Bio tabs missing.")

# 4. Verify Spotify
spotify = soup.find('div', class_='spotify-container')
iframe = spotify.find('iframe')
if iframe and '4jSxOZYC5bgVCM32uTGmVv' in iframe['src']:
    print("SUCCESS: Spotify iframe correct.")
else:
    print("FAILURE: Spotify iframe missing or incorrect.")

# 5. Verify script.js content
with open('script.js', 'r') as f:
    js = f.read()

if 'openBio' in js and 'audio-element' not in js:
    print("SUCCESS: script.js updated (new bio logic present, old audio logic removed).")
else:
    print("FAILURE: script.js not updated correctly.")
    if 'openBio' not in js: print("- openBio missing")
    if 'audio-element' in js: print("- audio-element still present")
