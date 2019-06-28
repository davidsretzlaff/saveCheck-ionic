import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/domain/product.service';
import { ProductDTO } from 'src/models/product.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/services/domain/brand.service';
import { BrandDTO } from 'src/models/brand.dto';
import { Like } from '../interfaces/like';
import { Comments } from '../interfaces/comments';
import { LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/services/domain/storage.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public like: Like = {};
  private searched: Boolean;
  constructor(
    public productService: ProductService,
    public brandService: BrandService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private storage: StorageService,
    private androidPermissions: AndroidPermissions,
    private barcodeScanner: BarcodeScanner,

  ) { }

  imageUrl: string = API_CONFIG.baseUrl;
  id;
  products: ProductDTO[];
  usr : any;
  brands: BrandDTO[];
  search: any;
  public comment: Comments = {};
  private Succes: Boolean;
  private loading: any;
  barcodeData: any;
  private useScan : any;
  emptyProducts: ProductDTO[];
  emptyBrands: BrandDTO[];
  public sections: any = {
    first: 'Products',
    second: 'Brands',
    selectedSection: ''
 };
  ngOnInit() {
    this.usr = this.storage.getLocalUser();
    this.useScan = this.route.snapshot.paramMap.get('scan');

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
   
  }

ionViewWillEnter(){
  this.useScan = this.route.snapshot.paramMap.get('scan');
  if(this.useScan == 1)
  {
    this.scanCode();
    console.log("ok");
  }


}

  async searchItens(ev) {
    
    this.search = ev;
    var val = ev.target.value;
    if (val.length > 4) {
     await this.productService.findByName(val)
        .subscribe(response => {
          this.products = response;
          this.sections.selectedSection = this.sections.first;
          return true;
        },
          error => {
            this.products = null;
          });
     await this.brandService.findByName(val)
        .subscribe(response => {
          this.brands = response;

          this.sections.selectedSection = this.sections.second;
        },
          error => {
            this.brands = null;
          });
       this.searched =true;
    }

  }
  async likeBrand(id) {
    this.like.email = this.usr.email;
    this.like.brandId = id;
    this.Succes = true;
    await this.presentLoading();

    try {      
        await this.brandService.like(this.like)
    } catch (error) {
      if (error.status != 201)
        this.Succes = false;
      this.presentToast(error.error.error);
    } finally {
      if (this.Succes) {
        this.searchItens(this.search);
        this.presentToast("Você curtiu isso");
        this.comment.description = null;
      }
      this.loading.dismiss();
    }
  }

  async likeProduct(id) {
    this.like.email = this.usr.email;
    this.like.brandId = id;
    this.Succes = true;
    await this.presentLoading();

    try {      
        await this.productService.like(this.like)
    } catch (error) {
      if (error.status != 201)
        this.Succes = false;
      this.presentToast(error.error.error);
    } finally {
      if (this.Succes) {
        this.searchItens(this.search);
        this.presentToast("Você curtiu isso");
        this.comment.description = null;
      }
      this.loading.dismiss();
    }
  }

  async dislikeBrand(id) {
    this.like.email = this.usr.email;
    this.like.brandId = id;
    this.Succes = true;
    await this.presentLoading();

    try {      
        await this.brandService.dislike(this.like)
    } catch (error) {
      if (error.status != 201)
        this.Succes = false;
      this.presentToast(error.error.error);
    } finally {
      if (this.Succes) {
        this.searchItens(this.search);
        this.comment.description = null;
      }
      this.loading.dismiss();
    }
  }

  async dislikeProduct(id) {
    this.like.email = this.usr.email;
    this.like.brandId = id;
    this.Succes = true;
    await this.presentLoading();

    try {      
        await this.productService.dislike(this.like)
    } catch (error) {
      if (error.status != 201)
        this.Succes = false;
      this.presentToast(error.error.error);
    } finally {
      if (this.Succes) {
        this.searchItens(this.search);
        this.comment.description = null;
      }
      this.loading.dismiss();
    }
  }

  scanCode(){
    this.searched = false;
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    this.barcodeScanner.scan().then(barcodeData => {
      this.presentToast("Leitura do Código Completa");
      this.barcodeData = barcodeData.text;
      this.requestProduct();
     }).catch(err => {
         console.log('Error', err);
     });
  }
  async requestProduct(){
    await this.productService.findByBarcode(this.barcodeData)
          .subscribe(response => {
            this.products = response;
            return true;
          },
            error => {
              this.products = null;
            });
         this.searched =true;
  }

  async segmentChanged(event){ 
    this.products = this.emptyProducts;
    this.brands = this.emptyBrands;
    var val = event.target.value;
    if(val == 'Products'){
      await this.productService.findAll()
        .subscribe(response => {
          this.products = response;
          return true;
        },
          error => {
            this.products = null;
          });
    }
    if(val == 'Brands'){
      await this.brandService.findAll()
      .subscribe(response => {
        this.brands = response;
      },
        error => {
          this.brands = null;
        });
     this.searched =true;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


}
