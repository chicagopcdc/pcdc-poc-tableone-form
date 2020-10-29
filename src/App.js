import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = (
      {
        values:
        {
          groupingVariable: {
            name: "SMN",
            trueIf: {
              value: "1",
              operator: "eq" // "eq" | "gt" | "gte" | "lt" | "lte"
            },
            label: {
              true: "",
              false: ""
            }
          },
          covariates: [
            {
              "name": "age",
              "label": "",
              "type": "categorical", // "categorical" | "bucketized" | "continous"
              "unit": 1, 
            }
          ]
        }
      }
    );

  }


  handleChangeGroupingVariable = (e, key) => {
    const values = this.state.values;
    if(key==="name"){
      values.groupingVariable[key] = e.target.value;
    }
    if(key==="operator" ||key==="value" ){
      values.groupingVariable.trueIf[key] = e.target.value;
    }
    if(key==="true" ||key==="false" ){
      values.groupingVariable.label[key] = e.target.value;
    }
    
    this.setState({ values });
  }

  addCovariate = (event) => {
    const values = this.state.values;
    values.covariates.push({
      "name": "age",
      "label": "",
      "type": "categorical", 
      "unit": 1, 
    });
    this.setState({ values });
  }

  removeCovariate = (index) => {
    const values = this.state.values;
    values.covariates.splice(index, 1);
    this.setState({ values });
  }

  handleCovariateChange = (e, index, key) => {
    const values = this.state.values;
    values.covariates[index][key] = e.target.value;
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
    console.log(new_covariate);
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


  handleReset = () => {
    this.setState(
      {
        values:
        {
          groupingVariable: {
            name: "SMN",
            trueIf: {
              value: "1",
              operator: "eq" // "eq" | "gt" | "gte" | "lt" | "lte"
            },
            label: {
              true: "",
              false: ""
            }
          },
          covariates: [
            {
              "name": "SMN",
              "label": "",
              "type": "categorical", // "categorical" | "bucketized" | "continous"
              "unit": 1, // for bucketized or continuous variable only
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

      <div
        style={{
          fontFamily: 'sans-serif',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ margin: '0 1rem', padding: '0px 30px 20px 30px ', border: '2px solid #777' }}>

          <form id="myForm" onSubmit={this.handleSubmit.bind(this)}>
            <h2>Grouping variable</h2>
            <label >
              name:
                  <select style={{ margin: "5px 20px" }} value={this.state.values.groupingVariable.name} onChange={e => (this.handleChangeGroupingVariable(e, "name"))}>
                <option value="SMN">SMN</option>
                <option value="SMN2">SMN2</option>
              </select>
            </label><br />

            <label>
              True if...:
                <select style={{ margin: "5px 20px" }} value={this.state.values.groupingVariable.trueIf.operator} onChange={e => (this.handleChangeGroupingVariable(e, "operator"))}>
                <option value="eq">eq</option>
                <option value="gt">gt</option>
                <option value="gte">gte</option>
                <option value="lt">lt</option>
                <option value="lte">lte</option>
              </select>
            </label>

            <label>
              value:
             <input style={{ margin: "5px 20px" }} type="number" value={this.state.values.groupingVariable.trueIf.value} onChange={e => (this.handleChangeGroupingVariable(e, "value"))} />
            </label><br />

            <label>
              "True" group label:
              <input style={{ margin: "5px 20px" }} type="text" value={this.state.values.groupingVariable.label.true} onChange={e => (this.handleChangeGroupingVariable(e, "true"))} />
            </label><br />

            <label>
              "False" group label:
                 <input style={{ margin: "5px 20px" }} type="text" value={this.state.values.groupingVariable.label.false} onChange={e => (this.handleChangeGroupingVariable(e, "false"))} />
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
                          <select style={{ margin: "5px 20px" }} value={covariate.name} onChange={e => (this.handleCovariateChange(e, index, "name" ))}>
                        <option value="SMN">SMN</option>
                        <option value="SMN2">SMN2</option>
                      </select>
                    </label>　<br />

                    <label>
                      Label:
                       <input style={{ margin: "5px 20px" }} type="text" value={covariate.label} onChange={e => (this.handleCovariateChange(e, index, "label"))} />
                    </label><br />

                    <label>
                      Type:
                             <select style={{ margin: "5px 20px" }} value={covariate.type} onChange={e => (this.handletypeChange(e, index , "type"))}>
                        <option value="categorical">categorical</option>
                        <option value="bucketized">bucketized</option>
                        <option value="continous">continous</option>
                      </select>
                    </label>　<br />

                    <label>
                      Unit:
           　　　　　<input style={{ margin: "5px 20px" }} type="number" value={covariate.unit} onChange={e => (this.handleCovariateChange(e, index, "unit"))} />
                    </label><br />
　　　　　　　　　　

                    <br />
                  </div>
                );

              })
            }
            <div style={{ margin: "5px 20px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input style={{ width: "200px", height: "40px", backgroundColor: 'white', margin: '5px' }} type="button" onClick={this.handleReset.bind(this)} value="Reset" /><br />
            </div>
            <div style={{ margin: "5px 20px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input style={{ width: "200px", height: "40px", backgroundColor: 'yellow', margin: '5px' }} type="submit" value="Apply" /><br />
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




