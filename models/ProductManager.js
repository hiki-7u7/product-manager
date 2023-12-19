class ProdutManager {

    products = [
        {   
            id: 1,
            title: "Iphone 14 pro max",
            description: "El nuevo Iphone 14 pro max",
            price: "2000", 
            thumbnail: "https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/10/05004752/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-space-black-220907-geo-768x1075.jpg", 
            code: "123", 
            stock: "5",
        },
        {   
            id: 2,
            title: "Playstation 5",
            description: "El nuevo Playstation 5",
            price: "1500", 
            thumbnail: "https://cdnprod.mafretailproxy.com/sys-master-root/h3b/hd3/11658063904798/1752244_main.jpg_1700Wx1700H", 
            code: "abc", 
            stock: "3",
        },
    ];

    constructor(){};

    get getProducts(){
        return [...this.products];
    };

    getOneProduct( code ){
        const product = this.products.find( p => p.code === code );
        if(!product) {
          return {
            ok: false,
            message: `Product with code "${code}" Not Found`
          } 
        }

        return product;
    };

    addProduct( newProduct ){

        const { 
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        } = newProduct;
        
        if(!code) {
            return {
                ok: false,
                message: "Field code is required"
            }
        }

        const product = this.products.find( p => p.code === code );

        if(product) {
            return {
                ok: false,
                message: "Product already exists"
            }
        } 
        
        if( !title || !description || !price || !thumbnail || !stock ) {
            return {
                ok: false,
                message: "All fields are required"
            }
        }

        this.products.push({
            ...newProduct,
            id: this.products.length + 1,
        });

        return {
            ok: true,
            message: `Product ${title} added successfully`
        };

    };

    deleteProduct( code ){

        const productFound = this.getOneProduct( code );

        if(productFound.ok === false) {
          return {
            ok: false,
            message: `Product with code "${code}" Not Found`
          } 
        }

        this.products = this.products.filter( p => p.code !== code );

        return {
            ok: true,
            message: `Product "${ productFound.title }" deleted successfully`,
        }

    };

    updateProduct( newProduct ){
        
        const { code, ...rest } = newProduct;

        const productFound = this.getOneProduct( code );

        const newProducts = this.products.map( p => {

            if(p.code === code){
                return {
                    id: p.id,
                    ...p,
                    ...rest,
                }
            }
            return p
        });

        this.products = newProducts;

        return {
          ok: true,
          message: `Product ${productFound.title} updated successfully`,
        }

    };

}

module.exports = ProdutManager