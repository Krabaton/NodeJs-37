CREATE TABLE IF NOT EXISTS genders (
  id INT PRIMARY KEY,
  name VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 
-- 
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  password VARCHAR(30),
  age SMALLINT CHECK (age > 0),
  gender_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gender_id) REFERENCES genders (id) ON DELETE
  SET NULL ON UPDATE CASCADE
);
-- 
-- 
CREATE TABLE IF NOT EXISTS contacts (
  id INT PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  phone VARCHAR(30),
  favorite BOOLEAN,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- INSERT
INSERT INTO genders (id, NAME)
VALUES (1, 'male'),
  (2, 'female');
INSERT INTO users (id, NAME, email, PASSWORD, AGE, gender_id)
VALUES (
    1,
    'Evgenia',
    'evgenia@gmail.com',
    '567234',
    16,
    2
  ),
  (2, 'Dima', 'dimasio@gmail.com', '567234', 32, 1),
  (
    3,
    'Nikita',
    'nikitos@gmail.com',
    '567234',
    27,
    1
  );
INSERT INTO contacts (id, NAME, email, phone, favorite, user_id)
VALUES (
    1,
    'Allen Raymond',
    'nulla.ante@vestibul.co.uk',
    '(992) 914-3792',
    false,
    2
  ),
  (
    2,
    'Allen Red',
    'nulla.ante2@vestibul.co.uk',
    '(992) 914-3791',
    true,
    2
  ),
  (
    3,
    'Ballen Faymond',
    'nulla.ante3@vestibul.co.uk',
    '(992) 914-3795',
    FALSE,
    1
  ),
  (
    4,
    'Callen Dmond',
    'nulla.ante4@vestibul.co.uk',
    '(992) 914-3793',
    TRUE,
    1
  ),
  (
    5,
    'Fallen Mond',
    'nulla.ante5@vestibul.co.uk',
    '(992) 914-3794',
    false,
    null
  );
--  SELECT
SELECT NAME,
  email,
  favorite
FROM contacts
WHERE favorite = TRUE
ORDER BY NAME DESC;
-- 
SELECT NAME,
  email
FROM users
WHERE AGE IN(16, 32, 40)
ORDER BY NAME DESC;
-- 
SELECT NAME,
  email
FROM users
WHERE AGE BETWEEN 20 AND 40
ORDER BY NAME DESC;
-- 
SELECT NAME,
  email
FROM contacts
WHERE NAME LIKE '%all%'
ORDER BY NAME DESC;
-- 
SELECT avg(AGE)
FROM users;
--
SELECT count(user_id) AS total_contacts,
  user_id
FROM contacts
GROUP BY user_id;
--
SELECT *
FROM contacts
WHERE user_id IN (
    SELECT id
    FROM users
    WHERE AGE < 30
  );
-- JOIN
SELECT c.id,
  c.name,
  c.email,
  u.name AS owner
FROM contacts AS c
  JOIN users AS u ON u.id = c.user_id;
--
SELECT c.id,
  c.name,
  c.email,
  u.name AS owner
FROM contacts AS c
  LEFT JOIN users AS u ON u.id = c.user_id;
-- UPDATE
UPDATE contacts
SET user_id = 3
WHERE id = 5;
-- DELETE
DELETE FROM contacts
WHERE id = 4;
--
TRUNCATE TABLE contacts;
DROP TABLE contacts;