# Modern To Do

Simple modern To Do list using HTML, CSS and JavaScript. No build step — open `index.html` in a browser.

Features:
- Add, edit (inline), delete items
- Mark complete / active
- Filter: All / Active / Completed
- Clear completed
- Persistent using `localStorage`
- Light / Dark theme toggle

How to run:

1. Open a terminal in the project folder and run a simple static server, or just open the file in your browser.

Quick using Python 3:

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or simply double-click `index.html`.

Docker
------

Build the image locally and run it with Docker:

```bash
docker build -t modern-todo:latest .
docker run --rm -p 8000:80 modern-todo:latest
```

Or use Docker Compose:

```bash
docker-compose up --build
# open http://localhost:8000
```
