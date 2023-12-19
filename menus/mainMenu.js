const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const ProdutManager = require('../models/ProductManager');

const rl = readline.createInterface({ input, output });

const options = [
  { name: 'Ver productos.', open: false },
  { name: 'Obtener producto.', open: false },
  { name: 'Crear producto.', open: false },
  { name:  'Eliminar producto.', open: false },
  { name: 'Salir.', open: false },
];

let optionSelected = 0;

const productManager = new ProdutManager();

const showMainMenu = () => {
  console.clear();
  console.log('\x1b[4m','PRODUCT MANAGER','\x1b[0m', '\n');

  options.forEach((option, index) => {
    if (index === optionSelected) {
      console.log('(', '\x1b[32m*\x1b[0m' ,')', `${option.name}`);
    } else {
      console.log(`(   ) ${option.name}`);
    }
  });
};

const showOption = async (option) => {
  
  let exit;

  switch (option.name) {
    case 'Ver productos.':
      console.clear();
      console.log('\x1b[4m','TODOS LOS PRODUCTOS', '\x1b[0m', '\n')
      console.log(productManager.getProducts);
      console.log()
      
      do {
        exit = await rl.question('¿Desea volver al menu principal?(y/n) ');
      } while ( exit.toLowerCase() !== "y" );
      
      showMainMenu();
      option.open = false;
      break;
    
    case 'Obtener producto.':
      console.clear();
      console.log('\x1b[4m','OBTENER PRODUCTO', '\x1b[0m', '\n')
      const codeToSearch = await rl.question('Ingrese el code del producto que deseas buscar: ');
      const productFound = productManager.getOneProduct(codeToSearch);
      
      console.log()
      
      if(productFound.ok === false){
        console.log('\x1b[31m', `ERROR: ${productFound.message}`, '\x1b[0m', '\n');

        do {
          exit = await rl.question('¿Desea volver a intentarlo?(y/n) ');
        } while ( exit.toLowerCase() !== "n" & exit.toLowerCase() !== "y" );
        
        if(exit === "n"){
          showMainMenu();
          option.open = false;
          break;
        } else{
          showOption(option)
          break;
        }

      }
        
      console.log(productFound, '\n');
      
      do {
        exit = await rl.question('¿Desea volver a intentarlo?(y/n) ');
      } while (  exit.toLowerCase() !== "n" & exit.toLowerCase() !== "y" );
      
      if(exit === "n"){
        showMainMenu();
        option.open = false;
        break;
      } else{
        showOption(option)
        break;
      }
    
    case 'Crear producto.':

      console.clear();
      
      console.log('\x1b[4m','CREAR PRODUCTO', '\x1b[0m', '\n')

      const title = await rl.question('Ingrese el title del producto: ');
      const description = await rl.question('Ingrese el description del producto: ');
      const price = await rl.question('Ingrese el price del producto: ');
      const thumbnail = await rl.question('Ingrese el thumbnail del producto: ');
      const code = await rl.question('Ingrese el code del producto: ');
      const stock = await rl.question('Ingrese el stock del producto: ');

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
      
      const productAdded = productManager.addProduct(newProduct);
      console.log();

      if(productAdded.ok === false){
        console.log('\x1b[31m', `ERROR: ${productAdded.message}`,'\x1b[0m', '\n');

        do {
          exit = await rl.question('¿Desea volver a intentarlo?(y/n) ');
        } while ( exit.toLowerCase() !== "n" & exit.toLowerCase() !== "y" );
        
        if(exit === "n"){
          showMainMenu();
          option.open = false;
          break;
        } else{
          showOption(option)
          break;
        }

      }

      console.log('\x1b[32m', productAdded.message, '\x1b[0m' , '\n');

      do {
        exit = await rl.question('¿Desea volver a intentarlo?(y/n) ');
      } while ( exit.toLowerCase() !== "n" & exit.toLowerCase() !== "y" );
      
      if(exit === "n"){
        showMainMenu();
        option.open = false;
        break;
      } else{
        showOption(option)
        break;
      }

    case 'Eliminar producto.':

      console.clear();

      console.log('\x1b[4m','ELIMINAR PRODUCTO', '\x1b[0m', '\n')

      const codeToDelete = await rl.question('Ingrese el code del producto a eliminar: ');
      const productDeleted = productManager.deleteProduct(codeToDelete);

      console.log();

      if(productDeleted.ok === false){
        console.log('\x1b[31m', `ERROR: ${productDeleted.message}`, '\x1b[0m', '\n');

        do {
          exit = await rl.question('¿Desea volver a intentarlo?(y/n) ');
        } while ( exit.toLowerCase() !== "n" & exit.toLowerCase() !== "y" );
        
        if(exit === "n"){
          showMainMenu();
          option.open = false;
          break;
        } else{
          showOption(option)
          break;
        }
      }

      console.log('\x1b[32m', productDeleted.message, '\x1b[0m', '\n');

      do {
        exit = await rl.question('¿Desea volver a intentarlo?(y/n) ');
      } while ( exit.toLowerCase() !== "n" & exit.toLowerCase() !== "y" );
      
      if(exit === "n"){
        showMainMenu();
        option.open = false;
        break;
      } else{
        showOption(option)
        break;
      }

    case 'Salir.':
      const answer = await rl.question("¿Estas seguro que quieres salir del Product manager?(y,n) ")
      if(answer.toLowerCase() === "y"){
        console.log('\x1b[31m')
        console.log('Saliendo del programa...', '\x1b[0m');
        rl.close();
        break;
      }else {
        showMainMenu();
        option.open = false;
        break;
      }
    default:
      console.log('Opción no válida.');
      showMainMenu();
  }
}

showMainMenu();

rl.input.on('keypress', (key, data) => {

  if( options.some( e => e.open === true ) ) return;

  if (data.name === 'up' && optionSelected > 0) {
    optionSelected--;
    showMainMenu();
  } else if (data.name === 'down' && optionSelected < options.length - 1) {
    optionSelected++;
    showMainMenu();
  }
});

rl.on('line', () => {
  options[optionSelected].open = true;
  showOption(options[optionSelected])
});


module.exports = {
    showMainMenu
}