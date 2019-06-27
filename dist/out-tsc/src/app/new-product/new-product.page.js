import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ProductService } from 'src/services/domain/product.service';
import { Router } from '@angular/router';
import { BrandService } from 'src/services/domain/brand.service';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FormBuilder, Validators } from '@angular/forms';
var NewProductPage = /** @class */ (function () {
    function NewProductPage(keyboard, loadingCtrl, toastCtrl, productService, brandService, router, actionSheetCtrl, transfer, camera, file, modalCtrl, fBuilder) {
        this.keyboard = keyboard;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.productService = productService;
        this.brandService = brandService;
        this.router = router;
        this.actionSheetCtrl = actionSheetCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.file = file;
        this.modalCtrl = modalCtrl;
        this.fBuilder = fBuilder;
        this.product = {};
        this.brand = {};
        this.fGroupProduct = this.fBuilder.group({
            'name': [null, Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                ])],
        }, { updateOn: 'blur' });
        this.fGroupBrand = this.fBuilder.group({
            'name': [null, Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                ])],
        }, { updateOn: 'blur' });
    }
    NewProductPage.prototype.ngOnInit = function () {
    };
    NewProductPage.prototype.segmentChanged = function (event) {
        if (event.detail.value === 'product') {
            this.slides.slidePrev();
        }
        else {
            this.slides.slideNext();
        }
    };
    //   async presentActionSheet(){
    //    let actionSheet = await this.actionSheetCtrl.create({
    //     header: 'Selecione a fonte da imagem',
    //     buttons: [{
    //       text: 'Galeria',
    //       role: 'destructive',
    //       icon: 'trash',
    //       handler: () => {
    //         this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    //       }
    //     }, {
    //       text: 'Camera',
    //       icon: 'share',
    //       handler: () => {
    //         this.takePicture(this.camera.PictureSourceType.CAMERA);
    //       }
    //     }, {
    //       text:'Cancelar',
    //       role:'cancel'
    //     }]
    //   });
    //   await actionSheet.present();
    // }
    // async takePicture(sourceType) {
    //   // Create options for the Camera Dialog
    //   var options = {
    //     quality: 100,
    //     destinationType: this.camera.DestinationType.FILE_URI,
    //     sourceType: sourceType,
    //     saveToPhotoAlbum: false,
    //     correctOrientation: true
    //   };
    //    this.camera.getPicture(options).then(async (imagePath) => {
    //     this.productService.uploadImage(imagePath, 'test').then(res => {
    //     }, err => {
    //       this.dismiss();
    //     });
    //   }
    //     modal.present();
    //   }, (err) => {
    //     console.log('Error: ', err);
    //   });
    // }
    NewProductPage.prototype.newProduct = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.Succes = true;
                        this.product.name = this.fGroupProduct.value.name;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.productService.newProduct(this.product)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        if (error_1.status != 201)
                            this.Succes = false;
                        this.presentToast(error_1.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        if (this.Succes) {
                            this.router.navigate(['tabs/search']);
                            this.presentToast("Produto adicionado na lista de pendentes");
                        }
                        return [7 /*endfinally*/];
                    case 6:
                        this.loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    NewProductPage.prototype.newBrand = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoading()];
                    case 1:
                        _a.sent();
                        this.brand.name = this.fGroupBrand.value.name;
                        this.Succes = true;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, this.brandService.newBrand(this.brand)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _a.sent();
                        if (error_2.status != 201)
                            this.Succes = false;
                        this.presentToast(error_2.error.error);
                        return [3 /*break*/, 6];
                    case 5:
                        this.loading.dismiss();
                        if (this.Succes) {
                            this.router.navigate(['tabs/search']);
                            this.presentToast("Marca adicionado na lista de pendentes");
                        }
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NewProductPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({ message: 'Aguarde...' })];
                    case 1:
                        _a.loading = _b.sent();
                        return [2 /*return*/, this.loading.present()];
                }
            });
        });
    };
    NewProductPage.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({ message: message, duration: 2000 })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild(IonSlides),
        tslib_1.__metadata("design:type", IonSlides)
    ], NewProductPage.prototype, "slides", void 0);
    NewProductPage = tslib_1.__decorate([
        Component({
            selector: 'app-new-product',
            templateUrl: './new-product.page.html',
            styleUrls: ['./new-product.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Keyboard,
            LoadingController,
            ToastController,
            ProductService,
            BrandService,
            Router,
            ActionSheetController,
            FileTransfer,
            Camera,
            File,
            ModalController,
            FormBuilder])
    ], NewProductPage);
    return NewProductPage;
}());
export { NewProductPage };
//# sourceMappingURL=new-product.page.js.map