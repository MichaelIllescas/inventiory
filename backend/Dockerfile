FROM eclipse-temurin:17-jre-jammy
COPY target/inventiory.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
