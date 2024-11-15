FROM openjdk:23-oracle
LABEL authors="vikazeni"

COPY /back/target/pursit-0.0.1-SNAPSHOT.jar /opt/app.jar
COPY /iac/image/pursit-back/elastic-apm-agent-1.52.0.jar /opt/apm.jar

ENTRYPOINT ["java", "-javaagent:/opt/apm.jar", "-jar", "/opt/app.jar"]
