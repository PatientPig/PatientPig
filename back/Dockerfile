FROM openjdk:11-jdk AS builder
COPY ./ ./
RUN ./gradlew clean
# COPY gradlew .
# COPY gradle gradle
# COPY build.gradle .
# COPY settings.gradle .
# COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJAR -x test

FROM openjdk:11-jdk
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]