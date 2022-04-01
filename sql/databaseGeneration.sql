START TRANSACTION;

DROP TABLE IF EXISTS UserCredentials, ClientInformation, FuelQuote;

/* find out the minimum lengths for all of these fields */ 
/* password needs encryption */ 
/* password needs a max length in the frontend */ 
CREATE TABLE UserCredentials (
    username VARCHAR(20) NOT NULL,
    password VARCHAR(500) NOT NULL, 

    CONSTRAINT min_username_length CHECK (LENGTH(username) >= 5),
    CONSTRAINT min_password_length CHECK (LENGTH(password) >= 8),
    PRIMARY KEY (username)
);

/* find out the minimum lengths for all of these fields */ 
CREATE TABLE ClientInformation (
	username VARCHAR(20) NOT NULL,
	full_name VARCHAR(50) NOT NULL,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL, 
    zipcode VARCHAR(9) NOT NULL, 

    CONSTRAINT min_zipcode_length CHECK (LENGTH(zipcode) >= 5),
    FOREIGN KEY (username) REFERENCES UserCredentials(username),
    PRIMARY KEY (username)
);

/* find out the minimum lengths for all of these fields */ 
CREATE TABLE FuelQuote (
    fq_id SERIAL NOT NULL,
    quote_date VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL, 
    gallons_requested NUMERIC(18,2) NOT NULL,
    delivery_address VARCHAR(100) NOT NULL, /* The user can have two addresses. Does this only take the value from address1? */ 
    delivery_date VARCHAR(20) NOT NULL, 
    suggested_price_per_gallon NUMERIC(5,2) NOT NULL,
    total_amount_due NUMERIC(18,2) NOT NULL, 

    FOREIGN KEY (username) REFERENCES UserCredentials(username),
    PRIMARY KEY(fq_id)
);

COMMIT; 



