import React from "react";
import './PresentationBlock.css';
import logoHistory from './conseil.png'
import logoQuality from './qualité.png'
import logoAdvice from './historique.png'

type PresentationProps = {
    selector: string,
    inverted: boolean
}

type PresentationState = {
    img : string,
    title : string,
    text : string,
}
export default class PresentationBlock extends React.Component<PresentationProps,PresentationState> {

    constructor(props:PresentationProps) {
        super(props)

        const history = "Historique: Brieussel Horticulture a été fondée en 1995, avec seulement deux serres et beaucoup de motivation, et a continué de grandir au fur et à mesure des années jusqu’à avoir aujourd’hui 12 serres de production ainsi que deux ombrières.";
        const quality = "De la qualité : Notre objectif est et sera toujours de vous fournir des plants avec la meilleure qualité possible. C’est pour cela que plus de 99% de nos produits ont été mis en culture dans nos serres, pour pouvoir être sûr que nos produits seront capables de s’adapter dans vos jardins";
        const advice = "Des conseils : Il n’est pas aisé de commencer un jardin sans connaissance. C’est pour cela qu’en plus de vous proposer des plants de qualités, nous vous fournissons également des conseils adaptés à vos besoins et votre installation. Novice ou expérimentés, nous souhaitons que vous puissiez récolter le fruit de votre labeur et en tirer une satisfaction maximale !";


        switch (this.props.selector)
        {
            case "HISTORY":
                this.state = {
                    img: logoHistory,
                    title: "Historique",
                    text: history
                }
                break;
            case "QUALITY":
                this.state = {
                    img: logoQuality,
                    title: "Qualité",
                    text: quality
                }
                break;
            case "ADVICE":

                this.state = {
                    img: logoAdvice,
                    title: "Conseils",
                    text: advice
                }
                break;

            default:
                this.state = {
                    img: logoAdvice,
                    title: "title",
                    text: "test",
                }
                break;
        }

    }

    render() {
        return (
            <div className="wrap">
                <div className= {"content " + (this.props.inverted ? "inverted" : "notInverted")}>
                    <img src={this.state.img}/>
                    <p><h1>{this.state.title}</h1>{this.state.text}</p>
                </div>
            </div>
        )
    }
}