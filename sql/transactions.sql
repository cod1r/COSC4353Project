/* Inserting initial registration info */
START TRANSACTION; 
INSERT INTO user_login (username, password)
VALUES (?, ?);
COMMIT;



/* Inserting the rest of the users profile info, only 1 address given */ 
START TRANSACTION; 

INSERT INTO user_info (user_id, full_name, address1, city, state, zipcode)
VALUES ('${req.body.userID}', 
        '${req.body.name}', 
        '${req.body.Address1}', 
        '${req.body.City}', 
        '${req.body.State}', 
        '${req.body.Zipcode}');

COMMIT; 

/* Inserting the rest of the users profile info, Both address1 and address2 given */ 
START TRANSACTION; 

INSERT INTO user_info (user_id, full_name, address1, address2, city, state, zipcode)
VALUES ('${req.body.userID}', 
        '${req.body.name}', 
        '${req.body.Address1}', 
        '${req.body.Address2}',
        '${req.body.City}', 
        '${req.body.State}', 
        '${req.body.Zipcode}');

COMMIT; 


/* Inserting into fuel quote history*/ 
START TRANSACTION; 

INSERT INTO fuel_quote_history (user_id, 
                                gallons_requested, 
                                delivery_address, 
                                delivery_date, 
                                suggested_price_per_gallon, 
                                total_amount_due) 

VALUES ('${req.body.userID}', 
        '${req.body.GallonsRequested}', 
        (SELECT delivery_address FROM user_info WHERE user_id = '${req.body.userID'), 
        '${req.body.DeliveryDate}', 
        '${req.body.SuggestedPrice}', 
        '${req.body.TotalAmount}');

COMMIT; 


/*    try {
      connection.query({
        sql: 
          `START TRANSACTION; 

          INSERT INTO user_info (user_id, full_name, address1, address2, city, state, zipcode)
          VALUES ('?', '?', '?', '?', '?', '?', '?');

          COMMIT; `,
        timeout: 40000, // 40s
        values: [`${req.body.userID}`, `${req.body.name}`, `${req.body.Address1}`, `${req.body.Address2}`, `${req.body.City}`, `${req.body.State}`, `${req.body.Zipcode}`]
      }, function (error, results, fields) {
        console.log(res.results);
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
      });
    } catch {
      console.log(res.error);
    }*/