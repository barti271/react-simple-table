import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import Head from "./Head";
import sinon from "sinon";

describe("Head", () => {

    const props = {
        columns: []
    };

    const options = {
        context: {
            semantic: true
        }
    };

    it("should render table header with basic markup", () => {
        const wrapper = mount(<Head />, options);

        expect(wrapper.find("thead")).to.have.length(1);
    });

    it("should render no columns if no data provided", () => {
        const wrapper = mount(<Head {...props} />, options);

        expect(wrapper.find("th")).to.have.length(0);
    });

    it("should render columns", () => {
        const columns = [
            {
                title: "Column1"
            },
            {
                title: "Column2"
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        expect(columnsElements).to.have.length(columns.length);
        expect(columnsElements.at(0).text()).to.equal(columns[0].title);
        expect(columnsElements.at(1).text()).to.equal(columns[1].title);
    });

    it("should render sorting indicator", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC"
            },
            {
                title: "Column2",
                sorted: "DESC"
            }
        ];
        const newProps = Object.assign({}, props, {
            columns
        });
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        expect(columnsElements).to.have.length(columns.length);
        expect(columnsElements.at(0).find(".sorter.sorted-asc")).to.have.length(1);
        expect(columnsElements.at(1).find(".sorter.sorted-desc")).to.have.length(1);
    });

    it("should render sorting indicator with specified template", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC"
            },
            {
                title: "Column2",
                sorted: "DESC"
            }
        ];
        const sorterComponent = (sorted) => <p className="custom-sorter">{sorted}</p>;
        const newProps = Object.assign({}, props, {
            columns,
            sorterComponent
        });
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        expect(columnsElements).to.have.length(columns.length);
        expect(columnsElements.at(0).find(".custom-sorter").text()).to.equal("ASC");
        expect(columnsElements.at(1).find(".custom-sorter").text()).to.equal("DESC");
    });

    it("should call onSort callback with clicked column", () => {
        const columns = [
            {
                title: "Column1",
                sorted: "ASC"
            },
            {
                title: "Column2",
                sorted: "DESC"
            }
        ];
        const sorterComponent = (sorted) => <p className="custom-sorter">{sorted}</p>;
        const onSort = sinon.spy();
        const newProps = Object.assign({}, props, {
            columns,
            sorterComponent,
            onSort
        });
        const wrapper = mount(<Head {...newProps} />, options);
        const columnsElements = wrapper.find("th");

        columnsElements.at(0).simulate("click");

        expect(onSort.calledWith(columns[0])).to.equal(true);
    });
});