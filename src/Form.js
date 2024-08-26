import React, { useState} from 'react'
import Select from 'react-select'
import Covar from './Covar'
import './Form.css'
import Button from './gen3-ui-component/components/Button';


function Form(prop) {

    const [groupName, setGroupName] = useState({value:prop.variables[prop.gid].name,
                                                label:prop.variables[prop.gid].name });
    const [trueIf, setTrueIf] = useState({value:prop.input.values.groupingVariable.trueIf.operator,
                                            label:prop.input.values.groupingVariable.trueIf.operator });
    // const [selectValue, setSelectValue] = useState({
    //     value : prop.variables[prop.gid].type === 'categorical'? prop.variables[prop.gid].values[0] : prop.variables[prop.gid].range[0],
    //     label : prop.variables[prop.gid].type === 'categorical'? prop.variables[prop.gid].values[0] : prop.variables[prop.gid].range[0]
    // })
    const [selectValue, setSelectValue] = useState([])

    const operator=[
        {key:"eq", name:"Equal to"},
        {key:"gt", name:"Greater than"},
        {key:"gte", name:"Greater than or equal to"},
        {key:"lt", name:"Less than"},
        {key:"lte", name:"Less than or equal to"}
    ]


    // const covar = JSON.parse(JSON.stringify(prop.variables))
    // covar.splice(prop.gid, 1)
    const covar = prop.variables


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
        const value = e.value
        console.log(e)

        if (key === 'name') {
            const index = prop.variables.findIndex(e => e.name === value);
            prop.updateGrpIndex(index)

            const newgroup = prop.variables[index]
            console.log(e)
            setGroupName({value:value,
                            label:value })
            prop.input.values.groupingVariable.name = value
            prop.input.values.groupingVariable.trueIf.operator='eq'
            prop.input.values.groupingVariable.trueIf.value = newgroup.type==="categorical" ? '\''+newgroup.values[0]+'\'':newgroup.range[0]
            prop.input.values.groupingVariable.label.true='True'
            prop.input.values.groupingVariable.label.false='False'
            prop.input.values.groupingVariable.values = newgroup.values
            console.log( prop.input.values.groupingVariable)
        }

        if (key === 'operator' || key === 'value') {
            if(prop.input.values.groupingVariable.type === 'categorical'){
                console.log(e)
                prop.input.values.groupingVariable.trueIf['operator'] = 'eq'
                prop.input.values.groupingVariable.trueIf['value'] = e
            }
            else
                prop.input.values.groupingVariable.trueIf[key] = value

            if(key === 'operator'){
                setTrueIf({
                    value: prop.input.values.groupingVariable.trueIf['operator'],
                    label: prop.input.values.groupingVariable.trueIf['operator']
                })
            }
            else{
                console.log(e)
                setSelectValue(e)
            }
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
        console.log(obj)

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
                console.log(obj)
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
        console.log(covar)
        console.log(obj)

        if (obj.type==="continous"){
            obj.unit=1
        }

        if (obj.type==="categorical"){
            obj.keys=obj.values
        }

        prop.input.values.covariates.push(obj)
        console.log(prop.input.values.covariates)

        prop.updateUserInput(prop.input)
    }


    const groupRender = () =>{
        if(prop.variables[prop.gid].type !== "continuous"){
            return(<div>
                    <div className='names'>
                        <label className='tip-lables-name'>True if...</label>
                            <Select
                                isMulti
                                className='name-select'
                                value={selectValue}
                                onChange={(e) => changeGrpVar(e, 'value')}
                                placeholder="True if..."
                                options = { prop.variables[prop.gid].values.map((v, k) => ({
                                    value: v,  
                                    label: v,
                                }))}
                            ></Select>
                    </div>
                   {selectValue.map((e)=>{
                        return  <div  className='names'>
                        <label className='tip-lables-bool'>{e.value} label:</label>
                            <input
                                className='input-styled'
                                type="text"
                                value={e.value}
                                onChange={(e) => changeGrpVar(e, 'true')}
                            />
            
                        </div>
                   })}
                    </div>
            )
        }
       else return (
        <div className='names'>
            <label className='tip-lables'>True if...</label>
            <Select
                className='name-select'
                value={trueIf}
                onChange={(e) => changeGrpVar(e, 'operator')}
                placeholder="True if..."
                options = { operator.map((e) => ({
                    value: e.name,  
                    label: e.name,
                }))}
            >
            </Select>
            <label className='tip-lables-value'>Value</label>
            <Select
                className='name-select'
                value={selectValue}
                onChange={(e) => changeGrpVar(e, 'value')}
                placeholder="Value"
                options = { prop.variables[prop.gid].type === 'categorical' ?prop.variables[prop.gid].values.map((v, k) => ({
                    value: v,  
                    label: v,
                })):prop.variables[prop.gid].range.map((v, k) => ({
                    value: v,  
                    label: v,
                }))}
            >
            </Select>
           </div>
       )
    }

    return (
        <div className='form-container'>
            <h2>Grouping variable</h2>
            <div className='names'>
                <label className='tip-lables-name'>Name</label>
                    <Select
                        className='name-select'
                        value={groupName}
                        onChange={(e) => changeGrpVar(e, 'name')}
                        placeholder="Name"
                        options = { prop.allGrpIndex.map((i)=>{
                            return {
                                value: prop.variables[i].name,                
                                label: prop.variables[i].name
                            };
                        })}
                    >
                    </Select>
            </div>

            {groupRender()}           
            
            {/* <div  className='names'>
            <label className='tip-lables-bool'>"True" group label:</label>
                <input
                    className='input-styled'
                    type="text"
                    value={prop.input.values.groupingVariable.label.true}
                    onChange={(e) => changeGrpVar(e, 'true')}
                />

            </div>
            
            <div  className='names'>
            <label className='tip-lables-bool'>"False" group label:</label>
                <input
                    className='input-styled'
                    type="text"
                    value={prop.input.values.groupingVariable.label.true}
                    onChange={(e) => changeGrpVar(e, 'false')}
                />

            </div> */}

            <div style={{ margin: '20px 0' }}>
                <h2 style={{ display: 'inline' }}>Covariate</h2>{' '}
                <Button
                    buttonType = 'default'
                    label='Add Variable'
                    onClick={addCoVar}
                />

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

            <div  className='names'>
            <input
                    className="input-reset btn btn-primary"
                    style={{marginRight:'10px'}}
                    type="button"
                    onClick={()=>{prop.resetForm()}}
                    value="Reset"
                />
                 <input
                    className="input-submit btn btn-primary"
                    type="button"
                    onClick={()=> {prop.onSubmit()}}
                    value="Apply"
                />
            </div>
        </div>
    )
}

export default Form;
