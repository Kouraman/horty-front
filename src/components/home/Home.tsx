import React from "react";
import './Home.css';


export default class Home extends React.Component {

    render() {


        return (
            <div className={"home"}>
                <h1>Bienvenue sur la version de devellopement du site web Brieussel Horticulture!</h1>
                <p>De nombreuses coquilles, coquillages et coquilettes sont présents. Et c'est normal, je travaille encore dessus!</p>
                <h4>Le site n'est actuellement pas responsive!!!</h4>
                <p><i>Si vous souhaitez donner des retours, je vous demanderai donc de ne le faire que sur la base d'une version Ordinateur, et pas d'une version Smartphone!</i></p>
                <p>Votre avis compte, n'hésitez pas à me donner vos retours et des conseils de mise en page du contenu</p>
                <p>Vous pouvez me contacter par mail avec l'en tête [bbhorty]: <a href={"mailto:nicolas.brieussel@mines-paristech.fr"}> nicolas.brieussel@mines-paristech.fr</a></p>
                <p>Ex : [bbhorty] - Le catalogue est mal foutu!!! </p>
                <p>Vous pouvez également donner des retours par messages privés sur notre <a href={"https://www.facebook.com/Brieussel-Horticulture-113564956950237"}>Facebook</a></p>
            </div>
        )
    }
}