import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  products = [
    {
      id: 1,
      name: "iPhone 12",
      specifications: {
        color: "Black",
        weight: "250g",
        storage: "256GB",
        price: 1000
      },
      picture: "https://cf4.certideal.com/24107-thickbox_default/iphone-12-64-go-blanc.jpg",
    },
    {
      id: 2,
      name: "Airpods",
      specifications: {
        color: "white",
        weight: "50g",
        storage: "N/A",
        price: 200
      },
      picture: "https://www.pngmart.com/files/13/Airpods-Transparent-Images-PNG.png"
    },
    {
      id: 3,
      name: "Samsung S22",
      specifications: {
        color: "black",
        weight: "250g",
        storage: "512GB",
        price: 900
      },
      picture: "https://fscl01.fonpit.de/devices/22/2222-w320h320.png"
    },
    {
      id: 4,
      name: "Samsung Note10",
      specifications: {
        color: "black",
        weight: "250g",
        storage: "256GB",
        price: 950
      },
      picture: "https://ae01.alicdn.com/kf/Haf57bca680a14773995bd869af40fb808.jpg"
    },
    {
      id: 5,
      name: "Phone 14",
      specifications: {
        color: "white",
        weight: "250g",
        storage: "256GB",
        price: 1300
      },
      picture: "https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png"
    }
  ];
  ProductName: any;
  cart: any ;


  onMouseOver(productId: any) : void {
    this.ProductName = this.products.find(product => product.id == productId)?.name;
  }

  onMouseOut() : void {
    this.ProductName = null;
  }

  addToCart(productId: any) : void {
    this.cart = this.localStorageService.getData("cart");
    let productSelected = this.products.find(product => product.id == productId);

    let productToAdd = {
      id: productSelected?.id,
      name: productSelected?.name,
      specifications: productSelected?.specifications,
      picture: productSelected?.picture,
      quantity: 1
    }

    if (this.cart != []) {
      if(productSelected?.id == this.cart.find((product:any) => product.id == productId)?.id) {
        this.cart.find((product:any) => product.id == productId).quantity++;
        this.localStorageService.saveData("cart", this.cart);
        console.log(this.cart);
      }else
      {
        let newCart = [...this.cart, productToAdd];
        this.localStorageService.saveData("cart", newCart);
        console.log(this.cart);
      }
    }else if (this.cart == []) {
      this.localStorageService.saveData("cart", [productToAdd]);
      console.log(this.cart);
    }
  }

  ngOnInit(): void {
    // this.localStorageService.clearData();
  }


}
