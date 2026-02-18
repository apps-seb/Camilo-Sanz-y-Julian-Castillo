
import os
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # 1. Verify Index Page (Marquee)
        cwd = os.getcwd()
        index_url = f"file://{cwd}/index.html"
        print(f"Navigating to {index_url}")
        page.goto(index_url)

        # Take screenshot of the top of index.html to see marquee and nav
        page.screenshot(path="verification/index_marquee.png")
        print("Captured index_marquee.png")

        # 2. Verify Mobile Menu (Resize viewport)
        page.set_viewport_size({"width": 375, "height": 667}) # iPhone SE size
        # Click menu toggle
        page.locator('.menu-toggle').click()
        # Wait for menu to appear (opacity transition)
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/mobile_menu.png")
        print("Captured mobile_menu.png")

        # 3. Verify Agenda Page (Calendar)
        agenda_url = f"file://{cwd}/agenda.html"
        print(f"Navigating to {agenda_url}")
        page.goto(agenda_url)
        page.set_viewport_size({"width": 1280, 'height': 800})
        # Take screenshot of the calendar section
        # Scroll to calendar
        page.locator('#agenda').scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path="verification/agenda_calendar.png")
        print("Captured agenda_calendar.png")

        # 4. Verify Calendar Modal
        # Click on the 15th (which has an event in mock data)
        # The mock data uses current year/month logic, so "15" might not be an event if the month isn't March 2026.
        # Wait, the JS mock data says:
        # const events = [ { date: '2026-03-15', ... } ];
        # But the calendar generation logic uses `new Date()` (current system date).
        # If the system date is NOT March 2026, the event won't show up on the "current" month view unless I navigate.
        # However, the user prompt says "The project content and context are explicitly set to the year 2026."
        # But `new Date()` in JS returns the *system* date of the environment running the browser.
        # I suspect the environment date is NOT 2026.
        # So I might need to navigate to March 2026 or update the JS to force the date.
        # Let's take a screenshot and see what month renders.

        browser.close()

if __name__ == "__main__":
    verify_changes()
