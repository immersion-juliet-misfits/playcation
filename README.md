### Playcation Summary

Sometimes we want to get out of the house, see the world, and try something new.
Playcation is a family-friendly vacation planning website
with multiple fun features.

### Table of Contents

- Installations
- API requirements
- Deployment


# Installations

Node:
You will need node version 22.
Check your node version when you make a new branch to verify it is on the correct version.

- List all versions of Node you have installed & your current default.
  `nvm ls`

- Updates Node to version 22
  `nvm install 22`

- Sets Node default to whatever version you enter
  `nvm alias default 22`

- Most required dependencies are covered when you run:
`npm install`

---

After Installations are complete:

- Build your webpack
  `npm run build`

- Start the node server
  `npm start`

- Start MySQL server
  `sudo service mysql start`

- Verify MySQL is running
  `sudo service mysql status`

- Start interactive mysql shell
  `mysql -u root;`

# API requirements

- You will need to create a `.env` file and get a key for everything in .env.example

- You will also use this API, which doesn't require a key:
  https://github.com/cheatsnake/emojihub

- You will need an account on Email.js: https://www.emailjs.com/


# Deployment

We deployed on AWS

- You will need to sign up for a developer account

- Install nvm
  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
  `. ~/.nvm/nvm.sh`

- Install node version 22
  `nvm install 22`
- set alias default to node 22:
  `nvm alias default 22`

- Install mysql2
  `npm install --save mysql2`

- CD'd into the directory and run:
  `npm install`
