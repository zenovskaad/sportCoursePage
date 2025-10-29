import React from 'react';
import "./card-style.css"

interface CardProps {
    id: string;
    is_selected: boolean;
    is_sale_active: boolean;
    period: string;
    price: number;
    full_price: number;
    is_best: boolean;
    text: string;
    onClick: (period: string) => void;
}

const Card = ({id, is_selected, is_sale_active, period, price, full_price, is_best, text, onClick}: CardProps) => {
    const percent = Math.ceil((full_price - price) * 100 / full_price);

    return (
        <div
            onClick={() => onClick(period)}
            className={is_best&&is_selected ? 'best-selected-card' : is_selected? "selected-card": is_best? "best-card": "card"}
        >
            <div className={is_sale_active?"active-sale-container":"not-active-sale-container"}>

                <div
                    className={is_sale_active ? "active-sale-text":"not-active-sale-text"}>
                    -{percent}%
                </div>

                {is_best && <div className="hit">хит!</div>}
            </div>

            <div className={is_best ? "best-card-block" : "card-block"}>
                <div className={is_best?"best-content-part":"content-part"}>
                    <p className="period ">{period}</p>
                    <div className="price-container">
                        <p className={is_best ? "best-price" : "price"}>
                            {is_sale_active ? price : full_price} ₽
                        </p>
                        {is_sale_active && (
                            <p className="old-price">{full_price} ₽</p>
                        )}
                    </div>
                </div>
                <p className={is_best?"best-text":"hidden"}>{text}</p>
                <p className={!is_best?"not-best-text":"hidden"}>{text}</p>
            </div>
        </div>
    );
};

export default Card;
