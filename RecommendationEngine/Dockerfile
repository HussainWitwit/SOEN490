#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["RecommendationEngine/RecommendationEngine.csproj", "RecommendationEngine/"]
COPY ["RecommendationSchedulerTests/RecommendationSchedulerTests.csproj", "RecommendationSchedulerTests/"]
COPY ["RecommendationScheduler/RecommendationScheduler.csproj", "RecommendationScheduler/"]
COPY ["Interfaces/Interfaces.csproj", "Interfaces/"]
COPY ["Models/Models.csproj", "Models/"]
RUN dotnet restore "RecommendationEngine/RecommendationEngine.csproj"
COPY . .
WORKDIR "/src/RecommendationEngine"
# Fetch and install Node 14. Make sure to include the --yes parameter 
# to automatically accept prompts during install, or it'll fail.
RUN curl --silent --location https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install --yes nodejs
RUN dotnet build "RecommendationEngine.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RecommendationEngine.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RecommendationEngine.dll"]