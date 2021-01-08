import React from 'react';
//import data from './data';

export default function DenseTable(prop) {
    const data = prop.data


    let header=data.headers;
    let rows=[];
    data.variables.map((v,k)=>{
        let row={};
        row['name']=v.name;
        row['size']=v.size.total+" ("+v.size.true+")";
        if (v.keys.length==1 && v.keys[0].name==""){
            row['type']='font-weight-bold';
            row['true']=v.keys[0].data.true;
            row['false']=v.keys[0].data.false;
            row['p']=v.pval;

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
                subrow['size']='';
                subrow['type']='pl-5';
                subrow['true']=vv.data.true;
                subrow['false']=vv.data.false;
                subrow['p']='';

                rows.push(subrow);
            });
        }
    });

  return (
      <table className="table table-striped">
          <thead>
          <tr>
              <th scope="col"></th>
              <th scope="col">{header.size}</th>
              <th scope="col">{header.true}</th>
              <th scope="col">{header.false}</th>
              <th scope="col">P-value</th>
          </tr>
          </thead>
          <tbody>
          {rows &&
            rows.map((row)=>{
                  return(
                      <tr>
                          <td className={row.type}>{row.name}</td>
                          <td>{row.size}</td>
                          <td>{row.true}</td>
                          <td>{row.false}</td>
                          <td>{row.p}</td>
                      </tr>
                  )
              })
          }
          </tbody>
      </table>
  );

}
