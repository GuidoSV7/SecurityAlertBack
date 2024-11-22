<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />

  # Sistema de Alerta de Seguridad Ciudadana
  
  [![NestJS][nestjs-shield]][nestjs-url]
  [![Docker][docker-shield]][docker-url]
  [![TypeScript][typescript-shield]][typescript-url]
  [![License][license-shield]][license-url]

  *Mejorando la seguridad urbana a través de la tecnología en Santa Cruz, Bolivia* 🛡️

  **Proyecto presentado para la Hackaton UAGRM 2024**
</div>

---

<div align="center">

[![Estado](https://img.shields.io/badge/estado-activo-success.svg)]()
[![Problemas](https://img.shields.io/badge/issues-0-brightgreen.svg)]()
[![Pull Requests](https://img.shields.io/badge/pull%20requests-0-brightgreen.svg)]()

</div>

## 🌟 Acerca del Proyecto

**Security Alert** es un sistema innovador de monitoreo de seguridad diseñado para mejorar la seguridad pública en Santa Cruz de la Sierra. Desarrollado como parte de la Hackaton UAGRM 2024, esta plataforma proporciona capacidades de monitoreo de seguridad en tiempo real.

## ⚡️ Inicio Rápido

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- Nestjs
- Docker y Docker Compose
- Gestor de paquetes Yarn

### 🚀 Pasos de Instalación


2️⃣ **Instalar Dependencias**
```bash
yarn install
```

3️⃣ **Configurar Variables de Entorno**
```bash
# Copiar la plantilla de variables de entorno
cp .env.template .env

# Editar el archivo .env con tus configuraciones
```

4️⃣ **Levantar la Base de Datos**
```bash
docker-compose up -d
```

5️⃣ **Iniciar el Servidor de Desarrollo**
```bash
yarn start:dev
```

6️⃣ **Inicializar Datos de Prueba**
```bash
# Acceder al endpoint de seed
curl http://localhost:3000/api/seed
```

## 🛠️ Configuración


## 🔥 Características

- 📊 Monitoreo de incidentes en tiempo real
- 🚨 Sistema de alertas automático
- 📱 Interfaz adaptable a dispositivos móviles
- 📈 Panel de análisis de datos
- 🔒 Autenticación segura
- 🗺️ Mapeo geográfico de incidentes

## 🏗️ Construido Con

- [NestJS](https://nestjs.com/) - Framework web
- [PostgreSQL](https://www.postgresql.org/) - Base de datos
- [Docker](https://www.docker.com/) - Contenedorización
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación

## 📚 Documentación de la API

Accede a la documentación Swagger en:
```
http://localhost:3000/api/docs
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

## 👥 Equipo

- [Guido Salazar Vargas] - Desarrollador Backend
- [Ronald Camino Puma] - Desarrollador Frontend
- [Jose Alejandro Sahonero Salas] - Desarrollador Movil
- [Jhenny Michelle Solis Herrrera] - Analista de Datos

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙋 Soporte

¿Tienes problemas? ¡Créa un issue!

---

<div align="center">
  Desarrollado con ❤️ para la seguridad de Santa Cruz
  
  UAGRM Hackaton 2024
</div>

[nestjs-shield]: https://img.shields.io/badge/NestJS-EA2845?style=flat&logo=nestjs&logoColor=white
[nestjs-url]: https://nestjs.com/
[docker-shield]: https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[typescript-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[license-shield]: https://img.shields.io/ba