import { Car } from "../../models"
import "./CarItem.css"

type Props ={
    car:Car
}

export default function CarItem({car}:Props) {
    const equipments = car.equipment.split(",")


    

    const handleClick = () => {
        const labels = document.querySelectorAll(".label")
        if(labels.length > 0){
            labels.forEach(label => label.className = "coloredLabel")
            return
        }
        const coloredLabels = document.querySelectorAll(".coloredLabel")
        if(coloredLabels.length > 0){
            coloredLabels.forEach(label => label.className = "label")
            return
        }
    }


    return (
        <div className="carItem">
            <div className="imageContainer">
                <img src={`http://localhost:3019/img/${car.image}`} className="carImage"/>
            </div>
            <div className="details">
                <div className="row"><div className="label">Manufacturer: </div> {car.manufacturer}</div>
                <div className="row"><div className="label">Model: </div> {car.model}</div>
                <div className="row"><div className="label">Constuction Year: </div> {car.constuctionYear}</div>
                <div className="row"><div className="label">Fuel Type: </div> {car.fuelType}</div>
                <div className="row"><div className="label">Horse Power: </div> {car.power}</div>
                <div className="row"><div className="label">Engine Size: </div> {car.engineSize}</div>
                <br/>
                <div className="row">
                    <div className="label">
                        Equipments: 
                    </div>
                </div>
                    <div className="row">
                    <ul className="list">
                        {equipments.slice(0,9).map((equipment, index) =>{
                            return <li key={index}>{equipment}</li>
                        })}
                    </ul>   
                </div>            
            </div>
            <div className="price">
                Price: {car.price} EUR
            </div>
            <div className="row">
                <button className="button" onClick={handleClick}>
                        Change Color
                </button>

            </div>
        </div>
    )
}