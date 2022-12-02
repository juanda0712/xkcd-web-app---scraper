import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import { Box } from './Box';
import { useRouter } from 'next/router';

export default function Comic({ comic }) {
  const router = useRouter();

  const clickComic = (route) => {
    router.push(`/comic/${route}`);
  };
  return (
    <Card
      onClick={() => clickComic(comic.num)}
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
        <Row wrap="wrap" justify="space-between" align="center">
          <Text b>Author: XKCD</Text>
          <Text
            css={{
              color: '$accents7',
              fontWeight: '$semibold',
              fontSize: '$sm',
            }}
          >
            {'Date: ' + comic.month + '/' + comic.day + '/' + comic.year}
          </Text>
        </Row>
      </Card.Footer>
    </Card>
  );
}
