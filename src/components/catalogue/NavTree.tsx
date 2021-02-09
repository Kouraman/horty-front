import React from "react";


export interface navTreeData{
    tree:string[]
    parentCallback?:any
}

export default class NavTree extends React.Component<navTreeData,navTreeData> {

    constructor(props:any) {
        super(props);
        this.state = {
            tree:this.props.tree
        }
    }

    componentWillReceiveProps(props:any) {
        this.setState({ tree: this.props.tree });
    }

    handleClick = (event:React.MouseEvent<HTMLElement>,index:number) =>{
        event.preventDefault()
        this.props.parentCallback(this.props.tree.length-index);
    }

    render() {
        return (
            <div className={"navTree"}>
                {
                    this.state.tree.map( (elem:string,index:number) => {
                        return (
                            <span>
                                <a href={elem} key={"navTreeItem"+index} onClick={(event: React.MouseEvent<HTMLElement>) => this.handleClick(event,index)}>{elem} </a>
                            </span>
                        )
                    })
                }
            </div>
        );
    }
}

// class NavTreeItem extends React.Component<navTreeData, navTreeData>{
//     constructor(props:any) {
//         super(props);
//         this.state = {
//             name:this.props.name,
//             linkApiUrl:this.props.linkApiUrl,
//         }
//     }
//
//     eventHref(event:React.MouseEvent<HTMLElement>){
//         this.props.parentCallback(this.state.linkApiUrl);
//         event.preventDefault()
//     }
//
//     reader(){
//         return(
//             <a href={this.state.name} onClick={(event: React.MouseEvent<HTMLElement>) => this.eventHref(event)}>
//                 {this.state.name}
//             </a>
//         )
//     }
// }