import React from "react";
import {apiDataPlant} from "../Catalogue";
import './CatalogueItem.css';
import left from './left.svg'
import right from './right.svg'
import srcError from './error.jpg'
import './PlantItem.css'

interface PlantItemState{
    data:apiDataPlant
    imgIndex:number,
    srcImg:string,
}

interface Props{
    data:apiDataPlant
}

export default class PlantItem extends React.Component<Props,PlantItemState> {

    constructor(props:Props) {
        super(props)
        this.state = {
            data:this.props.data,
            imgIndex:0,
            srcImg:this.props.data.img[0].srcImg
        }
    }

    onImgError() {
        this.setState({
            srcImg: srcError
        })
    }

    priceFormater(price:number, quantity:number){
        let priceFormat = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
        if(quantity===1){
            return priceFormat.toString();
        }else{
            return priceFormat.toString()+" les "+quantity
        }
    }


    render() {
        return (
            <div className={"PlantItem"}>
                <div className={"flex"}>
                    <div className="flex PlantItemImage">
                            {/*<div className={"PlantItemImageSwipe PlantItemImageSwipeRight"}></div>*/}
                            <img className={"PlantItemImageSwipe PlantItemImageSwipeRight"} src={left}/>
                            <img className={"PlantItemImageContent"}
                                onError={this.onImgError.bind(this)}
                                src={this.state.srcImg}
                                alt={"PlantImg"}
                            />
                            <img className={"PlantItemImageSwipe PlantItemImageSwipeLeft"} src={right}/>
                            {/*<div className={"PlantItemImageSwipe PlantItemImageSwipeLeft"}></div>*/}
                    </div>
                    <div className={"flexHoriz PlantItemProductSheet"}>
                        <div className={"flex plantTitlePrices"}>
                            <div className={"PlantItemName"}> {this.state.data.name}</div>
                            <div className={"PlantItemPrices"}>
                                {
                                    this.state.data.prices.map( (elem,x) => {
                                        return (
                                            <div className={"PlantItemPrice"} key={"price"+x}>
                                                {this.priceFormater(elem.price,elem.quantity)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={"PlantItemDescription"}>
                            <hr/>
                            <h4>Description</h4>
                            <p>{this.state.data.description}</p>
                        </div>
                    </div>
                </div>

                <div className={(this.state.data.advices.length?("display"):("hidden")).concat(" PlantOtherDescription PlantItemAdvices")}>
                    <h5>Conseils</h5>
                    <ul>
                    {
                        this.state.data.advices.map( (elem,x) => {
                            return (
                                <li className={"PlantItemAdvice"} key={"advice"+x}>
                                    {elem.advice}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
                <div className={(this.state.data.treatments.length?("display"):("hidden")).concat(" PlantOtherDescription PlantItemTreatments")}>
                    <h5>Traitements</h5>
                    <ul>
                    {
                        this.state.data.treatments.map( (elem,x) => {
                            return (
                                <li className={"PlantItemTreatment"} key={"treatment"+x}>
                                    {elem.treatment}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
}