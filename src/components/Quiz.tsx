import { useState } from 'preact/hooks';

// Квиз «Подберем автомобиль по важным для вас параметрам»: 4 шага, как на plutosauto.ru (30/50/80/100 %).
// Все шаги – одна форма data-lead-form: отправку и проверку делает общий обработчик в Base.astro.
interface Props { carSrc: string; carSrcset: string; policyHref: string }

const years = Array.from({ length: 27 }, (_, i) => String(2000 + i));
const PCT = [30, 50, 80, 100];

export default function Quiz({ carSrc, carSrcset, policyHref }: Props) {
  const [step, setStep] = useState(0);
  const last = PCT.length - 1;

  return (
    <form class="quiz__card" data-lead-form data-source="Квиз подбора" novalidate>
      <p class="quiz__lead">
        <span class="gold">Ответьте на вопросы</span> и в ближайшее время менеджер свяжется с вами, чтобы предложить оптимальное решение с учетом ваших пожеланий
      </p>
      <div class="quiz__bar" aria-hidden="true">
        <span class="quiz__fill" style={{ width: `calc(${PCT[step]}% - 6px)` }} />
        <span class="quiz__pct">{PCT[step]} % пройдено</span>
      </div>

      <div class="quiz__body">
        <div class="quiz__fields">
          <div class="quiz__fields" hidden={step !== 0}>
            <p class="quiz__step-title">1. Марка и модель</p>
            <label class="field"><input name="model" data-label="Марка и модель" placeholder="Марка и модель" maxlength={80} /></label>
            <div class="quiz__row">
              <label class="field"><span>Год выпуска от</span>
                <select name="yearFrom" data-label="Год от"><option value="">от</option>{years.map((y) => <option>{y}</option>)}</select>
              </label>
              <label class="field"><span>Год выпуска до</span>
                <select name="yearTo" data-label="Год до"><option value="">до</option>{years.map((y) => <option>{y}</option>)}</select>
              </label>
            </div>
            <div class="quiz__row">
              <label class="field"><span>Цена от</span><input name="priceFrom" data-label="Цена от" inputmode="numeric" placeholder="от" /></label>
              <label class="field"><span>Цена до</span><input name="priceTo" data-label="Цена до" inputmode="numeric" placeholder="до" /></label>
            </div>
          </div>

          <div class="quiz__fields" hidden={step !== 1}>
            <fieldset class="choice">
              <legend class="quiz__step-title">2. Тип топлива</legend>
              {['Электро', 'Бензин', 'Дизель', 'Гибрид'].map((v) => (
                <label><input type="radio" name="fuel" data-label="Топливо" value={v} /><span>{v}</span></label>
              ))}
            </fieldset>
            <fieldset class="choice">
              <legend>Выберите пробег</legend>
              {['Без пробега', 'до 5000 км', 'более 5000 км'].map((v) => (
                <label><input type="radio" name="mileage" data-label="Пробег" value={v} /><span>{v}</span></label>
              ))}
            </fieldset>
          </div>

          <div class="quiz__fields" hidden={step !== 2}>
            <p class="quiz__step-title">3. Цвет кузова</p>
            <label class="field"><input name="bodyColor" data-label="Цвет кузова" placeholder="Цвет кузова" maxlength={60} /></label>
            <label class="field"><span>Цвет салона</span><input name="salonColor" data-label="Цвет салона" placeholder="Цвет салона" maxlength={60} /></label>
            <label class="field"><span>Сообщите нам дополнительные параметры для подбора авто</span>
              <textarea name="extra" data-label="Дополнительно" rows={3} maxlength={600} />
            </label>
          </div>

          <div class="quiz__fields" hidden={step !== 3}>
            <p class="quiz__step-title">4. Куда прислать подборку</p>
            <label class="field"><input name="name" autocomplete="name" placeholder="Ваше имя" maxlength={60} /></label>
            <label class="field"><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" /></label>
            <label class="consent">
              <input type="checkbox" name="consent" />
              <span>Я согласен с <a href={policyHref} target="_blank">политикой конфиденциальности</a></span>
            </label>
            <p class="form-error" data-form-error hidden />
          </div>

          <div class="quiz__nav">
            {step > 0 && <button type="button" class="btn" onClick={() => setStep(step - 1)}>Назад</button>}
            {step < last
              ? <button type="button" class="btn btn--gold" onClick={() => setStep(step + 1)}>Далее</button>
              : <button type="submit" class="btn btn--gold">Отправить</button>}
          </div>
        </div>
        <img class="quiz__car" src={carSrc} srcset={carSrcset} sizes="(max-width: 960px) 90vw, 460px" alt="Porsche Cayenne" loading="lazy" width={700} height={481} />
      </div>
    </form>
  );
}
