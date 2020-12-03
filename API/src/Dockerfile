#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Dlvr.SixtySeconds.Api/Dlvr.SixtySeconds.Api.csproj", "Dlvr.SixtySeconds.Api/"]
COPY ["Dlvr.SixtySeconds.Resources/Dlvr.SixtySeconds.Resources.csproj", "Dlvr.SixtySeconds.Resources/"]
COPY ["Dlvr.SixtySeconds.DomainObjects/Dlvr.SixtySeconds.DomainObjects.csproj", "Dlvr.SixtySeconds.DomainObjects/"]
COPY ["Dlvr.SixtySeconds.Models/Dlvr.SixtySeconds.Models.csproj", "Dlvr.SixtySeconds.Models/"]
COPY ["Dlvr.SixtySeconds.Shared/Dlvr.SixtySeconds.Shared.csproj", "Dlvr.SixtySeconds.Shared/"]
COPY ["Dlvr.SixtySeconds.Services/Dlvr.SixtySeconds.Services.csproj", "Dlvr.SixtySeconds.Services/"]
COPY ["Dlvr.SixtySeconds.Repositories/Dlvr.SixtySeconds.Repositories.csproj", "Dlvr.SixtySeconds.Repositories/"]
RUN dotnet restore "Dlvr.SixtySeconds.Api/Dlvr.SixtySeconds.Api.csproj"
COPY . .
WORKDIR "/src/Dlvr.SixtySeconds.Api"
RUN dotnet build "Dlvr.SixtySeconds.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Dlvr.SixtySeconds.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dlvr.SixtySeconds.Api.dll"]