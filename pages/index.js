import Head from 'next/head'
import data from '../data.json';

export default function Home() {
  try {
    let prevScrollPos = 0;
    // The debounce function receives our function as a parameter
    const debounce = (fn) => {
      let frame;
      return (...params) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => { fn(...params) });
      }
    };

    const storeScroll = () => {
      let scrollPos = (document.body.getBoundingClientRect()).top;
      document.documentElement.dataset.scroll = scrollPos;
      if (scrollPos > prevScrollPos) {
        // up
        if (window.scrollY <= 0) {
            // top
            window.scrollTo(0,document.body.offsetHeight);
        }
      } else {
          // down
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
              // bottom
              scrollPos = 1; // pretend to come from above
              window.scrollTo(0,0);
          }
      }
      prevScrollPos = scrollPos;
    }

    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    // Update scroll position for first time
    storeScroll();
  } catch(err) { }
  const sections = data.items;
  sections.push({...data.items[0], name:`${data.items[0].name}-extra`});
  return (
    <div>
      <Head>
        <title>Hugh Chan</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main>
        <div className="halfscreen upper">
          <i className="arrow up" onClick={() => scrollBy({ left:0, top: -window.innerHeight, behavior: 'smooth'})}></i>
        </div>
        <div className="halfscreen lower">
          <i className="arrow down" onClick={() => scrollBy({ left:0, top: window.innerHeight, behavior: 'smooth'})}></i>
        </div>
        {sections.map(({name, href, icon, backgroundColor}) => <div key={name} className="section" style={{backgroundColor}}>
          <a href={href}>
            <img className="icon" src={icon}></img>
          </a>
        </div>)}
      </main>
    </div>
  )
}
