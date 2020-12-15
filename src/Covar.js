import React from 'react'

function Covar(prop){
    const typeList=[
        {key:"categorical", name:"Categorical"},
        {key:"continous", name:"Continous"},
        {key:"bucketized", name:"Bucketized"}
    ]

    const vid=prop.index+1

    const thisCovar={...prop.covar[prop.covar.findIndex(x => x.name === prop.name)]}

    const ranges=[]

    if (prop.type==='bucketized'){
        prop.cutoffs.map((v,k)=>{
            if (k===0){
                ranges.push(prop.range[0]+"-"+v)
            }
            if(k>0){
                ranges.push(prop.cutoffs[k-1]+"-"+v)
            }
            if(k===prop.cutoffs.length-1){
                ranges.push(v+"-"+prop.range[1])
            }
        })
    }




    return(
        <div>
            <h4 style={{ display: 'inline' }}>Variable {vid}</h4>
            <button style={{ float: 'right' }} className="btn btn-link"
                onClick={(e) =>
                    prop.deleteCoVar(prop.index)}
            >
                Delete variable
            </button>


            <label>
                Name:
                <select
                    value={prop.name}
                    onChange={(e) =>
                        prop.changeCoVar(e, prop.index, 'name')
                    }
                >
                    {
                        prop.covar.map((e, k)=>{
                            return(
                                <option key={k.toString()} value={e.name}>{e.name}</option>
                            )
                        })
                    }
                </select>
            </label>

            <label>
                Label:
                <input
                    type="text"
                    value={prop.label}
                    onChange={(e) =>
                        prop.changeCoVar(e, prop.index, 'label')
                    }
                />
            </label>

            <label>
                Type:
                <select
                    value={prop.type}
                    onChange={(e) =>
                        prop.changeCoVar(e, prop.index, 'type')
                    }
                >
                    {
                        typeList.map((e,k)=>{
                            return(
                                <option key={k.toString()} value={e.key} disabled={(prop.type==="categorical" && e.key!=="categorical") || (prop.type!=="categorical" && e.key==="categorical")}>{e.name}</option>
                            )
                        })
                    }

                </select>
            </label>

            {prop.type==='categorical' ? (
                <div>
                <label>
                    Values:
                    {
                        thisCovar.values.map((v,k)=>{
                            return(
                                <label key={k.toString()}>
                                    <input
                                        type="checkbox"
                                        name={prop.name}
                                        value={v}
                                        checked={prop.values.includes(v)}
                                        onChange={(e) =>
                                            prop.changeCoVar(e, prop.index, 'values')}
                                    />
                                    {v}
                                </label>
                                    )
                            })
                    }

                </label>
                <label>
                    Keys:
                    {
                        prop.values.map((v,k)=>{
                            return(
                                <label key={k.toString()}>
                                    {v} =
                                    <input
                                        type="text"
                                        value={prop.keys[k]}
                                        onChange={(e) =>
                                            prop.changeCoVar(e, prop.index, 'keys', v)
                                        }
                                    />
                                </label>
                            )
                        })
                    }
                </label>
                </div>
            ) : prop.type==='continuous' ? (
                <label>
                    Unit:
                    <input
                        type="text"
                        value={prop.unit}
                        onChange={(e) =>
                            prop.changeCoVar(e, prop.index, 'unit')
                        }
                    />
                </label>
            ) : (
                <div>
                    <label>
                        Unit:
                        <input
                            type="text"
                            value={prop.unit}
                            onChange={(e) =>
                                prop.changeCoVar(e, prop.index, 'unit')
                            }
                        />
                    </label>
                    <label>
                        Cutoffs: range is [{prop.range[0]}, {prop.range[1]}]
                        <input
                            type="text"
                            value={prop.cutoffs}
                            onBlur={(e)=>{prop.validCutoffs(e, prop.index)}}
                            onChange={(e) =>
                                prop.changeCoVar(e, prop.index, 'cutoffs')
                            }
                        />
                    </label>
                    <label>
                        Keys:
                        {prop.keys.length>0 && prop.keys.map((v,k)=>{
                                return(
                                    <label key={k.toString()}>
                                        {ranges[k]} =
                                        <input
                                            type="text"
                                            value={v}
                                            onChange={(e) =>
                                                prop.changeCoVar(e, prop.index, 'keys', v)
                                            }
                                        />
                                    </label>
                                )
                            })
                        }

                    </label>
                </div>
            )}


        </div>
    )
}

export default Covar;