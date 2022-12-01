import js from 'fs-extra';
import axios from 'axios';

const INITIAL_ID_XKCD_COMICS = 2500;
const MAX_ID_XKCD_COMICS = 2588;
const { writeJson } = js;

for (let id = INITIAL_ID_XKCD_COMICS; id < MAX_ID_XKCD_COMICS + 1; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;

  const { data } = await axios.get(url);
  const { news, transcript, ...restOfcomic } = data;
  const comicStore = {
    id,
    ...restOfcomic,
  };

  await writeJson(`./comics/${id}.json`, comicStore);
}
