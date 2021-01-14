import React, { useState, useEffect } from 'react'
import Form from './Form'
import './App.css'
import Table from './Table';

const variables = [
    {
        type: 'continuous',
        name: 'AGE',
        label: 'Age',
        isGrouping: false,
        range: [2, 19],
    },
    {
        type: 'categorical',
        name: 'SEX',
        label: 'Sex',
        isGrouping: false,
        values: ['female', 'male'],
    },
    {
        type: 'continuous',
        name: 'WEIGHT',
        label: 'Weight',
        isGrouping: true,
        range: [60, 200]
    },
    {
        type: 'categorical',
        name: 'SMN',
        label: 'SMN',
        isGrouping: true,
        values: [0, 1],
    }
]

const data = {
    "headers": {
    },
    "variables": [
    ]
}

function App() {
    const allGrpIndex = variables.filter(item => item.isGrouping === true).map(x => variables.indexOf(x))
    const [grpIndex, setGrpIndex] = useState(allGrpIndex[0]);

    const initialState={
        values: {
            groupingVariable: {
                name: variables[grpIndex].name,
                type: variables[grpIndex].type,
                values: variables[grpIndex].type==="categorical" ? variables[grpIndex].values:variables[grpIndex].range,
                trueIf: {
                    value: variables[grpIndex].type==="categorical" ? variables[grpIndex].values[0]:'',
                    operator: 'eq',
                },
                label: {
                    true: '',
                    false: '',
                },
            },
            covariates: []
        },
        
    };

  
    const [userInput, setUserInput] = useState(initialState);

    const initalData = {data : data}
    const [tableData, setTableData] = useState(initalData);

    const updateUserInput = (newInput) => {
        setUserInput({...newInput});
    };

    const updateGrpIndex = (newGrpInex) => {
        setGrpIndex(newGrpInex);
    };

    const resetForm = () => {
        setUserInput(initialState)
    }


    const url="http://localhost:5000"

    const handleSubmit = (requestBody) => {  
        console.log("aaa")
        fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          })
            .then((response) => {
              if (!response.ok) throw Error(`HTTP status: ${response.status}`)
              return response.json()
            })
            .then((result) => {
                setTableData({data : result})
              })
           
            
    }
   

    return (
        <div className="div-container m-3">
            <div className="div-form">
                <Form
                    variables={variables}
                    allGrpIndex={allGrpIndex}
                    input={userInput}
                    gid={grpIndex}
                    resetForm={resetForm}
                    updateUserInput={updateUserInput}
                    updateGrpIndex={updateGrpIndex}
                    onSubmit={() => handleSubmit(userInput)}
                />
            </div>

            <div className="div-table" style={{ margin: '0 1rem' }}>
                <h1>Table</h1>
                <Table 
                data={tableData.data}
                />
            </div>

        </div>
    )
}

export default App;
