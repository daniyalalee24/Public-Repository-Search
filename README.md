# Public Repository Search

A React application that searches public repositories using the GitHub REST API.

## How to verify the states (No code changes required)

You can demonstrate all three required states directly from the user interface:

1. **Loading State**

   - **How to reach:** Enter any term (e.g., `react`) in the search box and click "Search".
   - **What you'll see:** The screen will immediately display a ⏳ "Searching for repositories..." indicator while the network request is in flight. _(Note: If your internet is very fast, you can throttle your network in browser DevTools to see it longer)._

2. **Error State (Request Failed)**

   - **How to reach:** Check the **"Simulate API Error"** checkbox below the search bar, enter a search term, and click "Search". (This forces the app to request an invalid URL). Alternatively, turn off your Wi-Fi and hit search.
   - **What you'll see:** A visually distinct red error box. It explains **what failed** ("Failed to fetch repositories from GitHub") and **what to do** ("Please check your internet connection, ensure 'Simulate API Error' is unchecked, and try again.").

3. **Empty State (Successful search, but no results)**
   - **How to reach:** Ensure the error checkbox is _unchecked_. Search for a completely random, non-existent string (e.g., `zxcvbnm1234599990nomatch`).
   - **What you'll see:** A visually distinct blue informational box stating that the search succeeded but no repositories matched the query. It is styled as a valid result, not as an error.
