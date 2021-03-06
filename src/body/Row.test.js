import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import Row from "./Row";
import {Cell} from "./Cell";

describe("Row", () => {

    const props = {
        cells: []
    };

    it("should render cells from array", () => {
        const newProps = Object.assign({}, props, {
            cells: [
                {
                    content: "test"
                }
            ]
        });
        const wrapper = mount(<Row {...newProps}/>);

        expect(wrapper.find(Cell)).to.have.length(1);
    });
});