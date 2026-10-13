import { useState } from 'preact/hooks';
import type { Case } from '../data/content';

// «150+ авто из Европы уже у своих новых владельцев»: кейс слева текстом, справа большой кадр и три миниатюры.
// Стрелки листают кейсы, миниатюра меняет большой кадр.
interface Props { cases: Case[]; base: string }

export default function Cases({ cases, base }: Props) {
  const [i, setI] = useState(0);
  const [shot, setShot] = useState(1);
  const c = cases[i];
  const go = (d: number) => { setI((i + d + cases.length) % cases.length); setShot(1); };
  const src = (n: number, w: number) => `${base}cases/${c.slug}-${n}-${w}.webp`;

  return (
    <>
      <div class="head head--row">
        <h2 class="title">150+ авто из Европы уже<br /> у своих <span class="gold">новых владельцев</span></h2>
        <div class="cases__nav">
          <button type="button" class="arrow" aria-label="Предыдущий кейс" onClick={() => go(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
          </button>
          <button type="button" class="arrow" aria-label="Следующий кейс" onClick={() => go(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      <div class="case" aria-live="polite">
        <div>
          <h3 class="case__name">{c.name}</h3>
          <p class="case__about">{c.about}</p>
          <dl class="specs">
            {c.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <button type="button" class="btn" data-lead={c.name}>Заказать похожую</button>
          <p class="case__count">{String(i + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}</p>
        </div>
        <div class="case__media">
          <div class="case__main">
            <img key={`${c.slug}-${shot}`} src={src(shot, 1600)} srcset={`${src(shot, 800)} 800w, ${src(shot, 1600)} 1600w`} sizes="(max-width: 860px) 100vw, 700px" alt={c.name} width={1600} height={1000} />
          </div>
          <div class="case__thumbs">
            {[1, 2, 3, 4].filter((n) => n !== shot).map((n) => (
              <button type="button" key={n} onClick={() => setShot(n)} aria-label={`Показать фото ${n}`}>
                <img src={src(n, 800)} alt="" loading="lazy" width={800} height={600} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
