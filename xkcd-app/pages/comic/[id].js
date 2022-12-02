import Header from '../../components/Header';
import { readFile, readdir, stat } from 'fs/promises';
import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { basename } from 'path';
import Link from 'next/link';

export default function Comic({ comic, hasPrevious, hasNext, prevId, nextId }) {
  const router = useRouter();

  const pagination = (route) => {
    router.push(`/comic/${route}`);
  };

  return (
    <Header title={`Comic ${comic.num}`}>
      <Grid.Container gap={2} justify="center">
        <Grid sm={12} md={7} key={comic.id}>
          <Card
            isPressable
            isHoverable
            variant="bordered"
            css={{ borderColor: '45deg, $blue600 -20%, $pink600 50%' }}
          >
            <Card.Header>
              <Row justify="center">
                <Text
                  h1
                  size={60}
                  css={{
                    textGradient: '45deg, $blue600 -20%, $pink600 50%',
                  }}
                  weight="bold"
                >
                  {comic.title}
                </Text>
              </Row>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$4' }}>
              <Card.Image
                src={comic.img}
                objectFit="cover"
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                alt={comic.alt}
              />
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Col>
                  {hasPrevious && (
                    <Row justify="flex-start">
                      <Link
                        href={`/comic/${prevId}`}
                        flat
                        auto
                        rounded
                        css={{
                          color: '45deg, $blue600 -20%, $pink600 50%',
                          bg: '#94f9f026',
                        }}
                      >
                        <Text
                          css={{ color: 'inherit' }}
                          size={20}
                          weight="bold"
                          transform="uppercase"
                        >
                          ◀️ Preview
                        </Text>
                      </Link>
                    </Row>
                  )}
                </Col>
                <Col>
                  {hasNext && (
                    <Row justify="flex-end">
                      <Link
                        href={`/comic/${nextId}`}
                        flat
                        auto
                        rounded
                        css={{
                          color: '45deg, $blue600 -20%, $pink600 50%',
                          bg: '#94f9f026',
                        }}
                      >
                        <Text
                          css={{ color: 'inherit' }}
                          size={20}
                          weight="bold"
                          transform="uppercase"
                        >
                          Next ▶️
                        </Text>
                      </Link>
                    </Row>
                  )}
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </Header>
  );
}

export async function getStaticPaths() {
  const files = await readdir('./comics');

  const paths = files.map((file) => {
    const id = basename(file, '.json');
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const content = await readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status == 'fulfilled';
  const hasNext = nextResult.status == 'fulfilled';

  return {
    props: {
      comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  };
}
