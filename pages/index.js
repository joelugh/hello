import Head from 'next/head'
import data from '../data.json';

export default function Home() {
  try {
    let scrollPos = 0;
    window.addEventListener('scroll', function(){
        if ((document.body.getBoundingClientRect()).top > scrollPos) {
            // up
            if (window.scrollY <= 0) {
                // top
                window.scrollTo(0,document.body.offsetHeight);
            }
        } else {
            // down
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                // bottom
                window.scrollTo(0,0);
            }
        }
        scrollPos = (document.body.getBoundingClientRect()).top;
    });
  } catch(err) { }
  const sections = data.items;
  sections.push(data.items[0]);
  return (
    <div>
      <Head>
        <title>Hugh Chan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {sections.map(({href, icon, backgroundColor}) => <div className="section" style={{backgroundColor}}>
          <a href={href}>
            <img className="icon" src={icon}></img>
          </a>
        </div>)}
      </main>
    </div>
  )
}
