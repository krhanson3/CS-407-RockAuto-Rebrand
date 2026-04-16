import type { Promotion } from "../types/types";

import fuelPump from "../images/promotions/BoschFuelPump.png";
import brakes from "../images/promotions/BrakeKits.png";
import oil from "../images/promotions/MobilOil.png";
import tools from "../images/promotions/Tools.png";

const rebateImages: Record<string, string> = {
    fuelPump,
    brakes,
    oil,
    tools
};

type Props = {
    promotionCards: Promotion[];
};

export function Promotions({ promotionCards }: Props) {
    return (
        <div className="promotions-grid">
            {promotionCards.map((promo) => (
                <div key={promo.name} className="promotion-card">
                    <img
                        src={rebateImages[promo.image]}
                        alt={promo.name}
                        className="promotion-image"
                    />

                    <div className="promotion-info">
                        <h3 className="promotion-name">{promo.name}</h3>
                        <p className="promotion-expiration">{promo.expiration}</p>
                        <p className="promotion-discount">{promo.discount}% Off</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
