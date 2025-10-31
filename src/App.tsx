import React, {useEffect, useState} from "react";
import Star from "./images/Star.tsx";
import BestResult from "./images/BestResult.tsx";
import Man from "./images/Man.tsx";
import Card from "./Card.tsx";
import "./style.css"

function App() {
    const [timeLeft, setTimeLeft] = useState(120);
    const [isSaleActive, setIsSaleActive] = useState(true);
    const [tariffs, setTariffs] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectTariffPeriod, setSelectedTariffPeriod] = useState();

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsSaleActive(false)
            return
        }
        ;
        const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    useEffect(() => {
        fetch("https://t-core.fit-hub.pro/Test/GetTariffs")
            .then((res) => res.ok ? res.json() : Promise.reject("Ошибка загрузки"))
            .then((data) => {
                const sorted = [...data].sort((a, b) => b.is_best - a.is_best);
                setTariffs(sorted);
                setSelectedTariffPeriod(sorted[0]?.period);
            })
            .catch(console.error);
    }, []);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleBuyClick = (e) => {
        e.preventDefault();
        if (!isChecked) setShowError(true);
    };

    return (
        <div className="page">
            <header>
                <div className="white-header-text">Успейте открыть пробную неделю</div>
                <div className={timeLeft > 30 ? 'yellow-time' : timeLeft > 0 ? 'red-time' : 'white-time'}>
                    <Star className="w-4 h-4"/>
                    <div>{timeLeft > 0 ? formatTime(timeLeft) : "00:00"}</div>
                    <Star className="w-4 h-4"/>
                </div>
            </header>

            <main>
                <h1 className="title">
                    Выбери подходящий для себя <span className="tariff">тариф</span>
                </h1>

                <div className="main-container">
                    <div className="man-container">
                        <Man/>
                    </div>

                    <form>
                        <div className="cards">
                            {tariffs.length > 0 ? tariffs.map((t) => (
                                <Card
                                    key={t.id}
                                    id={t.id}
                                    is_selected={t.period === selectTariffPeriod}
                                    is_sale_active={isSaleActive}
                                    text={t.text}
                                    price={t.price}
                                    period={t.period}
                                    full_price={t.full_price}
                                    is_best={t.is_best}
                                    onClick={() => setSelectedTariffPeriod(t.period)}
                                />
                            )) : <p className="loading">Загрузка тарифов...</p>}
                        </div>

                        <div className="best-result">
                            <BestResult/>
                            <p className="best-result-text">
                                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1
                                месяц
                            </p>
                        </div>

                        <label className={"conf-police"}>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isChecked}
                                onChange={(e) => {
                                    setIsChecked(e.target.checked);
                                    setShowError(false);
                                }}
                            />
                            <span
                                className={showError && !isChecked ? "checkbox-error-not-checked" : isChecked ? "checkbox-checked" : "checkbox"}></span>
                            <p className="agreement">
                                Я согласен с <a href="#" className="conf-police-link">офертой
                                рекуррентных платежей</a> и <a href="#" className="conf-police-link">Политикой
                                конфиденциальности</a>
                            </p>
                        </label>

                        <button onClick={handleBuyClick}>
                            Купить
                        </button>

                        <p className="small-grey-text">
                            Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для
                            получения пожизненного доступа к приложению. Пользователь соглашается, что данные
                            кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг
                            сервиса в случае желания пользователя.
                        </p>
                    </form>
                </div>

                <div className="warranty">
                    <p className="warranty-title">
                        гарантия возврата 30 дней
                    </p>
                    <p className="warranty-text">
                        Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели!
                        Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не
                        получишь видимых результатов.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default App;
