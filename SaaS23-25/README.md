# NTUA ECE SAAS 2023 PROJECT

## Contributors
Members: 
- el19001 - [@MichalisTsilimigkounakis](https://www.github.com/ntua-el19001)
- el19096 -  [@PanagiotisStefanis](https://github.com/ntua-el19096)
- el19848 - [@GeorgeSotiropoulos](https://github.com/ntua-el19848)

#### The File Structure of our repo is the following:
- /architecture --> Documentation of the Project (Visual Paradigm) [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/architecture)
- /orchestrator --> REST API Orchestrator that holds buisness logic [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/orchestrator)
- /frontent --> React Web Server [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/frontend)
- /keycloak --> Configuration for the keycloak authentication container [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/keycloak)
- /templateMicroservice --> Templates for different chart types [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/templateMicroservice)
- /userInfoMicroservice --> Microservice handling user quotas [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/userInfoMicroservice)
- /userQuotasMicroservice --> Microservice handling user information [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/userQuotasmicroservice)
- /validateMicroservice --> Transforms CSV data to Json data [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/validateMicroservice)
- /transformToHighcharts --> Transfroms Json Data to Highcharts configuration Json [@More Info Here](https://github.com/ntua/SaaS23-25/tree/main/transformToHighcharts)

## Deployment
#### To install
- Docker
#### To deploy 
- Run Docker deamon
- Go to folder --> /SaaS23-25
- Run the following command

- By default the frontend will run at the following domain --> davinci.softlab.ece.ntua.gr. To change the domain go to /frontend/src/config.json and change it to your desired domain.
```
docker compose up
```

## Used Stack
#### Databases
  - MongoDB
  
#### Microservices / Orchestrator
  - Node.JS
  - Express
  - Mongoose
  
#### Web Server
  - React

#### HTTPS Support
Currently HTTPS is not supported. The certificates have been issued but are not used.
