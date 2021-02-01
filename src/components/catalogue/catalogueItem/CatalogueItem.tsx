import React from "react";
import {apiDataCatalogue} from "../Catalogue";
import './CatalogueItem.css';
import srcError from './error.jpg'


export default class CatalogueItem extends React.Component<apiDataCatalogue,apiDataCatalogue> {

    constructor(props:apiDataCatalogue) {
        super(props)
        this.state = {
            id : this.props.id,
            name: this.props.name,
            srcImg: this.props.srcImg,
            pathName: this.props.pathName,
        }
    }

    onImgError() {
        this.setState({
            srcImg: srcError
        })
    }

    onTrigger(event:React.MouseEvent<HTMLElement>){
        this.props.parentCallback(this.state.pathName);
        event.preventDefault();
    }


    render() {
        return (
            <div className={"catalogueItem"} onClick={(event: React.MouseEvent<HTMLElement>) => this.onTrigger(event)}>
                <img className="catalogueImage" onError={this.onImgError.bind(this)} src={this.state.srcImg}/>
                <p> {this.state.name}</p>
            </div>
        )
    }
}