# Random Pokémon Trainer Image

Get a random Pokémon trainer image from [https://play.pokemonshowdown.com/sprites/trainers/](https://play.pokemonshowdown.com/sprites/trainers/). A case-insensitive "r" query parameter ([RE2 regex](https://www.npmjs.com/package/re2), which is regex without backreferences and lookahead assertions) is supported. A case-insensitive "e" query parameter (exclude) is also supported that excludes matches separated by commas. These filter the contents of `/data/images.json`. Artificial intelligence tools are helpful for learning how to generate RE2 regex.

Pokémon assets are ©2025 Nintendo, Creatures Inc., and GAME FREAK inc.
All trademarks and copyrights are property of their respective owners.
These assets are used here under fair use for non-commercial, educational, and fan-based purposes.
No affiliation or endorsement by Nintendo, Creatures Inc., GAME FREAK, or The Pokémon Company is implied.

---

### Examples

- **Get a random Pokémon trainer:**  
  [random-pokemon-trainer.vercel.app](random-pokemon-trainer.vercel.app)

- **Get a random Ace Trainer:**  
  [random-pokemon-trainer.vercel.app/?r=acetrainer](random-pokemon-trainer.vercel.app?r=acetrainer)

- **Get a random Ace Trainer, excluding gen1 and couple:**  
  [random-pokemon-trainer.vercel.app/?e=.*gen1,.*couple&r=acetrainer](random-pokemon-trainer.vercel.app/?e=.*gen1,.*couple&r=acetrainer)