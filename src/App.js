import React from 'react'
import Form from './Form'
import './App.css'

const variables = [
  {
    type: 'continuous',
    name: 'AGE',
    label: 'Age',
    range: [0, 18],
  },
  {
    type: 'categorical',
    name: 'SEX',
    label: 'Sex',
    values: ['female', 'male'],
  },
  {
    type: 'categorical',
    name: 'SMN',
    label: 'SMN',
    values: [0, 1],
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.initalState = {
      values: {
        groupingVariable: {
          name: 'SMN',
          trueIf: {
            value: '1',
            operator: 'eq',
          },
          label: {
            true: '',
            false: '',
          },
        },
        covariates: [
          {
            name: 'AGE',
            label: '',
            type: 'continous',
            unit: 1,
          },
        ],
      },
    }
    this.state = this.initalState
  }

  handleChangeGroupingVariable = (e, key) => {
    const values = this.state.values
    if (key === 'name') {
      values.groupingVariable[key] = e.target.value
    }
    if (key === 'operator' || key === 'value') {
      values.groupingVariable.trueIf[key] = e.target.value
    }
    if (key === 'true' || key === 'false') {
      values.groupingVariable.label[key] = e.target.value
    }
    this.setState({ values })
  }

  handleCovariateChange = (e, index, key) => {
    const values = this.state.values
    const target_value = e.target.value
    values.covariates[index][key] = target_value
    this.setState({ values })
  }

  handletypeChange = (e, index, key) => {
    const values = this.state.values
    const covariate = values.covariates[index]
    const new_covariate = {
      name: covariate.name,
      label: covariate.label,
      type: e.target.value,
    }
    if (e.target.value === 'categorical') {
      new_covariate.unit = 1
    }
    if (e.target.value === 'bucketized') {
      new_covariate.values = 1
      new_covariate.cutoffs = []
    }
    if (e.target.value === 'continous') {
      new_covariate.unit = 1
    }

    values.covariates[index] = new_covariate
    this.setState({ values })
  }

  addCovariate = (event) => {
    const values = this.state.values
    values.covariates.push({
      name: 'AGE',
      label: '',
      type: 'continous',
      unit: 1,
    })
    this.setState({ values })
  }

  removeCovariate = (index) => {
    const values = this.state.values
    values.covariates.splice(index, 1)
    this.setState({ values })
  }

  handleReset = () => {
    this.setState({
      values: {
        groupingVariable: {
          name: 'SMN',
          trueIf: {
            value: '1',
            operator: 'eq',
          },
          label: {
            true: '',
            false: '',
          },
        },
        covariates: [
          {
            name: 'AGE',
            label: '',
            type: 'continous',
            unit: 1,
          },
        ],
      },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.values)
  }

  render() {
    const values = this.state.values
    return (
      <div className="div-container">
        <div className="div-form">
          <Form values={values}   handleChangeGroupingVariable={this.handleChangeGroupingVariable}
          handleCovariateChange={this.handleCovariateChange}
          handletypeChange={this.handletypeChange}
          addCovariate={this.addCovariate}
          removeCovariate={this.removeCovariate}
          handleReset={this.handleReset}
          handleSubmit={this.handleSubmit}
          />
        </div>

        <div style={{ margin: '0 1rem' }}>
          <h1>Current values</h1>
          <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

export default App
