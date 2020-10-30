import React from 'react'
import ReactDOM from 'react-dom';
import './App.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.initalState= {
      values:
      {
        groupingVariable: {
          name: "SMN",
          trueIf: {
            value: "1",
            operator: "eq" 
          },
          label: {
            true: "",
            false: ""
          }
        },
        covariates: [
          {
            "name": "AGE",
            "label": "",
            "type": "continous", 
            "unit": 1,
          }
        ]
      }
    }
    this.state = this.initalState;
  }
    

  handleChangeGroupingVariable = (e, key) => {
    const values = this.state.values;
    if (key === "name") {
      values.groupingVariable[key] = e.target.value;
    }
    if (key === "operator" || key === "value") {
      values.groupingVariable.trueIf[key] = e.target.value;
    }
    if (key === "true" || key === "false") {
      values.groupingVariable.label[key] = e.target.value;
    }
    this.setState({ values });
  }

  handleCovariateChange = (e, index, key) => {
    const values = this.state.values;
    const target_value=e.target.value;
    values.covariates[index][key] = target_value;
    this.setState({ values });
  }

  handletypeChange = (e, index, key) => {
    const values = this.state.values;
    const covariate = values.covariates[index];
    const new_covariate = {
      name: covariate.name,
      label: covariate.label,
      type: e.target.value,
    }
    if (e.target.value === "categorical") {
      new_covariate.unit = 1;
    }
    if (e.target.value === "bucketized") {
      new_covariate.values = 1;
      new_covariate.cutoffs = [];
    }
    if (e.target.value === "continous") {
      new_covariate.unit = 1;
    }

    values.covariates[index] = new_covariate;
    this.setState({ values });
  }

  addCovariate = (event) => {
    const values = this.state.values;
    values.covariates.push({
      "name": "AGE",
      "label": "",
      "type": "continous",
      "unit": 1,
    });
    this.setState({ values });
  }

  removeCovariate = (index) => {
    const values = this.state.values;
    values.covariates.splice(index, 1);
    this.setState({ values });
  }

  handleReset = () => {
    this.setState(
      {
        values:
        {
          groupingVariable: {
            name: "SMN",
            trueIf: {
              value: "1",
              operator: "eq" 
            },
            label: {
              true: "",
              false: ""
            }
          },
          covariates: [
            {
              "name": "AGE",
              "label": "",
              "type": "continous", 
              "unit": 1, 
            }
          ]
        }
      }
    );
  }


  handleSubmit = (event) => {
    console.log(this.state.values);
    event.preventDefault();
  }


  render() {

    return (

      <div className="div-container"  >
        <div className="div-form" >

          <form id="myForm" onSubmit={this.handleSubmit.bind(this)}>
            <h2>Grouping variable</h2>
            <label >
              name:
                <select  value={this.state.values.groupingVariable.name} onChange={e => (this.handleChangeGroupingVariable(e, "name"))}>
                <option value="SMN">SMN</option>
                <option value="AGE">AGE</option>
                <option value="SEX">SEX</option>
              </select>
            </label><br />

            <label>
              True if...:
                <select value={this.state.values.groupingVariable.trueIf.operator} onChange={e => (this.handleChangeGroupingVariable(e, "operator"))}>
                <option value="eq">Equal to</option>
                <option value="gt">Greater than</option>
                <option value="gte">Greater than or equal to</option>
                <option value="lt">Less than</option>
                <option value="lte">Less than or equal to</option>
              </select>
            </label><br />

            <label>
              value:
             <input  type="number" value={this.state.values.groupingVariable.trueIf.value} onChange={e => (this.handleChangeGroupingVariable(e, "value"))} />
            </label><br />

            <label>
              "True" group label:
              <input  type="text" value={this.state.values.groupingVariable.label.true} onChange={e => (this.handleChangeGroupingVariable(e, "true"))} />
            </label><br />

            <label>
              "False" group label:
                 <input  type="text" value={this.state.values.groupingVariable.label.false} onChange={e => (this.handleChangeGroupingVariable(e, "false"))} />
            </label><br />
            
            
            <div style={{ margin: "20px 0" }}>
              <h2 style={{ display: "inline" }}>Covariate</h2>   <button style={{ float: "right" }} onClick={this.addCovariate.bind(this)}>Add variable</button>
            </div>
            
            {
              this.state.values.covariates.map((covariate, index) => {
                return (
                  <div key={index}>

                    <h4 style={{ display: "inline" }} >variable {index + 1}</h4>  <button style={{ float: "right" }} onClick={this.removeCovariate.bind(this, index)}>Delete variable</button> <br />


                    <label>
                      Name:
                          <select  value={covariate.name} onChange={e => (this.handleCovariateChange(e, index, "name"))}>
                        <option value="SMN">SMN</option>
                        <option value="AGE">AGE</option>
                        <option value="SEX">SEX</option>
                      </select>
                    </label>　<br />

                    <label>
                      Label:
                       <input  type="text" value={covariate.label} onChange={e => (this.handleCovariateChange(e, index, "label"))} />
                    </label><br />

                    <label>
                      Type:
                             <select  value={covariate.type} onChange={e => (this.handletypeChange(e, index, "type"))}>
                        <option value="categorical">Categorical</option>
                        <option value="bucketized">Bucketized</option>
                        <option value="continous">Continous</option>
                      </select>
                    </label>　<br />

                    {covariate.unit &&
                      <>
                        <label>
                          Unit:
           　　　　　<input  type="number" value={covariate.unit} onChange={e => (this.handleCovariateChange(e, index, "unit"))} />
                        </label><br />
                      </>
                    }

                    {covariate.cutoffs &&
                      <>
                        <label>
                          Cutoffs:
           　　　　　<input  type="number" value={covariate.cutoffs} onChange={e => (this.handleCovariateChange(e, index, "cutoffs"))} />
                        </label><br />
                      </>
                    }

                    {covariate.values &&
                      <>
                        <label>
                          Values:
           　　　　　<input  type="number" value={covariate.values} onChange={e => (this.handleCovariateChange(e, index, "values"))} />
                        </label><br />
                      </>
                    }


                    <br />
                  </div>
                );

              })
            }
            <div className="reset">
              <input className="input-reset"   type="button" onClick={this.handleReset.bind(this)} value="Reset" /><br />
            </div>
            <div className="submit">
              <input className="input-submit" type="submit" value="Apply" /><br />
            </div>
          </form>
        </div>

        <div style={{ margin: '0 1rem' }}>
          <h1>Current values</h1>
          <pre>{JSON.stringify(this.state.values, null, 2)}</pre>

        </div>
      </div>



    );
  }
}

export default Form




