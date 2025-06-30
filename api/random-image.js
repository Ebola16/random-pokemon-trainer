import RE2 from 're2';
import fs from 'fs/promises';
import path from 'path';

function escapeRE2(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function handler(req, res) {
  try {
    const { e = '', r = '.*' } = req.query;

    if (Array.isArray(e)) {
      res.status(400).send('Only one "e" query parameter is allowed.');
      return;
    }

    if (Array.isArray(r)) {
      res.status(400).send('Only one "r" query parameter is allowed.');
      return;
    }

    if (r.length > 256) {
      res.status(400).send('256 character "r" query parameter limit exceeded.');
      return;
    }

    if (typeof e === 'string' && e.length > 256) {
      res.status(400).send('256 character "e" query parameter limit exceeded.');
      return;
    }

    let regExp;
    try {
      regExp = new RE2(r, 'i');
    } catch {
      res.status(400).send('Invalid or unsafe RE2 regex pattern.');
      return;
    }

    const excludeTerms = e.split(',').map(term => term.trim()).filter(Boolean);
    const excludeRegexes = excludeTerms.map(term => new RE2(escapeRE2(term), 'i'));
    const filePath = path.join(process.cwd(), 'data', 'images.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const images = JSON.parse(fileContents);

    const filtered = images.filter(img => {
      if (!regExp.test(img)) return false;
      for (const ex of excludeRegexes) {
        if (ex.test(img)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      res.status(404).send('No matching images found.');
      return;
    }

    const randomImage = filtered[Math.floor(Math.random() * filtered.length)];
    const redirectUrl = `https://play.pokemonshowdown.com/sprites/trainers/${encodeURIComponent(randomImage)}.png`;

    res.writeHead(302, { Location: redirectUrl });
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
}
