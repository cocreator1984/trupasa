export const dynamic = 'force-static';

export default function RedirectHome() {
  return (
    <main>
      <meta httpEquiv="refresh" content="0; url=./en/" />
      <script
        dangerouslySetInnerHTML={{
          __html: "(function(){try{var p=location.pathname; if(!/\/?$/.test(p)) p+='/'; location.href = p + 'en/';}catch(e){location.href='./en/';}})();"
        }}
      />
      <div style={{padding: '2rem'}}>
        <p>Redirecting to <a href="./en/">./en/</a>…</p>
        <p>
          Visit: <a href="./en/">EN</a> | <a href="./sv/">SV</a> | <a href="./so/">SO</a>
        </p>
      </div>
    </main>
  );
}
