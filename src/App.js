import React, { useState, useEffect } from 'react'
import Form from './Form'
import './App.css'

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

    const updateUserInput = (newInput) => {
        setUserInput({...newInput});
    };

    const updateGrpIndex = (newGrpInex) => {
        setGrpIndex(newGrpInex);
    };

    const resetForm = () => {
        setUserInput(initialState)
    }

    // useEffect(() => {
    //     console.log("useEffect")
    //     console.log(userInput)
    // }, [userInput]);

    return (
        <div className="div-container m-3">
            <div style={{ margin: '0 1rem' }}>
                <h1>Input</h1>
                <pre>{JSON.stringify(variables, null, 4)}</pre>
            </div>

            <div className="div-form">
                <Form
                    variables={variables}
                    allGrpIndex={allGrpIndex}
                    input={userInput}
                    gid={grpIndex}
                    resetForm={resetForm}
                    updateUserInput={updateUserInput}
                    updateGrpIndex={updateGrpIndex}
                />
            </div>

            <div style={{ margin: '0 1rem' }}>
                <h1>Output</h1>
                <pre>{JSON.stringify(userInput, null, 4)}</pre>
            </div>

        </div>
    )
}

export default App;
