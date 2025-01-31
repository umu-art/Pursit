FROM openjdk:23-oracle
LABEL authors="vikazeni"

COPY /core/target/core-0.0.1-SNAPSHOT.jar /opt/app.jar
COPY /iac/image/pursit-core/elastic-apm-agent-1.52.0.jar /opt/apm.jar

ENTRYPOINT ["java", "-javaagent:/opt/apm.jar", "-jar", "/opt/app.jar"]
