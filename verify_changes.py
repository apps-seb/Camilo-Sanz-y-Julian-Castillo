import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        cwd = os.getcwd()
        url = f"file://{cwd}/index.html"
        print(f"Loading {url}")
        page.goto(url)

        # 1. Verify Hero Gradient & Structure
        print("Verifying Hero Section...")
        page.locator("#inicio").scroll_into_view_if_needed()
        page.wait_for_timeout(2000) # Wait for animations
        page.screenshot(path="verification_hero.png")

        # Check if .hero-bg-anim exists
        if page.locator(".hero-bg-anim").count() > 0:
            print("Hero Background Animation element found: PASS")
        else:
            print("Hero Background Animation element NOT found: FAIL")

        # Check if Slide 1 uses picture
        slide1 = page.locator(".hero-slide").nth(0).locator("picture")
        if slide1.count() > 0:
            print("Slide 1 uses <picture>: PASS")
        else:
            print("Slide 1 does NOT use <picture>: FAIL")

        # Check if Slide 2 uses picture
        slide2 = page.locator(".hero-slide").nth(1).locator("picture")
        if slide2.count() > 0:
            print("Slide 2 uses <picture>: PASS")
        else:
            print("Slide 2 does NOT use <picture>: FAIL")

        # 2. Verify Social Cards Interaction
        print("Verifying Social Cards...")
        social_section = page.locator("#redes-sociales")
        social_section.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)

        # Screenshot before hover
        page.screenshot(path="verification_social_before.png")

        # Hover over the LAST card (Spotify) which is on top of the stack and shouldn't be covered
        card = page.locator(".social-wallet-card").last
        card.hover()
        page.wait_for_timeout(1000) # Wait for transition

        # Screenshot after hover
        page.screenshot(path="verification_social_hover.png")
        print("Social hover screenshot saved.")

        browser.close()

if __name__ == "__main__":
    run()
