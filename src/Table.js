import React from 'react';

export default function DenseTable(prop) {
    const data = prop.data
    // const data ={
    //     "headers": [
    //       {
    //         "size": "Sample size (sex)"
    //       },
    //       {
    //         "Male": "Male"
    //       },
    //       {
    //         "Female": "Female"
    //       },
    //       {
    //         "Other": "Other"
    //       }
    //     ],
    //     "variables": [
    //       {
    //         "keys": [
    //           {
    //             "data": {
    //               "Female": "15.8%",
    //               "Male": "15.2%",
    //               "Other": "13.8%"
    //             },
    //             "name": "11"
    //           },
    //           {
    //             "data": {
    //               "Female": "24.1%",
    //               "Male": "24.0%",
    //               "Other": "24.4%"
    //             },
    //             "name": "22"
    //           },
    //           {
    //             "data": {
    //               "Female": "13.2%",
    //               "Male": "12.4%",
    //               "Other": "14.8%"
    //             },
    //             "name": "33"
    //           }
    //         ],
    //         "name": "lkss",
    //         "size": {
    //           "total": 2999,
    //           "true": 2156
    //         }
    //       }
    //     ]
    //   }
      
    console.log(data)

    let header = []

        data.headers.forEach((e)=>{
            header.push(Object.values(e)[0])
        })

    console.log(header)
    //header.pvalue = header.size ? "P-value" : "" 

    let rows=[];
    data.variables.map((v,k)=>{
        let row={};
        row['name']=v.name;
        row[header[0]]=v.size.total+" ("+v.size.true+")";
        if (v.keys.length==1 && v.keys[0].name==""){
            row['type']='font-weight-bold';
            // row['true']=v.keys[0].data.true;
            // row['false']=v.keys[0].data.false;
            // row['p']=v.pval;

            header.forEach((hh)=>{
                row[hh]=v.keys[0].data[hh]
            })
            row[header[0]]=v.size.total+" ("+v.size.true+")";

            rows.push(row);
        }else {
            row['type']='font-weight-bold';
            row['true']='';
            row['false']='';
            row['p']=v.pval;

            rows.push(row);

            v.keys.map((vv, kk)=>{
                let subrow={};
                subrow['name']=vv.name;
                header.forEach((hh)=>{
                    console.log(vv.data)
                    subrow[hh]=vv.data[hh]
                })
                // subrow['name']=vv.name;
                // subrow['size']='';
                // subrow['type']='pl-5';
                // subrow['true']=vv.data.true;
                // subrow['false']=vv.data.false;
                // subrow['p']='';

                rows.push(subrow);
            });
        }
        console.log(rows)
    });

  return (
      <table className="table table-striped">
          <thead>
          <tr>
          <th scope="col"></th>
              {/* 
              <th scope="col">{header.size}</th>
              <th scope="col">{header.true}</th>
              <th scope="col">{header.false}</th> */}
              {/* <th scope="col">{header.pvalue}</th> */}
              {
                header.map((h)=>{
                    return <th scope="col">{h}</th>
                })
              }
          </tr>
          </thead>
          <tbody>
          {rows &&
            rows.map((row)=>{
                  return(
                      <tr>
                          {/* <td className={row.type}>{row.name}</td>
                          <td>{row.size}</td>
                          <td>{row.true}</td>
                          <td>{row.false}</td>
                          <td>{row.p}</td> */}
                          <td className={row.type}>{row.name}</td>
                          {header.map((h)=>{
                            return <td>{row[h]}</td>
                          })}
                      </tr>
                  )
              })
          }
          </tbody>
      </table>
  );

}
