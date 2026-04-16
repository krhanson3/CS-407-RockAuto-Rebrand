import { Promotions } from "../../components/promotionCards";
import type { Promotion } from "../../types/types";
import "../../styles/promotionsPage.css";
export default function PromotionsPage() {

    const promotionCards: Promotion[] = [
        {   name: "Bosch Fuel Pump", 
            expiration: "Expires 06/30/2026", 
            discount: 25, 
            image: "fuelPump" 
        },
        {   name: "Powerstope Brake Kit", 
            expiration: "Expires 05/15/2026", 
            discount: 15, 
            image: "brakes" 
        },
        {   name: "Mobil Diesel Enginer Oil", 
            expiration: "Expires 07/01/2026", 
            discount: 10, 
            image: "oil" 
        },
        {   name: "AutoMeter Gauges & Tool Sets", 
            expiration: "Expires 04/30/2026", 
            discount: 20, 
            image: "tools" 
        }
    ];

    return (
        <div className="promotions-page">
            <main className="promotions-main">
                <h1 className="promotions-title">
                    <span className="title-line">Promotions and Rebates</span>
                </h1>

                <Promotions promotionCards={promotionCards} />
            </main>
        </div>
    );
}
