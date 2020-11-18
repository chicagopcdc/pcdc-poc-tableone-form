import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form id="myForm" onSubmit={this.props.handleSubmit.bind(this)}>
        <h2>Grouping variable</h2>
        <label>
          name:
          <select
            value={this.props.values.groupingVariable.name}
            onChange={(e) => this.props.handleChangeGroupingVariable(e, 'name')}
          >
            <option value="SMN">SMN</option>
            <option value="AGE">AGE</option>
            <option value="SEX">SEX</option>
          </select>
        </label>
        <br />

        <label>
          True if...:
          <select
            value={this.props.values.groupingVariable.trueIf.operator}
            onChange={(e) =>
              this.props.handleChangeGroupingVariable(e, 'operator')
            }
          >
            <option value="eq">Equal to</option>
            <option value="gt">Greater than</option>
            <option value="gte">Greater than or equal to</option>
            <option value="lt">Less than</option>
            <option value="lte">Less than or equal to</option>
          </select>
        </label>
        <br />

        <label>
          value:
          <input
            type="number"
            value={this.props.values.groupingVariable.trueIf.value}
            onChange={(e) =>
              this.props.handleChangeGroupingVariable(e, 'value')
            }
          />
        </label>
        <br />

        <label>
          "True" group label:
          <input
            type="text"
            value={this.props.values.groupingVariable.label.true}
            onChange={(e) => this.props.handleChangeGroupingVariable(e, 'true')}
          />
        </label>
        <br />

        <label>
          "False" group label:
          <input
            type="text"
            value={this.props.values.groupingVariable.label.false}
            onChange={(e) =>
              this.props.handleChangeGroupingVariable(e, 'false')
            }
          />
        </label>
        <br />

        <div style={{ margin: '20px 0' }}>
          <h2 style={{ display: 'inline' }}>Covariate</h2>{' '}
          <button
            style={{ float: 'right' }}
            onClick={this.props.addCovariate.bind(this)}
          >
            Add variable
          </button>
        </div>

        {this.props.values.covariates.map((covariate, index) => {
          return (
            <div key={index}>
              <h4 style={{ display: 'inline' }}>variable {index + 1}</h4>{' '}
              <button
                style={{ float: 'right' }}
                onClick={this.props.removeCovariate.bind(this, index)}
              >
                Delete variable
              </button>{' '}
              <br />
              <label>
                Name:
                <select
                  value={covariate.name}
                  onChange={(e) =>
                    this.props.handleCovariateChange(e, index, 'name')
                  }
                >
                  <option value="SMN">SMN</option>
                  <option value="AGE">AGE</option>
                  <option value="SEX">SEX</option>
                </select>
              </label>
              　<br />
              <label>
                Label:
                <input
                  type="text"
                  value={covariate.label}
                  onChange={(e) =>
                    this.props.handleCovariateChange(e, index, 'label')
                  }
                />
              </label>
              <br />
              <label>
                Type:
                <select
                  value={covariate.type}
                  onChange={(e) =>
                    this.props.handleCovariateChange(e, index, 'type')
                  }
                >
                  <option value="categorical">Categorical</option>
                  <option value="continous">Continous</option>
                </select>
              </label>
              　<br />
              {covariate.unit && covariate.range && (
                <>
                  <label>
                    Unit:
                    <input
                      type="number"
                      value={covariate.unit}
                      min={covariate.range[0]}
                      max={covariate.range[1]}
                      onChange={(e) =>
                        this.props.handleCovariateChange(e, index, 'unit')
                      }
                    />
                  </label>
                  <br />
                </>
              )}
              {covariate.unit && covariate.values && (
                <>
                  <label>
                    Unit:
                    <select
                      value={covariate.unit}
                      onChange={(e) =>
                        this.props.handleCovariateChange(e, index, 'unit')
                      }
                    >
                      {covariate.values.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                  <br />
                </>
              )}
            </div>
          )
        })}
        <div className="reset">
          <input
            className="input-reset"
            type="button"
            onClick={this.props.handleReset.bind(this)}
            value="Reset"
          />
          <br />
        </div>
        <div className="submit">
          <input className="input-submit" type="submit" value="Apply" />
          <br />
        </div>
      </form>
    )
  }
}
