Este proyecto se creo con  [Create React App](https://github.com/facebook/create-react-app).

## Sirena App

Este proyecto se basa en la obtencion y busqueda de mails de un usuario despues de logearse.

## Estructura del proyecto

* **test** Contiene todo los test
* **components** Contiene todos lo componentes que se usan en el cliente
* **controles** Contiene los manejadores de sesion ( Login y cookies )
* **css** Contiene un solo archivo css parar estilos, no necesite mas.
* **models** Contiene las entidades (clases).
* **routes** Contiene el manjador de rutas 
* **views** Contiene las vistas (paginas) que se renderizan el e proyecto

## Iniciar Apliación
   
   * Configurar el archivo server.example para poder conectarse al sevidor 
   * Correr el comando **npm start**

## Comandos de NPM

A parte de los comandos regulares que trae la aplicacion cuando se crea con create-react-app
se agregaron los siguientes: 

 * **lintlog** escribe un el archivo lint_log las correcciones que require ESLINT 
 * **lintfix** arregla las correcciones que require ESLINT



## Anotaciones

* Los componentes no poseen documentacion ya que no tienen una logica complicada 
(enviar eventos a padre, guardar estados... etc). A su vez, las vistas
que son componentes, si la possen ya que manejan casi todo,

* Para el enrutamiento de las vistas se uso [React Router]()

* Framework de css y otros componentes [Material UI]()

* Para los popups se uso [React Toastify]()

* Manejo de fechas [Moment]()

* No se vio la necesidad de usar [Lodash]()

* El agoritmo de busqueda de los mails esta en a libreria [Fuse](https://www.npmjs.com/package/fuse).
    donde las ponderaciones de cada busqueda estan en la clase Mail en /Moldes en le metodo "getSearchOptions"

* La parte de logeo con el usuario, todo información username, lastnmame, etc (datos no relevantes)
se guardan en las cookies del navegador


## Propuestas de Mejora

* Hacer props obligatorias en los componentes con propTypes para mayor control

*  Los metodos de obtencion de datos (getFilters, getMails) en las clases de Model; se pudieran pasar al Record como un
 unico metodo "getAll" que a partir del nombre de la clase haga la peticion al servidor.
 
* Implementar websockets para escuchar evendos de guardado y asi actulizar el contenido del cliente
 
* Se pudiera si es necesario agregar un buscador al modal de filtros, para buscar 
el filtro que se necesite

* Hacer mas test de renderizado

* Las vistas pueden heredad de un window para que haya un poco mas de uniformidad, y que se maneje los 
popUps desde ahi

*Interface para crear usuarios
