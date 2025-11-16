# Dockerfile para o Back-end (Java/Spring Boot)

# Estágio 1: Build da Aplicação com Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Estágio 2: Execução da Aplicação
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Este comando força o Render a imprimir o valor da variável ANTES de iniciar o Java
ENTRYPOINT ["sh", "-c", "echo '>>>>>> SEGREDO JWT QUE O RENDER ESTA LENDO: [$SUPABASE_JWT_SECRET]' && java -jar app.jar"]