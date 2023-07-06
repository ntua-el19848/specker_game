#Use the official keycloak image
FROM quay.io/keycloak/keycloak:21.1.1

#Set the working directory inside the container
WORKDIR /opt/keycloak/bin

#Copy the configuration into the container to import it to keycloak
COPY keycloak_configuration ./

#Import the configuration
RUN /opt/keycloak/bin/kc.sh import --file keycloak_configuration

#expose the port the keycloak listens to
EXPOSE 8080
EXPOSE 8443
#Define the command to run your application
CMD ["start-dev"]