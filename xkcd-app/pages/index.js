import { Grid } from '@nextui-org/react';

import Header from '../components/Header';
import fs from 'fs/promises';
import Comic from '../components/Comic';

export default function Home({ latestComics }) {
  return (
    <Header>
      <main>
        <Grid.Container gap={2} justify="center">
          {latestComics.map((comic) => (
            <Grid sm={12} md={7} key={comic.id}>
              <Comic comic={comic} />
            </Grid>
          ))}
        </Grid.Container>
      </main>
    </Header>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.slice(-9, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8');
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
