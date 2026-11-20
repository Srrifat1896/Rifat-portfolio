# Md. Saif Al Mahmud Rifat — Portfolio

A responsive personal portfolio built with plain HTML, CSS, and JavaScript. It includes a downloadable CV, categorized skills, education and coursework, academic and personal projects, learning interests, training, and contact links.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. No package installation or build step is required.

## Update content and images

- Edit `data.js` to update profile information, skills, coursework, projects, interests, certifications, training, and contact details.
- Keep the optimized WebP portrait and project cover images in `assets/images/` and preserve their filenames referenced by `data.js`. Original PNGs are retained locally in the ignored `assets/source-images/` folder.
- The downloadable CV is `assets/docs/rifat-cv.pdf`; replace it with an updated PDF when your details change.
- `styles.css` contains the responsive layouts, light and dark themes, and motion styling. `script.js` handles rendering and interactions.
- The contact form validates in the browser and opens a prefilled draft in the visitor's email app; it does not send or store messages on a server.

## Publish

This is a static site. For Netlify, set the repository root as the publish directory and leave the build command empty.
