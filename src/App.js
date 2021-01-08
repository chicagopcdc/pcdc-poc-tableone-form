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
        "size": "Sample size (SMN)",
        "true": "SMN Formed",
        "false": "No SMN Formed"
    },
    "variables": [
        {
            "name": "Mean age at diagnosis (mo)",
            "size": {
                "total": 5327,
                "true": 47
            },
            "pval": 0.23,
            "keys": [
                {
                    "name": "",
                    "data": {
                        "true": 27.5,
                        "false": 18.0
                    }
                }
            ]
        },
        {
            "name": "Age at diagnosis",
            "size": {
                "total": 5787,
                "true": 42
            },
            "pval": 0.27,
            "keys": [
                {
                    "name": "< 18 mo",
                    "data": {
                        "true": 41.9,
                        "false": 51.3
                    }
                },
                {
                    "name": ">= 18 mo",
                    "data": {
                        "true": 58.1,
                        "false": 50.0
                    }
                }
            ]
        },
        {
            "name": "Sex",
            "size": {
                "total": 6001,
                "true": 51
            },
            "pval": 0.07,
            "keys": [
                {
                    "name": "Female",
                    "data": {
                        "true": 62.8,
                        "false": 46.6
                    }
                },
                {
                    "name": "Male",
                    "data": {
                        "true": 37.2,
                        "false": 53.4
                    }
                }
            ]
        }
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

    const [isInputChanged, setIsInputChanged] = useState(false)
    useEffect(() => {
      setIsInputChanged(true)
    }, [userInput])


    const url="http://localhost:5000"

    const handleSubmit = (requestBody) => {  
        fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            //body: JSON.stringify("test"),
            body: JSON.stringify(requestBody),
          })
            .then((response) => {
              if (!response.ok) throw Error(`HTTP status: ${response.status}`)
              return response.json()
            })
            .then((result) => {
                setTableData({data : result})
              })
            .catch((e) => console.error(e))
    }



   
    // useEffect(() => {
    //     console.log("useEffect")
    //     console.log(userInput)
    // }, [userInput]);

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
                    onSubmit={handleSubmit(userInput)}
                />
            </div>

            <div style={{ margin: '0 1rem' }}>
                <h1>Output</h1>
                <pre>{JSON.stringify(userInput, null, 4)}</pre>
                <pre>{JSON.stringify(tableData, null, 4)}</pre>
            </div>

            <div style={{ margin: '0 1rem' }}>
                <h1>Output</h1>
                <Table 
                data={tableData.data}
                />
            </div>

        </div>
    )
}

export default App;
