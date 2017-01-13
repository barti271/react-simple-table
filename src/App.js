import React, { Component } from 'react';
import './App.css';

import Table from "./table/Table";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table
            className="my-table"
            columns={[
                {
                    title: "First column"
                },
                {
                    title: "Second one"
                },
                {
                    title: "Last column"
                }
            ]}
            data={
                [
                    {
                        id: 0,
                        name: "John",
                        age: 12
                    },
                    {
                        id: 1,
                        name: "Janet",
                        age: 23
                    },
                    {
                        id: 2,
                        name: "Jack",
                        age: 14
                    },
                ]
            }
        />
      </div>
    );
  }
}

export default App;
