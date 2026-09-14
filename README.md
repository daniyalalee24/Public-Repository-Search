```md
## How to verify the states (No code changes required)

You can demonstrate all three required states directly from the user interface.

### 1. Loading State

- **How to reach:** Enter any term (for example, `react`) and click **Search**.
- **What you'll see:** The screen displays a neutral ⏳ **"Searching for repositories... please wait."** state while the GitHub request is being processed.

### 2. Error State — Request Failed

- **How to reach:** Check **"Simulate API Error"**, enter a search term, and click **Search**.
- **What you'll see:** A visually distinct red error state explaining:
  - **What failed:** The request to GitHub failed.
  - **What to do:** Check the connection, disable the simulated error, and try again.
- The technical HTTP error is also shown for troubleshooting.

### 3. Empty State — Successful Search With No Results

- **How to reach:** Make sure **"Simulate API Error"** is unchecked. Search for a highly unlikely repository name such as `zxcvbnm1234599990nomatch`.
- **What you'll see:** A visually distinct blue informational state saying that the **search was successful but no repositories matched** the query.
- This state is intentionally presented as a successful result, **not as an error**.

### Successful Results

- **How to reach:** Leave **"Simulate API Error"** unchecked and search for a common term such as `react`.
- **What you'll see:** Matching public GitHub repositories are displayed with repository names, descriptions, star counts, and links to GitHub.
```
