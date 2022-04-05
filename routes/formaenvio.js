const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{

        conn.query('SELECT * FROM db_forma_envio', (err, rows)=>{
        
            if(err) {

                res.status(500).json({
                ok: false,
                data: err
            });

        }else{

                res.json({
                    ok: true,
                    data: rows,
                    registros: rows.length
                });

        }
        
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{

        conn.query('INSERT INTO db_forma_envio set ?', [req.body], (err, rows)=>{

            if(err) {
                res.status(500).json({
                ok: false,
                data: err
            });
                //return res.send(err);
            }else{
                res.json({
                    ok: true,
                    data: 'ingreso correcto.'
                });
            }  
                       
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{

        conn.query('DELETE FROM db_forma_envio WHERE id_envio = ?', [req.params.id], (err, rows)=>{
            
            if(err) {
                res.status(500).json({
                ok: false,
                data: err
            });

            }else{
                res.json({
                    ok: true,
                    data: 'Registro borrado',
                    afectados: rows
                });
            } 

        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        conn.query('UPDATE db_forma_envio set ? WHERE id_envio = ?', [req.body, req.params.id], (err, rows)=>{
            
            if(err) {
                res.status(500).json({
                ok: false,
                data: err
            });

            }else{
                res.json({
                    ok: true,
                    data: 'Registro actualizado.',
                    afectados: rows
                });
            }
        })
    })
})

module.exports = routes