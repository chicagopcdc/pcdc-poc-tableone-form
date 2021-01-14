import React from 'react'
import Covar from './Covar'

function Form(prop) {
    const operator=[
        {key:"eq", name:"Equal to"},
        {key:"gt", name:"Greater than"},
        {key:"gte", name:"Greater than or equal to"},
        {key:"lt", name:"Less than"},
        {key:"lte", name:"Less than or equal to"}
    ]


    // const covar = JSON.parse(JSON.stringify(prop.variables))
    // covar.splice(prop.gid, 1)
    const covar = prop.variables.filter(item => item.isGrouping === false)


    const validCutoffs = (e, index) => {
        const obj = e.target.value.split(",").map((e) => Number(e.trim()))
        const input=prop.input.values.covariates[index]
        const tmp=((input.range[0]*1 + input.range[1]*1) / 2).toFixed(0)

        if(!obj.every(function(e, i, obj) {

            if (i>0) return (e > obj[i-1] && !isNaN(e) && e>=input.range[0] && e<=input.range[1])
            else return !isNaN(e) && e>=input.range[0] && e<=input.range[1];
        })){
            prop.input.values.covariates[index].cutoffs=[tmp]
            prop.input.values.covariates[index].keys=[input.range[0]+"-"+tmp, tmp+"-"+input.range[1]]
            prop.updateUserInput(prop.input)

            alert("Input must be numeric and in the range of ["+input.range[0]+" , "+input.range[1]+"]. If they are multiple numbers, they must be monotone increasing and separated by comma.")
        }
    }


    const validGrpValue = (e, range) => {
        const value = e.target.value
        if(isNaN(value) || value<range[0] || value>range[1]) {
            prop.input.values.groupingVariable.trueIf.value=''
            prop.updateUserInput(prop.input)

            alert("Input must be numeric and in the range of ["+range[0]+" , "+range[1]+"]")
        }
    }

    const changeGrpVar = (e, key) => {
        const value = e.target.value

        if (key === 'name') {
            const index = prop.variables.findIndex(e => e.name === value);

            prop.input.values.groupingVariable.name = value
            prop.input.values.groupingVariable.trueIf.operator='eq'
            prop.input.values.groupingVariable.trueIf.value=''
            prop.input.values.groupingVariable.label.true=''
            prop.input.values.groupingVariable.label.false=''

            // input.values.covariates.filter(e => e.name !== value);
            // prop.input.values.covariates=[];

            prop.updateGrpIndex(index)
        }

        if (key === 'operator' || key === 'value') {
            prop.input.values.groupingVariable.trueIf[key] = value
        }
        if (key === 'true' || key === 'false') {
            prop.input.values.groupingVariable.label[key] = value
        }

        prop.updateUserInput(prop.input)
    }

    const changeCoVar = (e, index, key, kv='') => {
        // const checked={this.state.checkedItems.get(item.name)}


        let obj = JSON.parse(JSON.stringify(prop.input.values.covariates[index]))
        const value = e.target.value


        if (key === 'name') {
            const ind = covar.findIndex(x => x.name === value);
            obj = covar[ind]

            if (obj.type==="continous"){
                obj.unit=1
            }
            if (obj.type==="categorical"){
                obj.keys=obj.values
            }
        }

        if (key === 'type' || key === 'label' || key === 'unit') {
            obj[key] = value
            if (key === 'type' && value === 'bucketized'){
                const tmp=((obj.range[0]*1 + obj.range[1]*1) / 2).toFixed(0)
                obj={...obj, unit:'1', keys:[obj.range[0]+"-"+tmp, tmp+"-"+obj.range[1]], cutoffs:[tmp]}
            }
            if (key === 'type' && value === 'continous'){
                const ind = covar.findIndex(x => x.name === obj.name);
                obj = covar[ind]
                obj.unit=1
            }
        }

        if (key === 'keys') {
            if (obj.type==='categorical'){
                obj.values.map((v,k)=>{
                    if (v === kv) {
                        obj.keys[k]=value
                    }
                })
            }else{ // Bucketized
                obj.keys.map((v,k)=>{
                    if (v === kv) {
                        obj.keys[k]=value
                    }
                })
            }

        }

        if (key === 'values' && e.target.type === 'checkbox') {
            if (e.target.checked){
                obj.values.push(value)
                obj.keys.push(value)
            }else{
                obj.keys.splice(obj.values.indexOf(value), 1)
                obj.values.splice(obj.values.indexOf(value), 1)
            }

            if (obj.values.length === 0){
                obj.values = prop.variables.find(x => x.name === obj.name).values
                obj.keys = obj.values
            }
        }


        if (key === 'cutoffs') {
            obj.cutoffs = value.split(",").map((e) => e.trim())
            obj.keys=[]

            obj.cutoffs.map((v,k)=>{
                if (k===0){
                    obj.keys.push(obj.range[0]+"-"+v)
                }
                if(k>0){
                    obj.keys.push(obj.cutoffs[k-1]+"-"+v)
                }
                if(k===obj.cutoffs.length-1){
                    obj.keys.push(v+"-"+obj.range[1])
                }

            })
        }

        prop.input.values.covariates[index]={...obj}

        prop.updateUserInput(prop.input)
    }

    const deleteCoVar = (index)=>{
        prop.input.values.covariates.splice(index, 1)
        prop.updateUserInput(prop.input)
    }

    const addCoVar = () => {
        const obj = covar[0]

        if (obj.type==="continous"){
            obj.unit=1
        }

        if (obj.type==="categorical"){
            obj.keys=obj.values
        }

        prop.input.values.covariates.push(obj)

        prop.updateUserInput(prop.input)
    }


    const submitForm = (event) => {
        // event.preventDefault()
        // console.log(this.state.values)
    }

    return (
        <div>
            <h2>Grouping variable</h2>
            <label>
                name:
                <select
                    value={prop.variables[prop.gid].name}
                    onChange={(e) => changeGrpVar(e, 'name')}
                >
                    {
                        prop.allGrpIndex.map((i,k)=>{
                            return(
                                <option key={k.toString()} value={prop.variables[i].name}>{prop.variables[i].name}</option>
                            )
                        })
                    }
                </select>
            </label>
            <label>
                True if:
                <select
                    value={prop.input.values.groupingVariable.trueIf.operator}
                    onChange={(e) =>
                        changeGrpVar(e, 'operator')
                    }
                >
                    {
                        operator.map((e,k)=>{
                            return(
                                <option key={k.toString()} value={e.key} disabled={prop.variables[prop.gid].type!=="continuous" && e.key!=="eq"}>{e.name}</option>
                            )
                        })
                    }
                </select>
            </label>
            <label>
                Value:
                {prop.variables[prop.gid].type==="continuous" ?(
                <input
                    type="text"
                    value={prop.input.values.groupingVariable.trueIf.value}
                    onBlur={(e)=>{validGrpValue(e,prop.variables[prop.gid].range)}}
                    onChange={(e) =>
                        changeGrpVar(e, 'value')
                    }
                />
                ):(
                    <select
                        value={prop.input.values.groupingVariable.trueIf.value}
                        onChange={(e) =>
                            changeGrpVar(e, 'value')
                        }
                    >
                        {
                            prop.variables[prop.gid].values.map((v, k)=>{
                                return(
                                    <option key={k.toString()} value={v}>{v}</option>
                                )
                            })
                        }
                    </select>
                )}
            </label>
            <label>
                "True" group label:
                <input
                    type="text"
                    value={prop.input.values.groupingVariable.label.true}
                    onChange={(e) => changeGrpVar(e, 'true')}
                />
            </label>
            <label>
                "False" group label:
                <input
                    type="text"
                    value={prop.input.values.groupingVariable.label.false}
                    onChange={(e) =>
                        changeGrpVar(e, 'false')
                    }
                />
            </label>


            <div style={{ margin: '20px 0' }}>
                <h2 style={{ display: 'inline' }}>Covariate</h2>{' '}
                <button
                    className="btn btn-primary"
                    style={{ float: 'right' }}
                    onClick={addCoVar}
                >
                    Add variable
                </button>
            </div>

            {prop.input.values.covariates && prop.input.values.covariates.map((e, index) => {

                return (
                    <Covar
                        {...e}
                        gid={prop.gid}
                        key={index.toString()}
                        covar={covar}
                        index={index}
                        changeCoVar={changeCoVar}
                        deleteCoVar={deleteCoVar}
                        validCutoffs={validCutoffs}
                    />
                )
            })}
            <div className="reset">
                <input
                    className="input-reset btn btn-primary"
                    type="button"
                    onClick={()=>{prop.resetForm()}}
                    value="Reset"
                />
                <br />
            </div>
            <div className="submit">
                <input
                    className="input-submit btn btn-primary"
                    type="button"
                    onClick={()=> {prop.onSubmit()}}
                    value="Apply"
                />
                <br />
            </div>
        </div>
    )
}

export default Form;
