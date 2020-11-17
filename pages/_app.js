import { DefaultSeo, NextSeo } from 'next-seo'
import Favicon from 'react-favicon'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <><DefaultSeo
  title="twenty by rasha"
  description="Sophomore EP from Los Angeles songwriter and producer, Rasha Rahman. After his hit single, 'cellophane' w Umru (@umru_) and Sophie Meiers (@sophiemeiers), Rasha has new words to tell the world. This ep conveys Rasha's feelings towards his relationship. He uses Neo Soul and RNB to convey that."
  canonical="https://www.canonical.ie/"
  openGraph={{
    url: 'https://www.20byrasha.xyz',
    title: 'twenty by rasha',
    description: `Sophomore EP from Los Angeles songwriter and producer, Rasha Rahman. After his hit single, 'cellophane' w Umru (@umru_) and Sophie Meiers (@sophiemeiers), Rasha has new words to tell the world. This ep conveys Rasha's feelings towards his relationship. He uses Neo Soul and RNB to convey that.`,
    images: [
      {
        url: 'https://i.imgur.com/SA1x8PT.jpg',
        width: 800,
        height: 600,
        alt: 'Cover Art',
      },
      {
        url: 'https://i.imgur.com/icsnR8o.jpg',
        width: 900,
        height: 800,
        alt: 'Tracklist',
      },
    ],
    site_name: 'twenty by rasha',
  }}
  twitter={{
    handle: '@kingkb2400',
    site: '@kingkb2400',
    cardType: 'summary_large_image',
  }}
/>
<Favicon url="https://i.imgur.com/BONWSTE.png" />
<Component {...pageProps} /></>
}

export default MyApp
