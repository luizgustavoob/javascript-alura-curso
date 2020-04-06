Transpilação ES6 para ES5 feita com Babel. Pra isso, add o package.json no projeto (npm init),
instala o cli do babel (npm install babel-cli@alguma-versao -D) e o preset para transpiação ao ES5 
(npm install babel-preset-es2015@alguma-versao -D).
Depois, edita o arquivo package.json e adiciona novo script para build "babel js/app-es6 -d js/app --source-maps".

Para evitar de ficar rodando o comando npm run build em desenvolvimento, adiciona um watch.

Para organizar os módulos do javascript, adiciona-se um loader (system.js por exemplo) 
(npm install systemjs@0.19.31 --save)
