import React from "react";
import axios from "axios";
import CatalogueItem from "../catalogue/catalogueItem/CatalogueItem";
import './Catalogue.css';
import returnImg from './return.svg'
import NavTree from "./NavTree";


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
    navTree : string[]
    apiUrl:string,
}

export default class Catalogue extends React.Component<any,State> {

    static regexTest =  new RegExp('plant*');
    static homeCatalogueApi = "http://api.bbhorty.ml/catalogue";

    constructor(props:any) {
        super(props)
        this.state = {
            isLoaded : false,
            data : [],
            apiUrl: Catalogue.homeCatalogueApi,
            history:[],
            navTree:["Catalogue/"],
            isCatalogueItem:true,
        }
    }
    async componentDidMount() {
        axios.get(this.state.apiUrl)
            .then(res => {
                this.setState({data:res.data, isLoaded:true})

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

    handleCallback = (childData:apiDataCatalogue) =>{
        this.setState({
            history:this.state.history.concat([this.state.apiUrl]),
            data:[],
            navTree:this.state.navTree.concat([childData.name+"/"]),
            apiUrl: childData.pathName
        },async () => {
            console.log(this.state.navTree)
            await this.checkItemNature()
            await this.componentDidMount()
        })
    }

    handleCallbackNav = (numberToBack:number) =>{
        let i;
        for(i=1;i<numberToBack;i++){
            this.returnEvent();
        }
    }

    returnEvent(){
        if(this.state.history.length !== 0){ //Do something only if there is something to go back
            let url:string = this.state.history.pop() as string
            this.state.navTree.pop()

            this.setState({
                history:this.state.history,
                data:[],
                apiUrl: url,
                isCatalogueItem:true, //On return, it's every time a catalog item
                navTree:this.state.navTree,

            },async ()=>{
                await this.componentDidMount()
            })
        }

    }

    hideReturn(){
        if(this.state.history.length===0){
            return "hidden "
        }
        else {
            return "display "
        }
    }


    render() {
        if (!this.state.isLoaded) {
            return "rendering" /* or a loader/spinner */
        }

        return (
            <div className="">
                <img className={"catalogueReturn " + this.hideReturn()} src={returnImg} alt="" onClick={this.returnEvent.bind(this)}/>
                <NavTree tree={this.state.navTree} parentCallback = {this.handleCallbackNav}/>
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