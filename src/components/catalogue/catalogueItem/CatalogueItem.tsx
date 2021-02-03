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


        let selection :string = (window.getSelection() as Selection).toString();
        if(selection.length <= 0){
            this.props.parentCallback(this.state);
            event.preventDefault()
        }

    }


    render() {
        return (
            <div className={"catalogueItem"} onClick={(event: React.MouseEvent<HTMLElement>) => this.onTrigger(event)}>
                <img className="catalogueItemImage"
                     onError={this.onImgError.bind(this)}
                     src={this.state.srcImg}

                     alt={"returnButton"}
                />
                <div className={"catalogueItemName"}> {this.state.name}</div>
            </div>
        )
    }
}