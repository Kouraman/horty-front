import React from "react";


interface marche{
    place:string
    address:string
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
            who:"Françis Brieussel"
        }
        listTel.push(phone2)

        return listTel;
    }

    marches(){
        let listMarches:marche[]=[];

        let briatexte:marche={
            place:"Briatexte",
            address:"3 Avenue de Lavaur, 81390 Briatexte",
            infoCompl:"En face de l'église",
            day:"Lundi Matin",
            period:"Mi-Avril / Fin Mai & Fêtes"

        }
        listMarches.push(briatexte)

        let lavaur1:marche={
            place:"Lavaur",
            address:"5 Allée Jean Jaurès, 81500 Lavaur",
            infoCompl:"En face de la poste",
            day:"Mercredi Matin",
            period:"Debut Mars / Fin Octobre"
        }
        listMarches.push(lavaur1)

        let graulhet1:marche={
            place:"Graulhet",
            address:"Place du Jourdain, 81300 Graulhet",
            infoCompl:"En face du bureau de tabac",
            day:"Jeudi Matin",
            period:"Debut Mars / Fin Octobre"
        }
        listMarches.push(graulhet1)

        let gaillac:marche={
            place:"Gaillac",
            address:"4 Rue Jean Jaurès, 81600 Gaillac",
            infoCompl:"Devant la Boucherie Palmerio",
            day:"Vendredi Matin",
            period:"Debut Mars / Fin Octobre"
        }
        listMarches.push(gaillac)

        let lavaur2:marche={
            place:"Lavaur",
            address:"12 Rue Escourssières de Naridelle, 81500 Lavaur",
            infoCompl:"En face du Crédit Agricole",
            day:"Samedi Matin",
            period:"Toute l'année"
        }
        listMarches.push(lavaur2)

        let graulhet2:marche={
            place:"Graulhet",
            address:"Place du Jourdain, 81300 Graulhet",
            infoCompl:"En face du bureau de tabac",
            day:"Jeudi Matin",
            period:"Toute l'année"
        }
        listMarches.push(graulhet2)

        return listMarches;
    }

    formatTel(phoneNumber:number){
        let match = phoneNumber.toString().match(/^(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/);
        if (match) {
            let ret:string ='('+match[1]+') ';
            for(let i=2;i<match.length;i++) {
                ret=ret+'.'+match[i];
            }
            return ret;

        }else {return "formatTelError";}
    }



    render() {

        return (

            <div className="Contact">
                <div className={"ContactHome"}>
                    companyName:"Brieussel Horticulture",
                    address:"205 Route de Pébrines",
                    gps:"43°47'19.5\"N 1°53'51.8\"E",
                    email:"francisbrieussel@gmailcom",
                    <p>{this.state.companyName}</p>
                    <a href={"mailto:"+this.state.email}>{this.state.email}</a>
                    <p>{this.state.address}</p>
                    <p>{this.state.gps}</p>
                    {
                        this.state.tels.map( (elem:tel,index:number) => {
                            return (
                                <div key={"tel"+index}>
                                    <p>{elem.who+" : "}</p>
                                    <a href={"tel:+"+elem.num} key={"phone"+index}>{this.formatTel(elem.num)}</a>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.marches.map( (elem:marche,index:number) => {
                            return (
                                <div key={"marche"+index}>
                                    <p>{elem.place}</p>
                                    <p>{elem.address}</p>
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