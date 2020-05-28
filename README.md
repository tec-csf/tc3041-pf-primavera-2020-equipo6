# TC3041 Proyecto Final Primavera 2020

# Sistema de recomendación de películas
---

##### Integrantes:
1. *Salomon Levy Becherano* - *A01023530* - *TEC SF*
2. *Sebastian Gonzalo Vives Faus* - *A01025211* - *TEC CSF*
3. *Luis Armando Ortiz Revilla* - *A01022320* - *TEC CSF*
4. *Luis Antonio García García* - *A01021865* - *TEC CSF*

---
## 1. Aspectos generales

Las orientaciones del proyecto se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte del proyecto, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.

### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos del proyecto, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en el proyecto, sin embargo, debe tener presente que la solución final se deberá ejecutar en una plataforma en la nube. Puede ser  [Google Cloud Platform](https://cloud.google.com/?hl=es), [Azure](https://azure.microsoft.com/en-us/) o [AWS](https://aws.amazon.com/es/free/).
* El proyecto debe utilizar al menos dos modelos de bases de datos diferentes, de los estudiados en el curso.
* La solución debe utilizar una arquitectura de microservicios. Si no tiene conocimiento sobre este tema, le recomiendo la lectura [*Microservices*](https://martinfowler.com/articles/microservices.html) de [Martin Fowler](https://martinfowler.com).
* La arquitectura debe ser modular, escalable, con redundancia y alta disponibilidad.
* La arquitectura deberá estar separada claramente por capas (*frontend*, *backend*, *API RESTful*, datos y almacenamiento).
* Los diferentes componentes del proyecto (*frontend*, *backend*, *API RESTful*, bases de datos, entre otros) deberán ejecutarse sobre contenedores [Docker](https://www.docker.com/) y utilizar [Kubernetes](https://kubernetes.io/) como orquestador.
* Todo el código, *datasets* y la documentación del proyecto debe alojarse en este repositorio de GitHub siguiendo la estructura que aparece a continuación.

### 1.2 Estructura del repositorio
El proyecto debe seguir la siguiente estructura de carpetas:
```
- / 			        # Raíz de todo el proyecto
    - README.md			# Archivo con los datos del proyecto (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			# Carpeta con la solución del backend (CMS)
    - api			# Carpeta con la solución de la API
    - datasets		        # Carpeta con los datasets y recursos utilizados (csv, json, audio, videos, entre otros)
    - dbs			# Carpeta con los modelos, catálogos y scripts necesarios para generar las bases de datos
    - docs			# Carpeta con la documentación del proyecto
        - stage_f               # Documentos de la entrega final
        - manuals               # Manuales y guías
```

### 1.3 Documentación  del proyecto

Como parte de la entrega final del proyecto, se debe incluir la siguiente información:

* Justificación de los modelo de *bases de datos* que seleccionaron.
* Descripción del o los *datasets* y las fuentes de información utilizadas.
* Guía de configuración, instalación y despliegue de la solución en la plataforma en la nube  seleccionada.
* Documentación de la API. Puede ver un ejemplo en [Swagger](https://swagger.io/). 
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Descripción del proyecto

El proyecto desarrollado consiste en una sistema de recomendación de película. El propóstio del sistema es descubrir nuevas peliculas a traves de tus gustos en otras películas que te hayan gustado. El sistema te pregunta qué películas te han gustado y cuáles no, en una interfaz similar a “Tinder”, en donde aparecen una tarjeta a la vez, conteniendo el nombre y póster de una película. El usuario puede hacer swipe a la derecha, izquierda, arriba o abajo. Cada acción tiene un significado diferente:
- Swipe a la derecha (botón like): Me gusta esta pelicula.
- Swipe a la izquierda (botón tache): Me disgusta esta película.
- Swipe hacia abajo (botón dismiss): No he visto esta película.
- Swipe hacia arriba (botón favorito): Película favorita (guardar película en favoritos).

Para modelar la solución se modelaron varios procesos de negocio para que el sistema fuera más interactivo. Los procesos que se modelaron consisten en :
- Creación de usuarios y login.
- Sesiones.
- Sistema de recomendaciones.
- Acciones sobre la película (Swipes).
- Lista de favoritos.
- Lista de todas las películas (filtrado por nombre, likes o género)
- Lista de usuarios (filtrado por similitud de gustos).



## 3. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución del proyecto.

### 3.1 Modelos de *bases de datos* utilizados

Los modelos que se usan en la solución son Neo4j y Firebase.
No4j como modelo de grafos fue la opcón para modelar los nodos y relaciones principales de nuestro  proyecto, el esquema que definimos para la solución es el siguiente :

El motivo por el cuál elejimos Neo4j es por el manejo de varios nodos y relaciones que pueden exitir sin ser complicado, además dela alta disponibilidad, la rapidez de las consultas y sobre el query que manejamos para hacer la relación de que películas recomendará la aplicación.

Firebase es el servicio que usamos como parte de autenticación de usuarios y manejo de sesiones

### 3.2 Arquitectura de la solución

*[Incluya aquí un diagrama donde se aprecie la arquitectura de la solución propuesta, así como la interacción entre los diferentes componentes de la misma.]*

### 3.3 Frontend

*[Incluya aquí una explicación de la solución utilizada para el frontend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.3.1 Lenguaje de programación
- Javascript
- Css
- JSON
- HTML
#### 3.3.2 Framework
- React
#### 3.3.3 Librerías de funciones o dependencias
Node
### 3.4 Backend

*[Incluya aquí una explicación de la solución utilizada para el backend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.4.1 Lenguaje de programación
- JSON
- Javascript
#### 3.4.2 Framework
- GraphQL
#### 3.4.3 Librerías de funciones o dependencias

### 3.5 API

*[Incluya aquí una explicación de la solución utilizada para implementar la API del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.5.1 Lenguaje de programación
#### 3.5.2 Framework
#### 3.5.3 Librerías de funciones o dependencias

*[Incluya aquí una explicación de cada uno de los endpoints que forman parte de la API. Cada endpoint debe estar correctamente documentado.]*

*[Por cada endpoint debe incluir lo siguiente:]*

* **Descripción**:
* **URL**:
* **Verbos HTTP**:
* **Headers**:
* **Formato JSON del cuerpo de la solicitud**: 
* **Formato JSON de la respuesta**:
* **Códigos de error**:

## 3.6 Pasos a seguir para utilizar el proyecto
Exsted dos formas de utilizar el proyecto:

- Una si se requiere correr como local, para esto hay que crear un directorio con el nombre que se desee, posterior abrir una terminal de docker y cambiarse a ese directorio y hacer un git clone de este repositorio. Ya clonado se debe ejecutar el siguiente comando : cd tc3041-pf-primavera-2020-equipo6/app , siguiente se ejecuta el comando docker-compose build, cdespués el docker-compose up -d, y adicional si se está corriendo docker como una máquina virtual usar el comando docker-machine ip, así ya en el navegador de su preferencia ingresar ipDeLaMaquina:3000

- La otra opción es usar el proyecto orquestado con kubernetes en la nube, para eso solamente ingresar a la liga https://semy.io

Ya que una de las opciones que hayamos elegido nos muestre la página de login es necesario crear una cuenta si no se tiene una, para eso se da click en "click here" donde seremos redirigidos a la interfaz de crear cuenta donde ingresaremos un nombre de usuario, mail (estos dos primeros pasos deben ser únicos) y finalmente una contraseña de 6 caracteres como mínimos. Si todo está correcto o ya tenemos cuenta e ingresamos bien los datos y damos login se nos ingresa a la interfaz principal donde tendremos la película que nos está recomendando y ya podremos hacer los 4 tipos de swipe (swipe arriba agrega esa película a la sección de favoritos). Otras acciones que podremos realiazar son la busqueda de películas, ver el número de likes y filtrados en la sección movies, esto mismo para la sección de users donde veremos que usuarios tienen más parecidos gustos a nosotros, siendo 1 el valor de más parecido y -1 el de menos parecido, la seccion de favorites funciona similar ya que encontraremos películas que fuerno agregadas a nuestra lista y podremos ver la información de sus likes y nombre, además del filtrado y busqueda, también es posible borrar una película de favoritos con el botón borrar. Finalmente si deseamos cerrar sesión, únicamente se da click en la opción signout y seremos redirigidos a la pantalla de login donde si deseamos volver a ingresar hay que repetir este proceso.
## 4. Referencias

- https://neo4j.com/graphacademy/online-training/data-science/
- https://auth0.com/
- https://neo4j.com/docs/graph-algorithms/current/labs-algorithms/jaccard/
- https://github.com/tec-csf/tc3041-pf-primavera-2020-equipo6
- http://guides.neo4j.com/sandbox/recommendations
- https://neo4j.com/developer/neo4j-cloud-aws-ec2-ami/?_ga=2.38760035.1125792768.1590423787-1046712168.1587386293
- http://techgenix.com/namecheap-aws-ec2-linux/
- https://medium.com/neo4j/getting-certificates-for-neo4j-with-letsencrypt-a8d05c415bbd
- https://community.neo4j.com/t/troubleshooting-connection-issues-to-neo4j/129
- https://kops.sigs.k8s.io/getting_started/aws/#cluster-state-storage
- https://www.digitalocean.com/community/tutorials/how-to-migrate-a-docker-compose-workflow-to-kubernetes
