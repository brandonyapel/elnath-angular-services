var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');


// for localhost:5000/shoes should return array of shoe objects
router.get('/', function (req, res) {
    console.log('in get request')
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`
                SELECT cars.*,company.name,company.country FROM cars
                JOIN company
                ON cars.company_id=company.id
                ORDER BY id;`,
                 function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {

                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function(req, res){
    console.log('in post request');
    console.log(req.body.year);
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase,client,done){
        if(errorConnectingToDatabase){
            //There was an error connecting to database
            console.log('Error connecting to database',errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //We connected to the database!!!
            //Now, we're going to GET things from the DB
            //second param array blocks Bobby Drop Table
            client.query(`INSERT INTO cars(year,model,nickname,company_id)
            VALUES($1,$2,$3,$4);`, [req.body.year, req.body.model, req.body.nickname, req.body.company_id], function(errorMakingQuery,result){
                done();
                if(errorMakingQuery){
                    //Query failed. Did you test it in Postico? If so
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.delete('/:id', function(req, res){
    var koalaToDelete = req.params.id;
    console.log('in delete request',req.params.id);
  
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase,client,done){
        if(errorConnectingToDatabase){
            //There was an error connecting to database
            console.log('Error connecting to database',errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //We connected to the database!!!
            //Now, we're going to GET things from the DB
            //second param array blocks Bobby Drop Table
            client.query(`DELETE FROM cars WHERE id=$1;`, [req.params.id], function(errorMakingQuery,result){
                done();
                if(errorMakingQuery){
                    //Query failed. Did you test it in Postico? If so
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
  });


router.put('/:id', function(req, res){
    console.log('got to app.put id to update =',req.params.id);
    console.log('got to app.put data to update =',req.body);
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase,client,done){
        if(errorConnectingToDatabase){
            //There was an error connecting to database
            console.log('Error connecting to database',errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //We connected to the database!!!
            //Now, we're going to GET things from the DB
            //second param array blocks Bobby Drop Table
            client.query(`
            UPDATE cars 
            SET 
            year=$1,
            model=$2,
            nickname=$3,
            company_id=$4
            WHERE id=$5;`, [req.body.year, req.body.model, req.body.nickname, req.body.company_id, req.params.id], function(errorMakingQuery,result){
                done();
                if(errorMakingQuery){
                    //Query failed. Did you test it in Postico? If so
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
  });

module.exports = router;