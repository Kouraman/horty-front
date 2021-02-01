import React from "react";
import PresentationBlock from "./PresentationBlock";

export default class Presentation extends React.Component {


    render() {
        const blocks = ["HISTORY","QUALITY","ADVICE"]

        return (
            <div className="presentation">
                {blocks.map((value, index) => {
                    return <PresentationBlock selector={value} inverted={index % 2 === 1} />
                })}
            </div>
        )
    }
}