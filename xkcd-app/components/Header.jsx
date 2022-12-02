import Head from 'next/head';
import {
  Navbar,
  Button,
  Link,
  Text,
  useTheme,
  Spacer,
} from '@nextui-org/react';
import { Box } from './Box';
import { Logo } from './Logo';
import { useState } from 'react';

export default function Header({ children, title = 'XKCD' }) {
  const { isDark } = useTheme();

  const rutes = ['Home', 'Comics', 'About'];
  const [selected, setSelected] = useState(1);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="This page was created to public the XKCD Comics in a test project page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Box>
          <Navbar isBordered={isDark} variant="sticky">
            <Navbar.Brand>
              <Logo />
              <Text b color="inherit" hideIn="xs">
                XKCD Comics
              </Text>
            </Navbar.Brand>
            <Navbar.Content
              enableCursorHighlight
              hideIn="xs"
              variant="underline"
            >
              <Navbar.Link isActive={false} href={'/'}>
                Home
              </Navbar.Link>
              <Navbar.Link isActive={false} href={'/'}>
                Comics
              </Navbar.Link>
              <Navbar.Link isActive={false} href={'/'}>
                About
              </Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
              <Navbar.Item>
                <Button auto flat as={Link} href="#">
                  Search
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          </Navbar>
        </Box>
      </header>
      <Spacer y={1} />
      {children}
    </>
  );
}
