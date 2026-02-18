from playwright.sync_api import sync_playwright
import os
import time

def verify_discography():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # content_path = os.path.abspath("discografia.html")
        # page.goto(f"file://{content_path}")

        # Better to start a simple server or just use file path if simpler.
        # Using file path for simplicity in this environment.
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/discografia.html")

        # 1. Verify Header
        print("Verifying Header...")
        page.wait_for_selector(".new-release-header")
        header_text = page.locator(".nr-info h1").inner_text()
        print(f"Header Title: {header_text}")
        if "Horizonte Azul" not in header_text:
            print("ERROR: Header title incorrect")

        # 2. Verify Grid
        print("Verifying Grid...")
        page.wait_for_selector(".discography-grid")
        albums = page.locator(".album-wrapper")
        count = albums.count()
        print(f"Found {count} albums")
        if count < 3:
            print("ERROR: Not enough albums found")

        # 3. Verify Animation Interaction
        print("Verifying Interaction...")
        first_album = albums.first

        # Take initial screenshot
        page.screenshot(path="verification/discography_initial.png")

        # Click to trigger animation
        first_album.click()

        # Wait for class 'playing'
        try:
            page.wait_for_selector(".album-wrapper.playing", timeout=2000)
            print("Animation triggered successfully (playing class added)")
        except:
            print("ERROR: Animation did not trigger")

        # Wait a bit for the CSS transition to happen visually
        time.sleep(1)

        # Take screenshot of playing state
        page.screenshot(path="verification/discography_playing.png")

        browser.close()

if __name__ == "__main__":
    verify_discography()
