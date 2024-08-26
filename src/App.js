import React, { useState, useEffect } from 'react'
import Form from './Form'
import './App.css'
import Table from './Table';

const variables = [
    {
        type: 'categorical',
        name: 'sex',
        label: 'sex',
        isGrouping: true,
        values: ['Male', 'Undifferentiated', 'Female', 'Other', 'Unknown', 'Not Reported'],
    },
    {
        type: 'categorical',
        name: 'ethnicity',
        label: 'ethnicity',
        isGrouping: true,
        values: ['Not Hispanic or Latino', 'Not Reported', 'Hispanic or Latino', 'Unknown'],
    },
    {
        type: 'categorical',
        name: 'race',
        label: 'race',
        isGrouping: true,
        values: ['Black or African American', 'Asian', 'White', 'Native Hawaiian or Other Pacific Islander', 'American Indian or Alaska Native', 'Not Reported', 'Multiracial', 'Unknown', 'Other'],
    },
    {
        type: 'continuous',
        name: 'age_at_lkss',
        label: 'age_at_lkss',
        isGrouping: true,
        range: [0, 99],
    },
    {
        type: 'categorical',
        name: 'lkss',
        label: 'lkss',
        isGrouping: true,
        values: ['Alive', 'Dead', 'Unknown'],
    },
    {
        type: 'continuous',
        name: 'age_at_smn',
        label: 'age_at_smn',
        isGrouping: false,
        range: [0, 99],
    },
    {
        type: 'categorical',
        name: 'smn site',
        label: 'smn_site',
        isGrouping: true,
        values: ['Head and Neck', 'Not Reported', 'Thorax', 'Unknown', 'Abdomen', 'Pelvis', 'CNS', 'Limbs', 'Other', 'Not Applicable'],
    }
]

const data = {
    "headers": [

    ],
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
                    value: variables[grpIndex].type==="categorical" ? [{value: variables[grpIndex].values[0]}]:'',
                    operator: 'eq',
                },
                label: {
                    true: "True",
                    false: "False",
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


    const url="http://127.0.0.1:5000"

    const handleSubmit = (requestBody) => {  
        console.log("aaa")
        console.log(requestBody)
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
                <h2>Table</h2>
                <Table 
                data={tableData.data}
                />
            </div>

        </div>
    )
}

export default App;