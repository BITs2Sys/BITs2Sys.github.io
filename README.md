# BITs2Sys homepage

This repository hosts the static BITs2Sys team homepage on GitHub Pages.

- GitHub Pages: <https://bits2sys.github.io/>
- Original/custom domain: <https://bitctf.cn/>
- Community: <https://community.bitctf.cn/>

## Structure

- `index.html` — homepage
- `members.html` — team members
- `awards.html` — competition results
- `vulnerabilities.html` — vulnerability statistics
- `join/index.html` — static redirect to the current recruitment post
- `img/` — member avatars

The site has no build step. GitHub Pages publishes the files from the root of the `main` branch.

## Custom-domain cutover

The repository intentionally does not include a `CNAME` file yet, so the Pages preview remains available while `bitctf.cn` continues to serve the existing site. During DNS cutover:

1. Add a `CNAME` file containing `bitctf.cn`.
2. Configure the apex-domain DNS records using GitHub's current Pages documentation.
3. Set `bitctf.cn` as the repository's Pages custom domain.
4. After GitHub provisions the certificate, enable HTTPS enforcement.
