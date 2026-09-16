FROM openjdk:17-jdk-slim
COPY target/inventiory.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
