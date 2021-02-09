import React from "react";
import axios from "axios";
import CatalogueItem from "../catalogue/catalogueItem/CatalogueItem";
import './Catalogue.css';
import returnImg from './return.png'
import NavTree from "./NavTree";
import PlantItem from "./catalogueItem/PlantItem";
import {IconButton} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Loader from "react-loader-spinner";

export interface imageApiData{
    id:number,
    srcImg:string,
}
export interface adviceApiData{
    id:number,
    name:string,
    advice:string,
}

export interface treatmentApiData{
    id:number,
    name:string,
    treatment:string,
}

export interface priceApiData{
    id:number,
    name:string,
    price:number,
    quantity:number
}

export interface apiDataPlant {
    id: number,
    name: string,
    description:string,
    img: imageApiData[],
    pathName: string,
    prices: priceApiData[],
    advices: adviceApiData[],
    treatments: treatmentApiData[],
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
                this.state.isCatalogueItem?(
                    this.setState({data :res.data as apiDataCatalogue[], isLoaded:true})
                ):(
                    this.setState({data :[res.data] as apiDataPlant[], isLoaded:true})
                )
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
            isLoaded:false,
            navTree:this.state.navTree.concat([childData.name+"/"]),
            apiUrl: childData.pathName
        },async () => {
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
                isLoaded:false,
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
            return (
            <div className="main spinner">
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
            )

        }

        return (
            <div className="main">
                <div className={"catalogueNavigation"}>
                    <IconButton className={"iconButton"}>
                        <ArrowBackIosIcon fontSize="large" onClick={this.returnEvent.bind(this)}/>
                    </IconButton>
                    <NavTree tree={this.state.navTree} parentCallback = {this.handleCallbackNav}/>
                </div>
                <div className="catalogue">
                    {
                        this.state.isCatalogueItem?
                            (
                                this.state.data as apiDataCatalogue[]).map( (elem,x) => {
                                    return (<CatalogueItem id={elem.id} name={elem.name} srcImg={elem.srcImg} pathName={elem.pathName} key={"catalogueItem"+x} parentCallback = {this.handleCallback}/>)
                                }
                            ):(
                                this.state.data as apiDataPlant[]).map( (elem,x) => {
                                    return (<PlantItem data={elem} key={x}/>)
                            })
                    }

                </div>
            </div>
            );







    }
}