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
              "unit": 1, // for bucketized or continuous variable only
              "cutoffs": [], // for bucketized variable only
              "values": [], // for categorical variable only
              "keys": [] // optional; for bucketized or categorical variable only
            }
          ]
        }
      }
    );

  }


  handleChange_g_name = (event) => {
    const values = this.state.values;
    values.groupingVariable.name = event.target.value;
    this.setState({ values });
  }

  handleChange_g_TrueIf = (event) => {
    const values = this.state.values;
    values.groupingVariable.trueIf.operator = event.target.value;
    this.setState({ values });
  }

  handleChange_g_value = (event) => {
    const values = this.state.values;
    values.groupingVariable.trueIf.value = event.target.value;
    this.setState({ values });
  }

  handleChange_g_TrueLable = (event) => {
    const values = this.state.values;
    values.groupingVariable.label.true = event.target.value;
    this.setState({ values });
  }

  handleChange_g_FalseLable = (event) => {
    const values = this.state.values;
    values.groupingVariable.label.false = event.target.value;
    this.setState({ values });
  }


  addCovariate = (event) => {
    const values = this.state.values;
    values.covariates.push({

      "name": "age",
      "label": "",
      "type": "categorical", // "categorical" | "bucketized" | "continous"
      "unit": 1, // for bucketized or continuous variable only
      "cutoffs": [], // for bucketized variable only
      "values": [], // for categorical variable only
      "keys": [] // optional; for bucketized or categorical variable only

    });
    this.setState({ values });
  }

  removeCovariate = (index) => {
    const values = this.state.values;
    values.covariates.splice(index, 1);
    this.setState({ values });
  }

  handleChange_v_name = (e, index) => {
    const values = this.state.values;
    values.covariates[index].name = e.target.value;
    this.setState({ values });
  }

  handleChange_v_label = (e, index) => {
    const values = this.state.values;
    values.covariates[index].label = e.target.value;
    this.setState({ values });
  }

  handleChange_v_type = (e, index) => {
    const values = this.state.values;
    values.covariates[index].type = e.target.value;
    this.setState({ values });
  }

  handleChange_v_unit = (e, index) => {
    const values = this.state.values;
    values.covariates[index].unit = e.target.value;
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
              "name": "",
              "label": "",
              "type": "", // "categorical" | "bucketized" | "continous"
              "unit": 1, // for bucketized or continuous variable only
              "cutoffs": [], // for bucketized variable only
              "values": [], // for categorical variable only
              "keys": [] // optional; for bucketized or categorical variable only
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
                  <select style={{ margin: "5px 20px" }} value={this.state.values.groupingVariable.name} onChange={this.handleChange_g_name.bind(this)}>
                <option value="SMN">SMN</option>
                <option value="SMN2">SMN2</option>
              </select>
            </label><br />

            <label>
              True if...:
                <select style={{ margin: "5px 20px" }} value={this.state.values.groupingVariable.trueIf.operator} onChange={this.handleChange_g_TrueIf.bind(this)}>
                <option value="eq">eq</option>
                <option value="gt">gt</option>
                <option value="gte">gte</option>
                <option value="lt">lt</option>
                <option value="lte">lte</option>
              </select>
            </label>

            <label>
              value:
             <input style={{ margin: "5px 20px" }} type="number" value={this.state.values.groupingVariable.trueIf.value} onChange={this.handleChange_g_value.bind(this)} />
            </label><br />

            <label>
              "True" group label:
              <input style={{ margin: "5px 20px" }} type="text" value={this.state.values.groupingVariable.label.true} onChange={this.handleChange_g_TrueLable.bind(this)} />
            </label><br />

            <label>
              "False" group label:
                 <input style={{ margin: "5px 20px" }} type="text" value={this.state.values.groupingVariable.label.false} onChange={this.handleChange_g_FalseLable.bind(this)} />
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
                          <select style={{ margin: "5px 20px" }} value={covariate.name} onChange={e => (this.handleChange_v_name(e, index))}>
                        <option value="SMN">SMN</option>
                        <option value="SMN2">SMN2</option>
                      </select>
                    </label>　<br />

                    <label>
                      Label:
                       <input style={{ margin: "5px 20px" }} type="text" value={covariate.label} onChange={e => (this.handleChange_v_label(e, index))} />
                    </label><br />

                    <label>
                      Type:
                             <select style={{ margin: "5px 20px" }} value={covariate.type} onChange={e => (this.handleChange_v_type(e, index))}>
                        <option value="categorical">categorical</option>
                        <option value="bucketized">bucketized</option>
                        <option value="continous">continous</option>
                      </select>
                    </label>　<br />

                    <label>
                      Unit:
           <input style={{ margin: "5px 20px" }} type="number" value={covariate.unit} onChange={e => (this.handleChange_v_unit(e, index))} />
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
          <pre>{JSON.stringify(values, null, 2)}</pre>

        </div>
      </div>



    );
  }
}





export default Form




