"use client";

import { useCallback, useEffect, useState } from "react";
import { assetPath, siteConfig } from "@/lib/site-config";

const galleryItems = [
  { file: "g1.jpg", title: "ALMOST", code: "C-01", span: 7, tall: true, alt: "Gold YMB coin in a museum display case with an Almost admission ticket" },
  { file: "g2.jpg", title: "THE SCREEN", code: "C-02", span: 5, tall: true, alt: "Desk monitor showing the gold You Missed Bitches coin among cluttered windows" },
  { file: "g3.jpg", title: "FIVE MORE MINUTES", code: "C-03", span: 4, tall: false, alt: "White gallery hall with a gold coin sculpture on a pedestal labeled Five More Minutes" },
  { file: "g4.jpg", title: "BUY TOMORROW", code: "C-04", span: 4, tall: false, alt: "Gold coin beside sticky notes reading buy tomorrow and definitely buy" },
  { file: "g5.jpg", title: "I WAS WATCHING", code: "C-05", span: 4, tall: false, alt: "Red poster on a wall reading I Was Watching with the gold YMB coin" },
  { file: "g6.jpg", title: "THE CLICK", code: "C-06", span: 4, tall: false, alt: "Gold YMB coin standing next to a computer mouse on a reflective surface" },
  { file: "g7.png", title: "MISSED THE TRAIN", code: "C-07", span: 8, tall: false, center: true, alt: "Gold YMB coin on a wet train platform bench as a train departs at night" },
] as const;

export default function ReferenceSite() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closeModal]);

  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null;
  return (<>

  <a className="skip-link" href="#main">Skip to content</a>

  {/* 01. NAVIGATION */}
  <header className="nav" id="top">
    <div className="nav__inner">
      <a className="nav__brand" href="#top" aria-label="YMB home">
        <span className="nav__logo"><img src={assetPath("assets/logo.png")} alt="YMB gold coin logo" width="44" height="44" /></span>
        <span className="nav__word">YMB</span>
      </a>

      <nav className="nav__links" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#how-to-buy">How to Buy</a>
        <a href="#chart">Chart</a>
      </nav>

      <div className="nav__actions">
        <a className="icon-link" data-link="x" href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer" aria-label="YMB on X">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a className="btn btn--gold btn--sm" data-link="buy" href={siteConfig.buyUrl} target="_blank" rel="noopener noreferrer">Buy $YMB</a>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <div className="mobile-menu" id="mobile-menu" hidden>
      <nav aria-label="Mobile">
        <a href="#about">About</a>
        <a href="#how-to-buy">How to Buy</a>
        <a href="#chart">Chart</a>
        <a data-link="x" href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer">Follow on X</a>
      </nav>
    </div>
  </header>

  <main id="main">
    {/* 02. HERO */}
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__light" aria-hidden="true"></div>
      <div className="hero__ghost" aria-hidden="true">YMB</div>

      <div className="hero__copy">
        <p className="eyebrow hero__eyebrow"><span className="eyebrow__rule"></span>Ethereum Memecoin</p>
        <h1 className="hero__title" id="hero-title">
          <span className="hero__line"><span>You</span></span>
          <span className="hero__line"><span>Missed</span></span>
          <span className="hero__line hero__line--accent"><span>Bitches.</span></span>
        </h1>
        <p className="hero__sub">The three letters after the move.</p>
        <div className="hero__ctas">
          <a className="btn btn--gold" data-link="buy" href={siteConfig.buyUrl} target="_blank" rel="noopener noreferrer">Buy $YMB</a>
          <a className="btn btn--ghost" data-link="chart" href={siteConfig.chartUrl} target="_blank" rel="noopener noreferrer">View Chart</a>
        </div>
        <a className="hero__community underline-link" data-link="x" href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer">{siteConfig.xHandle} on X</a>
      </div>

      <figure className="hero__figure">
        <img className="hero__img" src={assetPath("assets/hero.png")} width="1024" height="1536" fetchPriority="high"
             alt="Full-body metallic gold Donald Trump parody figure in a gold suit, raising a middle finger and holding a gold coin that reads You Missed Bitches" />
      </figure>
    </section>

    {/* 03. GALLERY */}
    <section className="gallery section" id="about" aria-label="YMB gallery">
      <div className="gallery__wrap">
        <div className="gallery__grid">
          {galleryItems.map((item, index) => (
            <button
              key={item.file}
              type="button"
              className={`gallery-card gallery-card--span-${item.span}${item.tall ? " gallery-card--tall" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${item.title}`}
            >
              <div className="gallery-card__media">
                <img
                  className={`gallery-card__img${"center" in item && item.center ? " gallery-card__img--center" : ""}`}
                  src={assetPath(`assets/gallery/${item.file}`)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="gallery-card__cap">
                <span className="gallery-card__title">{item.title}</span>
                <span className="gallery-card__meta">{item.code} · VIEW</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeItem && activeIndex !== null ? (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={closeModal}
        >
          <div className="gallery-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="gallery-modal__close" onClick={closeModal} aria-label="Close image">
              ×
            </button>
            <img
              className="gallery-modal__img"
              src={assetPath(`assets/gallery/${activeItem.file}`)}
              alt={activeItem.alt}
            />
          </div>
        </div>
      ) : null}
    </section>

    {/* 04. THE MISSED MOMENT */}
    <section className="moment section" aria-labelledby="moment-title">
      <div className="moment__accent" aria-hidden="true" data-parallax="0.12">LATE</div>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow reveal">02 / Too Late</p>
          <h2 className="section-title reveal" id="moment-title">The chart<br />didn't wait.</h2>
        </header>

        <div className="moment__grid">
          <p className="moment__statement reveal">You were<br />not <em>there.</em></p>
          <div className="moment__side">
            <p className="lead reveal">Every run leaves someone staring at the screen, wondering how they missed it.</p>
            <p className="moment__punch reveal">You missed bitches.</p>
          </div>
        </div>
      </div>
    </section>

    {/* 05. OFFICIAL BANNER */}
    <section className="banner" aria-label="Official YMB banner">
      <img className="banner__img reveal" src={assetPath("assets/banner.png")} width="2172" height="724" loading="lazy"
           alt="Official YMB banner: a gold Trump parody coin beside giant gold You Missed Bitches lettering, with the White House, gold coins and dollar bills at sunset" />
    </section>

    {/* 05b. VIDEO */}
    <section className="video section" aria-label="YMB video">
      <div className="container">
        <div className="video__frame reveal">
          <iframe className="video__iframe"
                  src={siteConfig.videoUrl}
                  title="YMB video on YouTube" loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </section>

    {/* 06. HOW TO BUY */}
    <section className="buy section" id="how-to-buy" aria-labelledby="buy-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow reveal">03 / Get In</p>
          <h2 className="section-title reveal" id="buy-title">Don't miss<br />the button.</h2>
        </header>

        <ol className="steps">
          <li className="step reveal">
            <span className="step__num">01</span>
            <h3 className="step__title">Get a wallet</h3>
            <p className="step__text">Install an Ethereum wallet such as MetaMask.</p>
          </li>
          <li className="step reveal">
            <span className="step__num">02</span>
            <h3 className="step__title">Add ETH</h3>
            <p className="step__text">Fund your wallet with ETH for swapping and gas fees.</p>
          </li>
          <li className="step reveal">
            <span className="step__num">03</span>
            <h3 className="step__title">Open the swap</h3>
            <p className="step__text">Use the Buy $YMB button to open the configured token page.</p>
          </li>
          <li className="step reveal">
            <span className="step__num">04</span>
            <h3 className="step__title">Check the contract</h3>
            <p className="step__text">Verify the token contract before making any transaction.</p>
          </li>
        </ol>

        <div className="buy__footer">
          <div className={`ca reveal${siteConfig.isConfigured ? " is-live" : ""}`} role="group" aria-labelledby="ca-label">
            <div className="ca__meta">
              <span className="ca__label" id="ca-label">Ethereum Contract</span>
              <span className="ca__status"><span className="ca__dot" aria-hidden="true"></span><span data-ca-status>{siteConfig.isConfigured ? "Contract address supplied." : "Contract address pending."}</span></span>
            </div>
            <div className="ca__row">
              <code className="ca__value" data-ca>{siteConfig.ca}</code>
              <button className="ca__copy" type="button" data-copy-ca aria-live="polite">Copy</button>
            </div>
          </div>
          <a className="btn btn--gold btn--lg reveal" data-link="buy" href={siteConfig.buyUrl} target="_blank" rel="noopener noreferrer">Buy $YMB</a>
        </div>
      </div>
    </section>

    {/* 07. LIVE CHART */}
    <section className="chart section" id="chart" aria-labelledby="chart-title">
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow reveal">04 / The Chart</p>
            <h2 className="section-title reveal" id="chart-title">The chart<br />speaks.</h2>
          </div>
          <p className="lead reveal">The three letters after the move.</p>
        </header>

        <div className="chart__frame reveal">
          <iframe className="chart__iframe" data-chart-embed
                  src={siteConfig.chartEmbedUrl}
                  title="YMB chart on Dexscreener" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <p className="chart__note" data-chart-pending hidden={siteConfig.isConfigured}>The contract address is pending confirmation. The live chart will appear here once the token is deployed and indexed.</p>

        <a className="btn btn--ghost reveal" data-link="chart" href={siteConfig.chartUrl} target="_blank" rel="noopener noreferrer">View on Dexscreener</a>
      </div>
    </section>

    {/* 08. FINAL CTA */}
    <section className="final" aria-labelledby="final-title">
      <div className="container final__inner">
        <h2 className="final__title reveal" id="final-title"><span>Still</span><span>watching?</span></h2>
        <span className="final__rule reveal" aria-hidden="true"></span>
        <p className="final__sub reveal">The next click is yours.</p>
        <div className="final__ctas reveal">
          <a className="btn btn--gold btn--lg" data-link="buy" href={siteConfig.buyUrl} target="_blank" rel="noopener noreferrer">Buy $YMB</a>
          <a className="btn btn--ghost btn--lg" data-link="x" href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer">Follow on X</a>
        </div>
      </div>
    </section>
  </main>

  {/* 09. FOOTER */}
  <footer className="footer">
    <div className="container">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="footer__ticker">YMB</span>
          <span className="footer__name">You Missed Bitches</span>
        </div>
        <p className="footer__chain">Ethereum Memecoin</p>
        <nav className="footer__links" aria-label="Footer">
          <a className="underline-link" data-link="x" href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer">X</a>
          <a className="underline-link" data-link="buy" href={siteConfig.buyUrl} target="_blank" rel="noopener noreferrer">Buy</a>
          <a className="underline-link" data-link="chart" href={siteConfig.chartUrl} target="_blank" rel="noopener noreferrer">Chart</a>
        </nav>
      </div>
      <div className="footer__legal">
        <p>YMB is a meme token. Nothing on this website constitutes financial advice.</p>
        <p>Independent parody project. Not affiliated with or endorsed by Donald Trump or any government entity.</p>
      </div>
    </div>
  </footer>

  

  </>);
}
