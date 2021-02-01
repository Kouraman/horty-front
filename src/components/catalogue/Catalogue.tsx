import React from "react";
import axios from "axios";
import CatalogueItem from "../catalogue/catalogueItem/CatalogueItem";
import './Catalogue.css';
import returnImg from './return.svg'


export interface apiDataPlant {
    id: number,
    name: string,
    srcImg: string,
    pathName: string,
    parentCallback?:any,
}

export interface apiDataCatalogue {
    id: number,
    name: string,
    srcImg: string,
    pathName: string,
    parentCallback?:any,
}

interface State {
    isLoaded : boolean,
    data : apiDataCatalogue[] | apiDataPlant[],
    isCatalogueItem:boolean
    history:string[]
    apiUrl:string,
}

export default class Catalogue extends React.Component<any,State> {

    static regexTest =  new RegExp('plant*');

    constructor(props:any) {
        super(props)
        this.state = {
            isLoaded : false,
            data : [],
            apiUrl:"http://api.bbhorty.ml/catalogue",
            history:[],
            isCatalogueItem:true,
        }
    }
    async componentDidMount() {
        axios.get(this.state.apiUrl)
            .then(res => {
                this.setState({data:res.data, isLoaded:true})
                console.log(this.state.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    checkItemNature(){
        if(Catalogue.regexTest.test(this.state.apiUrl)){
            this.setState({
                isCatalogueItem:false,
            })
        }else{
            this.setState({
                isCatalogueItem:true,
            })
        }
    }

    handleCallback = (childData:string) =>{
        this.setState({
            history:this.state.history.concat([this.state.apiUrl]),
            data:[],
            apiUrl: childData
        },async () => {
            await this.checkItemNature()
            await this.componentDidMount()
        })
    }

    returnEvent(){
        if(this.state.history.length !== 0){ //Do something only if there is something to go back
            let url:string = this.state.history.pop() as string

            this.setState({
                history:this.state.history,
                data:[],
                apiUrl: url,
                isCatalogueItem:true, //On return, it's every time a catalog item
            },async ()=>{
                await this.componentDidMount()
            })
        }

    }


    render() {
        if (!this.state.isLoaded) {
            return "rendering" /* or a loader/spinner */
        }

        return (
            <div className="">
                <img className="catalogueReturn" src={returnImg} alt="" onClick={this.returnEvent.bind(this)}/>
                <div className="catalogue">
                    {
                        this.state.data.map( (elem,x) => {
                            return (<CatalogueItem id={elem.id} name={elem.name} srcImg={elem.srcImg} pathName={elem.pathName} key={x} parentCallback = {this.handleCallback}/>)
                        })
                    }
                </div>
            </div>
            );







    }
}