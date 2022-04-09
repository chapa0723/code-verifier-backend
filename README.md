# code-verifier-backend
Node Express project + Backend

Transpilar definicion: Es el proceso por el cual el codigo fuente de un programa escrito en un lenguaje de programacion A se traduce a codigo fuente de un lenguaje de programacion B
En este caso lo que hice fue crear codigo en lenguaje JavaScript y luego lo pase de lenguaje TypeScript 
(
    "@types/express": "^4.17.13",
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.23",
    "@typescript-eslint/eslint-plugin": "^5.18.0",
    "@typescript-eslint/parser": "^5.18.0",
)



Dependencias utilizadas:
Entorno local:
    Dotenv: necesario para crear archivos de entorno a nivel de proyecto al cual realizar consultas

    Express: es un framework para crear una app de backend para nodeJS

    webpack: sirve para empaquetar los modulos (bundler)

Entorno de desarrollo:
    concurrently: sirve para ejecutar mas de un script al mismo tiempo

    eslint:es una herramienta de analisis de codigo estatico para indetificar patrones problematicos entonctrados en el codigo JavaScript. Podemos aplicar reglas para estandarizar los patrones de codigo

    nodemon: sirve para actualizar el servidor constantemente con cada cambio que hagamos en el codigo y no tener que estar deteniendo el servidor y volviendolo a ejecutar por cada cambio que hagamos

    serve: 

    jest: sirve para hacer test unitarios del codigo


Scrips NPM:
    "build": "npx tsc", -> ejecutar la transpilacion typescript "tsc" a partir del archivo de configuracion tsconfig.json buscando el archivo index.ts 

    "start": "node dist/index.js", -> ejecuta el archivo index.js de la carpeta dist generado pŕeviamente con el script "build"

    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"", -> ejecuta de forma concurrente el server (index.js) utilizando "nodemon" y con el "tsc --watch" se va a estar transpilando constantemente el para no tener que realizarlo cada vez que modificamos el codigo

    "test": "jest", -> ejecuta un test unitario que por el momento hace testea nada en realidad

    "serve:coverage": "npm run test && cd coverage/lcov-report && npx serve" -> ejecuta los scripts "test" y ejecuta el reporte de resultados generados por ese test ubicado en la carpeta coverage/lcov-report


La variable de entorno que son creada en el archivo ".env":
    PORT -> es el puerto con el cual nos vamos a poder conectar el servidor que se genera el la direccion local o "localhost"

