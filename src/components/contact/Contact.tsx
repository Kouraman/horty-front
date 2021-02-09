import React from "react";
import './Contact.css';
import company from './company.jpg';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {IconButton} from "@material-ui/core";


interface marche{
    place:string
    address:string
    codePostal:string
    infoCompl:string,
    day:string,
    period:string,
}
interface tel{
    num:number,
    who:string
}
interface contact{
    companyName:string;
    address:string,
    codePostal:string,
    gps:string,
    email:string,
    tels:tel[],
    marches:marche[]
}
export default class Contact extends React.Component<any,contact> {

    constructor(props:any) {
        super(props);
        this.state =({
            companyName:"Brieussel Horticulture",
            address:"205 Route de Pébrines",
            codePostal:"81390 Puybegon",
            gps:"43°47'19.5\"N 1°53'51.8\"E",
            email:"francisbrieussel@gmail.com",
            tels:this.tels(),
            marches:this.marches(),

        })
    }

    tels(){
        let listTel:tel[]=[];

        let phone1:tel={
            num:33613043952,
            who:"Françis Brieussel"
        }
        listTel.push(phone1)

        let phone2:tel={
            num:33613071460,
            who:"Patricia Brieussel"
        }
        listTel.push(phone2)

        return listTel;
    }

    marches(){
        let listMarches:marche[]=[];

        let briatexte:marche={
            place:"Briatexte",
            address:"3 Avenue de Lavaur",
            codePostal:"81390 Briatexte",
            infoCompl:"En face de l'église",
            day:"Lundi Matin",
            period:"Mi-Avril / Fin Mai & Fêtes"

        }
        listMarches.push(briatexte)

        let lavaur1:marche={
            place:"Lavaur",
            address:"5 Allée Jean Jaurès",
            codePostal:"81500 Lavaur",
            infoCompl:"En face de la poste",
            day:"Mercredi Matin",
            period:"Debut Mars / Fin Octobre"
        }
        listMarches.push(lavaur1)

        let graulhet1:marche={
            place:"Graulhet",
            address:"Place du Jourdain",
            codePostal:"81300 Graulhet",
            infoCompl:"En face du bureau de tabac",
            day:"Jeudi Matin",
            period:"Debut Mars / Fin Octobre"
        }
        listMarches.push(graulhet1)

        let gaillac:marche={
            place:"Gaillac",
            address:"4 Rue Jean Jaurès",
            codePostal:"81600 Gaillac",
            infoCompl:"Devant la Boucherie Palmerio",
            day:"Vendredi Matin",
            period:"Debut Mars / Fin Octobre"
        }
        listMarches.push(gaillac)

        let lavaur2:marche={
            place:"Lavaur",
            address:"12 Rue Escourssières de Naridelle",
            codePostal:"81500 Lavaur",
            infoCompl:"En face du Crédit Agricole",
            day:"Samedi Matin",
            period:"Toute l'année"
        }
        listMarches.push(lavaur2)

        let graulhet2:marche={
            place:"Graulhet",
            address:"Place du Jourdain",
            codePostal:"81300 Graulhet",
            infoCompl:"En face du bureau de tabac",
            day:"Dimanche Matin",
            period:"Toute l'année"
        }
        listMarches.push(graulhet2)

        return listMarches;
    }

    formatTel(phoneNumber:number){
        let match = phoneNumber.toString().match(/^(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/);
        if (match) {
            //              //Internation format
            // let ret:string ='('+match[1]+') ';
            // for(let i=2;i<match.length;i++) {
            //     ret=ret+'.'+match[i];
            // }
            // return ret;
                            //Fr fomrat
            let ret:string ='06';
            for(let i=3;i<match.length;i++) {
                ret=ret+'.'+match[i];
            }
            return ret;

        }else {return "formatTelError";}
    }

    getAddress(htmlIdAdress:string,htmlIdPostalCode?:string):void {
        let textField = document.createElement('textarea')
        let address:string
        let codePostal:string
        // @ts-ignore
        address = document.getElementById(htmlIdAdress).textContent;
        if( typeof htmlIdPostalCode != 'undefined'){
            // @ts-ignore
            codePostal = document.getElementById(htmlIdPostalCode).textContent;
            textField.innerText = address+', '+codePostal;
        }else{
            textField.innerText = address;
        }

        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }



    render() {

        return (

            <div className="contact main">
                <div className={"flex contactMain"}>
                    <div className={"contactMainInfo"}>
                        <h2 className={"block"}>{this.state.companyName}</h2>
                        <a className={"block contactMainData"} href={"mailto:"+this.state.email}>{this.state.email}</a>
                        <div className={"flex contactMainData"}>
                            <div>
                                <p id={"mainAddress"}>{this.state.address}</p>
                                <p id={"mainCodePostal"}>{this.state.codePostal}</p>
                            </div>
                            <div className={"button"}>
                                <IconButton className={"iconButton"}>
                                    <FileCopyIcon onClick={() => this.getAddress("mainAddress","mainCodePostal")}/>
                                </IconButton>
                            </div>

                            {/*<Icon>file_copy</Icon>*/}
                        </div>
                        <p className={"block contactMainData"}>{this.state.gps}</p>
                        <div className={"flex contactPhone"}>
                            {
                                this.state.tels.map( (elem:tel,index:number) => {
                                    return (
                                        <div key={"tel"+index}>
                                            <p>{elem.who} </p>
                                            <p><a id={"phone"+index} href={"tel:+"+elem.num} key={"phone"+index}>{this.formatTel(elem.num)}</a></p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={"contactMainImg"}>
                        <img src={company} alt=""/>
                    </div>
                </div>

                <div className={"flex contactMarches"}>
                    {
                        this.state.marches.map( (elem:marche,index:number) => {
                            return (
                                <div className={"flexHoriz contactMarcheBlock"} key={"marche"+index}>
                                    <h3 className={"marchePlaceName"}>{elem.place}</h3>
                                    <div className={"flex marcheAdressBlock"}>
                                        <div>
                                            <p id={"marcheAddress"+index}>{elem.address}</p>
                                            <p id={"marcheCodePost"+index}>{elem.codePostal}</p>
                                        </div>

                                        <span>
                                            <IconButton className={"iconButton"} >
                                                <FileCopyIcon onClick={() => this.getAddress("marcheAddress"+index)}/>
                                            </IconButton>
                                        </span>

                                    </div>

                                    <p>{elem.infoCompl}</p>
                                    <p>{elem.day}</p>
                                    <p>{elem.period}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}